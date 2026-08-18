import { NodeEditor, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import { ConnectionPlugin } from "rete-connection-plugin";
import { LitPlugin, Presets, LitArea2D } from "@retejs/lit-plugin";
import { DataflowEngine } from "rete-engine";
import { html } from "lit";

import "@shoelace-style/shoelace/dist/themes/light.css";

import "../nodes/node-connection";
import "../nodes/node-socket";
import "../nodes/node.component";

import { 
    BaseNode,
    KeyNode, 
    SaltNode, 
    HashFunctionNode, 
    HashValueNode, 
    Connection, 
    Nodes,
    Schemes
} from "./editor.nodes";
import { areSocketsFree, createConnectionPreset, isValidConnection } from "./editor.connections";

type AreaExtra = LitArea2D<Schemes>;

// main editor creation through rete function
export async function createEditor(
    container: HTMLElement, 
    canDelete: boolean,
    isAuthor: boolean, 
    initialData?: any 
) {
    const socket = new ClassicPreset.Socket("socket");
    const editor = new NodeEditor<Schemes>();
    const area = new AreaPlugin<Schemes, AreaExtra>(container);
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    const engine = new DataflowEngine<Schemes>();
    const litRenderer = new LitPlugin<Schemes, AreaExtra>();

    // configure custom rendering for nodes and connections
    litRenderer.addPreset(
        Presets.classic.setup({
            customize: {
                node(data) {
                    return ({ emit }) =>
                        html`<hash-node 
                            .data=${data.payload} 
                            .emit=${emit}
                            .process=${() => (data.payload as any)._process?.()} 
                            .deleteNode=${() => (data.payload as any)._delete?.()}
                            .canDelete=${(data.payload as any)._canDelete} 
                            .isAuthor=${(data.payload as any)._isAuthor}
                        ></hash-node>`;
                },
                connection(data) {
                    return (props: any) =>
                        html`<node-connection .path=${props.path} .data=${data.payload}></node-connection>`;
                },
                socket(data) {
                    return () => html`<node-socket .data=${data}></node-socket>`;
                }
            }
        })
    );

    let currentCanDelete = canDelete;
    let currentIsAuthor = isAuthor;
    let isBatching = false;
    
    // dispatch event to update external state
    const dispatchChange = () => {
        if (isBatching) return;
        const detail = exportState();
        container.dispatchEvent(new CustomEvent("rete-update", {
            detail,
            bubbles: true,
            composed: true
        }));
    };
    
    // updates the grid background based on zoom/pan
    const updateBackground = () => {
        const { k, x, y } = area.area.transform;
        const bgSize = 20 * k;  
        const dotSize = Math.max(1 * k, 0.5); 
        container.style.setProperty("--bg-size", `${bgSize}px`);
        container.style.setProperty("--dot-size", `${dotSize}px`);
        container.style.setProperty("--bg-pos-x", `${x}px`);
        container.style.setProperty("--bg-pos-y", `${y}px`);
    };

    AreaExtensions.restrictor(area, {
        scaling: { min: 0.1, max: 1 },
        // translation: { left: 0, top: 0, right: 1000, bottom: 1000 }
    });

    const selector = AreaExtensions.selector();
    AreaExtensions.selectableNodes(area, selector, {
        accumulating: AreaExtensions.accumulateOnCtrl(),
    });

    // manages number of sockets on hash function nodes
    const reconcileSockets = async (node: HashFunctionNode) => {
        const max_channels = 4;
        const inputs = Object.keys(node.inputs).sort();
        let highestConnectedIndex = -1;

        inputs.forEach((key) => {
            const index = parseInt(key.split("-")[1]);
            const hasInputConn = editor.getConnections().some(c => c.target === node.id && c.targetInput === key);
            const outKey = `out-${index}`;
            const hasOutputConn = editor.getConnections().some(c => c.source === node.id && c.sourceOutput === outKey);

            if (hasInputConn || hasOutputConn) {
                if (index > highestConnectedIndex) highestConnectedIndex = index;
            }
        });

        // shift connections if there are gaps
        let shifted = false;
        for (let i = 0; i < highestConnectedIndex; i++) {
            const currentKey = `in-${i}`;
            const outKey = `out-${i}`;
            const hasInputConn = editor.getConnections().some(c => c.target === node.id && c.targetInput === currentKey);
            const hasOutputConn = editor.getConnections().some(c => c.source === node.id && c.sourceOutput === outKey);

            if (!hasInputConn && !hasOutputConn) {
                const nextKey = `in-${i+1}`;
                const nextOutKey = `out-${i+1}`;
                const nextInputConns = editor.getConnections().filter(c => c.target === node.id && c.targetInput === nextKey);
                const nextOutputConns = editor.getConnections().filter(c => c.source === node.id && c.sourceOutput === nextOutKey);

                for (const conn of nextInputConns) {
                    await editor.removeConnection(conn.id);
                    await editor.addConnection(new Connection(editor.getNode(conn.source), conn.sourceOutput, node, currentKey));
                }
                for (const conn of nextOutputConns) {
                    await editor.removeConnection(conn.id);
                    await editor.addConnection(new Connection(node, outKey, editor.getNode(conn.target), conn.targetInput));
                }
                shifted = true;
                break;
            }
        }

        if (shifted) {
            await reconcileSockets(node);
            return;
        }

        // update channel count based on connections
        let targetCount = highestConnectedIndex + 2; 
        if (targetCount < 1) targetCount = 1;
        if (targetCount > max_channels) targetCount = max_channels;

        const currentCount = Object.keys(node.inputs).length;
        if (currentCount !== targetCount) {
            node.setChannelCount(targetCount);
            await area.update("node", node.id);
        }
    };

    connection.addPreset(createConnectionPreset(editor));

    editor.use(engine);
    editor.use(area);
    area.use(connection);
    area.use(litRenderer);

    const removeNodeWithConnections = async (nodeId: string) => {
        if (!currentCanDelete) return;
        await batch(async () => {
            for (const c of editor.getConnections()) {
                if (c.source === nodeId || c.target === nodeId) await editor.removeConnection(c.id);
            }
            await editor.removeNode(nodeId);
        });
    };

        let isProcessing = false;
        let hasPendingProcess = false;

    // main logic to process data flow
    async function processInternal() {
        engine.reset();
        
        // fetch and update inputs for salt nodes
        const saltNodes = editor.getNodes().filter(n => n instanceof SaltNode);
        for (const node of saltNodes) {
            const inputs = await engine.fetchInputs(node.id);
            const inputVal = inputs["salt-input"]?.[0];
            (node as SaltNode).incomingValue = inputVal ? String(inputVal) : "";
        }

        // fetch inputs for hash functions
        const hashFuncs = editor.getNodes().filter(n => n instanceof HashFunctionNode);
        for (const node of hashFuncs) await engine.fetchInputs(node.id);
        
        // update hash value nodes with results
        const valNodes = editor.getNodes().filter(n => n instanceof HashValueNode);
        for (const node of valNodes) {
            const inputs = await engine.fetchInputs(node.id);
            const incomingVal = inputs["hash-value-input"]?.[0];
            (node as HashValueNode).displayValue = (incomingVal as string) || "";
        }

        // update node views
        for (const node of editor.getNodes()) {
            await area.update("node", node.id);
            const view = area.nodeViews.get(node.id);
            if (view && view.element) {
                const hashNodeEl = view.element.querySelector("hash-node") as any;
                if (hashNodeEl && hashNodeEl.requestUpdate) {
                     hashNodeEl.requestUpdate();
                }
            }
        }
        dispatchChange();
    }

    // avoid overlapping fetch/reset cancellations
    async function process() {
        if (isProcessing) {
            hasPendingProcess = true;
            return Promise.resolve();
        }
        isProcessing = true;
        try {
            do {
                hasPendingProcess = false;
                await processInternal();
            } while (hasPendingProcess);
        } finally {
            isProcessing = false;
        }
    }

    // update values for current view 
    const setupNode = (node: Nodes) => {
        (node as any)._process = process;
        (node as any)._delete = () => removeNodeWithConnections(node.id);
        (node as any)._canDelete = currentCanDelete;
        (node as any)._isAuthor = currentIsAuthor;
    };

    // visual updates on interaction
    area.addPipe(context => {
        if (context.type === 'rendered' || context.type === 'translated' || context.type === 'zoomed') {
            updateBackground();
        }
        if (context.type === 'translated' || context.type === 'nodedragged') {
            dispatchChange(); 
        }
        return context;
    });
    
    let isSyncing = false;
    let hasPendingSync = false;

    // a structural change must not interleave with reconciling, which shifts connections
    // out from under it and invalidates the ids it is working through
    async function batch(mutate: () => Promise<void>) {
        isBatching = true;
        try {
            await mutate();
        } finally {
            isBatching = false;
        }
        await syncGraph();
    }

    async function syncGraph() {
        if (isSyncing) {
            hasPendingSync = true;
            return;
        }
        isSyncing = true;
        try {
            do {
                hasPendingSync = false;
                for (const node of editor.getNodes()) {
                    if (node instanceof HashFunctionNode) await reconcileSockets(node);
                }
            } while (hasPendingSync);
        } finally {
            isSyncing = false;
        }
        await process();
    }

    // trigger processing when connections change
    editor.addPipe(context => {
        if (context.type === 'connectioncreated' || context.type === 'connectionremoved') {
            if (!isBatching) void syncGraph();
        }
        if (context.type === 'nodecreated' || context.type === 'noderemoved') {
            dispatchChange();
        }
        return context;
    });

    // the interactive flow already checks the rules, this also covers programmatic adds
    editor.addPipe(context => {
        if (context.type === 'connectioncreate' && !isValidConnection(editor, context.data)) return;
        return context; 
    });

    // editor state for rerender
    const exportState = () => {
        return {
            nodes: editor.getNodes().map(n => {
                const view = area.nodeViews.get(n.id);
                const x = view ? view.position.x : 0;
                const y = view ? view.position.y : 0;
                
                const baseData = {
                    id: n.id,
                    label: n.label,
                    customTitle: (n as any).customTitle, 
                    x,
                    y,
                };

                if (n instanceof KeyNode) return { ...baseData, value: n.value };
                if (n instanceof HashFunctionNode) return { ...baseData, selectedFunction: n.selectedFunction, inputsCount: Object.keys(n.inputs).length };
                if (n instanceof SaltNode) return { ...baseData, saltValue: n.saltValue };
                
                return baseData;
            }),
            connections: editor.getConnections().map(c => ({
                source: c.source, sourceOutput: c.sourceOutput,
                target: c.target, targetInput: c.targetInput
            }))
        };
    };

    // loads editor state from data
    const importState = async (data: any) => {
        if (!data || !data.nodes) return;
        await batch(() => importNodesAndConnections(data));
    };

    const importNodesAndConnections = async (data: any) => {
        for(const c of editor.getConnections()) await editor.removeConnection(c.id);
        for(const n of editor.getNodes()) await editor.removeNode(n.id);

        for (const node_data of data.nodes) {
            let node: Nodes | undefined;
            if (node_data.label === 'Key') {
                node = new KeyNode(socket);
                node.value = node_data.value || "";
            } else if (node_data.label === 'HashFunction') {
                node = new HashFunctionNode(socket);
                (node as HashFunctionNode).selectedFunction = node_data.selectedFunction || "sha256";
                if (node_data.inputsCount) (node as HashFunctionNode).setChannelCount(node_data.inputsCount);
            } else if (node_data.label === 'HashValue') {
                node = new HashValueNode(socket);
            } else if (node_data.label === 'Salt') {
                node = new SaltNode(socket, node_data.saltValue);
            }

            if (node) {
                node.id = node_data.id;
                (node as any).customTitle = node_data.customTitle || node_data.label;
                
                setupNode(node); 

                await editor.addNode(node);
                await area.translate(node.id, { x: node_data.x, y: node_data.y });
            }
        }

        for (const connection_data of data.connections ?? []) {
            if (!isValidConnection(editor, connection_data) || !areSocketsFree(editor, connection_data)) {
                console.warn("Skipped connection that no longer fits the graph", connection_data);
                continue;
            }

            const source = editor.getNode(connection_data.source);
            const target = editor.getNode(connection_data.target);
            try {
                await editor.addConnection(new Connection(source, connection_data.sourceOutput, target, connection_data.targetInput));
            } catch(e) { console.warn("Could not restore connection", e); }
        }
    };

    // initialize default or saved state
    if (initialData && Array.isArray(initialData.nodes) && initialData.nodes.length > 0) {
        await importState(initialData);
    } else {
        const key_node = new KeyNode(socket);
        const salt_node = new SaltNode(socket);
        const func_node = new HashFunctionNode(socket);
        const val_node = new HashValueNode(socket);

        setupNode(key_node);
        setupNode(salt_node);
        setupNode(func_node);
        setupNode(val_node);

        await editor.addNode(key_node);
        await editor.addNode(salt_node); 
        await editor.addNode(func_node);
        await editor.addNode(val_node);

        await area.translate(func_node.id, { x: 520, y: 0 });
        await area.translate(val_node.id, { x: 780, y: 0 });
        await area.translate(salt_node.id, { x: 260, y: 0 });

        await editor.addConnection(new Connection(key_node, "key-output", salt_node, "salt-input"));
        await editor.addConnection(new Connection(salt_node, "salt-output", func_node, "in-0"));
        await editor.addConnection(new Connection(func_node, "out-0", val_node, "hash-value-input"));
    }

    process();

    const zoomToFit = async (sidebarOpen: boolean) => {
        const nodes = editor.getNodes();
        if (nodes.length > 0) {
            await AreaExtensions.zoomAt(area, nodes, { scale: 0.64 });
            
            const { k, x, y } = area.area.transform;
            if (sidebarOpen) {
                await area.area.translate(x + 85, y);
            } else {
                await area.area.translate(x, y);
            }
        }
        updateBackground();
    };

    try {
        await AreaExtensions.zoomAt(area, [], { scale: 1 });
    } catch (e) {
        console.warn("Passive zoom initialization failed.");
    }

    return {
        destroy: () => { 
            area.destroy(); 
            editor.clear();
            engine.reset();
        },
        zoomToNodes: zoomToFit,
        addNode: async (type: string, clientX: number, clientY: number) => {
            let node: Nodes | undefined;
            if (type === 'Key' || type === 'KeyNode') node = new KeyNode(socket);
            else if (type === 'HashFunction' || type === 'HashFunctionNode') node = new HashFunctionNode(socket);
            else if (type === 'HashValue' || type === 'HashValueNode') node = new HashValueNode(socket);
            else if (type === 'Salt' || type === 'SaltNode') {
                 node = new SaltNode(socket); 
            }
            
            if (node) {
                setupNode(node); 
                await editor.addNode(node);
                const { k, x, y } = area.area.transform;
                const translatedX = (clientX - x) / k;
                const translatedY = (clientY - y) / k;

                await area.translate(node.id, { x: translatedX, y: translatedY });
                process(); 
            }
        },
        importGraph: importState,
        process: process,
        getGraph: () => exportState(),
        
        // updates permissions and propagates them to nodes
        updatePermissions: async (newPerms: { canDelete: boolean, isAuthor: boolean, allowAdding: boolean }) => {
            currentCanDelete = newPerms.canDelete;
            currentIsAuthor = newPerms.isAuthor;
            
            editor.getNodes().forEach(node => {
                const view = area.nodeViews.get(node.id);
                if (view && view.element) {
                    const hashNodeEl = view.element.querySelector("hash-node") as any;
                    if (hashNodeEl) {
                        hashNodeEl.canDelete = currentCanDelete;
                        hashNodeEl.isAuthor = currentIsAuthor;
                        if (hashNodeEl.requestUpdate) hashNodeEl.requestUpdate();
                    }
                }
                
                (node as any)._delete = () => removeNodeWithConnections(node.id);
                (node as any)._canDelete = currentCanDelete;
                (node as any)._isAuthor = currentIsAuthor;
            });
            await zoomToFit(newPerms.allowAdding);
        },
    };
}

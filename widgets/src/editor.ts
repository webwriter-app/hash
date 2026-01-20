import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import { ConnectionPlugin, Presets as ConnectionPresets } from "rete-connection-plugin";
import { LitPlugin, Presets, LitArea2D } from "@retejs/lit-plugin";
import { DataflowEngine } from "rete-engine";
import { html } from "lit";
import { sha256, sha384, sha512 } from "@noble/hashes/sha2";
import { sha3_256 } from "@noble/hashes/sha3";
import { sha1 } from "@noble/hashes/legacy";
import { blake3 } from "@noble/hashes/blake3";
import { keccak_256 } from "@noble/hashes/sha3";
import { bytesToHex } from "@noble/hashes/utils";
import "@shoelace-style/shoelace/dist/themes/light.css";
import {
    ContextMenuExtra,
    ContextMenuPlugin,
    Presets as ContextMenuPresets
} from "rete-context-menu-plugin";

import "./nodes/node-connection";
import "./nodes/node-socket";
import "./nodes/hash-nodes";

const hash_algorithms: Record<string, any> = {
    sha1, sha256, sha384, sha512, sha3_256, keccak_256, blake3, 
};

/** * Base class to handle custom titles for all nodes
 */
export class BaseNode extends ClassicPreset.Node {
    public customTitle: string = ""; 
    constructor(label: string) {
        super(label);
        this.customTitle = label;
    }
}

export class KeyNode extends BaseNode {
    public value = "";
    constructor(socket: ClassicPreset.Socket) {
        super("Key");
        this.addOutput("key-output", new ClassicPreset.Output(socket));
    }
    data() { return { "key-output": this.value }; }
}

export class HashFunctionNode extends BaseNode {
    public selectedFunction = "sha256";
    public socket: ClassicPreset.Socket;

    constructor(socket: ClassicPreset.Socket) {
        super("HashFunction");
        this.socket = socket;
        this.addInput("in-0", new ClassicPreset.Input(socket));
        this.addOutput("out-0", new ClassicPreset.Output(socket));
    }

    setChannelCount(count: number) {
        const currentCount = Object.keys(this.inputs).length;
        if (count > currentCount) {
            for (let i = currentCount; i < count; i++) {
                this.addInput(`in-${i}`, new ClassicPreset.Input(this.socket));
                this.addOutput(`out-${i}`, new ClassicPreset.Output(this.socket));
            }
        }
        if (count < currentCount) {
            for (let i = currentCount - 1; i >= count; i--) {
                this.removeInput(`in-${i}`);
                this.removeOutput(`out-${i}`);
            }
        }
    }

    data(inputs: Record<string, any[]>) {
        const result: Record<string, string> = {};
        const algo = hash_algorithms[this.selectedFunction];
        Object.keys(this.outputs).forEach((outKey) => {
            const index = outKey.split("-")[1];
            const inKey = `in-${index}`;
            const inputValues = inputs[inKey] || [];
            const val = inputValues.length > 0 ? String(inputValues[0]) : "";
            if (!val || !algo) {
                result[outKey] = "";
            } else {
                try {
                    const data = new TextEncoder().encode(val);
                    const hash = algo(data);
                    result[outKey] = bytesToHex(hash);
                } catch (e) {
                    result[outKey] = "Error";
                }
            }
        });
        return result;
    }
}

export class HashValueNode extends BaseNode {
    public displayValue = "";
    constructor(socket: ClassicPreset.Socket) {
        super("HashValue");
        this.addInput("hash-value-input", new ClassicPreset.Input(socket));
    }
    data() { return {}; }
}

export type Nodes = KeyNode | HashFunctionNode | HashValueNode;

export class Connection extends ClassicPreset.Connection<Nodes, Nodes> {
    public color?: string; 
}

type Schemes = GetSchemes<Nodes, Connection>;
type AreaExtra = LitArea2D<Schemes> | ContextMenuExtra;

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
    const render = new LitPlugin<Schemes, AreaExtra>();
    const engine = new DataflowEngine<Schemes>();

    let currentCanDelete = canDelete;
    let currentIsAuthor = isAuthor;

    const dispatchChange = () => {
        const detail = exportState();
        container.dispatchEvent(new CustomEvent("rete-update", {
            detail,
            bubbles: true,
            composed: true
        }));
    };

    const contextMenu = new ContextMenuPlugin<Schemes>({
        items: (context, plugin) => {
            return ContextMenuPresets.classic.setup([
                ["KeyNode", () => new KeyNode(socket)],
                ["HashFunctionNode", () => new HashFunctionNode(socket)],
                ["HashValueNode", () => new HashValueNode(socket)],
            ])(context, plugin);
        }
    });
    
    area.use(contextMenu);
    render.addPreset(Presets.contextMenu.setup());

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
        translation: { left: 0, top: 0, right: 1000, bottom: 1000 }
    });

    const selector = AreaExtensions.selector();
    AreaExtensions.selectableNodes(area, selector, {
        accumulating: AreaExtensions.accumulateOnCtrl(),
    });

    const reconcileSockets = async (node: HashFunctionNode) => {
        const MAX_CHANNELS = 4;
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
            setTimeout(() => reconcileSockets(node), 10);
            return;
        }

        let targetCount = highestConnectedIndex + 2; 
        if (targetCount < 1) targetCount = 1;
        if (targetCount > MAX_CHANNELS) targetCount = MAX_CHANNELS;

        const currentCount = Object.keys(node.inputs).length;
        if (currentCount !== targetCount) {
            node.setChannelCount(targetCount);
            await area.update("node", node.id);
            process();
        }
    };

    render.addPreset(
        Presets.classic.setup({
            customize: {
                node(data) {
                    return ({ emit }) =>
                        html`<hash-node 
                            .data=${data.payload} 
                            .emit=${emit}
                            .process=${() => process()} 
                            .deleteNode=${() => removeNodeWithConnections(data.payload.id)}
                            .canDelete=${currentCanDelete} 
                            .isAuthor=${currentIsAuthor}
                        ></hash-node>`;
                },
                connection() {
                    return (data: any) =>
                        html`<node-connection .path=${data.path} .data=${data.payload}></node-connection>`;
                },
                socket(data) {
                    return () => html`<node-socket .data=${data}></node-socket>`;
                }
            }
        })
    );

    connection.addPreset(ConnectionPresets.classic.setup());

    editor.use(engine);
    editor.use(area);
    area.use(connection);
    area.use(render);

    const removeNodeWithConnections = async (nodeId: string) => {
        if (!currentCanDelete) return;
        
        const connections = editor.getConnections();
        const relatedConnections = connections.filter(c => c.source === nodeId || c.target === nodeId);
        for (const connection of relatedConnections) {
            await editor.removeConnection(connection.id);
        }
        await editor.removeNode(nodeId);
        process();
    };

    async function process() {
        engine.reset();
        const hashFuncs = editor.getNodes().filter(n => n instanceof HashFunctionNode);
    for (const node of hashFuncs) await engine.fetchInputs(node.id);
    
    const valNodes = editor.getNodes().filter(n => n instanceof HashValueNode);
    for (const node of valNodes) {
        const inputs = await engine.fetchInputs(node.id);
        const incomingVal = inputs["hash-value-input"]?.[0];
        (node as HashValueNode).displayValue = (incomingVal as string) || "";
    }

    for (const node of editor.getNodes()) {
        await area.update("node", node.id);
    }
        dispatchChange();
    }

    area.addPipe(context => {
        if (context.type === 'rendered' || context.type === 'translated' || context.type === 'zoomed') {
            updateBackground();
        }
        if (context.type === 'translated' || context.type === 'nodedragged') {
            dispatchChange(); 
        }
        return context;
    });
    
    editor.addPipe(context => {
        if (context.type === 'connectioncreated' || context.type === 'connectionremoved') {
            const nodes = editor.getNodes();
            for (const node of nodes) {
                if (node instanceof HashFunctionNode) {
                    setTimeout(() => reconcileSockets(node), 20);
                }
            }
            setTimeout(() => {
                process();
                dispatchChange();
            }, 30);
        }
        if (context.type === 'nodecreated' || context.type === 'noderemoved') {
            dispatchChange();
        }
        return context;
    });

    editor.addPipe(context => {
        if (context.type === 'connectioncreate') {
            const sourceNode = editor.getNode(context.data.source);
            const targetNode = editor.getNode(context.data.target);
            if (sourceNode instanceof KeyNode && !(targetNode instanceof HashFunctionNode)) return;
            if (sourceNode instanceof HashFunctionNode && !(targetNode instanceof HashValueNode)) return;
            if (sourceNode instanceof HashValueNode) return;
        }
        return context; 
    });

    const exportState = () => {
        return {
            nodes: editor.getNodes().map(n => {
                const view = area.nodeViews.get(n.id);
                const x = view ? view.position.x : 0;
                const y = view ? view.position.y : 0;
                
                return {
                    id: n.id,
                    label: n.label,
                    customTitle: (n as any).customTitle, 
                    x,
                    y,
                    value: (n as any).value,
                    selectedFunction: (n as any).selectedFunction,
                    inputsCount: Object.keys(n.inputs).length
                };
            }),
            connections: editor.getConnections().map(c => ({
                source: c.source, sourceOutput: c.sourceOutput,
                target: c.target, targetInput: c.targetInput
            }))
        };
    };

    const importState = async (data: any) => {
        if (!data || !data.nodes) return;
        for(const c of editor.getConnections()) await editor.removeConnection(c.id);
        for(const n of editor.getNodes()) await editor.removeNode(n.id);

        for (const nData of data.nodes) {
            let node: Nodes | undefined;
            if (nData.label === 'Key') {
                node = new KeyNode(socket);
                node.value = nData.value || "";
            } else if (nData.label === 'HashFunction') {
                node = new HashFunctionNode(socket);
                (node as HashFunctionNode).selectedFunction = nData.selectedFunction || "sha256";
                if (nData.inputsCount) (node as HashFunctionNode).setChannelCount(nData.inputsCount);
            } else if (nData.label === 'HashValue') {
                node = new HashValueNode(socket);
            }

            if (node) {
                node.id = nData.id;
                (node as any).customTitle = nData.customTitle || nData.label;
                await editor.addNode(node);
                await area.translate(node.id, { x: nData.x, y: nData.y });
            }
        }

        for (const cData of data.connections) {
            const source = editor.getNode(cData.source);
            const target = editor.getNode(cData.target);
            if (source && target) {
                try {
                    await editor.addConnection(new Connection(source, cData.sourceOutput, target, cData.targetInput));
                } catch(e) { console.warn("Could not restore connection", e); }
            }
        }
    };

    if (initialData && initialData.nodes && initialData.nodes.length > 0) {
        await importState(initialData);
    } else {
        const key_node = new KeyNode(socket);
        const func_node = new HashFunctionNode(socket);
        const val_node = new HashValueNode(socket);

        await editor.addNode(key_node);
        await editor.addNode(func_node);
        await editor.addNode(val_node);

        await area.translate(func_node.id, { x: 260, y: 0 });
        await area.translate(val_node.id, { x: 520, y: 0 });

        await editor.addConnection(new Connection(key_node, "key-output", func_node, "in-0"));
        await editor.addConnection(new Connection(func_node, "out-0", val_node, "hash-value-input"));
    }

    process();

    const zoomToFit = async (sidebarOpen: boolean = true) => {
        const nodes = editor.getNodes();
        if (nodes.length > 0) {
            await AreaExtensions.zoomAt(area, nodes, { scale: 0.65 });
            if (sidebarOpen) {
                const { k, x, y } = area.area.transform;
                await area.area.translate(x + 90, y); 
            }
        }
        updateBackground();
    };

    setTimeout(() => {
        if (editor.getNodes().length > 0) zoomToFit(true);
        else updateBackground(); 
    }, 100);

    return {
        destroy: () => area.destroy(),
        zoomToNodes: zoomToFit,
        addNode: async (type: string, clientX: number, clientY: number) => {
            let node: Nodes | undefined;
            if (type === 'Key' || type === 'KeyNode') node = new KeyNode(socket);
            else if (type === 'HashFunction' || type === 'HashFunctionNode') node = new HashFunctionNode(socket);
            else if (type === 'HashValue' || type === 'HashValueNode') node = new HashValueNode(socket);
            
            if (node) {
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
        
        updatePermissions: (newPerms: { canDelete: boolean, isAuthor: boolean }) => {
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
            });
        }
    };
}
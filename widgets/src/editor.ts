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
    sha1, 
    sha256, 
    sha384, 
    sha512, 
    sha3_256, 
    keccak_256, 
    blake3, 
};

export class KeyNode extends ClassicPreset.Node {
    public value = "";
    constructor(socket: ClassicPreset.Socket) {
        super("Key");
        this.addOutput("key-output", new ClassicPreset.Output(socket));
    }
    data() {
        return { "key-output": this.value };
    }
}

export class HashFunctionNode extends ClassicPreset.Node {
    public selectedFunction = "sha256";
    public concatenatedInput = "";

    constructor(socket: ClassicPreset.Socket) {
        super("HashFunction");
        this.addInput("hash-function-input", new ClassicPreset.Input(socket));
        this.addOutput("hash-function-output", new ClassicPreset.Output(socket));
    }

    data(inputs: Record<string, any[]>) {
        const inputKeys = inputs["hash-function-input"] || [];
        const validKeys = inputKeys.filter(k => typeof k === "string");

        if (validKeys.length === 0) {
            this.concatenatedInput = "";
            return { "hash-function-output": "" };
        }

        this.concatenatedInput = validKeys.join(""); 
        
        if (this.concatenatedInput === "") {
             return { "hash-function-output": "" };
        }

        const algo = hash_algorithms[this.selectedFunction];
        if (!algo) return { "hash-function-output": "Unknown Algo" };

        try {
            const data = new TextEncoder().encode(this.concatenatedInput);
            const hash = algo(data);
            return { "hash-function-output": bytesToHex(hash) };
        } catch (e) {
            return { "hash-function-output": "Error" };
        }
    }
}

export class HashValueNode extends ClassicPreset.Node {
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


export async function createEditor(container: HTMLElement) {
    const socket = new ClassicPreset.Socket("socket");
    const editor = new NodeEditor<Schemes>();
    const area = new AreaPlugin<Schemes, AreaExtra>(container);
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    const render = new LitPlugin<Schemes, AreaExtra>();
    const engine = new DataflowEngine<Schemes>();

    const contextMenu = new ContextMenuPlugin<Schemes>({
        items: ContextMenuPresets.classic.setup([
            ["KeyNode", () => new KeyNode(socket)],
            ["HashFunctionNode", () => new HashFunctionNode(socket)],
            ["HashValueNode", () => new HashValueNode(socket)],
        ])
    });

    AreaExtensions.restrictor(area, {
        scaling: { min: 0.1, max: 1 },
        translation: { left: 0, top: 0, right: 1000, bottom: 1000 }
    });

    const selector = AreaExtensions.selector();
    AreaExtensions.selectableNodes(area, selector, {
        accumulating: AreaExtensions.accumulateOnCtrl(),
    });

    area.use(contextMenu);
    render.addPreset(Presets.contextMenu.setup());

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
    }

    editor.addPipe(context => {
        if (context.type === 'connectioncreated' || context.type === 'connectionremoved') process();
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

    process();

    const key_node = new KeyNode(socket);
    const func_node = new HashFunctionNode(socket);
    const val_node = new HashValueNode(socket);

    await editor.addNode(key_node);
    await editor.addNode(func_node);
    await editor.addNode(val_node);

    await area.translate(func_node.id, { x: 270, y: 0 });
    await area.translate(val_node.id, { x: 540, y: 0 });

    await editor.addConnection(new Connection(key_node, "key-output", func_node, "hash-function-input"));

    setTimeout(() => AreaExtensions.zoomAt(area, editor.getNodes()), 100);

    return {
        destroy: () => area.destroy(),
        zoomToNodes: async () => {
            await AreaExtensions.zoomAt(area, editor.getNodes());
            
            const { k, x, y } = area.area.transform;
            await area.area.translate(x + 150, y);
            
        },        
        addNode: async (type: string, x: number, y: number) => {
            let node: Nodes | undefined;

            if (type === 'Key' || type === 'KeyNode') {
                node = new KeyNode(socket);
            } 
            else if (type === 'HashFunction' || type === 'HashFunctionNode') {
                node = new HashFunctionNode(socket);
            } 
            else if (type === 'HashValue' || type === 'HashValueNode') {
                node = new HashValueNode(socket);
            }

            if (node) {
                await editor.addNode(node);
                await area.translate(node.id, { x, y });
                process(); 
            } else {
                console.warn(`Attempted to add unknown node type: ${type}`);
            }
        },
        
        process: process
    };
}

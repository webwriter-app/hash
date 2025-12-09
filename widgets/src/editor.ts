import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import { ConnectionPlugin, Presets as ConnectionPresets } from "rete-connection-plugin";
import { LitPlugin, Presets, LitArea2D } from "@retejs/lit-plugin";
import { DockPlugin, DockPresets } from "rete-dock-plugin";
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
    sha384, // not working 
    sha512, 
    sha3_256, 
    keccak_256, //not working 
    blake3, //not working 
};

type Nodes = KeyNode | HashFunctionNode | HashValueNode;

type Schemes = GetSchemes<
    Nodes,
    ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;

type AreaExtra = LitArea2D<Schemes> | ContextMenuExtra;

class Connection<N extends Nodes> extends ClassicPreset.Connection<N, N> {}

class KeyNode extends ClassicPreset.Node {
    public value = "";
    constructor(socket: ClassicPreset.Socket) {
        super("Key");
        this.addOutput("key-output", new ClassicPreset.Output(socket));
    }
    data() {
        return {
            "key-output": this.value
        };
    }
}

class HashFunctionNode extends ClassicPreset.Node {
    public selectedFunction = "sha256";

    constructor(socket: ClassicPreset.Socket) {
        super("HashFunction");
        this.addInput("hash-function-input", new ClassicPreset.Input(socket));
        this.addOutput("hash-function-output", new ClassicPreset.Output(socket));
    }
    data(inputs: Record<string, any[]>) {
        const inputKey = inputs["hash-function-input"]?.[0];

        if (typeof inputKey !== "string" || inputKey.length === 0) {
            return { "hash-function-output": "" };
        }

        const algo = hash_algorithms[this.selectedFunction];
        
        if (!algo) {
            return { "hash-function-output": "Unknown Algo" };
        }

        try {
            const data = new TextEncoder().encode(inputKey);
            
            const hash = algo(data);
            
            const hex = bytesToHex(hash);
            
            return { "hash-function-output": hex };
        } catch (e) {
            console.error("Hashing error:", e);
            return { "hash-function-output": "Error" };
        }
    }
}

class HashValueNode extends ClassicPreset.Node {
    public displayValue = "";

    constructor(socket: ClassicPreset.Socket) {
        super("HashValue");
        this.addInput("hash-value-input", new ClassicPreset.Input(socket));
    }
    data() {
        return {};
    }
}

export async function createEditor(container: HTMLElement) {

    const socket = new ClassicPreset.Socket("socket");

    const editor = new NodeEditor<Schemes>();
    const area = new AreaPlugin<Schemes, AreaExtra>(container);
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    const render = new LitPlugin<Schemes, AreaExtra>();
    const dock = new DockPlugin<Schemes>();
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
        translation: {
            left: 0,
            top: 0,
            right: 500,
            bottom: 500
        }
    });

    dock.addPreset(DockPresets.classic.setup({ area, size: 150, scale: 0.55 }));

    area.use(contextMenu);

    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: AreaExtensions.accumulateOnCtrl(),
    });

    render.addPreset(Presets.contextMenu.setup()); // <--- This was missing!

    render.addPreset(
        Presets.classic.setup({
            customize: {
                node(data) {
                    if (data.payload instanceof KeyNode || 
                        data.payload instanceof HashFunctionNode || 
                        data.payload instanceof HashValueNode) {
                        
                        return ({ emit }) =>
                            html`<hash-node 
                            .data=${data.payload} 
                            .emit=${emit}
                            .deleteNode=${() => removeNodeWithConnections(data.payload.id)} 
                        ></hash-node>`;
                    }
                    return null;
                },
                connection() {
                    return ({ path }) =>
                        html`<node-connection .path=${path}></node-connection>`;
                },
                socket(data) {
                    return () =>
                        html`<node-socket .data=${data}></node-socket>`;
                }
            }
        })
    );

    connection.addPreset(ConnectionPresets.classic.setup());

    editor.use(engine);
    editor.use(area);
    area.use(connection);
    area.use(render);
    area.use(dock);

    dock.add(() => new KeyNode(socket));
    dock.add(() => new HashFunctionNode(socket));
    dock.add(() => new HashValueNode(socket));

    AreaExtensions.simpleNodesOrder(area);

    const key_node = new KeyNode(socket);
    await editor.addNode(key_node);

    const hash_function_node = new HashFunctionNode(socket);
    await editor.addNode(hash_function_node);

    const temp_hash_value_node = new HashValueNode(socket);
    await editor.addNode(temp_hash_value_node);

    await area.translate(hash_function_node.id, { x: 270, y: 0 });
    await area.translate(temp_hash_value_node.id, { x: 540, y: 0 })

    await editor.addConnection(
        new ClassicPreset.Connection(key_node, "key-output", hash_function_node, "hash-function-input") as any
    );

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

        for (const node of editor.getNodes()) {
            if (node instanceof HashValueNode) {
                const inputs = await engine.fetchInputs(node.id);
                const incomingVal = inputs["hash-value-input"]?.[0];

                console.log("Hash Value Received:", incomingVal);

                node.displayValue = (incomingVal as string) || "";
                await area.update("node", node.id);
            }
        }
    }

    editor.addPipe(context => {
        if (context.type === 'connectioncreated' || context.type === 'connectionremoved') {
            process();
        }
        return context;
    });

    editor.addPipe(context => {
        if (context.type === 'connectioncreate') {
            const sourceNode = editor.getNode(context.data.source);
            const targetNode = editor.getNode(context.data.target);

            if (sourceNode instanceof KeyNode) {
                if (!(targetNode instanceof HashFunctionNode)) {
                    console.warn("Key nodes can only be connected to hash function nodes");
                    return; 
                }
            }

            if (sourceNode instanceof HashFunctionNode) {
                if (!(targetNode instanceof HashValueNode)) {
                    console.warn("Hash function nodes can only be connected to hash value nodes");
                    return; 
                }
            }

            if (sourceNode instanceof HashValueNode) {
                 console.warn("Hash value nodes cannot have outputs");
                 return;
            }
        }
        return context; 
    });

    process();

    try {
        await AreaExtensions.zoomAt(area, editor.getNodes());
    } finally {
        await editor.removeNode(temp_hash_value_node.id);
    }

    return {
        destroy: () => area.destroy(),
        zoomToNodes: () => AreaExtensions.zoomAt(area, editor.getNodes())
    };

   
}
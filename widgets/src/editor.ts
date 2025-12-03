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

import "./nodes/node-connection";
import "./nodes/node-socket";
import "./nodes/hash-nodes";

const HASH_ALGOS: Record<string, any> = {
    sha1, sha256, sha384, sha512, sha3_256, keccak_256, blake3
};

type Nodes = KeyNode | HashFunctionNode | HashValueNode;

type Schemes = GetSchemes<
    Nodes,
    ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;


/*type Schemes = GetSchemes<
    ClassicPreset.Node,
    ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;*/

type AreaExtra = LitArea2D<Schemes>;

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

        if (!inputKey || typeof inputKey !== "string") {
            return { "hash-function-output": "" };
        }

        const algo = HASH_ALGOS[this.selectedFunction];
        if (!algo) return { "hash-function-output": "Unknown Algo" };

        try {
            const hash = algo(inputKey);
            const hex = bytesToHex(hash);
            return { "hash-function-output": hex };
        } catch (e) {
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


    dock.addPreset(DockPresets.classic.setup({ area, size: 150, scale: 0.55 }));

    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: AreaExtensions.accumulateOnCtrl(),
    });
    render.addPreset(
        Presets.classic.setup({
            customize: {
                node(data) {
                    if (data.payload instanceof ClassicPreset.Node) {
                        return ({ emit }) =>
                            html`<hash-node 
                            .data=${data.payload} 
                            .emit=${emit}
                            .seed=${Date.now()}
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

    /*const key_node = new ClassicPreset.Node("Key");
    key_node.addOutput("a", new ClassicPreset.Output(socket));
    await editor.addNode(key_node);

    const hash_function_node = new ClassicPreset.Node("HashFunction");
    hash_function_node.addInput("a", new ClassicPreset.Input(socket));
    hash_function_node.addOutput("a", new ClassicPreset.Output(socket));
    await editor.addNode(hash_function_node);

    const temp_hash_value_node = new ClassicPreset.Node("HashValue");
    temp_hash_value_node.addInput("a", new ClassicPreset.Input(socket));
    await editor.addNode(temp_hash_value_node);

    await area.translate(hash_function_node.id, { x: 270, y: 0 });
    await area.translate(temp_hash_value_node.id, { x: 540, y: 0 });*/

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

   /*await editor.addConnection(
        new ClassicPreset.Connection(hash_function_node, "hash-function-output", temp_hash_value_node, "hash-value-input") as any
    );*/

    async function process() {
        engine.reset();

        for (const node of editor.getNodes()) {
            if (node instanceof HashValueNode) {
                const inputs = await engine.fetchInputs(node.id);
                const incomingVal = inputs["hash-value-input"]?.[0];

                console.log("Hash Value Received:", incomingVal); // Check console

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

    process();

    try {
       await AreaExtensions.zoomAt(area, editor.getNodes());
    } finally {
        await editor.removeNode(temp_hash_value_node.id);
    }

    return {
        destroy: () => area.destroy()
    };
}

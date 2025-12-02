import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
    ConnectionPlugin,
    Presets as ConnectionPresets,
} from "rete-connection-plugin";
import { LitPlugin, Presets, LitArea2D } from "@retejs/lit-plugin";
import { DockPlugin, DockPresets } from "rete-dock-plugin";

import { html } from "lit";
import "@shoelace-style/shoelace/dist/themes/light.css";

import "./nodes/node-connection";
import "./nodes/node-socket";
import "./nodes/hash-nodes";

type Nodes = KeyNode | HashFunctionNode | HashValueNode;

type Schemes = GetSchemes<
    ClassicPreset.Node,
    ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = LitArea2D<Schemes>;

class Connection<N extends Nodes> extends ClassicPreset.Connection<N, N> {}

class KeyNode extends ClassicPreset.Node {
    constructor(socket: ClassicPreset.Socket) {
        super("Key");
        this.addOutput("key-output", new ClassicPreset.Output(socket));
    }
}

class HashFunctionNode extends ClassicPreset.Node {
    constructor(socket: ClassicPreset.Socket) {
        super("HashFunction");
        this.addInput("hash-function-input", new ClassicPreset.Input(socket));
        this.addOutput("hash-function-output", new ClassicPreset.Output(socket));
    }
}

class HashValueNode extends ClassicPreset.Node {
    constructor(socket: ClassicPreset.Socket) {
        super("HashValue");
        this.addInput("hash-value-input", new ClassicPreset.Input(socket));
    }
}

export async function createEditor(container: HTMLElement) {

    const socket = new ClassicPreset.Socket("socket");

    const editor = new NodeEditor<Schemes>();
    const area = new AreaPlugin<Schemes, AreaExtra>(container);
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    const render = new LitPlugin<Schemes, AreaExtra>();
    const dock = new DockPlugin<Schemes>();

    dock.addPreset(DockPresets.classic.setup({ area, size: 100, scale: 0.6 }));

    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: AreaExtensions.accumulateOnCtrl(),
    });
    render.addPreset(
        Presets.classic.setup({
            customize: {
                node(data) {
                    if (data.payload instanceof ClassicPreset.Node) {
                        return ({ emit }) =>
                            html`<hash-node .data=${data.payload} .emit=${emit}></hash-node>`;
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

    editor.use(area);
    area.use(connection);
    area.use(render);
    area.use(dock);

    dock.add(() => new KeyNode(socket));
    dock.add(() => new HashFunctionNode(socket));
    dock.add(() => new HashValueNode(socket));

    AreaExtensions.simpleNodesOrder(area);

    const key_node = new ClassicPreset.Node("Key");
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
    await area.translate(temp_hash_value_node.id, { x: 540, y: 0 });

    //await editor.addConnection(new ClassicPreset.Connection(key_node, "a", hash_function_node, "a"));
    //await editor.addConnection(new ClassicPreset.Connection(hash_function_node, "a", hash_value_node, "a"));
    
    try {
        await AreaExtensions.zoomAt(area, editor.getNodes());
    } finally {
        await editor.removeNode(temp_hash_value_node.id);
    }

    return {
        destroy: () => area.destroy()
    };
}
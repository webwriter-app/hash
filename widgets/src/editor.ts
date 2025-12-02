import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
    ConnectionPlugin,
    Presets as ConnectionPresets,
} from "rete-connection-plugin";
import { LitPlugin, Presets, LitArea2D } from "@retejs/lit-plugin";
import { html } from "lit";
import "@shoelace-style/shoelace/dist/themes/light.css";
import "./nodes/key-node";
import "./nodes/hash-function-node";
import "./nodes/hash-value-node";
import "./nodes/node-connection";
import "./nodes/node-socket";
import "./nodes/hash-nodes";

type Schemes = GetSchemes<
    ClassicPreset.Node,
    ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = LitArea2D<Schemes>;

export async function createEditor(container: HTMLElement) {

    const socket = new ClassicPreset.Socket("socket");

    const editor = new NodeEditor<Schemes>();
    const area = new AreaPlugin<Schemes, AreaExtra>(container);
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    const render = new LitPlugin<Schemes, AreaExtra>();

    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: AreaExtensions.accumulateOnCtrl(),
    });
    render.addPreset(
        Presets.classic.setup({
            customize: {
                node(data) {
                    return ({ emit }) =>
                        html`<hash-node .data=${data.payload} .emit=${emit}></rete-custom>`;
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

    AreaExtensions.simpleNodesOrder(area);

    const key_node = new ClassicPreset.Node("Key");
    key_node.addOutput("a", new ClassicPreset.Output(socket));
    await editor.addNode(key_node);

    const hash_function_node = new ClassicPreset.Node("HashFunction");
    hash_function_node.addInput("a", new ClassicPreset.Input(socket));
    hash_function_node.addOutput("a", new ClassicPreset.Output(socket));
    await editor.addNode(hash_function_node);

    const hash_value_node = new ClassicPreset.Node("HashValue");
    hash_value_node.addInput("a", new ClassicPreset.Input(socket));
    await editor.addNode(hash_value_node);

    await area.translate(hash_function_node.id, { x: 270, y: 0 });
    await area.translate(hash_value_node.id, { x: 540, y: 0 });

    await editor.addConnection(new ClassicPreset.Connection(key_node, "a", hash_function_node, "a"));
    await editor.addConnection(new ClassicPreset.Connection(hash_function_node, "a", hash_value_node, "a"));

    await AreaExtensions.zoomAt(area, editor.getNodes());

    return {
        destroy: () => area.destroy()
    };
}
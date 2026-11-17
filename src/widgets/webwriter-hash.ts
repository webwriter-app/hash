import { html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { LitElementWw } from "@webwriter/lit";
import { Permissions } from "@webwriter/lit/permissions";
import { jsonData } from "@webwriter/lit/data";
import { Drag, type DragCommitDetail } from "@webwriter/lit/drag";
import { SceneController } from "@webwriter/lit/scene";
import { Shortcuts } from "@webwriter/lit/shortcuts";
import { Viewport } from "@webwriter/lit/viewport";
import { localizer } from "@webwriter/lit/localize";
import { sceneElements, webglAvailable, type ConnectDetail, type DisconnectDetail, type MoveDetail, type ReconnectDetail, type SelectDetail } from "@webwriter/widget/scene";
import { PixiScene } from "@webwriter/widget/scene/pixi";
import { transaction } from "@webwriter/widget/transaction";
import type { MsgFn } from "@lit/localize";
import "@shoelace-style/shoelace/dist/themes/light.css";

import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import SlDrawer from "@shoelace-style/shoelace/dist/components/drawer/drawer.component.js";
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.component.js";
import SlSelect from "@shoelace-style/shoelace/dist/components/select/select.component.js";
import SlOption from "@shoelace-style/shoelace/dist/components/option/option.component.js";
import SlTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.component.js";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.component.js";
import IconFocus2 from "@tabler/icons/outline/focus-2.svg";
import IconLayoutSidebar from "@tabler/icons/outline/layout-sidebar.svg";
import IconTrash from "@tabler/icons/outline/trash.svg";

import { EditorDock } from "../components/editor/editor-dock";
import { KeyNodeUI } from "../components/nodes/key-node";
import { SaltNodeUI } from "../components/nodes/salt-node";
import { HashFunctionNodeUI } from "../components/nodes/hash-function-node";
import { HashValueNodeUI } from "../components/nodes/hash-value-node";
import { displayNodeTitle, nodeTitle } from "../components/nodes/node-titles";
import { styles } from "../components/webwriter-hash.styles";
import { acceptedKinds, connect, connectionKey, createNode, defaultGraph, disconnect, evaluate, flowSignature, linkKind, normalize, NODE_LABELS, ports, reconnect, removeNodes, updateNode, type Flow, type Graph, type GraphNode, type NodeLabel } from "../model/hashing/graph";
import { sourceLocale, targetLocales } from "../../localization/generated/locale-codes.js";

/** The room kept free around the nodes when the view is fitted. */
const FIT_PADDING = 60;
/** The width of the open drawer, which covers the left of the window. */
const DRAWER_WIDTH = 170;
/** Where a dropped node is placed before its size is known: the widths of the node kinds. */
const NODE_WIDTH: Record<NodeLabel, number> = { Key: 200, Salt: 200, HashFunction: 200, HashValue: 220 };
const NODE_CLASS: Record<NodeLabel, string> = { Key: "key", Salt: "salt", HashFunction: "hash-function", HashValue: "hash-value" };

/** The connection that a wire between two ports stands for. */
const wireOf = (from: string, to: string) => {
    const [source, sourceOutput] = from.split(":");
    const [target, targetInput] = to.split(":");
    return { source, sourceOutput, target, targetInput };
};

/**
 * Node-and-edge editor for hashing workflows: connect key, salt and hash-function nodes to a hash value node.
 * The graph (nodes, their positions and settings, and the connections) is stored in the widget's JSON data block
 * and drawn on a Scene.
 */
@customElement("webwriter-hash")
export class WebwriterHash extends LitElementWw {
    static styles = [styles];

    static scopedElements = {
        ...sceneElements,
        "ww-scene": webglAvailable() ? PixiScene : sceneElements["ww-scene"],
        "sl-icon": SlIcon,
        "sl-drawer": SlDrawer,
        "sl-tooltip": SlTooltip,
        "sl-select": SlSelect,
        "sl-option": SlOption,
        "sl-textarea": SlTextarea,
        "sl-input": SlInput,
        "editor-dock": EditorDock,
        "key-node": KeyNodeUI,
        "salt-node": SaltNodeUI,
        "hash-function-node": HashFunctionNodeUI,
        "hash-value-node": HashValueNodeUI,
    };

    static permissions = {
        allowAdding: { label: (widget: { msg: MsgFn }) => widget.msg("Adding Nodes") },
        allowDeleting: { label: (widget: { msg: MsgFn }) => widget.msg("Deleting Nodes") },
    };

    static actions = {
        deleteSelection: {
            label: (widget: { msg: MsgFn }) => widget.msg("Delete selection", { desc: "Action that removes the selected nodes and connections" }),
            shortcut: "Delete",
            can: "allowDeleting",
        },
    };

    #permissions = new Permissions(this);
    // Fitting leaves the part of the window under the open drawer free, and only an explicit fit moves the view:
    // nodes added later do not.
    #viewport = new Viewport(this, {
        bounds: () => this.#scene.extent(),
        margin: 3000,
        wheel: "zoom",
        fit: () => ({ padding: FIT_PADDING, maxScale: 1, inset: { left: this.#drawer?.open ? DRAWER_WIDTH : 0 }, follow: "none" }),
    });
    // Dock entries are dragged onto the canvas; the commit creates the node.
    #drag = new Drag(this, {
        viewport: this.#viewport.core,
        can: () => this.#permissions.can("allowAdding"),
        lift: { opacity: 0.9, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" },
    });
    #scene: SceneController = new SceneController(this, { viewport: this.#viewport.core });
    #shortcuts = new Shortcuts(this);
    #data = jsonData<{ editorState?: Partial<Graph> }>(this, {
        defaults: {},
        validate: ({ editorState }) => editorState === undefined || (typeof editorState === "object" && editorState !== null),
    });

    protected localize = localizer(this, {
        sourceLocale,
        targetLocales,
        load: (locale) => import(`../../localization/generated/${locale}.ts`),
        drawer: true,
    });
    readonly msg = this.localize.msg;

    /**
     * If true, enables the side drawer and allow drag-and-drop new nodes (Key, Salt, HashFunction, HashValue) to editor.
     */
    @property({ type: Boolean, attribute: true, reflect: true }) accessor allowAdding = false;
    /**
     * If true, allows user to delete selected nodes from the graph.
     */
    @property({ type: Boolean, attribute: true, reflect: true }) accessor allowDeleting = false;

    @state() accessor selection: ReadonlySet<string> = new Set();
    @state() accessor editingTitle: string | null = null;

    #state?: unknown;
    #graph: Graph = { nodes: [], connections: [] };
    #fallback?: Graph;
    #lastPermissions = "";
    // Moving or selecting nodes renders again without changing what the hashes depend on.
    #flow?: { signature: string; flow: Flow };

    /** The graph from the data block, in the shape the editor works with. Without nodes the default pipeline shows. */
    get graph(): Graph {
        const stored = this.#data.get().editorState;
        if (stored !== this.#state) {
            this.#state = stored;
            this.#graph = normalize(stored);
        }
        return this.#graph.nodes.length ? this.#graph : (this.#fallback ??= defaultGraph());
    }

    connectedCallback() {
        const rawLegacyState = this.getAttribute("editorstate");
        let legacyEditorState: Partial<Graph> | undefined;
        if (rawLegacyState !== null) {
            try { legacyEditorState = JSON.parse(rawLegacyState); }
            catch { legacyEditorState = undefined; }
        }
        super.connectedCallback();
        if (this.#data.get().editorState) this.removeAttribute("editorstate");
        else if (legacyEditorState?.nodes) {
            this.#data.set({ editorState: legacyEditorState });
            this.removeAttribute("editorstate");
        }
        const isEmpty = !this.#data.get().editorState?.nodes?.length;

        if (this.#permissions.editing && isEmpty) {
            if (!this.hasAttribute("allowadding")) this.allowAdding = true;
            if (!this.hasAttribute("allowdeleting")) this.allowDeleting = true;
        }
    }

    async firstUpdated() {
        await this.#scene.ready;
        if (!this.isConnected) return;
        if (!this.#graph.nodes.length) this.#data.set({ editorState: this.graph });
        this.zoomToNodes();
    }

    protected updated(changed: PropertyValues<this>) {
        // The permissions follow the authored attributes and the mode; the view is fitted again when they change.
        const permissions = `${this.#permissions.can("allowAdding")}${this.#permissions.can("allowDeleting")}`;
        if (permissions !== this.#lastPermissions) {
            if (this.#lastPermissions) this.zoomToNodes();
            this.#lastPermissions = permissions;
        }
        if (changed.has("editingTitle") && this.editingTitle) {
            const input = this.renderRoot.querySelector<HTMLInputElement>(".title-input");
            input?.focus();
            input?.select();
        }
    }

    /** Fits the view to the nodes, beside the drawer if it is open. */
    zoomToNodes() {
        if (!this.graph.nodes.length) return;
        void this.#viewport.fit();
    }

    get #drawer() {
        return this.renderRoot.querySelector<SlDrawer>("#drawer");
    }

    /** Widget action: removes the selected nodes with their connections, and the selected connections. */
    deleteSelection() {
        if (!this.#permissions.can("allowDeleting") || this.selection.size === 0) return;
        const gone = this.selection;
        this.#change(() => {
            let graph = this.graph;
            for (const connection of graph.connections) if (gone.has(connectionKey(connection))) graph = disconnect(graph, connection);
            this.#commit(removeNodes(graph, gone));
            this.selection = new Set();
        });
    }

    #commit(graph: Graph) {
        this.#data.set({ editorState: graph });
    }

    /** Changes the graph as one undo step. The step lasts until the render, which writes the block. */
    #change(change: () => void) {
        transaction(this, async () => {
            change();
            await this.updateComplete;
        });
    }

    #patch(id: string, change: Partial<GraphNode>) {
        this.#commit(normalize(updateNode(this.graph, id, change)));
    }

    #deleteNode(id: string) {
        if (!this.#permissions.can("allowDeleting")) return;
        this.#change(() => {
            this.#commit(removeNodes(this.graph, new Set([id])));
            this.selection = new Set([...this.selection].filter((key) => key !== id));
        });
    }

    #select(event: CustomEvent<SelectDetail>) {
        if (!event.defaultPrevented) this.selection = new Set(event.detail.keys);
    }

    #move(event: CustomEvent<MoveDetail>) {
        const moved = new Map(event.detail.items.map((item) => [item.key, item]));
        this.#commit({ ...this.graph, nodes: this.graph.nodes.map((node) => (moved.has(node.id) ? { ...node, x: moved.get(node.id)!.x, y: moved.get(node.id)!.y } : node)) });
    }

    #reconnect(event: CustomEvent<ReconnectDetail>) {
        const { previous, from, to } = event.detail;
        const graph = reconnect(this.graph, wireOf(previous.from, previous.to), wireOf(from, to));
        if (graph === this.graph) return void event.preventDefault();
        this.#commit(graph);
    }

    #disconnect(event: CustomEvent<DisconnectDetail>) {
        this.#commit(disconnect(this.graph, wireOf(event.detail.from, event.detail.to)));
    }

    #connect(event: CustomEvent<ConnectDetail>) {
        const graph = connect(this.graph, wireOf(event.detail.from, event.detail.to));
        if (graph === this.graph) return void event.preventDefault();
        this.#commit(graph);
    }

    // The node is centred where the dock entry was dropped. Drag reports its top-left corner as a world point.
    #drop(event: CustomEvent<DragCommitDetail>) {
        const { item, key, x, y } = event.detail;
        if (!key || x === null || y === null || !NODE_LABELS.includes(key as NodeLabel)) return;
        const label = key as NodeLabel;
        const { scale } = this.#viewport;
        const point = { x: x + item.offsetWidth / 2 / scale, y: y + item.offsetHeight / 2 / scale };
        const node = createNode(label, point.x - NODE_WIDTH[label] / 2, point.y - 100);
        transaction(this, async () => {
            this.#commit(normalize({ ...this.graph, nodes: [...this.graph.nodes, node] }));
            await this.updateComplete;
            // Its size is known once it is drawn, and the node is centred on the drop point.
            const element = this.renderRoot.querySelector<HTMLElement>(`ww-node[data-ww-key="${node.id}"]`);
            if (!element) return;
            this.#patch(node.id, { x: point.x - element.offsetWidth / 2, y: point.y - element.offsetHeight / 2 });
            await this.updateComplete;
        });
    }

    #toggleDock() {
        if (!this.#permissions.can("allowAdding")) return;
        const drawer = this.#drawer;
        if (!drawer) return;
        if (drawer.open) drawer.hide();
        else drawer.show();
        this.zoomToNodes();
    }

    #editTitle(id: string) {
        if (this.#permissions.editing) this.editingTitle = id;
    }

    #setTitle(id: string, value: string) {
        if (this.editingTitle !== id) return;
        this.editingTitle = null;
        this.#change(() => this.#patch(id, { customTitle: value }));
    }

    #titleKey(event: KeyboardEvent, id: string) {
        if (event.key === "Enter") this.#setTitle(id, (event.target as HTMLInputElement).value);
        else if (event.key === "Escape") this.editingTitle = null;
    }

    #regenerateSalt(id: string) {
        this.#change(() => this.#patch(id, { saltValue: Math.random().toString(36).substring(2, 9) }));
    }

    #content(node: GraphNode, flow: Flow) {
        switch (node.label) {
            case "Key":
                return html`<key-node .value=${node.value || ""} @val-change=${(event: CustomEvent) => this.#patch(node.id, { value: event.detail.value })}></key-node>`;
            case "HashFunction":
                return html`<hash-function-node .value=${node.selectedFunction || "sha256"} @val-change=${(event: CustomEvent) => this.#patch(node.id, { selectedFunction: event.detail.value })}></hash-function-node>`;
            case "HashValue":
                return html`<hash-value-node .value=${flow.get(node.id)?.display || ""}></hash-value-node>`;
            case "Salt":
                return html`<salt-node .salt=${node.saltValue || ""} .incoming=${flow.get(node.id)?.incoming || ""} @refresh=${() => this.#regenerateSalt(node.id)}></salt-node>`;
        }
    }

    #socket(node: GraphNode, key: string, side: "input" | "output") {
        return html`<div class="socket-row" title=${key}>
            ${side === "input"
                ? html`<span class="socket" data-ww-port=${key} data-ww-accept=${acceptedKinds(node)} data-ww-capacity="1" data-ww-side="left"></span>`
                : html`<span class="socket" data-ww-port=${key} data-ww-link=${linkKind(node)} data-ww-capacity="1" data-ww-side="right"></span>`}
        </div>`;
    }

    #node(node: GraphNode, flow: Flow) {
        const { inputs, outputs } = ports(node);
        const title = displayNodeTitle(node.label, node.customTitle, this.msg);
        return html`
            <ww-node class="node ${NODE_CLASS[node.label]}" data-ww-key=${node.id} x=${node.x} y=${node.y} selectable movable ?selected=${this.selection.has(node.id)}>
                <div class="title" @click=${() => this.#editTitle(node.id)}>
                    ${this.editingTitle === node.id
                        ? html`<input class="title-input" .value=${title} @blur=${(event: Event) => this.#setTitle(node.id, (event.target as HTMLInputElement).value)} @keydown=${(event: KeyboardEvent) => this.#titleKey(event, node.id)} @pointerdown=${(event: Event) => event.stopPropagation()} />`
                        : html`<span>${title}</span>`}
                </div>
                ${this.#permissions.can("allowDeleting")
                    ? html`<sl-tooltip content=${this.msg("Delete node")} placement="top-start">
                        <sl-icon class="delete-button icon-btn" src=${IconTrash} @pointerdown=${(event: Event) => event.stopPropagation()} @click=${() => this.#deleteNode(node.id)}></sl-icon>
                    </sl-tooltip>`
                    : nothing}
                ${this.#content(node, flow)}
                <div class="socket-container">
                    <div class="inputs">${inputs.map((key) => this.#socket(node, key, "input"))}</div>
                    <div class="outputs">${outputs.map((key) => this.#socket(node, key, "output"))}</div>
                </div>
            </ww-node>`;
    }

    render() {
        const graph = this.graph;
        const signature = flowSignature(graph);
        if (this.#flow?.signature !== signature) this.#flow = { signature, flow: evaluate(graph) };
        const flow = this.#flow.flow;
        const deletable = this.#permissions.can("allowDeleting");
        return html`
            <div class="widget-container">
                <div class="pill pill-center"><span class="instruction">${this.msg("Hash Editor")}</span></div>
                <div class="pill pill-right">
                    <sl-tooltip content=${this.msg("Toggle node menu")} data-ww-can="allowAdding">
                        <sl-icon src=${IconLayoutSidebar} @click=${() => this.#toggleDock()}></sl-icon>
                    </sl-tooltip>
                    <sl-tooltip content=${this.msg("Focus on nodes")}>
                        <sl-icon src=${IconFocus2} @click=${() => this.zoomToNodes()}></sl-icon>
                    </sl-tooltip>
                </div>

                <sl-drawer label=${this.msg("Tools", { desc: "Title of the drawer listing the draggable nodes" })} id="drawer" placement="start" class="drawer-dock" contained no-header ?open=${this.#permissions.can("allowAdding")}>
                    <editor-dock>
                        <sl-tooltip content=${this.msg("Required node for Hashing")} placement="right-end" hoist>
                            <div class="dock-item key" data-ww-drag="node" data-ww-drag-via="pointer keyboard" data-ww-drag-effect="copy" data-ww-key="Key">${nodeTitle("Key", this.msg)}</div>
                        </sl-tooltip>
                        <sl-tooltip content=${this.msg("Optional node for Salting")} placement="right-end" hoist>
                            <div class="dock-item salt" data-ww-drag="node" data-ww-drag-via="pointer keyboard" data-ww-drag-effect="copy" data-ww-key="Salt">${nodeTitle("Salt", this.msg)}</div>
                        </sl-tooltip>
                        <sl-tooltip content=${this.msg("Required node for Hashing")} placement="right-end" hoist>
                            <div class="dock-item hash-function" data-ww-drag="node" data-ww-drag-via="pointer keyboard" data-ww-drag-effect="copy" data-ww-key="HashFunction">${nodeTitle("HashFunction", this.msg)}</div>
                        </sl-tooltip>
                        <sl-tooltip content=${this.msg("Required node for Hashing")} placement="right-end" hoist>
                            <div class="dock-item hash-value" data-ww-drag="node" data-ww-drag-via="pointer keyboard" data-ww-drag-effect="copy" data-ww-key="HashValue">${nodeTitle("HashValue", this.msg)}</div>
                        </sl-tooltip>
                    </editor-dock>
                </sl-drawer>

                <div class="stage" tabindex="0" data-ww-drop="node" data-ww-drop-position="point" data-ww-drop-space="world" @ww-dragcommit=${this.#drop}>
                    <ww-scene select="multiple" data-ww-viewport="canvas" data-ww-viewport-zoom="0.1 1" background="dots" background-spacing="30" aria-label=${this.msg("Hash Editor")}
                        @ww-select=${this.#select} @ww-move=${this.#move} @ww-connect=${this.#connect} @ww-reconnect=${this.#reconnect} @ww-disconnect=${this.#disconnect}>
                        ${graph.connections.map((connection) => html`
                            <ww-path data-ww-key=${connectionKey(connection)} from="${connection.source}:${connection.sourceOutput}" to="${connection.target}:${connection.targetInput}" route="curve" rewire="from to"
                                ?selectable=${deletable} ?selected=${this.selection.has(connectionKey(connection))}></ww-path>`)}
                        ${graph.nodes.map((node) => this.#node(node, flow))}
                    </ww-scene>
                </div>
            </div>
        `;
    }
}

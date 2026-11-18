import { html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { LitElementWw, computed, signal } from "@webwriter/lit";
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
import { renderPrintPicture, type PrintNode, type PrintWire } from "../components/editor/print-picture";
import { styles } from "../components/webwriter-hash.styles";
import { acceptedKinds, connect, connectionKey, createNode, defaultGraph, disconnect, evaluate, flowSignature, linkKind, normalize, NODE_LABELS, ports, reconnect, removeNodes, updateNode, type Flow, type Graph, type GraphNode, type NodeLabel } from "../model/hashing/graph";
import { hash_algorithm_labels } from "../model/hashing/algorithms";
import { readFlow, writeFlow } from "../model/hashing/exchange";
import { sourceLocale, targetLocales } from "../../localization/generated/locale-codes.js";

/** The room kept free around the nodes when the view is fitted. */
const FIT_PADDING = 60;
/** The width of the open drawer, which covers the left of the window, when its size is not set by the styles. */
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
 *
 * Keyboard: nodes and sockets are tab stops (Enter on an output socket starts a wire, Enter on an input socket ends it),
 * arrow keys move the selected nodes, Delete removes the selection, a node title can be renamed with Enter or F2 in edit mode.
 * Pointer and touch: drag to move, drag from a socket to wire, tap a socket and then another to wire.
 * Layout: block widget from 300 px to 2100 px; the node menu narrows and the title pill hides below 480 px.
 * Print: the graph and its hash values as drawn, without tools.
 *
 * Files: `.json` is imported and `application/json` exported (`hash-flow.json`): the nodes with their positions and settings and the
 * connections, the same shape as the data block. An import replaces the whole graph and drops connections that break the wiring rules;
 * unknown node kinds or a missing id make the file invalid. A hash flow has no native HTML counterpart, so there are no DOM conversions.
 *
 * Signals: `hash` (string) is the hash shown by the first hash value node, an empty string while it shows nothing.
 * The widget takes no effects: its keys are typed in the nodes, and several key nodes would leave open which one a source feeds.
 *
 * @cssprop --ww-text-color - Text color of titles and labels.
 * @cssprop --ww-font-family - Font family.
 * @cssprop --ww-theme-accent-1 - Selection and focus.
 * @cssprop --ww-theme-accent-2 - Border of key nodes.
 * @cssprop --ww-theme-accent-3 - Border of hash function nodes.
 * @cssprop --ww-theme-accent-4 - Border of hash value nodes.
 * @cssprop --ww-theme-accent-5 - Border of salt nodes.
 * @part canvas - The area that holds the graph.
 * @part node - A node.
 * @part title - The title of a node.
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

    static convertFrom = { ".json": "importJson" };
    static convertTo = { "application/json": "exportJson" };

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

    // The signal instances stay the same for the life of the widget.
    #hash = signal("");
    signals = { hash: computed(() => this.#hash.get()) };

    #permissions = new Permissions(this);
    // Fitting leaves the part of the window under the open drawer free, and only an explicit fit moves the view:
    // nodes added later do not.
    #viewport = new Viewport(this, {
        bounds: () => this.#scene.extent(),
        margin: 3000,
        wheel: "zoom",
        fit: () => ({ padding: FIT_PADDING, maxScale: 1, inset: { left: this.#drawer?.open ? this.#drawerWidth : 0 }, follow: "none" }),
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

    /** What the hashes depend on is computed once per change; moving or selecting nodes reuses it. */
    #currentFlow(graph: Graph): Flow {
        const signature = flowSignature(graph);
        if (this.#flow?.signature !== signature) this.#flow = { signature, flow: evaluate(graph) };
        return this.#flow.flow;
    }

    protected willUpdate(changed: PropertyValues<this>) {
        super.willUpdate(changed);
        const graph = this.graph;
        const first = graph.nodes.find((node) => node.label === "HashValue");
        const shown = first ? this.#currentFlow(graph).get(first.id)?.display : "";
        this.#hash.set(!shown || shown === "Error" ? "" : shown);
    }

    /** Import handler for `.json`: reads and checks the whole file, then returns the function that replaces the graph. */
    async importJson(file: File) {
        const graph = readFlow(await file.text());
        if (typeof graph === "string") {
            throw new Error({
                "not-json": this.msg("The file is not valid JSON.", { desc: "Error when importing a hash flow file" }),
                "not-a-flow": this.msg("The file does not hold a hash flow: expected an object with a list of nodes.", { desc: "Error when importing a hash flow file" }),
                "no-nodes": this.msg("The hash flow has no nodes.", { desc: "Error when importing a hash flow file" }),
                "bad-node": this.msg("Every node needs a unique id and one of the kinds Key, Salt, HashFunction or HashValue.", { desc: "Error when importing a hash flow file" }),
            }[graph]);
        }
        return () => {
            this.#change(() => {
                this.#commit(graph);
                this.selection = new Set();
                this.editingTitle = null;
            });
            void this.updateComplete.then(() => this.isConnected && this.zoomToNodes());
        };
    }

    /** Export handler for `application/json`: the current graph, including the default pipeline of an untouched widget. */
    exportJson() {
        return new File([writeFlow(this.graph)], "hash-flow.json", { type: "application/json" });
    }

    #printing?: AbortController;

    // A WebGL canvas can print blank or stale at paper width, so the graph is drawn once more as a static picture for paper.
    #beforePrint = () => {
        const container = this.renderRoot.querySelector<HTMLElement>(".widget-container");
        const picture = this.renderRoot.querySelector<HTMLElement>(".print-picture");
        if (!container || !picture) return;
        const graph = this.graph;
        const flow = this.#flow?.flow ?? evaluate(graph);
        const scale = this.#viewport.scale || 1;
        const nodes: PrintNode[] = [];
        const wires: PrintWire[] = [];
        const places = new Map<string, { x: number; y: number }>();
        for (const node of graph.nodes) {
            const element = this.renderRoot.querySelector<HTMLElement>(`ww-node[data-ww-key="${node.id}"]`);
            if (!element) continue;
            const box = element.getBoundingClientRect();
            const width = element.offsetWidth;
            const height = element.offsetHeight;
            for (const port of element.querySelectorAll<HTMLElement>("[data-ww-port]")) {
                const at = port.getBoundingClientRect();
                places.set(`${node.id}:${port.dataset.wwPort}`, { x: node.x + (at.left + at.width / 2 - box.left) / scale, y: node.y + (at.top + at.height / 2 - box.top) / scale });
            }
            const shown = flow.get(node.id);
            const text = node.label === "Key" ? node.value || ""
                : node.label === "Salt" ? `${this.msg("Salt text", { desc: "Label of the field showing the generated salt" })}: ${node.saltValue || ""}\n${(shown?.incoming || "") + (node.saltValue || "")}`
                : node.label === "HashFunction" ? hash_algorithm_labels[node.selectedFunction || "sha256"] ?? node.selectedFunction ?? ""
                : shown?.display === "Error" ? this.msg("Error", { desc: "Shown instead of a hash value when hashing fails" }) : shown?.display || "";
            nodes.push({ kind: NODE_CLASS[node.label], title: displayNodeTitle(node.label, node.customTitle, this.msg), x: node.x, y: node.y, width, height, text });
        }
        for (const connection of graph.connections) {
            const from = places.get(`${connection.source}:${connection.sourceOutput}`);
            const to = places.get(`${connection.target}:${connection.targetInput}`);
            if (from && to) wires.push({ x1: from.x, y1: from.y, x2: to.x, y2: to.y });
        }
        renderPrintPicture(picture, nodes, wires);
        container.dataset.print = "";
    };

    #afterPrint = () => {
        const container = this.renderRoot.querySelector<HTMLElement>(".widget-container");
        if (container) delete container.dataset.print;
        const picture = this.renderRoot.querySelector<HTMLElement>(".print-picture");
        if (picture) renderPrintPicture(picture, [], []);
    };

    disconnectedCallback() {
        super.disconnectedCallback();
        this.#printing?.abort();
        this.#printing = undefined;
        this.#resizing?.disconnect();
        this.#resizing = undefined;
    }

    connectedCallback() {
        this.#printing = new AbortController();
        window.addEventListener("beforeprint", this.#beforePrint, { signal: this.#printing.signal });
        window.addEventListener("afterprint", this.#afterPrint, { signal: this.#printing.signal });
        const rawLegacyState = this.getAttribute("editorstate");
        let legacyEditorState: Partial<Graph> | undefined;
        if (rawLegacyState !== null) {
            try { legacyEditorState = JSON.parse(rawLegacyState); }
            catch { legacyEditorState = undefined; }
        }
        super.connectedCallback();
        if (this.hasUpdated) this.#observeStage();
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
        this.#observeStage();
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
        void this.#viewport.fit().then(() => {
            this.#fittedView = this.#viewKey();
        });
    }

    // The view after the last fit; a container resize fits again only while the reader has not panned or zoomed since.
    #fittedView = "";
    #resizing?: ResizeObserver;

    #viewKey() {
        const { x, y, scale } = this.#viewport;
        return [x, y, scale].map((value) => Math.round(value * 10)).join();
    }

    #observeStage() {
        const stage = this.renderRoot.querySelector<HTMLElement>(".stage");
        if (!stage || this.#resizing) return;
        this.#resizing = new ResizeObserver(() => {
            if (this.#fittedView && this.#viewKey() === this.#fittedView) this.zoomToNodes();
        });
        this.#resizing.observe(stage);
    }

    get #drawerWidth() {
        const size = parseFloat(this.#drawer ? getComputedStyle(this.#drawer).getPropertyValue("--size") : "");
        return Number.isFinite(size) ? size : DRAWER_WIDTH;
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
        event.stopPropagation();
        if (event.key === "Enter") this.#setTitle(id, (event.target as HTMLInputElement).value);
        else if (event.key === "Escape") this.editingTitle = null;
    }

    // The title is a button for the keyboard in edit mode.
    #titleButton(event: KeyboardEvent, id: string) {
        if (event.key !== "Enter" && event.key !== "F2") return;
        event.preventDefault();
        event.stopPropagation();
        this.#editTitle(id);
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

    #socket(node: GraphNode, key: string, side: "input" | "output", title: string) {
        return html`<div class="socket-row" title=${key}>
            ${side === "input"
                ? html`<span class="socket" data-ww-port=${key} aria-label=${`${title}: ${this.msg("Input", { desc: "Label of a socket that takes a wire" })} ${key}`} data-ww-accept=${acceptedKinds(node)} data-ww-capacity="1" data-ww-side="left"></span>`
                : html`<span class="socket" data-ww-port=${key} aria-label=${`${title}: ${this.msg("Output", { desc: "Label of a socket that starts a wire" })} ${key}`} data-ww-link=${linkKind(node)} data-ww-capacity="1" data-ww-side="right"></span>`}
        </div>`;
    }

    #node(node: GraphNode, flow: Flow) {
        const { inputs, outputs } = ports(node);
        const title = displayNodeTitle(node.label, node.customTitle, this.msg);
        return html`
            <ww-node class="node ${NODE_CLASS[node.label]}" part="node" data-ww-key=${node.id} x=${node.x} y=${node.y} selectable movable ?selected=${this.selection.has(node.id)}>
                <div class="title" part="title" @click=${() => this.#editTitle(node.id)}
                    tabindex=${this.#permissions.editing && this.editingTitle !== node.id ? 0 : nothing} role=${this.#permissions.editing && this.editingTitle !== node.id ? "button" : nothing}
                    aria-label=${this.#permissions.editing && this.editingTitle !== node.id ? this.msg("Rename node", { desc: "Label of the node title, which a click or Enter turns into a text field" }) + ": " + title : nothing}
                    @keydown=${(event: KeyboardEvent) => this.#permissions.editing && this.editingTitle !== node.id && event.target === event.currentTarget && this.#titleButton(event, node.id)}>
                    ${this.editingTitle === node.id
                        ? html`<input class="title-input" aria-label=${this.msg("Node title", { desc: "Label of the text field for renaming a node" })} .value=${title} @blur=${(event: Event) => this.#setTitle(node.id, (event.target as HTMLInputElement).value)} @keydown=${(event: KeyboardEvent) => this.#titleKey(event, node.id)} @pointerdown=${(event: Event) => event.stopPropagation()} />`
                        : html`<span>${title}</span>`}
                </div>
                ${this.#permissions.can("allowDeleting")
                    ? html`<sl-tooltip content=${this.msg("Delete node")} placement="top-start">
                        <button type="button" class="delete-button tool" aria-label=${this.msg("Delete node")} @pointerdown=${(event: Event) => event.stopPropagation()} @keydown=${(event: Event) => event.stopPropagation()} @click=${() => this.#deleteNode(node.id)}><sl-icon src=${IconTrash}></sl-icon></button>
                    </sl-tooltip>`
                    : nothing}
                ${this.#content(node, flow)}
                <div class="socket-container">
                    <div class="inputs">${inputs.map((key) => this.#socket(node, key, "input", title))}</div>
                    <div class="outputs">${outputs.map((key) => this.#socket(node, key, "output", title))}</div>
                </div>
            </ww-node>`;
    }

    render() {
        const graph = this.graph;
        const flow = this.#currentFlow(graph);
        const deletable = this.#permissions.can("allowDeleting");
        return html`
            <div class="responsive"><div class="widget-container">
                <div class="pill pill-center"><span class="instruction">${this.msg("Hash Editor")}</span></div>
                <div class="pill pill-right">
                    <sl-tooltip content=${this.msg("Toggle node menu")} data-ww-can="allowAdding">
                        <button type="button" class="tool" aria-label=${this.msg("Toggle node menu")} aria-expanded=${this.#drawer?.open ? "true" : "false"} @click=${() => this.#toggleDock()}><sl-icon src=${IconLayoutSidebar}></sl-icon></button>
                    </sl-tooltip>
                    <sl-tooltip content=${this.msg("Focus on nodes")}>
                        <button type="button" class="tool" aria-label=${this.msg("Focus on nodes")} @click=${() => this.zoomToNodes()}><sl-icon src=${IconFocus2}></sl-icon></button>
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

                <div class="print-picture" part="canvas"></div>
                <div class="stage" part="canvas" tabindex="0" data-ww-drop="node" data-ww-drop-position="point" data-ww-drop-space="world" @ww-dragcommit=${this.#drop}>
                    <ww-scene select="multiple" connect-click data-ww-viewport="canvas" data-ww-viewport-zoom="0.1 1" background="dots" background-spacing="30" aria-label=${this.msg("Hash Editor")}
                        @ww-select=${this.#select} @ww-move=${this.#move} @ww-connect=${this.#connect} @ww-reconnect=${this.#reconnect} @ww-disconnect=${this.#disconnect}>
                        ${graph.connections.map((connection) => html`
                            <ww-path data-ww-key=${connectionKey(connection)} from="${connection.source}:${connection.sourceOutput}" to="${connection.target}:${connection.targetInput}" route="curve" rewire="from to"
                                ?selectable=${deletable} ?selected=${this.selection.has(connectionKey(connection))}></ww-path>`)}
                        ${graph.nodes.map((node) => this.#node(node, flow))}
                    </ww-scene>
                </div>
            </div></div>
        `;
    }
}

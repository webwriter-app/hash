import { html, css, CSSResult } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, property, state } from "lit/decorators.js";
// @ts-ignore
import "@shoelace-style/shoelace/dist/themes/light.css";

import { createRef, ref } from "lit/directives/ref.js";
import { createEditor } from "./editor/editor";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import SlDrawer from "@shoelace-style/shoelace/dist/components/drawer/drawer.js";
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";

import IconFocus2 from "@tabler/icons/outline/focus-2.svg";
import IconLayoutSidebar from "@tabler/icons/outline/layout-sidebar.svg"; 
import { EditorDock } from "./editor/editor-dock";
import { styles } from "./webwriter-hash.styles";
import type { MsgFn } from "@lit/localize";
import { createLocalizer, effectiveLanguage, sourceMsg } from "../../localization/localizer";

type NodeDrag = {
    pointerId: number;
    nodeType: string;
    source: HTMLElement;
    preview: HTMLElement;
    offsetX: number;
    offsetY: number;
    clientX: number;
    clientY: number;
};

@customElement("webwriter-hash")
export class WebwriterHash extends LitElementWw {
    // Inherited language must not be reflected as an authored attribute.
    static override get observedAttributes() {
        return super.observedAttributes.filter(name => name !== "lang");
    }

    protected static override finalize() {
        super.finalize();
        // Legacy decorators inherit Lit's standard-decorator metadata.
        this.elementProperties.set("lang", { attribute: false, noAccessor: true });
    }

    override get lang(): string { return effectiveLanguage(this); }
    override set lang(value: string) { this.setAttribute("lang", value); }

    private static makeOptions(msg: MsgFn) {
        return {
            allowAdding: { type: Boolean, label: { _: msg("Adding Nodes") } },
            allowDeleting: { type: Boolean, label: { _: msg("Deleting Nodes") } },
        };
    }
    static options = WebwriterHash.makeOptions(sourceMsg);
    readonly options = WebwriterHash.makeOptions(sourceMsg);

    /**
     * If true, enables the side drawer and allow drag-and-drop new nodes (Key, Salt, HashFunction, HashValue) to editor.
     */
    @property({ type: Boolean, attribute: true, reflect: true }) accessor allowAdding = false;
    /**
     * If true, allows user to delete selected nodes from the graph.
     */
    @property({ type: Boolean, attribute: true, reflect: true }) accessor allowDeleting = false;
    /**
     * The JSON representation of the graph, containing all nodes, positions, and connections. Used for saving state in rerender.
     */
    @state() accessor editorState: any = {};

    protected localize = createLocalizer(this, () => {
        Object.assign(this.options, WebwriterHash.makeOptions(this.msg));
    });
    readonly msg = this.localize.msg;

    static get scopedElements() {
        return {
            "sl-icon": SlIcon,
            "sl-drawer": SlDrawer,
            "editor-dock": EditorDock,
            "sl-tooltip": SlTooltip
        };
    }

     public static get styles(): CSSResult[] {
        return [
          styles,
        ];
      }

    private reteRef = createRef<HTMLDivElement>();
    private backgroundRef = createRef<HTMLCanvasElement>();
    private editorInstance?: any;
    private dataObserver?: MutationObserver;
    private legacyEditorState: any = undefined;
    private savedDataSnapshot: string | null = null;
    private applyingData = false;
    private remoteStatePending = false;
    private nodeDrag?: NodeDrag;
    private dragFrame?: number;

    // lifecycle, checks if editor is empty and sets permissions for authoring
    connectedCallback() {
        const rawLegacyState = this.getAttribute("editorstate");
        if (rawLegacyState !== null) {
            try { this.legacyEditorState = JSON.parse(rawLegacyState); }
            catch { this.legacyEditorState = undefined; }
        }
        super.connectedCallback();
        this.dataObserver = new MutationObserver(() => this.readAuthoredData());
        this.dataObserver.observe(this, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["slot", "type"] });
        if (this.dataBlock()) this.readAuthoredData();
        else if (this.legacyEditorState !== undefined) {
            this.editorState = this.legacyEditorState;
            this.persistAuthoredData();
        }
        const isEmpty = !this.editorState?.nodes || this.editorState.nodes.length === 0;
        
        if (this.isContentEditable && isEmpty) {
            if (!this.hasAttribute('allowadding')) this.allowAdding = true;
            if (!this.hasAttribute('allowdeleting')) this.allowDeleting = true;
        }
    }

    // initialize editor.ts createEditor function values, add listeners and permissions
    async firstUpdated() {
   
        if (this.reteRef.value && this.backgroundRef.value && !this.editorInstance) {
            requestAnimationFrame(async () => {
                try {                    
                    this.editorInstance = await createEditor(
                        this.reteRef.value!, // editor
                        this.backgroundRef.value!, // grid background
                        this.allowDeleting, // canDelete
                        this.isContentEditable, // isAuthor
                        this.editorState        // initialData
                    );

                    if (this.remoteStatePending && this.editorState?.nodes) {
                        await this.editorInstance.importGraph(this.editorState);
                        this.remoteStatePending = false;
                    }
                    if (!this.editorState?.nodes?.length) this.editorState = this.editorInstance.getGraph();
                    
                    await this.editorInstance.updatePermissions({
                        canDelete: this.allowDeleting,
                        isAuthor: this.isContentEditable,
                        allowAdding: this.allowAdding
                    });

                    this.reteRef.value!.addEventListener('rete-update', (e: any) => {
                        this.handleEditorChange(e.detail);
                    });
                    
                    this.editorInstance?.zoomToNodes(!!this.renderRoot.querySelector("#drawer[open]"))           

                } catch (err: any) {
                    console.error("Initialization error, please refresh page.");                 
                }
            });
        } 
    }

    // reset, destroy editor and remove listeners
    disconnectedCallback(): void {
        this.finishNodeDrag();
        this.dataObserver?.disconnect();
        this.dataObserver = undefined;
        super.disconnectedCallback();
        if (this.editorInstance) {
            this.editorInstance.destroy();
            this.editorInstance = null;
        }
        if (this.reteRef.value) {
            this.reteRef.value.removeEventListener('rete-update', (e: any) => this.handleEditorChange(e.detail));
        }
    }

    // stores editor state changes
    private handleEditorChange(data: any) {
        this.editorState = data;
    }

    private dataBlock(): HTMLScriptElement | null {
        return this.querySelector(':scope > script[type="application/json"][slot="data"]');
    }

    private readAuthoredData() {
        const block = this.dataBlock();
        if (!block || this.applyingData) return;
        try {
            const value = JSON.parse(block.textContent ?? "");
            if (!value || typeof value !== "object" || !value.editorState) return;
            const snapshot = JSON.stringify({editorState: value.editorState});
            if (snapshot === this.savedDataSnapshot) return;
            this.applyingData = true;
            this.remoteStatePending = this.hasUpdated;
            this.editorState = value.editorState;
            this.savedDataSnapshot = snapshot;
            this.removeAttribute("editorstate");
        } catch (error) {
            console.error("Unable to read hash data block", error);
        } finally {
            this.applyingData = false;
        }
    }

    private persistAuthoredData() {
        if (!this.isConnected || this.applyingData || !this.editorState?.nodes) return;
        const snapshot = JSON.stringify({editorState: this.editorState});
        if (snapshot === this.savedDataSnapshot) return;
        let block = this.dataBlock();
        if (!block) {
            block = this.ownerDocument.createElement("script");
            block.type = "application/json";
            block.slot = "data";
            this.append(block);
        }
        this.applyingData = true;
        block.textContent = snapshot.replace(/</g, "\\u003c");
        this.savedDataSnapshot = snapshot;
        this.legacyEditorState = undefined;
        this.removeAttribute("editorstate");
        this.applyingData = false;
    }

    // lifecycle, when property changed
    async updated(changedProperties: Map<string, any>) {
        if (changedProperties.has("editorState")) {
            if (this.remoteStatePending) {
                if (this.editorInstance && this.editorState?.nodes) {
                    await this.editorInstance.importGraph(this.editorState);
                    this.remoteStatePending = false;
                }
            } else {
                this.persistAuthoredData();
            }
        }
        if (
        changedProperties.has('allowAdding') || 
        changedProperties.has('allowDeleting') || 
        changedProperties.has('isContentEditable')
        ) {
            if (this.editorInstance) {
                await this.editorInstance.updatePermissions({ 
                    canDelete: this.allowDeleting,
                    isAuthor: this.isContentEditable,
                    allowAdding: this.allowAdding
                });
            }
        }
    }
    
    private handlePointerDown(event: PointerEvent) {
        if (this.nodeDrag || !this.allowAdding) return;
        if (event.pointerType === "mouse" && event.button !== 0) return;

        const source = event.composedPath().find((element): element is HTMLElement =>
            element instanceof HTMLElement && element.matches(".dock-item[data-node-type]")
        );
        const nodeType = source?.dataset.nodeType;
        if (!source || !nodeType || source.classList.contains("disabled")) return;

        event.preventDefault();
        source.setPointerCapture(event.pointerId);

        const rect = source.getBoundingClientRect();
        const preview = document.createElement("div");
        preview.className = `drag-preview ${nodeType.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`;
        preview.textContent = source.textContent?.trim() ?? "";
        preview.style.width = `${rect.width}px`;
        this.renderRoot.querySelector(".drag-overlay")?.append(preview);

        source.classList.add("drag-source");
        this.nodeDrag = {
            pointerId: event.pointerId,
            nodeType,
            source,
            preview,
            offsetX: event.clientX - rect.left,
            offsetY: event.clientY - rect.top,
            clientX: event.clientX,
            clientY: event.clientY,
        };
        this.requestDragFrame();
    }

    private handlePointerMove(event: PointerEvent) {
        if (event.pointerId !== this.nodeDrag?.pointerId) return;
        event.preventDefault();
        this.nodeDrag.clientX = event.clientX;
        this.nodeDrag.clientY = event.clientY;
        this.requestDragFrame();
    }

    private async handlePointerEnd(event: PointerEvent) {
        const drag = this.nodeDrag;
        if (!drag || event.pointerId !== drag.pointerId) return;
        event.preventDefault();

        const editorRect = this.reteRef.value?.getBoundingClientRect();
        const shouldDrop = event.type === "pointerup"
            && this.isOverEditor(event.clientX, event.clientY);
        this.finishNodeDrag();

        if (shouldDrop && editorRect) {
            await this.editorInstance?.addNode(
                drag.nodeType,
                event.clientX - editorRect.left,
                event.clientY - editorRect.top
            );
        }
    }

    private requestDragFrame() {
        if (this.dragFrame !== undefined) return;
        this.dragFrame = requestAnimationFrame(() => {
            this.dragFrame = undefined;
            const drag = this.nodeDrag;
            if (!drag) return;

            drag.preview.style.transform = `translate3d(${drag.clientX - drag.offsetX}px, ${drag.clientY - drag.offsetY}px, 0)`;
            this.reteRef.value?.classList.toggle(
                "drag-over",
                this.isOverEditor(drag.clientX, drag.clientY)
            );
        });
    }

    private isOverEditor(clientX: number, clientY: number) {
        const hit = this.shadowRoot?.elementFromPoint(clientX, clientY);
        return !!hit && !!this.reteRef.value?.contains(hit);
    }

    private finishNodeDrag() {
        const drag = this.nodeDrag;
        this.nodeDrag = undefined;
        if (this.dragFrame !== undefined) cancelAnimationFrame(this.dragFrame);
        this.dragFrame = undefined;
        this.reteRef.value?.classList.remove("drag-over");
        drag?.source.classList.remove("drag-source");
        if (drag?.source.hasPointerCapture(drag.pointerId)) {
            drag.source.releasePointerCapture(drag.pointerId);
        }
        drag?.preview.remove();
    }
    
    // toggles side drawer
    private toggleDock() {
        if(!this.allowAdding) return;
        const drawer = this.renderRoot.querySelector("#drawer") as SlDrawer;
        if(drawer){
            drawer.open ? drawer.hide() : drawer.show();
            this.editorInstance?.zoomToNodes(drawer.open);
        }
    }

    render() {
        const showDrawer = this.allowAdding || this.isContentEditable;
        return html`
            <div
                class="widget-container"
                @pointerdown=${this.handlePointerDown}
                @pointermove=${this.handlePointerMove}
                @pointerup=${this.handlePointerEnd}
                @pointercancel=${this.handlePointerEnd}
            >
                <div class="pill pill-center"><span class="instruction">${this.msg("Hash Editor")}</span></div>
                <div class="pill pill-right">
                    ${showDrawer ? html`
                        <sl-tooltip content=${this.msg("Toggle node menu")}>
                            <sl-icon src=${IconLayoutSidebar} class=${this.allowAdding ? '' : 'icon-disabled'} @click=${() => this.toggleDock()}></sl-icon>
                        </sl-tooltip>
                    ` : ''}
                    <sl-tooltip content=${this.msg("Focus on nodes")}>
                        <sl-icon src=${IconFocus2} @click=${() => this.editorInstance?.zoomToNodes(!!this.renderRoot.querySelector("#drawer[open]"))}></sl-icon>
                    </sl-tooltip>    
                </div>

                <sl-drawer label=${this.msg("Tools", { desc: "Title of the drawer listing the draggable nodes" })} id="drawer" placement="start" class="drawer-dock" contained no-header ?open=${this.allowAdding}>
                    <editor-dock .allowSalting=${true}></editor-dock> 
                </sl-drawer>

                <div id="app">
                    <div ${ref(this.reteRef)} class="rete">
                        <canvas ${ref(this.backgroundRef)} class="rete-grid" aria-hidden="true"></canvas>
                    </div>
                </div>
            </div>

            <div class="drag-overlay" aria-hidden="true"></div>

        `;
    }
}

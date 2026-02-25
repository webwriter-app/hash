import { html, css } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, property } from "lit/decorators.js"; 
import "@shoelace-style/shoelace/dist/themes/light.css";

import { createRef, ref } from "lit/directives/ref.js";
import { createEditor } from "./src/editor";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import SlDrawer from "@shoelace-style/shoelace/dist/components/drawer/drawer.js";
import SlSwitch from "@shoelace-style/shoelace/dist/components/switch/switch.js";
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";

import IconFocus2 from "@tabler/icons/outline/focus-2.svg";
import IconLayoutSidebar from "@tabler/icons/outline/layout-sidebar.svg"; 
import { EditorDock } from "./src/editor-dock";

@customElement("webwriter-hash-new")
export class WebwriterHashNew extends LitElementWw {

    // widget properties synchronized with attributes
    @property({ type: Boolean, attribute: true, reflect: true }) accessor allowAdding = false;
    @property({ type: Boolean, attribute: true, reflect: true }) accessor allowDeleting = false;
    @property({ type: Object, attribute: true, reflect: true }) accessor editorState: any = {}; 

    static get scopedElements() {
        return {
            "sl-icon": SlIcon,
            "sl-drawer": SlDrawer,
            "editor-dock": EditorDock,
            "sl-switch": SlSwitch,
            "sl-tooltip": SlTooltip
        };
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: fit-content;
            font-family: sans-serif;
        }

        .widget-container {
            position: relative; 
            border: 1px solid #ccc; 
            border-radius: 8px;
            height: 600px;
            overflow: hidden; 
            background: white;
            display: flex;
            flex-direction: column;
        }

        .pill {
            position: absolute;
            top: 15px;
            z-index: 50; 
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            height: 42px; 
            padding: 0 20px; 
            box-sizing: border-box;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border: 1px solid #e0e0e0;
        }

        .pill-center {
            left: 50%;
            transform: translateX(-50%);
        }

        .pill-right {
            right: 15px;
        }

        .instruction {
            font-weight: 600;
            color: #3f3f48;
            font-size: 14px;
            white-space: nowrap;
        }

        sl-icon {
            font-size: 20px;
            cursor: pointer;
            color: #555;
            transition: color 0.2s;
        }
        
        sl-icon:hover {
            color: #39bdf8;
        }

        .icon-disabled {
            color: #ccc !important;
            opacity: 0.6;
            pointer-events: none;
        }

        .drawer-dock { --size: 170px; }
        .drawer-dock::part(overlay) { display: none; }
        .drawer-dock::part(panel) { box-shadow: 1px 0 0 #e5e5e5; border-right: 1px solid #ccc; }
        .drawer-dock::part(body) { padding: 0; overflow: hidden; }

        #app { width: 100%; height: 100%; position: relative; }

        .rete {
            width: 100%;
            height: 100%;
            background-image: radial-gradient(#d1d5db 1px, transparent 0);
            background-size: 20px 20px;
            background-color: #f9fafb;
        }
        
        :host(:not([contenteditable=true]):not([contenteditable=""])) .author-only {
            display: none !important;
        }
        .options {
            padding-left: 15px;

        }
        sl-tooltip {
            --sl-tooltip-arrow-size: 0;
            --show-delay:1000ms;
        }

        sl-tooltip::part(body) {
            background: #f1f1f1;
            border: #a1a1aa 1px solid;
            color: #131316;
            font-size: 14px;
            font-family: sans-serif;
        } 
        .description {
            font-size: 13px;
            color: #3f3f48;
            margin-bottom: 8px;
        } 
        .warning {
            color: #d28547;
        }  
        sl-switch {
            color: #3f3f48
        }
    `;

    private reteRef = createRef<HTMLDivElement>();
    private editorInstance?: any;

    //
    connectedCallback() {
        super.connectedCallback();
        const isEmpty = !this.editorState?.nodes || this.editorState.nodes.length === 0;
        
        if (this.isContentEditable && isEmpty) {
            if (!this.hasAttribute('allowadding')) this.allowAdding = true;
            if (!this.hasAttribute('allowdeleting')) this.allowDeleting = true;
        }
    }

    // initialize editor.ts createEditor function values, add listeners and permissions
    async firstUpdated() {
        // debugger;
        if (this.reteRef.value && !this.editorInstance) {
            requestAnimationFrame(async () => {
                try {                    
                    this.editorInstance = await createEditor(
                        this.reteRef.value!, 
                        this.allowDeleting, // canDelete
                        this.isContentEditable, // isAuthor
                        this.editorState        // initialData
                    );
                    
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

    // lifecycle when property changed
    async updated(changedProperties: Map<string, any>) {
            
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
    
    // visual feedback for drag over
    private handleDragOver(e: DragEvent) {
        e.preventDefault();
        e.stopPropagation(); 
        const type = e.dataTransfer?.getData("nodeType");
        e.dataTransfer!.dropEffect = this.allowAdding ? "copy" : "none";
    }

    // node dropping onto canvas
    private async handleDrop(e: DragEvent) {
        e.preventDefault();
        e.stopPropagation(); 
        
        if (!this.allowAdding) return;
        const type = e.dataTransfer?.getData("nodeType");
                
        const rect = this.reteRef.value?.getBoundingClientRect();
        if (type && rect) {
            await this.editorInstance?.addNode(type, e.clientX - rect.left, e.clientY - rect.top);
        } 
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
            <div class="widget-container" @drop=${this.handleDrop} @dragover=${this.handleDragOver}>
                <div class="pill pill-center"><span class="instruction">Hash Editor</span></div>
                <div class="pill pill-right">
                    ${showDrawer ? html`
                        <sl-tooltip content="Toggle node menu">
                            <sl-icon src=${IconLayoutSidebar} class=${this.allowAdding ? '' : 'icon-disabled'} @click=${() => this.toggleDock()}></sl-icon>
                        </sl-tooltip>
                    ` : ''}
                    <sl-tooltip content="Focus on nodes"> 
                        <sl-icon src=${IconFocus2} @click=${() => this.editorInstance?.zoomToNodes(!!this.renderRoot.querySelector("#drawer[open]"))}></sl-icon>
                    </sl-tooltip>    
                </div>

                <sl-drawer label="Tools" id="drawer" placement="start" class="drawer-dock" contained no-header ?open=${this.allowAdding}>
                    <editor-dock .allowSalting=${true}></editor-dock> 
                </sl-drawer>

                <div id="app"><div ${ref(this.reteRef)} class="rete"></div></div>
            </div>

            <div class="author-only options" part="options">
                <div class="description">Toggle these settings for the author and student view.</div>
                <sl-switch ?checked=${this.allowAdding} @sl-change=${(e: any) => this.allowAdding = e.target.checked}>Adding Nodes</sl-switch>
                <sl-switch ?checked=${this.allowDeleting} @sl-change=${(e: any) => this.allowDeleting = e.target.checked}>Deleting Nodes</sl-switch>
                </div>
        `;
    }
}
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

    @property({ type: Boolean, attribute: true, reflect: true }) accessor allowAdding;
    @property({ type: Boolean, attribute: true, reflect: true }) accessor allowDeleting;
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

        .pill > div {
            display: flex;
            align-items: center;
        }

        .instruction {
            font-weight: 600;
            color: #333;
            font-size: 14px;
            white-space: nowrap;
            line-height: 1;
        }

        sl-icon {
            font-size: 20px;
            cursor: pointer;
            color: #555;
            transition: color 0.2s;
        }
        
        sl-icon:hover {
            color: #888;
        }

        .icon-disabled {
            color: #ccc !important;
            opacity: 0.6;
        }

        .drawer-dock {
            --size: 170px;
        }
        
        .drawer-dock::part(overlay) { display: none; pointer-events: none; }
        .drawer-dock::part(panel) { box-shadow: 1px 0 0 #e5e5e5; border-right: 1px solid #ccc; }
        .drawer-dock::part(body) { padding: 0; overflow: hidden; }

        #app {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .rete {
            width: 100%;
            height: 100%;
            --bg-size: 20px;
            --dot-size: 1px;
            --bg-pos-x: 0px;
            --bg-pos-y: 0px;

            background-image: radial-gradient(#d1d5db var(--dot-size), transparent 0);
            background-size: var(--bg-size) var(--bg-size);
            background-position: var(--bg-pos-x) var(--bg-pos-y);
            background-color: #f9fafb;
        }
        
        :host(:not([contenteditable=true]):not([contenteditable=""])) .author-only {
            display: none !important;
        }
        .options {
            padding-left: 5px; 
        }
        sl-tooltip {
            --show-delay: 1200ms;
        }
    `;

    private reteRef = createRef<HTMLDivElement>();
    
    private editorInstance?: { 
        destroy: () => void; 
        zoomToNodes: (sidebarOpen?: boolean) => Promise<void>;
        addNode: (type: string, x: number, y: number) => Promise<void>;
        importGraph: (data: any) => Promise<void>;
        process: () => Promise<void>;
        getGraph: () => any;
        updatePermissions: (p: { canDelete: boolean, isAuthor: boolean }) => void;
    };

    async firstUpdated() {
        if (this.reteRef.value) {
            this.editorInstance = await createEditor(
                this.reteRef.value!, 
                this.allowDeleting,     // canDelete
                this.isContentEditable, // isAuthor
                this.editorState        // initialData
            );
            
            this.reteRef.value!.addEventListener('rete-update', (e: any) => {
                this.handleEditorChange(e.detail);
            });

            const shouldZoomSidebar = this.allowAdding;
            this.editorInstance.zoomToNodes(shouldZoomSidebar); 
            
        } 
    }

    private handleEditorChange(data: any) {
        this.editorState = data;
    }

    async updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('allowDeleting') || changedProperties.has('isContentEditable')) {
            
            if (this.editorInstance) {
                this.editorInstance.updatePermissions({ 
                    canDelete: this.allowDeleting,
                    isAuthor: this.isContentEditable 
                });
            }
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.editorInstance?.destroy();

        if(this.reteRef.value) {
            this.reteRef.value.removeEventListener('rete-update', (e: any) => this.handleEditorChange(e.detail));
        }
    }
    
    private handleDragOver(e: DragEvent) {
        e.preventDefault();

        if(this.allowAdding) {
            e.dataTransfer!.dropEffect = "copy";
        } else {
            e.dataTransfer!.dropEffect = "none";
        }
    }

    private async handleDrop(e: DragEvent) {
        e.preventDefault();
        
        if (!this.allowAdding) return;

        const type = e.dataTransfer?.getData("nodeType");
        if (type) {
            const rect = this.reteRef.value?.getBoundingClientRect();
            if (rect) {
                const relativeX = e.clientX - rect.left;
                const relativeY = e.clientY - rect.top;                
                
                try {
                    await this.editorInstance?.addNode(type, relativeX, relativeY);
                } catch (err) {
                    console.error("Drop error:", err);
                }
            }
        } 
    }
    
    private toggleDock() {
        if(!this.allowAdding) return;

        const drawer = this.renderRoot.querySelector("#drawer") as SlDrawer;
        
        if(drawer){
            if (drawer.open) {
                drawer.hide(); 
                this.editorInstance?.zoomToNodes(false);
            } else {
                drawer.show();
                this.editorInstance?.zoomToNodes(true);
            }
        }
    }

    render() {
        const showDrawer = this.allowAdding || this.isContentEditable;

        return html`
            <div 
                class="widget-container"
                @drop=${this.handleDrop} 
                @dragover=${this.handleDragOver}
            >
                <div class="pill pill-center">
                    <span class="instruction">Hash Editor</span>
                </div>

                <div class="pill pill-right">

                    ${showDrawer ? html`
                    <div style="display:flex; align-items:center;">
                        <sl-tooltip content="Toggle node menu" placement="bottom-end">
                            <sl-icon 
                                src=${IconLayoutSidebar} 
                                class=${this.allowAdding ? '' : 'icon-disabled'}
                                @click=${() => this.toggleDock()}
                                style="margin-right: 12px;" 
                            ></sl-icon>
                        </sl-tooltip>
                    </div>
                    ` : ''}
                    <sl-tooltip content="Focus on nodes" placement="bottom-end"> 
                        <sl-icon
                            src=${IconFocus2}
                            @click=${() => {
                                const drawer = this.renderRoot.querySelector("#drawer") as SlDrawer;
                                const isOpen = drawer ? drawer.open : false;
                                this.editorInstance?.zoomToNodes(isOpen);
                            }}
                        ></sl-icon>
                    </sl-tooltip>    
                </div>

                ${showDrawer ? html`
                    <sl-drawer 
                        label="Tools" 
                        id="drawer"
                        placement="start" 
                        class=${this.allowAdding ? 'drawer-dock' : 'drawer-dock icon-disabled'}
                        contained 
                        no-header
                        open                   
                    >
                        <editor-dock></editor-dock>
                    </sl-drawer>
                ` : ''}

                <div id="app">
                    <div 
                        ${ref(this.reteRef)} 
                        class="rete" 
                        .state=${this.editorState} 
                    ></div>
                </div>
            </div>

            <div part="options" class="author-only options">
                <sl-switch 
                    ?checked=${this.allowAdding}
                    @sl-change=${(e: any) => this.allowAdding = e.target.checked}
                >Adding Nodes</sl-switch>
                
                <sl-switch 
                    ?checked=${this.allowDeleting}
                    @sl-change=${(e: any) => this.allowDeleting = e.target.checked}
                >Deleting Nodes</sl-switch>
            </div>
        `;
    }
}
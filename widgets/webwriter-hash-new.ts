import { html, css } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, property } from "lit/decorators.js"; 
import "@shoelace-style/shoelace/dist/themes/light.css";

import { createRef, ref } from "lit/directives/ref.js";
import { createEditor } from "./src/editor";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import SlDrawer from "@shoelace-style/shoelace/dist/components/drawer/drawer.js";
import SlSwitch from "@shoelace-style/shoelace/dist/components/switch/switch.js";

import IconFocus2 from "@tabler/icons/outline/focus-2.svg";
import IconSquareRoundedPlus2 from "@tabler/icons/outline/square-rounded-plus-2.svg"; 
import { EditorDock } from "./src/editor-dock";

@customElement("webwriter-hash-new")
export class WebwriterHashNew extends LitElementWw {

    @property({ type: Boolean, reflect: true }) allowAdding = true;
    @property({ type: Boolean, reflect: true }) allowDeleting = true;
    @property({ type: Object, attribute: true, reflect: true }) accessor editorState: any = {}; 

    static get scopedElements() {
        return {
            "sl-icon": SlIcon,
            "sl-drawer": SlDrawer,
            "editor-dock": EditorDock,
            "sl-switch": SlSwitch,
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
    `;

    private reteRef = createRef<HTMLDivElement>();
    private editorInstance?: { 
        destroy: () => void; 
        zoomToNodes: (sidebarOpen?: boolean) => Promise<void>;
        addNode: (type: string, x: number, y: number) => Promise<void>;
        importGraph: (data: any) => Promise<void>;
        process: () => Promise<void>;
        getGraph: () => any;
        updatePermissions: (p: {canAdd: boolean, canDelete: boolean}) => void;
     };

     async firstUpdated() {
        if (this.reteRef.value) {

            setTimeout(async () => {
                const isAuthor = this.isContentEditable;
                const canAdd = isAuthor || this.allowAdding;
                const canDelete = isAuthor || this.allowDeleting;

                this.editorInstance = await createEditor(
                    this.reteRef.value!, 
                    { canAdd, canDelete }, 
                    this.editorState 
                );
                debugger;

                this.reteRef.value!.addEventListener('rete-update', (e: any) => {
                    this.handleEditorChange(e.detail);
                });

                const showSidebar = isAuthor || this.allowAdding;
                this.editorInstance.zoomToNodes(showSidebar); 
            }, 50);
        }
    }

    private handleEditorChange(data: any) {
        this.editorState = data;
        debugger; 
    }

    updated(changedProperties: Map<string, any>) {
        if (changedProperties.has('allowAdding') || changedProperties.has('allowDeleting')) {
             if (this.editorInstance) {
                 const isAuthor = this.isContentEditable;
                 const canAdd = isAuthor || this.allowAdding;
                 const canDelete = isAuthor || this.allowDeleting;
                 this.editorInstance.updatePermissions({ canAdd, canDelete });
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
        e.dataTransfer!.dropEffect = "copy";
    }

    private async handleDrop(e: DragEvent) {
        e.preventDefault();
        const type = e.dataTransfer?.getData("nodeType");
        if (!this.editorInstance) return;

        if (type) {
            const rect = this.reteRef.value?.getBoundingClientRect();
            if (rect) {
                const clientX = e.clientX - rect.left;
                const clientY = e.clientY - rect.top;                
                try {
                    await this.editorInstance.addNode(type, clientX, clientY);
                } catch (err) {
                    console.error("Drop error: addNode crashed:", err);
                }
            }
        } 
    }
    
    private toggleDock(){
        const drawer = this.renderRoot.querySelector("#drawer") as SlDrawer
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
        const isAuthor = this.isContentEditable;
        const showDockControls = isAuthor || this.allowAdding;

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
                    ${showDockControls ? html`
                        <div style="display:flex; align-items:center;">
                            <sl-icon 
                                src=${IconSquareRoundedPlus2} 
                                @click=${() => this.toggleDock()}
                                style="margin-right: 12px;" 
                            ></sl-icon>
                        </div>
                    ` : ''}
                    
                    <sl-icon
                        src=${IconFocus2}
                        @click=${() => {
                            const drawer = this.renderRoot.querySelector("#drawer") as SlDrawer;
                            const isOpen = drawer ? drawer.open : false;
                            this.editorInstance?.zoomToNodes(isOpen);
                        }}
                    ></sl-icon>
                </div>

                ${showDockControls ? html`
                    <sl-drawer 
                        label="Tools" 
                        id="drawer"
                        placement="start" 
                        class="drawer-dock" 
                        contained 
                        no-header
                        open                   
                    >
                        <editor-dock></editor-dock>
                    </sl-drawer>
                ` : ''}

                <div id="app">
                    <div ${ref(this.reteRef)} 
                    class="rete" 
                    .state=${this.editorState} 
                    ></div>
                </div>
            </div>

            <div part="options" class="author-only">
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
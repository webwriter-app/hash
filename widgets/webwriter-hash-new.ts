import { html, css } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, query, state } from "lit/decorators.js"; 
import "@shoelace-style/shoelace/dist/themes/light.css";

import { createRef, ref } from "lit/directives/ref.js";
import { createEditor } from "./src/editor";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import SlDrawer from "@shoelace-style/shoelace/dist/components/drawer/drawer.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.js";

import IconFocus2 from "@tabler/icons/outline/focus-2.svg";
import IconSquareRoundedPlus2 from "@tabler/icons/outline/square-rounded-plus-2.svg"; 
import { EditorDock } from "./src/editor-dock";

@customElement("webwriter-hash-new")
export class WebwriterHashNew extends LitElementWw {

    static get scopedElements() {
        return {
            "sl-icon": SlIcon,
            "sl-drawer": SlDrawer,
            "editor-dock": EditorDock 
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

        .controls {
            position: absolute;
            top: 15px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 50; 
            display: flex;
            align-items: center;
            gap: 12px;
            background: rgba(255, 255, 255, 0.95);
            padding: 8px 16px;
            border-radius: 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border: 1px solid #e0e0e0;
        }

        .instruction {
            font-weight: 600;
            color: #333;
            font-size: 14px;
            white-space: nowrap;
        }

        sl-icon {
            margin-top: 2px; 
            margin-right: 2px;
            font-size: 20px;
            cursor: pointer;
            color: #555;
            transition: color 0.2s;
        }
        sl-icon:hover {
            color: #000;
        }

        .drawer-dock {
            --size: 170px;
        }
        
        .drawer-dock::part(overlay) {
            display: none; 
            pointer-events: none;
        }

        .drawer-dock::part(panel) {
            box-shadow: 1px 0 0 #e5e5e5; 
            border-right: 1px solid #ccc;
        }

        .drawer-dock::part(body) {
            padding: 0;
            overflow: hidden;
        }

        #app {
            width: 100%;
            height: 100%;
            position: relative;
        }

        .rete {
            width: 100%;
            height: 100%;
            background-image: radial-gradient(#d1d5db 1px, transparent 0);
            background-size: 20px 20px;
            background-color: #f9fafb;
        }
    `;

    private reteRef = createRef<HTMLDivElement>();
    private editorInstance?: { 
        destroy: () => void; 
        zoomToNodes: () => Promise<void>;
        addNode: (type: string, x: number, y: number) => Promise<void>;
        process: () => Promise<void>;
     };

     async firstUpdated() {
        if (this.reteRef.value) {
            setTimeout(async () => {
                this.editorInstance = await createEditor(this.reteRef.value!);
            }, 50);
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.editorInstance?.destroy();
    }
    
    private handleDragOver(e: DragEvent) {
        e.preventDefault();
        e.dataTransfer!.dropEffect = "copy";
    }

    private async handleDrop(e: DragEvent) {
        e.preventDefault();
        const type = e.dataTransfer?.getData("nodeType");

        if (!this.editorInstance) {
            console.error("Debug Drop: Editor instance is undefined!");
            return;
        }

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
            } else {
                drawer.show();
            }
        }
    }

    render() {
        return html`
            <div 
                class="widget-container"
                @drop=${this.handleDrop} 
                @dragover=${this.handleDragOver}
            >
                <div class="controls">
                    <sl-icon 
                        src=${IconSquareRoundedPlus2} 
                        @click=${() => this.toggleDock()}
                    ></sl-icon>
                    
                    <span class="instruction">Hash Editor</span>
                    
                    <sl-icon
                        src=${IconFocus2}
                        @click=${() => this.editorInstance?.zoomToNodes()}
                    ></sl-icon>
                </div>

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

                <div id="app">
                    <div ${ref(this.reteRef)} class="rete"></div>
                </div>
            </div>
        `;
    }
}
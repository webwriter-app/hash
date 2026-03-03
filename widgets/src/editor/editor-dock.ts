import { LitElement, html, css, CSSResult} from "lit";
import { customElement, property } from "lit/decorators.js";
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";
import { styles } from "./editor-dock.styles";

@customElement("editor-dock")
export class EditorDock extends LitElement {
    
    @property({ type: Boolean }) allowSalting = false;

    static get scopedElements() {
        return {
            "sl-tooltip": SlTooltip,
        };
    }

    static get styles(): CSSResult[] {
        return [
            styles
        ];
    }

    private handleDragStart(e: DragEvent, type: string) {
        e.dataTransfer?.setData("nodeType", type);
        e.dataTransfer!.effectAllowed = "copy";
    }

    render() {
        return html`
            <div class="dock-header">Nodes</div>
            <div class="dock-instruction">
                Drag and drop the nodes into the editor
            </div>

            <sl-tooltip content="Required node for Hashing" placement="right-end" hoist>
                <div 
                    class="dock-item key" 
                    draggable="true" 
                    @dragstart=${(e: DragEvent) => this.handleDragStart(e, 'Key')}
                >
                    Key
                </div>
            </sl-tooltip>

            <sl-tooltip content="Optional node for Salting" placement="right-end" hoist>
                <div 
                    class="dock-item salt ${this.allowSalting ? '' : 'disabled'}" 
                    draggable="${this.allowSalting}" 
                    @dragstart=${(e: DragEvent) => this.handleDragStart(e, 'Salt')}
                >
                    Salt
                </div>
            </sl-tooltip>

            <sl-tooltip content="Required node for Hashing" placement="right-end" hoist>
                <div 
                    class="dock-item hash-function" 
                    draggable="true" 
                    @dragstart=${(e: DragEvent) => {
                        e.dataTransfer!.setData("nodeType", "HashFunction"); 
                    }}            
                >
                    Hash Function
                </div>
            </sl-tooltip>

            <sl-tooltip content="Required node for Hashing" placement="right-end" hoist>
                <div 
                    class="dock-item hash-value" 
                    draggable="true" 
                    @dragstart=${(e: DragEvent) => {
                        e.dataTransfer!.setData("nodeType", "HashValue"); 
                    }}              
                >
                    Hash Value
                </div>
            </sl-tooltip>
           
        `;
    }
}
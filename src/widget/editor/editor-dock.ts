import { LitElement, html, css, CSSResult} from "lit";
import { customElement, property } from "lit/decorators.js";
import { localized, msg } from "@lit/localize";
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";
import { styles } from "./editor-dock.styles";
import { nodeTitle } from "../nodes/node-titles";

@customElement("editor-dock")
@localized()
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

    render() {
        return html`
            <div class="dock-header">${msg("Nodes", { desc: "Header of the list of draggable nodes" })}</div>
            <div class="dock-instruction">
                ${msg("Drag and drop the nodes into the editor")}
            </div>

            <sl-tooltip content=${msg("Required node for Hashing")} placement="right-end" hoist>
                <div 
                    class="dock-item key" 
                    data-node-type="Key"
                >
                    ${nodeTitle("Key")}
                </div>
            </sl-tooltip>

            <sl-tooltip content=${msg("Optional node for Salting")} placement="right-end" hoist>
                <div 
                    class="dock-item salt ${this.allowSalting ? '' : 'disabled'}" 
                    data-node-type="Salt"
                >
                    ${nodeTitle("Salt")}
                </div>
            </sl-tooltip>

            <sl-tooltip content=${msg("Required node for Hashing")} placement="right-end" hoist>
                <div 
                    class="dock-item hash-function" 
                    data-node-type="HashFunction"
                >
                    ${nodeTitle("HashFunction")}
                </div>
            </sl-tooltip>

            <sl-tooltip content=${msg("Required node for Hashing")} placement="right-end" hoist>
                <div 
                    class="dock-item hash-value" 
                    data-node-type="HashValue"
                >
                    ${nodeTitle("HashValue")}
                </div>
            </sl-tooltip>
           
        `;
    }
}
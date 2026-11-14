import { connectMessages } from "../../../localization/localizer";
import { LitElement, html, css, CSSResult} from "lit";
import { customElement, property } from "lit/decorators.js";
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";
import { styles } from "./editor-dock.styles";
import { nodeTitle } from "../nodes/node-titles";

@customElement("editor-dock")

export class EditorDock extends LitElement {
  protected readonly msg = connectMessages(this);
    
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
            <div class="dock-header">${this.msg("Nodes", { desc: "Header of the list of draggable nodes" })}</div>
            <div class="dock-instruction">
                ${this.msg("Drag and drop the nodes into the editor")}
            </div>

            <sl-tooltip content=${this.msg("Required node for Hashing")} placement="right-end" hoist>
                <div 
                    class="dock-item key" 
                    data-node-type="Key"
                >
                    ${nodeTitle("Key", this.msg)}
                </div>
            </sl-tooltip>

            <sl-tooltip content=${this.msg("Optional node for Salting")} placement="right-end" hoist>
                <div 
                    class="dock-item salt ${this.allowSalting ? '' : 'disabled'}" 
                    data-node-type="Salt"
                >
                    ${nodeTitle("Salt", this.msg)}
                </div>
            </sl-tooltip>

            <sl-tooltip content=${this.msg("Required node for Hashing")} placement="right-end" hoist>
                <div 
                    class="dock-item hash-function" 
                    data-node-type="HashFunction"
                >
                    ${nodeTitle("HashFunction", this.msg)}
                </div>
            </sl-tooltip>

            <sl-tooltip content=${this.msg("Required node for Hashing")} placement="right-end" hoist>
                <div 
                    class="dock-item hash-value" 
                    data-node-type="HashValue"
                >
                    ${nodeTitle("HashValue", this.msg)}
                </div>
            </sl-tooltip>
           
        `;
    }
}
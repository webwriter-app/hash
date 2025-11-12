import { html, PropertyValues } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, property } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SLTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.component.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";
import { style } from "../hash-style";

@customElement("key-node")
export class KeyNode extends LitElementWw {

    static styles = style;

    static scopedElements = {
        "sl-textarea": SLTextarea,
        "sl-button": SlButton
    };

    @property({ type: String }) keyValue = "";
    @property({ type: Boolean, reflect: true }) isCreated = false;

    private onKeyChange = (e: Event) => {
        const target = e.target as HTMLTextAreaElement;
        this.keyValue = target.value;

        this.dispatchEvent(new CustomEvent("key-changed", {
            detail: { value: this.keyValue },
            bubbles: true,
            composed: true
        }));
    };

    private onInsert = (e: Event) => {
        e.stopPropagation();
        this.isCreated = true;  // Add this line
        this.requestUpdate("isCreated");

        this.dispatchEvent(new CustomEvent("e-insert-node", {
            detail: { kind: "key-node" },
            bubbles: true,
            composed: true
        }));
        console.log("Inserted key node");
    };

    protected updated(changed: PropertyValues<this>) {
        if (changed.has("isCreated")) {
            console.debug("[key-node] isCreated ->", this.isCreated);
        }
    }


    render() {
        return html`
            <div class="node-container key-node">
                <div class="header">Key</div>
                    <sl-textarea
                            placeholder="Enter key text"
                            .value=${this.keyValue}
                            @sl-input=${this.onKeyChange}
                    ></sl-textarea>
                    <div class="connection-point right"></div>
                </> 
            </div>
        `;
    }
}

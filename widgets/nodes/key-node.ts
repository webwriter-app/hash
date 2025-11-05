import { html, PropertyValues } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, property } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.component.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";

@customElement("key-node")
export class KeyNode extends LitElementWw {

    static scopedElements = {
        "sl-input": SlInput,
        "sl-button": SlButton
    };

    @property({ type: String }) keyValue = "";
    @property({ type: Boolean }) insertable = true;
    @property({ type: Boolean }) isPlaced = false;

    private onKeyChange = (e: Event) => {
        const input = e.currentTarget as SlInput;
        this.keyValue = String(input.value ?? "");
        this.dispatchEvent(new CustomEvent("key-changed", {
            detail: { value: this.keyValue },
            bubbles: true,
            composed: true
        }));
    };

    private onInsert = (e?: Event) => {
        e?.stopPropagation();
        if (!this.insertable || this.isPlaced) return;
        this.dispatchEvent(new CustomEvent("e-insert-node", {
            detail: { kind: "key-node" },
            bubbles: true,
            composed: true
        }));
    };

    render() {
        return html`
            <div class="node-container key-node" @click=${this.onInsert}>
                <div class="header">Key</div>
                ${this.insertable && !this.isPlaced ? html`
                    <div class="insert-button">
                        <sl-button size="large" circle> + </sl-button>
                    </div>
                ` : html`
                    <sl-input 
                            placeholder="Enter key text" 
                            .value=${this.keyValue} 
                            @sl-input=${this.onKeyChange}
                    ></sl-input>
                `} 
                ${this.isPlaced ? html`
                    <div class="connection-point right"></div>
                ` : ''}
            </div>
        `;
    }
}

import { html, PropertyValues } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, property } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.component.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";
import SlIconButton from "@shoelace-style/shoelace/dist/components/icon-button/icon-button.component.js";

@customElement("hash-value-node")
export class HashValueNode extends LitElementWw {

    static scopedElements = {
        "sl-input": SlInput,
        "sl-button": SlButton,
        "sl-icon-button": SlIconButton
    };

    @property({ type: String }) hashValue = "";
    @property({ type: Boolean }) insertable = true;
    @property({ type: Boolean }) isPlaced = false;

    private generateMockHash(input: string): string {
        // replace with robin's hash library
        const chars = 'abcdef0123456789';
        let result = '';
        for (let i = 0; i < 64; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    private onCopy = async () => {
        try {
            await navigator.clipboard.writeText(this.hashValue);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    private onInsert = (e?: Event) => {
        e?.stopPropagation();
        if (!this.insertable || this.isPlaced) return;
        this.dispatchEvent(new CustomEvent("e-insert-node", {
            detail: { kind: "hash-value-node" },
            bubbles: true,
            composed: true
        }));
    };

    updated(changedProperties: PropertyValues) {
        if (changedProperties.has('hashValue')) {
            // Mock hash update when connected
            if (this.isPlaced && changedProperties.get('hashValue') !== this.hashValue) {
                this.hashValue = this.generateMockHash(this.hashValue);
            }
        }
    }

    render() {
        return html`
            <div class="node-container hash-value-node" @click=${this.onInsert}>
                <div class="header">Hash Value</div>
                
                ${this.insertable && !this.isPlaced ? html`
                    <div class="insert-button">
                        <sl-button size="large" circle>+</sl-button>
                    </div>
                ` : html`
                    <div class="hash-output">
                        <sl-input 
                                readonly 
                                .value=${this.hashValue} 
                                placeholder="Hash will appear here"
                        ></sl-input>
                        <sl-icon-button 
                                name="copy" 
                                @click=${this.onCopy} 
                                label="Copy hash"
                        ></sl-icon-button>
                    </div>
                `} 
                ${this.isPlaced ? html`
                    <div class="connection-point left"></div>
                ` : ''}
            </div>
        `;
    }
}

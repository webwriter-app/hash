import { html, PropertyValues } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, property } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.component.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";
import SlIconButton from "@shoelace-style/shoelace/dist/components/icon-button/icon-button.component.js";
import {style} from "../hash-style";

@customElement("hash-value-node")
export class HashValueNode extends LitElementWw {

    static styles = style;
    static scopedElements = {
        "sl-textarea": SlTextarea,
        "sl-button": SlButton,
        "sl-icon-button": SlIconButton
    };

    @property({ type: String }) hashValue = "";
    @property({ type: Boolean, reflect: true }) isCreated = false;


    /*private generateMockHash(input: string): string {
        // replace with robin's hash library
        const chars = 'abcdef0123456789';
        let result = '';
        for (let i = 0; i < 64; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    private onInsert = () => {
        this.dispatchEvent(new CustomEvent("e-insert-node", {
            detail: { kind: "hash-value-node" },
            bubbles: true,
            composed: true
        }));
        console.log("Inserted hash value node");
    };


    updated(changedProperties: PropertyValues) {
        if (changedProperties.has('hashValue')) {
            // Mock hash update when connected
            if (this.isCreated && changedProperties.get('hashValue') !== this.hashValue) {
                this.hashValue = this.generateMockHash(this.hashValue);
            }
        }
    }
*/

    render() {
        return html`
            <div class="node-container hash-value-node" >
                <div class="header">Hash Value</div>
                    <sl-textarea class="hashed-result"
                            readonly 
                            .value=${this.hashValue} 
                            placeholder="Hashed value"
                            disabled="true"
                    ></sl-textarea>
                    
                    <div class="connection-point left"></div>
            </div>
        `;
    }
}

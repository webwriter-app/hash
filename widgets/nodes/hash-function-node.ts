import { html, PropertyValues } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, property } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlSelect from "@shoelace-style/shoelace/dist/components/select/select.component.js";
import SlOption from "@shoelace-style/shoelace/dist/components/option/option.component.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";
import {style} from "../hash-style";

@customElement("hash-function-node")
export class HashFunctionNode extends LitElementWw {

    static styles = style;
    static scopedElements = {
        "sl-select": SlSelect,
        "sl-option": SlOption,
        "sl-button": SlButton
    };

    @property({ type: String }) hashFunction = "sha256";
    @property({ type: Boolean, reflect: true }) isCreated = false;


    private onAlgorithmChange = (e: Event) => {
        const select = e.currentTarget as SlSelect;
        this.hashFunction = String(select.value ?? "");
        this.dispatchEvent(new CustomEvent("hash-function-changed", {
            detail: { algorithm: this.hashFunction },
            bubbles: true,
            composed: true
        }));
    };

    private onInsert = () => {
        this.dispatchEvent(new CustomEvent("e-insert-node", {
            detail: { kind: "hash-function-node" },
            bubbles: true,
            composed: true
        }));
        console.log("Inserted hash function node");
    };


    render() {
        return html`
            <div class="node-container hash-function-node" >
                <div class="header">Hash Function</div>
                    <sl-select 
                            placeholder="Select Hash" 
                            .value=${this.hashFunction} 
                            @sl-change=${this.onAlgorithmChange}
                    >
                        <sl-option value="sha256">SHA-256</sl-option>
                        <sl-option value="md5">MD5</sl-option>
                    </sl-select>
                <div class="connection-point left"></div>
                <div class="connection-point right"></div>
            </div>
        `;
    }
}

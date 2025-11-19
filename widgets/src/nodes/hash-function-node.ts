import { html, PropertyValues } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, property, state } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlSelect from "@shoelace-style/shoelace/dist/components/select/select.component.js";
import SlOption from "@shoelace-style/shoelace/dist/components/option/option.component.js";
import SlButton from "@shoelace-style/shoelace/dist/components/button/button.component.js";
import "../../hash-styles.css";
import "../styles.css";

@customElement("hash-function-node")
export class HashFunctionNode extends LitElementWw {
    static scopedElements = {
        "sl-select": SlSelect,
        "sl-option": SlOption,
        "sl-button": SlButton
    };

    @state() selectedHash = "sha256";
    @property({ type: Boolean, reflect: true }) isCreated = false;

    static hashOptions = [
        { value: "sha256", label: "SHA-256" },
        { value: "sha224", label: "SHA-224" },
        { value: "sha384", label: "SHA-384" },
        { value: "sha512", label: "SHA-512" },
        { value: "sha512_256", label: "SHA-512/256" },
        { value: "sha3_256", label: "SHA3-256" },
        { value: "sha3_224", label: "SHA3-224" },
        { value: "sha3_384", label: "SHA3-384" },
        { value: "sha3_512", label: "SHA3-512" },
        { value: "keccak_256", label: "Keccak-256" },
        { value: "sha1", label: "SHA-1" },
        { value: "blake3", label: "BLAKE3" },
    ];

    private onAlgorithmChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        this.selectedHash = target.value;

        this.dispatchEvent(new CustomEvent("hash-function-changed", {
            detail: { algorithm: this.selectedHash },
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
                    value=${this.selectedHash}
                    @sl-change=${this.onAlgorithmChange}
                    hoist
            >
                ${HashFunctionNode.hashOptions.map(
                        (option) => html`
                        <sl-option value=${option.value}>${option.label}</sl-option>
                    `
                )}
            </sl-select>
                <div class="connection-point left"></div>
                <div class="connection-point right"></div>
                </div>
            </div>
            
        `;
    }
}

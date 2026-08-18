import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { localized, msg } from "@lit/localize";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlSelect from "@shoelace-style/shoelace/dist/components/select/select.js";
import SlOption from "@shoelace-style/shoelace/dist/components/option/option.js";

@customElement("hash-function-node")
@localized()
export class HashFunctionNodeUI extends LitElement {
    @property() value: string = "sha256";

    static get scopedElements() {
        return { "sl-select": SlSelect, "sl-option": SlOption };
    }

    private onSelectChange(e: any) {
        this.dispatchEvent(new CustomEvent('val-change', { 
            detail: { value: e.target.value },
            bubbles: true, 
            composed: true 
        }));
    }

    render() {
        return html`
            <sl-select placeholder=${msg("Select a hash function")} .value=${this.value} @sl-change=${this.onSelectChange}>
                <sl-option value="sha1">SHA-1</sl-option>
                <sl-option value="sha256">SHA-256</sl-option>
                <sl-option value="sha384">SHA-384</sl-option>
                <sl-option value="sha512">SHA-512</sl-option>
                <sl-option value="sha3_256">SHA3-256</sl-option>
                <sl-option value="keccak_256">Keccak-256</sl-option>
                <sl-option value="blake3">BLAKE3</sl-option>
            </sl-select>
        `;
    }
}
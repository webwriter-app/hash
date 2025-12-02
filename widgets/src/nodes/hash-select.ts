import { css, html, LitElement } from "lit";
import {LitElementWw} from "@webwriter/lit";
import { customElement } from "lit/decorators.js";
import SlSelect from "@shoelace-style/shoelace/dist/components/select/select.component.js";
import SlOption from "@shoelace-style/shoelace/dist/components/option/option.component.js";
import "@shoelace-style/shoelace/dist/themes/light.css";

@customElement("hash-select")
export class HashSelect extends LitElementWw {

    static get scopedElements() {
        return {
            "sl-select": SlSelect,
            "sl-option": SlOption
        };
    }

    render() {
        return html`
            <sl-select
                    placeholder="Select a hash function"
                    
                    @sl-change=${this.onSelectChange}
            >
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
    private onSelectChange(e: CustomEvent) {
    }
}


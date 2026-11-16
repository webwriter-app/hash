import { html } from "lit";
import { NodeContent } from "./node-content";
import { property } from "lit/decorators.js";
import { widgetMsg } from "@webwriter/lit/localize";

export class HashFunctionNodeUI extends NodeContent {
  protected readonly msg = widgetMsg(this);
    @property() accessor value: string = "sha256";

    private onSelectChange(e: any) {
        this.dispatchEvent(new CustomEvent('val-change', { 
            detail: { value: e.target.value },
            bubbles: true, 
            composed: true 
        }));
    }

    render() {
        return html`
            <sl-select placeholder=${this.msg("Select a hash function")} .value=${this.value} @sl-change=${this.onSelectChange}>
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
import { css, html, LitElement } from "lit";
import {LitElementWw} from "@webwriter/lit";
import { customElement } from "lit/decorators.js";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.component.js";
import "@shoelace-style/shoelace/dist/themes/light.css";

@customElement("hash-input")
export class HashInput extends LitElementWw {

    static get scopedElements() {
        return {
            "sl-input": SlInput,
        };
    }

    render() {
        return html`
            <sl-input
                    placeholder="Enter key…"
                    @sl-input=${this.onInputChange}
            ></sl-input>
        `;
    }

    private onInputChange(e: Event) {
    }
}


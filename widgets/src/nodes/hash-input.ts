import { css, html, LitElement } from "lit";
import {LitElementWw} from "@webwriter/lit";
import { customElement } from "lit/decorators.js";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.component.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.component.js";

@customElement("hash-input")
export class HashInput extends LitElementWw {

    static get scopedElements() {
        return {
            "sl-input": SlInput,
            "sl-textarea": SlTextarea,

        };
    }

    render() {
        return html`
            <!--<sl-input
                    placeholder="Enter key…"
                    @sl-input=${this.onInputChange}
            ></sl-input>-->
            <sl-textarea
                    placeholder="Enter a key to hash"
                    readonly
            ></sl-textarea>
        `;
    }

    private onInputChange(e: Event) {
    }
}
import { css, html, LitElement } from "lit";
import {LitElementWw} from "@webwriter/lit";
import { customElement } from "lit/decorators.js";
import SlTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.component.js";
import "@shoelace-style/shoelace/dist/themes/light.css";

@customElement("hash-textarea")
export class HashTextarea extends LitElementWw {

    static get scopedElements() {
        return {
            "sl-textarea": SlTextarea,
        };
    }

    render() {
        return html`
            <sl-textarea
                    placeholder="Resulting hash value"
                    readonly
            ></sl-textarea>
        `;
    }
}


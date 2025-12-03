import { css, html, LitElement } from "lit";
import {LitElementWw} from "@webwriter/lit";
import { customElement, property } from "lit/decorators.js";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.component.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.component.js";

@customElement("hash-input")
export class HashInput extends LitElementWw {
    @property() value: string = "";
    static get scopedElements() {
        return {
            "sl-input": SlInput,
            "sl-textarea": SlTextarea,
        };
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;
        }
        sl-textarea {
            width: 100%;
        }
    `;

    render() {
        return html`
            <!--<sl-input
                    placeholder="Enter key…"
                    @sl-input=${this.onInputChange}
            ></sl-input>-->
            <sl-textarea
                    placeholder="Enter a key to hash"
                    .value=${this.value}
                    @sl-input=${this.onInputChange}
                    @pointerdown=${(e: Event) => e.stopPropagation()}
            ></sl-textarea>
        `;
    }

    private onInputChange(e: any) {
        this.dispatchEvent(new CustomEvent('val-change', {
            detail: { value: e.target.value }
        }));
        console.log("Input changed:", e.target.value);
    }
}
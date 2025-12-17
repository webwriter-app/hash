import { css, html } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, property } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.js";
import SlTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.js";

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
            height: 125px; 
        }

        sl-textarea {
            width: 100%;
            height: 100%;
        }

        sl-textarea::part(textarea) {
            height: 100%;
            word-break: break-all;
            overflow-y: auto;
        }

        sl-textarea::part(textarea)::-webkit-scrollbar {
            width: 6px;
        }
        sl-textarea::part(textarea)::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
        }
        sl-textarea::part(textarea)::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 3px;
        }
        sl-textarea::part(textarea)::-webkit-scrollbar-thumb:hover {
            background: #999;
        }
    `;

    render() {
        return html`
            <sl-textarea
                    placeholder="Enter a key..."
                    resize="none" 
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
    }
}
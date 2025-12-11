import { css, html, LitElement } from "lit";
import {LitElementWw} from "@webwriter/lit";
import { customElement, property, query } from "lit/decorators.js";
import SlTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.component.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { live } from "lit/directives/live.js";

@customElement("hash-textarea")
export class HashTextarea extends LitElementWw {
    @property() value: string = "";
    static get scopedElements() {
        return {
            "sl-textarea": SlTextarea,
        };
    }

    static styles = css`
        :host {
            display: block; /* Essential for the component to take up space */
            width: 100%;
        }
        sl-textarea {
            width: 100%;
        }
    `;


    render() {
        return html`
          <sl-textarea
                    placeholder="Resulting hash value"
                    readonly 
                    .value=${live(this.value)}
            ></sl-textarea>
        
            <div style="font-size: 10px; color: green;">Raw Value: ${this.value}</div>
        `;
    }
}


import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import type { Position } from "@retejs/lit-plugin";

@customElement("node-connection")
export class NodeConnection extends LitElement {
    static get properties() {
        return {
            start: { type: Object },
            end: { type: Object },
            path: { type: String }
        };
    }

    declare start: Position;
    declare end: Position;
    declare path: string;

    static styles = css`
       /* :host {
            position: absolute;
            pointer-events: none;
        }*/

        svg {
            overflow: visible;
            pointer-events: none;
        }

        path {
            fill: none;
            stroke-width: 3px;
            stroke: black;
            pointer-events: auto;
        }
    `;

    render() {
        return html`
            <svg data-testid="connection">
                <path d=${this.path}></path>
            </svg>
        `;
    }
}
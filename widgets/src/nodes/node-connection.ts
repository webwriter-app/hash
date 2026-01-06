import { html, css, LitElement, PropertyDeclarations } from "lit";
import { customElement, property} from "lit/decorators.js";
import type { Position } from "@retejs/lit-plugin";

@customElement("node-connection")
export class NodeConnection extends LitElement {
   
    static get properties(): PropertyDeclarations {
        return {
            start: { type: Object },
            end: { type: Object },
            path: { type: String },
            data: { type: Object }
        };
    }

    declare start: Position;
    declare end: Position;
    declare path: string;
    declare data: any;

    static styles = css`
        :host {
            position: absolute;
            pointer-events: none;
            z-index: -1;
        }
        svg {
            overflow: visible !important;
            position: absolute;
            pointer-events: none;
            width: 9999px;
            height: 9999px;
        }
        path {
            fill: none;
            stroke-width: 3px;
            stroke: grey;
            pointer-events: auto;
        }
        path:hover {
            stroke-width: 4px;
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

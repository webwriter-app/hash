import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("node-socket")
export class NodeSocket extends LitElement {
    static get properties() {
        return {
            data: { type: Object },
            emit: { attribute: false }
        };
    }

    declare data: { name?: string } | any;
    declare emit: ((type: string, payload: any) => void) | null;

    static styles = css`
    :host {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: white;
      box-sizing: border-box;
      border: 2px solid #3b4451;
    }
    :host(:hover) {
      background: lightgrey;
    }
  `;

    render() {
        return html` <div title="${this.data?.name ?? ""}"></div> `;
    }
}
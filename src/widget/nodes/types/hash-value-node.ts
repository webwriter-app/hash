import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.js";
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";
import IconCopy from "@tabler/icons/outline/copy.svg";


@customElement("hash-value-node")
export class HashValueNodeUI extends LitElement {
  @property({ type: String }) accessor value: string = "";

  static get scopedElements() {
    return { "sl-icon": SlIcon, "sl-tooltip": SlTooltip };
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
    }
    .data-box {
      box-sizing: border-box;
      display: block;
      width: 100%;
      border: 1px solid #d4d4d8;
      background: #fcfcfc;
      border-radius: 4px;
      font-family: sans-serif;
      font-size: medium;
      color: #3f3f48;
      padding: 6px 8px;
      height: 125px;
      resize: none;
      white-space: pre-wrap;
      word-break: break-all;
      cursor: not-allowed;
    }
    .data-box:focus {
      outline: none;
    }
    .copy-button {
      position: absolute;
      bottom: 8px;
      right: 8px;
      cursor: pointer;
      color: #555;
    }
    .copy-button:hover {
      color: #39bdf8;
    }

    sl-tooltip {
      --sl-tooltip-arrow-size: 0;
      --show-delay: 1000ms;
    }
    sl-tooltip::part(body) {
      background: #f1f1f1;
      border: #a1a1aa 1px solid;
      color: #131316;
      font-size: 14px;
      font-family: sans-serif;
    }
  `;

  private async handleCopy() {
    if (this.value) await navigator.clipboard.writeText(this.value);
  }

  render() {
    return html`
      <textarea
        placeholder="Hashed value result"
        class="data-box"
        readonly
        .value=${this.value}
      ></textarea>
      <sl-tooltip content="Copy to clipboard" placement="right-end">
        <sl-icon
          src=${IconCopy}
          @click=${this.handleCopy}
          class="copy-button"
        ></sl-icon>
      </sl-tooltip>
    `;
  }
}
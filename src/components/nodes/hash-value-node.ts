import { css, html } from "lit";
import { NodeContent } from "./node-content";
import { property } from "lit/decorators.js";
import { widgetMsg } from "@webwriter/lit/localize";
import IconCopy from "@tabler/icons/outline/copy.svg";


export class HashValueNodeUI extends NodeContent {
  protected readonly msg = widgetMsg(this);
  @property({ type: String }) accessor value: string = "";

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
      font-family: inherit;
      font-size: medium;
      color: var(--ww-text-color, #3f3f48);
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
      display: grid;
      place-items: center;
      min-width: 28px;
      min-height: 28px;
      padding: 0;
      border: 0;
      background: transparent;
      font-size: 1rem;
      cursor: pointer;
      color: #555;
    }
    .copy-button:hover {
      color: var(--ww-theme-accent-1, #39bdf8);
    }
    .copy-button:focus-visible {
      outline: 2px solid var(--ww-theme-accent-1, #39bdf8);
      outline-offset: 0;
    }
    @media (pointer: coarse) {
      .copy-button {
        bottom: 4px;
        right: 4px;
        min-width: 44px;
        min-height: 44px;
      }
    }
    @media print {
      .copy-button {
        display: none;
      }
      .data-box {
        height: auto;
        min-height: 3rem;
      }
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
      font-family: inherit;
    }
  `;

  private get displayValue() {
    return this.value === "Error"
      ? this.msg("Error", { desc: "Shown instead of a hash value when hashing fails" })
      : this.value;
  }

  private async handleCopy() {
    if (this.displayValue) await navigator.clipboard.writeText(this.displayValue);
  }

  render() {
    return html`
      <textarea
        placeholder=${this.msg("Hashed value result")}
        class="data-box"
        readonly
        .value=${this.displayValue}
      ></textarea>
      <sl-tooltip content=${this.msg("Copy to clipboard")} placement="right-end">
        <button type="button" class="copy-button" aria-label=${this.msg("Copy to clipboard")} @click=${this.handleCopy}>
          <sl-icon src=${IconCopy}></sl-icon>
        </button>
      </sl-tooltip>
    `;
  }
}
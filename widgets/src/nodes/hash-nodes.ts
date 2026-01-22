import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ClassicScheme } from "@retejs/lit-plugin";
import "@shoelace-style/shoelace/dist/themes/light.css";

import SlSelect from "@shoelace-style/shoelace/dist/components/select/select.js";
import SlOption from "@shoelace-style/shoelace/dist/components/option/option.js";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.js";
import SlTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.js";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.js";
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";

import IconTrashFilled from "@tabler/icons/outline/trash.svg";
import IconCopy from "@tabler/icons/outline/copy.svg";

import { HashInput } from "./hash-input";
import { HashSelect } from "./hash-select";
import { HashTextarea } from "./hash-textarea";

type NodeExtraData = { width?: number; height?: number };

@customElement("hash-node")
export class HashNode extends LitElement {
  @property({ attribute: false }) process!: () => void;
  @property({ attribute: false }) deleteNode!: () => void;
  @property({ type: Boolean }) isEditingTitle = false;

  @property({ type: Boolean, attribute: true, reflect: true })
  accessor canDelete;
  @property({ type: Boolean, reflect: true }) accessor isAuthor;

  static get scopedElements() {
    return {
      "hash-input": HashInput,
      "hash-select": HashSelect,
      "hash-textarea": HashTextarea,
      "sl-icon": SlIcon,
      "sl-select": SlSelect,
      "sl-option": SlOption,
      "sl-input": SlInput,
      "sl-textarea": SlTextarea,
      "sl-tooltip": SlTooltip,
    };
  }

  static get properties() {
    return {
      width: { type: Number },
      height: { type: Number },
      data: { type: Object },
      emit: { attribute: false },
    };
  }

  declare width: number;
  declare height: number;
  declare data: ClassicScheme["Node"] & NodeExtraData;
  declare emit: ((type: string, payload: any) => void) | null;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      border: 2px solid grey;
      border-radius: 10px;
      padding: 6px;
      position: relative;
      background: white;
      box-sizing: border-box;
      min-width: 200px; 
      min-height: 100px;
      transition: height 0.1s ease-out; 
    }
    :host(.key) {
      background: #f3f7f9;
      border-color: #085886;
    }
    :host(.hash-function) {
      background: #fdf8ef;
      border-color: #e78c1f;
    }
    :host(.hash-value) {
      background: #eef0f2;
      border-color: #0f3048;
      width: 110%;
    }

    .title {
        padding: 8px 28px; 
        font-weight: bold;
        text-align: center;
        min-height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        cursor: text;
        width: 100%;
        box-sizing: border-box;
        white-space: normal;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word; 
        line-height: 1.2;
    }

    .title-input {
        width: 100%;
        max-width: 160px;
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
        border: none;
        border-radius: 4px;
        outline: none;
        background: transparent
    }

    textarea {
      display: block;
      width: 97%;
      height: 125px;
      border: 1px solid #d4d4d8;
      border-radius: 4px;
      font-family: sans-serif;
      font-size: medium;
      word-break: break-all;
      white-space: pre-wrap;
      resize: none;
      color: #3f3f48;
    }

    .delete-button {
      position: absolute;
      top: 14px;
      right: 7px;
      font-size: 1.2rem;
      color: #555;
      cursor: pointer;
    }
    .delete-button:hover {
      color: #39bdf8;
    }

    .delete-button.disabled {
      color: #ccc;
      pointer-events: none;
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

    .socket-container {
      display: flex;
      justify-content: space-between;
      margin-top: auto;
    }
    sl-tooltip {
      --sl-tooltip-arrow-size: 0;
      --show-delay:1000ms;
    }
  
    sl-tooltip::part(body) {
      background: #f1f1f1;
      border: #a1a1aa 1px solid;
      color: #131316;
      font-size: 14px;
      font-family: sans-serif;
    }  
  `;

  private dispatchNodeChange(key: string, value: any) {
    this.dispatchEvent(
      new CustomEvent("node-change", {
        bubbles: true,
        composed: true,
        detail: { nodeId: this.data.id, label: this.data.label, key, value },
      })
    );
  }

  private handleInput(e: CustomEvent) {
    (this.data as any).value = e.detail.value;
    this.dispatchNodeChange("value", e.detail.value);
    this.process?.();
  }

  private handleSelect(e: CustomEvent) {
    (this.data as any).selectedFunction = e.detail.value;
    this.dispatchNodeChange("selectedFunction", e.detail.value);
    this.process?.();
  }

  private async handleCopy() {
    const value = (this.data as any).displayValue || "";
    if (value) await navigator.clipboard.writeText(value);
  }

  private toggleEditTitle() {
    if (this.isAuthor) this.isEditingTitle = true;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this.handleTitleChange({
        target: { value: (e.target as HTMLInputElement).value },
      });
    } else if (e.key === "Escape") {
      this.isEditingTitle = false;
    }
  }

  private handleTitleChange(e: any) {
    const newTitle = e.target.value;
    if (this.data) {
      (this.data as any).customTitle = newTitle;
      this.dispatchNodeChange("customTitle", newTitle); 
      this.isEditingTitle = false;
      
      this.requestUpdate(); 
      setTimeout(() => this.process?.(), 0);
    } 
  }

  renderNodeContent() {
    const { label } = this.data;
    const data = this.data as any;
    if (label === "Key") 
      return html`<hash-input
        .value=${data.value || ""}
        @val-change=${this.handleInput}
        ></hash-input>`;

    if (label === "HashFunction")
      return html`<hash-select
        .value=${data.selectedFunction || "sha256"}
        @val-change=${this.handleSelect}
      ></hash-select>`;

    if (label === "HashValue")
      return html` <textarea
        placeholder="Hashed value result"
        readonly
        .value=${data.displayValue || ""}
        ></textarea>
        <sl-tooltip content="Copy to clipboard" placement="right-end">
          <sl-icon
            src=${IconCopy}
            @click=${this.handleCopy}
            class="copy-button"
          ></sl-icon>
          </sl-tooltip>`;
    
    return html``;
  }

  render() {
    const { id, label, width, height, selected, inputs = {}, outputs = {}, } = this.data;
    const nodeClass =
      label === "Key"
        ? "key"
        : label === "HashFunction"
        ? "hash-function"
        : label === "HashValue"
        ? "hash-value"
        : "";
    this.className = `${nodeClass} ${selected ? "selected" : ""}`;

    const displayTitle =
      (this.data as any).customTitle ||
      (label === "HashFunction"
        ? "Hash Function"
        : label === "HashValue"
        ? "Hash Value"
        : label);

    return html`
      <style>
        :host {
          width: ${width ? `${width}px` : "200px"};
          height: ${height ? `${height}px` : "auto"};
        }
      </style>
      <div class="title" @click=${this.toggleEditTitle}>
        ${this.isEditingTitle
          ? html`<input
              class="title-input"
              .value=${displayTitle}
              @blur=${this.handleTitleChange}
              @keydown=${this.handleKeyDown}
              @pointerdown=${(e: Event) => e.stopPropagation()}
              autofocus
            />`
          : html`<span style="max-width: 100%">${displayTitle}</span>`}
      </div>

      ${this.canDelete || this.isAuthor
        ? html` <sl-tooltip content="Delete node" placement="top-start">
            <sl-icon
              class="delete-button ${!this.canDelete && this.isAuthor
                ? "disabled"
                : ""}"
              src=${IconTrashFilled}
              @pointerdown=${(e: Event) => e.stopPropagation()}
              @click=${this.canDelete ? this.deleteNode : null}
            ></sl-icon>
          </sl-tooltip>`
        : ""}
      ${this.renderNodeContent()}

      <div class="socket-container">
        <div class="inputs">
          ${Object.entries(inputs)
            .sort()
            .map(
              ([key, input]: any) => html` <div
                class="socket-row"
                title="${key}"
              >
                <rete-ref
                  .emit=${this.emit}
                  .data=${{
                    type: "socket",
                    side: "input",
                    key,
                    nodeId: id,
                    payload: input.socket,
                  }}
                ></rete-ref>
              </div>`
            )}
        </div>
        <div class="outputs">
          ${Object.entries(outputs)
            .sort()
            .map(
              ([key, output]: any) => html` <div
                class="socket-row"
                title="${key}"
              >
                <rete-ref
                  .emit=${this.emit}
                  .data=${{
                    type: "socket",
                    side: "output",
                    key,
                    nodeId: id,
                    payload: output.socket,
                  }}
                ></rete-ref>
              </div>`
            )}
        </div>
      </div>
    `;
  }
}

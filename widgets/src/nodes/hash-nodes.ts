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
import IconRefresh from "@tabler/icons/outline/refresh.svg";

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
      font-family: sans-serif;
    }

    /* Node Colors */
    :host(.key) { background: #f3f7f9; border-color: #085886; }
    :host(.hash-function) { background: #fdf8ef; border-color: #e78c1f; }
    :host(.hash-value) { background: #eef0f2; border-color: #0f3048; width: 110%; }
    :host(.salt) { background: #e8f5e9; border: 2px #2e7d32 dashed; }

    /* Title Styling */
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
        overflow-wrap: break-word;
        line-height: 1.2;
    }

    .title-input {
        width: 100%;
        max-width: 160px;
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
        border: none;
        outline: none;
        background: transparent;
    }

    /* Reusable Box for Textarea (HashValue) */
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
    }
    .data-box:focus { outline: none; }
    
    textarea.data-box {
      height: 125px;
      resize: none;
      white-space: pre-wrap;
      word-break: break-all;
      cursor: not-allowed;
    }

    /* Salt Layout */
    .salt-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 4px;
        cursor: not-allowed;
    }

    /* RICH TEXT INPUT SIMULATION */
    /* Mimics Shoelace Label */
    .shoelace-label {
        font-size: var(--sl-input-label-font-size-small, 0.85rem);
        color: var(--sl-input-label-color, black);
        font-weight: 500;
        margin-bottom: 2px;
        display: block;
    }

    /* Mimics the style of .data-box (Hash Value) and Hash Input */
    .salt-key-input {
        display: block;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #d4d4d8; 
        border-radius: 4px;
        background-color: white; 
        font-family: sans-serif;
        font-size: medium; 
        color: #3f3f48;    
        padding: 6px 8px; 
        line-height: 1.4;
        word-break: break-all;
        overflow-y: scroll;
        cursor: not-allowed;
        height: 125px;
    }

    .salt-key-input::-webkit-scrollbar {
      width: 6px;
    }

    .salt-key-input::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    .salt-key-input::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 3px;
    }

    .salt-key-input:hover {
      border-color: var(--sl-input-border-color-hover, #a8aaad);
    }

    /* Text Coloring Classes */
    .key-part { color: inherit; } 
    .salt-part { font-weight: bold; color: black; } 
    .placeholder { color: #aaa; font-style: italic; }


    /* Buttons & Icons */
    .icon-btn {
        cursor: pointer;
        color: #555;
    }
    .icon-btn:hover { color: #39bdf8; }

    .delete-button {
      position: absolute;
      top: 14px;
      right: 7px;
      font-size: 1.2rem;
      z-index: 50; 
    }
    .delete-button.disabled { color: #ccc; pointer-events: none; }

    .copy-button {
      position: absolute;
      bottom: 8px;
      right: 8px;
    }

    /* Shoelace overrides */
    sl-input::part(form-control-label) {
        font-size: 0.85rem;
        color: black;
        font-weight: 600;
        margin-bottom: 2px;
    }
    sl-input::part(base) {
        background: white;
        border-color: #d3d3d3;
    }

    .refresh-icon {
        font-size: 1.1rem;
        cursor: pointer;
        padding: 2px;
    }
    .refresh-icon:hover {
        color: #2e7d32;
    }

    /* Rete Sockets */
    .socket-container {
      display: flex;
      justify-content: space-between;
      margin-top: auto;
      padding-top: 8px;
    }
    
    sl-tooltip { --sl-tooltip-arrow-size: 0; --show-delay:1000ms; }
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

  private regenerateSalt() {
     (this.data as any).saltValue = Math.random().toString(36).substring(2, 9);
     this.requestUpdate();
     this.process?.();
  }

  renderNodeContent() {
    const { label } = this.data;
    const data = this.data as any;
    if (label === "Key") 
      return html`<hash-input
        .value=${data.value || ""}
        @val-change=${this.handleInput}
        @wheel=${(e: Event) => e.stopPropagation()}
        ></hash-input>`;

    if (label === "HashFunction")
      return html`<hash-select
        .value=${data.selectedFunction || "sha256"}
        @val-change=${this.handleSelect}
      ></hash-select>`;

    if (label === "HashValue")
      return html` <textarea
        placeholder="Hashed value result"
        class="data-box"
        readonly
        .value=${data.displayValue || ""}
        ></textarea>
        <sl-tooltip content="Copy to clipboard" placement="right-end">
          <sl-icon
            src=${IconCopy}
            @click=${this.handleCopy}
            class="copy-button icon-btn"
          ></sl-icon>
          </sl-tooltip>`;

    if (label === "Salt") {
        const salt = data.saltValue || "";
        const incoming = data.incomingValue || "";
        
        return html`
            <div class="salt-container">
                <sl-input 
                    label="Salt text" 
                    readonly 
                    .value=${salt}
                    @pointerdown=${(e: Event) => e.stopPropagation()}
                >
                    <sl-icon 
                        slot="suffix" 
                        src="${IconRefresh}" 
                        class="refresh-icon" 
                        @click=${this.regenerateSalt}
                    ></sl-icon>
                </sl-input>

                <div>
                    <label class="shoelace-label">Key + <b>Salt</b></label>
                    <div class="salt-key-input" @wheel=${(e: Event) => e.stopPropagation()}>
                        ${!incoming && !salt ? html`<span class="placeholder">Key input + Salt</span>` : ''}
                        <span class="key-part">${incoming}</span><span class="salt-part">${salt}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    return html``;
  }

  render() {
    const { id, label, width, height, selected, inputs = {}, outputs = {}, } = this.data;
    const nodeClass =
      label === "Key" ? "key"
        : label === "HashFunction" ? "hash-function"
        : label === "HashValue" ? "hash-value"
        : label === "Salt" ? "salt"
        : "";
    this.className = `${nodeClass} ${selected ? "selected" : ""}`;

    const displayTitle =
      (this.data as any).customTitle ||
      (label === "HashFunction" ? "Hash Function"
        : label === "HashValue" ? "Hash Value"
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
              class="delete-button icon-btn ${!this.canDelete && this.isAuthor
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
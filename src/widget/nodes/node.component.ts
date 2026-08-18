import { css, html, LitElement, CSSResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { localized, msg } from "@lit/localize";
import { ClassicScheme } from "@retejs/lit-plugin";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.js";
import SlTooltip from "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";

import IconTrashFilled from "@tabler/icons/outline/trash.svg";

import { KeyNodeUI } from "./types/key-node";
import { HashFunctionNodeUI } from "./types/hash-function-node.ts";
import { HashValueNodeUI } from "./types/hash-value-node";
import { SaltNodeUI } from "./types/salt-node";
import { styles } from "./node.styles";
import { displayNodeTitle } from "./node-titles";

type NodeExtraData = { width?: number; height?: number };

@customElement("hash-node")
@localized()
export class HashNode extends LitElement {
  @property({ attribute: false }) process!: () => void;
  @property({ attribute: false }) deleteNode!: () => void;
  @property({ type: Boolean }) isEditingTitle = false;

  @property({ type: Boolean, attribute: true, reflect: true })
  accessor canDelete: boolean = false;
  @property({ type: Boolean, reflect: true }) accessor isAuthor: boolean = false;

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

  public static get styles(): CSSResult[] {
    return [
      styles,
    ];
  }

  static get scopedElements() {
    return {
      "sl-icon": SlIcon,
      "sl-tooltip": SlTooltip,
      "key-node": KeyNodeUI,
      "hash-function-node": HashFunctionNodeUI,
      "hash-value-node": HashValueNodeUI,
      "salt-node": SaltNodeUI,
    };
  }


  // state dispatcher 
  private dispatchNodeChange(key: string, value: any) {
    this.dispatchEvent(
      new CustomEvent("node-change", {
        bubbles: true,
        composed: true,
        detail: { nodeId: this.data.id, label: this.data.label, key, value },
      })
    );
  }

  // event handlers from child component 
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

  private regenerateSalt() {
    (this.data as any).saltValue = Math.random().toString(36).substring(2, 9);
    this.requestUpdate();
    this.process?.();
 }

  // edit node title 
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

    switch (label) {
      case "Key":
        return html`<key-node .value=${data.value || ""} @val-change=${this.handleInput}></key-node>`;
      case "HashFunction":
        return html`<hash-function-node .value=${data.selectedFunction || "sha256"} @val-change=${this.handleSelect}></hash-function-node>`;
      case "HashValue":
        return html`<hash-value-node .value=${data.displayValue || ""}></hash-value-node>`;
      case "Salt":
        return html`<salt-node .salt=${data.saltValue || ""} .incoming=${data.incomingValue || ""} @refresh=${this.regenerateSalt}></salt-node>`;
      default:
        return html``;
      }
    }
  

  render() {
    const { id, label, width, height, selected, inputs = {}, outputs = {}, } = this.data;
    
    //  css styling classes
    const nodeClass =
      label === "Key" ? "key"
        : label === "HashFunction" ? "hash-function"
        : label === "HashValue" ? "hash-value"
        : label === "Salt" ? "salt" : "";
    
    this.className = `${nodeClass} ${selected ? "selected" : ""}`;

    const displayTitle = displayNodeTitle(label, (this.data as any).customTitle);

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
        ? html` <sl-tooltip content=${msg("Delete node")} placement="top-start">
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
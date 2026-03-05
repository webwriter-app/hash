import { css, html, LitElement } from "lit";
import { customElement, property, eventOptions } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.js";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.js";
import IconRefresh from "@tabler/icons/outline/refresh.svg";

@customElement("salt-node")
export class SaltNodeUI extends LitElement {
  @property({ type: String }) accessor salt: string = "";
  @property({ type: String }) accessor incoming: string = "";

  static get scopedElements() {
    return { "sl-input": SlInput, "sl-icon": SlIcon };
  }

  static styles = css`
    .salt-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 4px;
      cursor: not-allowed;
    }
    .shoelace-label {
      font-size: 0.85rem;
      color: black;
      font-weight: 500;
      margin-bottom: 2px;
      display: block;
    }
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
    .key-part {
      color: inherit;
    }
    .salt-part {
      font-weight: bold;
      color: black;
    }
    .placeholder {
      color: #aaa;
      font-style: italic;
    }
    .refresh-icon {
      font-size: 1.1rem;
      cursor: pointer;
      padding: 2px;
      color: #555;
    }
    .refresh-icon:hover {
      color: #2e7d32;
    }
  `;

  @eventOptions({ passive: true })
  private handleWheel(e: WheelEvent) {
    e.stopPropagation();
  }

  private triggerRefresh(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("refresh", { bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <div class="salt-container">
        <sl-input
          label="Salt text"
          readonly
          .value=${this.salt}
          @pointerdown=${(e: Event) => e.stopPropagation()}
        >
          <sl-icon
            slot="suffix"
            src="${IconRefresh}"
            class="refresh-icon"
            @click=${this.triggerRefresh}
          ></sl-icon>
        </sl-input>

        <div>
          <label class="shoelace-label">Key + <b>Salt</b></label>
          <div class="salt-key-input" @wheel=${this.handleWheel}>
            ${!this.incoming && !this.salt
              ? html`<span class="placeholder">Key input + Salt</span>`
              : ""}
            <span class="key-part">${this.incoming}</span
            ><span class="salt-part">${this.salt}</span>
          </div>
        </div>
      </div>
    `;
  }
}
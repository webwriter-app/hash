import { css, html, LitElement } from "lit";
import { customElement, property, eventOptions } from "lit/decorators.js";
import { localized, msg } from "@lit/localize";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.js";

@customElement("key-node")
@localized()
export class KeyNodeUI extends LitElement {
  @property() value: string = "";

  static get scopedElements() {
    return { "sl-textarea": SlTextarea };
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 125px;
    }
    sl-textarea {
      width: 100%;
      height: 100%;
    }
    sl-textarea::part(textarea) {
      height: 100%;
      word-break: break-all;
      overflow-y: auto;
    }
    sl-textarea::part(textarea)::-webkit-scrollbar {
      width: 6px;
    }
    sl-textarea::part(textarea)::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }
    sl-textarea::part(textarea)::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 3px;
    }
  `;

  @eventOptions({ passive: true })
  private handleWheel(e: WheelEvent) {
    e.stopPropagation();
  }

  private onInputChange(e: any) {
    this.dispatchEvent(
      new CustomEvent("val-change", {
        detail: { value: e.target.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <sl-textarea
        placeholder=${msg("Enter a key...")}
        resize="none"
        .value=${this.value}
        @sl-input=${this.onInputChange}
        @pointerdown=${(e: Event) => e.stopPropagation()}
        @wheel=${this.handleWheel}
      ></sl-textarea>
    `;
  }
}
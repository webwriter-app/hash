import { html, css } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.component.js";
import "../../hash-styles.css";
import "../styles.css";
import { ClassicScheme } from "@retejs/lit-plugin";
import { createRef, Ref } from "lit/directives/ref.js";
type NodeExtraData = { width?: number; height?: number };

@customElement("key-node")
export class KeyNode extends LitElementWw {
    inputRef: Ref<HTMLInputElement> = createRef();
    static scopedElements = {
        "sl-input": SlInput
    };

    static get properties() {
        return {
            width: { type: Number },
            height: { type: Number },
            data: { type: Object },
            styles: { type: Function },
            emit: { type: Function }
        };
    }
    createRenderRoot() {
        // WebWriter wants light DOM
        return this;
    }

    declare width: number;
    declare height: number;
    declare data: ClassicScheme["Node"] & NodeExtraData;
    declare styles: ((props: any) => any) | null;
    declare emit: ((type: string, payload: any) => void) | null;

    static styles = css`
    :host {
      display: block;
      background: #3b82f6;
      color: white;
      border: 2px solid #3b82f6;
      border-radius: 10px;
      cursor: pointer;
      box-sizing: border-box;
      padding-bottom: 6px;
      position: relative;
      user-select: none;
      --socket-size: 16px;
      --socket-margin: 6px;
      --node-width: 220px;
    }

    :host(.selected) {
      border-color: #f97316;
    }

    .title {
      color: white;
      font-family: sans-serif;
      font-size: 18px;
      padding: 8px;
    }

    .output {
      text-align: right;
    }

    .output-socket {
      text-align: right;
      margin-right: -1px;
      display: inline-block;
    }

    .output-title {
      vertical-align: middle;
      color: white;
      display: inline-block;
      font-family: sans-serif;
      font-size: 14px;
      margin: var(--socket-margin);
      line-height: var(--socket-size);
    }

    .control {
      display: block;
      padding: var(--socket-margin)
        calc(var(--socket-size) / 2 + var(--socket-margin));
    }

    sl-input {
      width: 100%;
    }
  `;

    private onInputChange(e: Event) {
        const target = e.currentTarget as SlInput;
        const value = target.value ?? "";

        this.emit?.("update", {
            nodeId: this.data.id,
            key: "key",
            value
        });

        (this.data as any).key = value;
    }

    render() {
        const outputs = Object.entries(this.data.outputs || {});
        const { id, label, width, height } = this.data;

        if (this.data.selected) {
            this.classList.add("selected");
        } else {
            this.classList.remove("selected");
        }

        return html`
      <style>
        :host {
          width: ${Number.isFinite(width) ? `${width}px` : "var(--node-width)"};
          height: ${Number.isFinite(height) ? `${height}px` : "auto"};
        }
        ${this.styles && this.styles(this)}
      </style>

      <div class="title">${label}</div>

      ${outputs.map(([key, output]: any) =>
            output
                ? html`
              <div class="output" key=${key}>
                <div class="output-title">${output?.label}</div>
                <span class="output-socket" data-testid="output-socket">
                  <rete-ref
                    .data=${{
                    type: "socket",
                    side: "output",
                    key,
                    nodeId: id,
                    payload: output.socket
                }}
                    .emit=${this.emit}
                  ></rete-ref>
                </span>
              </div>
            `
                : null
        )}

      <div class="control">
        <sl-input
          placeholder="Enter key…"
          value=${(this.data as any).key ?? ""}
          @sl-input=${this.onInputChange}
        ></sl-input>
      </div>

      <slot></slot>
    `;
    }
}

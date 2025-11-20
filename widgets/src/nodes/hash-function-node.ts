import { html, css } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlSelect from "@shoelace-style/shoelace/dist/components/select/select.component.js";
import SlOption from "@shoelace-style/shoelace/dist/components/option/option.component.js";
import "../../hash-styles.css";
import "../styles.css";
import { ClassicScheme } from "@retejs/lit-plugin";
import { createRef, Ref } from "lit/directives/ref.js";
type NodeExtraData = { width?: number; height?: number };

@customElement("hash-function-node")
export class HashFunctionNode extends LitElementWw {
    inputRef: Ref<HTMLInputElement> = createRef();
    static scopedElements = {
        "sl-select": SlSelect,
        "sl-option": SlOption
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
            background: #ffa500;
            color: white;
            border: 2px solid #ffa500;
            border-radius: 10px;
            cursor: pointer;
            box-sizing: border-box;
            padding-bottom: 6px;
            position: relative;
            user-select: none;

            --socket-size: 16px;
            --socket-margin: 6px;
            --socket-color: #96b38a;
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

        .input {
            text-align: left;
        }

        .output-socket {
            text-align: right;
            margin-right: -1px;
            display: inline-block;
        }

        .input-socket {
            text-align: left;
            margin-left: -1px;
            display: inline-block;
        }

        .input-title,
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

        sl-select {
            width: 100%;
        }
    `;

    private handleSelect(e: CustomEvent) {
        const target = e.currentTarget as SlSelect;
        const value = target.value;

        this.emit?.("update", {
            nodeId: this.data.id,
            key: "hashFunction",
            value
        });

        (this.data as any).hashFunction = value;
    }

    private sortByIndex(entries: any[]) {
        entries.sort((a, b) => {
            const ai = a[1]?.index || 0;
            const bi = b[1]?.index || 0;
            return ai - bi;
        });
    }

    render() {
        const inputs = Object.entries(this.data.inputs || {});
        const outputs = Object.entries(this.data.outputs || {});
        const controls = Object.entries(this.data.controls || {});
        const { id, label, width, height } = this.data;

        this.sortByIndex(inputs);
        this.sortByIndex(outputs);
        this.sortByIndex(controls);

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

            ${controls.map(([key, control]: any) =>
                    control
                            ? html`
                                <span class="control" data-testid=${"control-" + key}>
                <rete-ref
                        .emit=${this.emit}
                        .data=${{ type: "control", payload: control }}
                ></rete-ref>
              </span>
                            `
                            : null
            )}

            ${inputs.map(([key, input]: any) =>
                    input
                            ? html`
                                <div class="input" key=${key}>
                <span class="input-socket" data-testid="input-socket">
                  <rete-ref
                          .data=${{
                              type: "socket",
                              side: "input",
                              key,
                              nodeId: id,
                              payload: input.socket
                          }}
                          .emit=${this.emit}
                  ></rete-ref>
                </span>
                                    ${input && (!input.control || !input.showControl)
                                            ? html`<div class="input-title">${input?.label}</div>`
                                            : null}
                                    ${input?.control && input?.showControl
                                            ? html`
                                                <span class="control" data-testid="input-control">
                        <rete-ref
                                .emit=${this.emit}
                                .data=${{
                                    type: "control",
                                    payload: input.control
                                }}
                        ></rete-ref>
                      </span>
                                            `
                                            : null}
                                </div>
                            `
                            : null
            )}

            <div class="control">
                <sl-select
                        placeholder="Select function..."
                        value=${(this.data as any).hashFunction ?? ""}
                        @sl-change=${this.handleSelect}
                >
                    <sl-option value="sha1">SHA-1</sl-option>
                    <sl-option value="sha256">SHA-256</sl-option>
                    <sl-option value="sha384">SHA-384</sl-option>
                    <sl-option value="sha512">SHA-512</sl-option>
                    <sl-option value="sha3_256">SHA3-256</sl-option>
                    <sl-option value="keccak_256">Keccak-256</sl-option>
                    <sl-option value="blake3">BLAKE3</sl-option>
                </sl-select>
            </div>

            <slot></slot>
        `;
    }
}
import {html, css, LitElement} from "lit";
import {LitElementWw} from "@webwriter/lit";
import {customElement} from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.component.js";
import {ClassicScheme} from "@retejs/lit-plugin";
import {createRef, Ref} from "lit/directives/ref.js";

type NodeExtraData = { width?: number; height?: number };

@customElement("hash-value-node")
export class HashValueNode extends LitElementWw {
    inputRef: Ref<HTMLInputElement> = createRef();
    static scopedElements = {
        "sl-textarea": SlTextarea
    };

    static get properties() {
        return {
            width: {type: Number},
            height: {type: Number},
            data: {type: Object},
            styles: {type: Function},
            emit: {type: Function}
        };
    }

    declare width: number;
    declare height: number;
    declare data: ClassicScheme["Node"] & NodeExtraData;
    declare styles: ((props: any) => any) | null;
    declare emit: ((type: string, payload: any) => void) | null;

    static styles = css`
        .hv-node {
            display: block;
            background: rgba(159, 159, 159, 0.7);
            color: white;
            border: 2px solid rgba(159, 159, 159, 1);
            border-radius: 10px;
            cursor: pointer;
            box-sizing: border-box;
            padding: 6px;
            position: relative;
            user-select: none;
            --socket-size: 16px;
            --socket-margin: 6px;
            --node-width: 220px;
        }
       .hv-node.selected {
            border-color: #f97316;
        }
       .hv-node.title {
            color: white;
            font-family: sans-serif;
            font-size: 18px;
            padding: 8px;
        }
       .hv-node.input,
       .hv-node.output {
            text-align: right;
        }
       .hv-node.input-socket,
       .hv-node.output-socket {
            text-align: right;
            margin-right: -1px;
            display: inline-block;
        }
       .hv-node.input-title,
       .hv-node.output-title {
            vertical-align: middle;
            color: white;
            display: inline-block;
            font-family: sans-serif;
            font-size: 14px;
            margin: var(--socket-margin);
            line-height: var(--socket-size);
        }
       .hv-node.control {
            display: block;
            padding: var(--socket-margin) calc(var(--socket-size) / 2 + var(--socket-margin));
        }
       sl-textarea {
            width: 100%;
        }
    `;

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
        const {id, label, width, height} = this.data;
        const selectedClass = this.data.selected ? "selected" : "";

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
                .hv-node {
                    width: ${Number.isFinite(width) ? `${width}px` : "var(--node-width)"};
                    height: ${Number.isFinite(height) ? `${height}px` : "auto"};
                }
                ${this.styles && this.styles(this)}
            </style>

            <div class="hv-node ${selectedClass}">
                <div class="title">${label}</div>
                <sl-textarea 
                        placeholder="Enter key…"
                        value=${(this.data as any).key ?? ""}
                ></sl-textarea>
                
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
                                            payload: output.socket,
                                        }}
                                        .emit=${this.emit}
                                ></rete-ref>
                            </span>
                        </div>` 
                    : null
                )}
                
                ${controls.map(([key, control]: any) => 
                        control 
                                ? html`<span class="control" data-testid="${"control-" + key}">
                                    <rete-ref
                                        .emit=${this.emit}
                                        .data="${{type: "control", payload: control}}"
                                    ></rete-ref>
                                </span>`
                                : null
                )}
                
                ${inputs.map(([key, input]: any) => 
                                input 
                                        ? html`<div class="input" key=${key}> 
                                            <span class="input-socket" data-testid="input-socket">
                                                <rete-ref
                                                    .data=${{
                                                        type: "socket",
                                                        side: "input",
                                                        key,
                                                        nodeId: id,
                                                        payload: input.socket,
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
                                                                  .data="${{type: "control", payload: input.control}}"
                                                          ></rete-ref>
                                                        </span>` 
                                                    : null}
                                        </div>` 
                                        : null
                )}
            </div>
         `;
    }
}
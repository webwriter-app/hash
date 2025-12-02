import {html, css} from "lit";
import {LitElementWw} from "@webwriter/lit";
import {customElement} from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.component.js";
import {ClassicScheme} from "@retejs/lit-plugin";
import {createRef, Ref} from "lit/directives/ref.js";

type NodeExtraData = { width?: number; height?: number };

@customElement("key-node")
export class KeyNode extends LitElementWw {
    inputRef: Ref<HTMLInputElement> = createRef();
    static scopedElements = {
        "sl-input": SlInput
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

    /*  createRenderRoot() {
          // WebWriter wants light DOM
          return this;
      }*/

    declare width: number;
    declare height: number;
    declare data: ClassicScheme["Node"] & NodeExtraData;
    declare styles: ((props: any) => any) | null;
    declare emit: ((type: string, payload: any) => void) | null;

    static styles = css`
        .key-node {
            display: block;
            background: #3b82f6;
            color: white;
            border: 2px solid #3b82f6;
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
        .key-node.selected {
            border-color: #f97316;
        }
        .key-node.title {
            color: white;
            font-family: sans-serif;
            font-size: 18px;
            padding: 8px;
        }
        .key-node.input,
        .key-node.output {
            text-align: right;
        }
        .key-node.input-socket,
        .key-node.output-socket {
            text-align: right;
            margin-right: -1px;
            display: inline-block;
        }
        .key-node.input-title,
        .key-node.output-title {
            vertical-align: middle;
            color: white;
            display: inline-block;
            font-family: sans-serif;
            font-size: 14px;
            margin: var(--socket-margin);
            line-height: var(--socket-size);
        }
        .key-node.control {
            display: block;
            padding: var(--socket-margin) calc(var(--socket-size) / 2 + var(--socket-margin));
        }
        sl-input {
            width: 100%;
            padding: var(--socket-margin);
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

    sortByIndex(entries: any[]) {
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
        debugger;
        console.log('KeyNode render - outputs:', this.data.outputs);
        console.log('Emit function:', this.emit);
        console.log("test");

        if (this.data.selected) {
            this.classList.add("selected");
        } else {
            this.classList.remove("selected");
        }

        return html`
            <style>
                .key-node {
                    width: ${Number.isFinite(width) ? `${width}px` : "var(--node-width)"};
                    height: ${Number.isFinite(height) ? `${height}px` : "auto"};
                }  
                ${this.styles && this.styles(this)}
            </style>

            <div class="key-node ${selectedClass}">
                <div class="title">${label}</div>
                <sl-input 
                        placeholder="Enter key…"
                        value=${(this.data as any).key ?? ""}
                        @sl-input=${this.onInputChange}
                ></sl-input>
             ${outputs.map(([key, output]: any) => 
                        output
                                ? html` <div class="output" key=${key}>
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
                                ? html`
                                    <span class="control" data-testid="${"control-" + key}">
                                        <rete-ref 
                                                .emit=${this.emit} 
                                                .data="${{ type: "control", payload: control }}"
                                        ></rete-ref>
                                    </span>` 
                                : null
                )}
                
                ${inputs.map(([key, input]: any) => 
                        input 
                                ? html` <div class="input" key=${key}>
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
                                            ? html` <div class="input-title">${input?.label}</div>` 
                                            : null}
                                    ${input?.control && input?.showControl 
                                            ? html`
                                                <span class="control" data-testid="input-control">
                                                   <rete-ref 
                                                            .emit=${this.emit} 
                                                            .data="${{ type: "control", payload: input.control }}"
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

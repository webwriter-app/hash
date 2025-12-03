import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import {LitElementWw} from "@webwriter/lit";
import { ClassicScheme } from "@retejs/lit-plugin";
import "@shoelace-style/shoelace/dist/themes/light.css";
import SlSelect from "@shoelace-style/shoelace/dist/components/select/select.component.js";
import SlOption from "@shoelace-style/shoelace/dist/components/option/option.component.js";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.component.js";
import SlTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.component.js";
import {createRef, Ref} from "lit/directives/ref.js";
import {HashInput} from "./hash-input";
import {HashSelect} from "./hash-select";
import {HashTextarea} from "./hash-textarea";

type NodeExtraData = { width?: number; height?: number };
// somehow it has to be 'LitElement' instead of 'LitElementWw' here in order to make rete.js work properly
@customElement("hash-node")
export class HashNode extends LitElement {
    @property() process!: () => void;
    @property() seed!: number;

    static get scopedElements() {
        return {
            "hash-input": HashInput,
            "hash-select": HashSelect,
            "hash-textarea": HashTextarea,

        };
    }

    static get properties() {
        return {
            width: { type: Number },
            height: { type: Number },
            data: { type: Object },
            styles: { type: Function },
            emit: { type: Function },
        };
    }

    declare width: number;
    declare height: number;
    declare data: ClassicScheme["Node"] & NodeExtraData;
    declare styles: ((props: any) => any) | null;
    declare emit: ((type: string, payload: any) => void) | null;

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            border: 2px solid grey;
            border-radius: 10px;
            cursor: pointer;
            padding: 6px;
            position: relative;
            background: white;
            box-sizing: border-box;
            min-height: 100px; /* Ensure node has height */
        }
        :host(.key) { background: #f3f7f9; border-color: #085886; }
        :host(.hash-function) { background: #fdf8ef; border-color: #e78c1f; }
        :host(.hash-value) { background: #eef0f2; border-color: #0f3048; }
        
        .title { padding: 8px; font-weight: bold; text-align: center; }

        /* FIX: Ensure inner components fill width */
        hash-input, hash-select, hash-textarea {
            display: block;
            width: 100%;
        }
        textarea {
            border: 1px solid #d4d4d8;
            border-radius: 4px;
            font-family: -apple-system, BlinkMacSystemFont, ‘Segoe UI’, Roboto, Helvetica, Arial, sans-serif, ‘Apple Color Emoji’, ‘Segoe UI Emoji’, ‘Segoe UI Symbol’ ;
            font-size: medium;
            width: 97%;
            height: 100%;
            background-color: white;
        }
        textarea:focus{
            outline: none;        
        }
        textarea::placeholder{
            padding: 5px
        }
        .socket-container {
            display: flex; justify-content: space-between; margin-top: auto;
        }
    `;

    private handleInput(e: CustomEvent) {
        const value = e.detail.value;
        if (this.data) {
            (this.data as any).value = value;
            this.process?.();
        }
    }

    private handleSelect(e: CustomEvent) {
        const value = e.detail.value;
        if (this.data) {
            (this.data as any).selectedFunction = value;
            this.process?.();
        }
    }

    renderNodeContent() {
        const { label } = this.data;
//        debugger;
        if (label === "Key") {
            return html`
                <hash-input 
                    .value=${(this.data as any).value || ""} 
                    @val-change=${this.handleInput}
                ></hash-input>
            `;
        }
        if (label === "HashFunction") {
            return html`
                <hash-select 
                    .value=${(this.data as any).selectedFunction || "sha256"}
                    @val-change=${this.handleSelect}
                ></hash-select>
            `;
        }
        if (label === "HashValue") {
            //somehow the value does not update in the HashTextarea component, so render it directly here
             /*return html`
                 <hash-textarea
                    .value=${(this.data as any).displayValue || ""}
                 ></hash-textarea>
             `;*/

            // Console log to Browser DevTools to prove HashNode has the data
            const val = (this.data as any).displayValue || "";

            return html`
                <textarea
                    placeholder="Hashed value result"
                    readonly
                    .value=${val}
                ></textarea>
            `;
        }
        return html``;
    }

    render() {
        const inputs = Object.entries(this.data.inputs || {});
        const outputs = Object.entries(this.data.outputs || {});
        const { id, label, width, height, selected } = this.data;

        const nodeClass = label === "Key" ? "key" :
            label === "HashFunction" ? "hash-function" :
                label === "HashValue" ? "hash-value" : "";

        this.className = `${nodeClass} ${selected ? "selected" : ""}`;

        return html`
            <style>
                :host {
                    width: ${width ? `${width}px` : "200px"};
                    height: ${height ? `${height}px` : "auto"};
                }
            </style>
            
            <div class="title">${label}</div>
            
            ${this.renderNodeContent()}     
            
            <div class="socket-container">
                <div class="inputs">
                    ${inputs.map(([key, input]: any) => html`
                        <div class="input-socket" title="${key}">
                            <rete-ref .emit=${this.emit} .data=${{ type: "socket", side: "input", key, nodeId: id, payload: input.socket }}></rete-ref>
                        </div>
                    `)}
                </div>
                <div class="outputs">
                    ${outputs.map(([key, output]: any) => html`
                        <div class="output-socket" title="${key}">
                            <rete-ref .emit=${this.emit} .data=${{ type: "socket", side: "output", key, nodeId: id, payload: output.socket }}></rete-ref>
                        </div>
                    `)}
                </div>
            </div>
        `;
    }
}
/*inputRef: Ref<HTMLInputElement> = createRef();
    @property() process!: () => void;
    @property() seed!: number;
    static get scopedElements() {
        return {
            "hash-input": HashInput,
            "hash-select": HashSelect,
            "hash-textarea": HashTextarea,
        };
    }

    static get properties() {
        return {
            width: { type: Number },
            height: { type: Number },
            data: { type: Object },
            styles: { type: Function },
            emit: { type: Function },
        };
    }

    declare width: number;
    declare height: number;
    declare data: ClassicScheme["Node"] & NodeExtraData;
    declare styles: ((props: any) => any) | null;
    declare emit: ((type: string, payload: any) => void) | null;


    static styles = css`
        :host {
            --socket-size: 16px;
            --socket-margin: 6px;
            --socket-color: #96b38a;
            --node-width: 220px;
        }
        :host {
            //display: block;
            display: flex;
            flex-direction: column;
            border: 2px solid grey;
            border-radius: 10px;
            cursor: pointer;
            box-sizing: border-box;
            padding: 6px;
            position: relative;
            user-select: none;
        }
       /!* :host(.selected) {
            border-color: #f97316;
        }*!/
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
        }
        .title {
            color: #3b4451;
            font-family: sans-serif;
            font-size: 18px;
            font-weight: 600;
            padding: 8px;
            text-align: center;
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
        .input-control {
            z-index: 1;
            width: calc(100% - calc(var(--socket-size) + 2 * var(--socket-margin)));
            vertical-align: middle;
            display: inline-block;
        }
        .control {
            display: block;
            padding: var(--socket-margin) calc(var(--socket-size) / 2 + var(--socket-margin));
        }
        sl-input, sl-select, sl-textarea {
            width: 100%;
            //height:100%;
            //padding: var(--socket-margin);
            //z-index: 4;
        }
    `;

   /!* private onInputChange(e: Event) {
        const target = e.currentTarget as SlInput;
        const value = target.value ?? "";

        this.emit?.("update", {
            nodeId: this.data.id,
            key: "key",
            value
        });

        (this.data as any).key = value;
    }

    private onSelectChange(e: CustomEvent) {
        const target = e.currentTarget as SlSelect;
        const value = target.value;

        this.emit?.("update", {
            nodeId: this.data.id,
            key: "hashFunction",
            value
        });

        (this.data as any).hashFunction = value;
    }*!/
    private handleInput(e: CustomEvent) {
        const value = e.detail.value;
        if (this.data) {
            (this.data as any).value = value;
            this.process?.();
        }
    }

    private handleSelect(e: CustomEvent) {
        const value = e.detail.value;
        if (this.data) {
            (this.data as any).selectedFunction = value;
            this.process?.();
        }
    }

    sortByIndex(entries: any[]) {
        entries.sort((a, b) => {
            const ai = a[1]?.index || 0;
            const bi = b[1]?.index || 0;
            return ai - bi;
        });
    }

    renderNodeContent() {
        const { label } = this.data;
        if (label === "Key") {
            return html`
                <hash-input
                        .value=${(this.data as any).value || ""}
                        @val-change=${this.handleInput}
                ></hash-input>
            `;
        }
        if (label === "HashFunction") {
            return html`
                <hash-select
                        .value=${(this.data as any).selectedFunction || "sha256"}
                        @val-change=${this.handleSelect}
                ></hash-select>
            `;
        }
        if (label === "HashValue") {
            return html`
                <hash-textarea
                        .value=${(this.data as any).displayValue || ""}
                ></hash-textarea>
            `;
        }
        return html``;
    }

    render() {
        const inputs = Object.entries(this.data.inputs || {});
        const outputs = Object.entries(this.data.outputs || {});
        const controls = Object.entries(this.data.controls || {});
        const { id, label, width, height } = this.data;

        this.sortByIndex(inputs);
        this.sortByIndex(outputs);
        this.sortByIndex(controls);

        const nodeClass = label === "Key" ? "key" :
            label === "HashFunction" ? "hash-function" :
                label === "HashValue" ? "hash-value" : "";

        if (this.data.selected) {
            this.classList.add("selected");
        } else {
            this.classList.remove("selected");
        }

        this.className = nodeClass + (this.data.selected ? " selected" : "");
       // this.className = `${nodeClass} ${selected ? "selected" : ""}`;

        return html`
            <style>
                :host {
                    width: ${Number.isFinite(width) ? `${width + 20}px` : "calc(var(--node-width) + 20px)"};
                    height: ${Number.isFinite(height) ? `${height}px` : "auto"};
                }
                ${this.styles && this.styles(this)}
            </style>
            
            <div class="title">${label}</div>
            
            ${this.renderNodeContent()}     
            
            ${outputs.map(([key, output]: any) =>
            output
                ? html`
                        <div class="output" key=${key}>
                            <div class="output-title"></div>
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
                        </div>
                    `
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
                    payload: input.socket,
                }}
                                    .emit=${this.emit}
                                ></rete-ref>
                            </span>
                            ${input && (!input.control || !input.showControl)
                    ? html`<div class="input-title"></div>`
                    : null}
                            ${input?.control && input?.showControl
                    ? html`
                                    <span class="control" data-testid="input-control">
                                        <rete-ref
                                            .emit=${this.emit}
                                            .data="${{ type: "control", payload: input.control }}"
                                        ></rete-ref>
                                    </span>
                                `
                    : null}
                        </div>
                    `
                : null
        )}
        `;
    }
}*/
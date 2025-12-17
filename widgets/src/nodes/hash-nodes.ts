import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ClassicScheme } from "@retejs/lit-plugin";
import "@shoelace-style/shoelace/dist/themes/light.css";

// --- FIXED IMPORTS (Use classes, not component.js) ---
import SlSelect from "@shoelace-style/shoelace/dist/components/select/select.js";
import SlOption from "@shoelace-style/shoelace/dist/components/option/option.js";
import SlInput from "@shoelace-style/shoelace/dist/components/input/input.js";
import SlTextarea from "@shoelace-style/shoelace/dist/components/textarea/textarea.js";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.js";

import IconTrashFilled from "@tabler/icons/outline/trash.svg";

import {HashInput} from "./hash-input";
import {HashSelect} from "./hash-select";
import {HashTextarea} from "./hash-textarea";

type NodeExtraData = { width?: number; height?: number };

@customElement("hash-node")
export class HashNode extends LitElement {
    @property({ attribute: false }) process!: () => void;
    @property({ type: Number }) seed!: number;
    @property({ attribute: false }) deleteNode!: () => void;


    static get scopedElements() {
        return {
            "hash-input": HashInput,
            "hash-select": HashSelect,
            "hash-textarea": HashTextarea,
            "sl-icon": SlIcon,
            "sl-select": SlSelect,  
            "sl-option": SlOption,
            "sl-input": SlInput,
            "sl-textarea": SlTextarea
        };
    }

    static get properties() {
        return {
            width: { type: Number },
            height: { type: Number },
            data: { type: Object },
            styles: { attribute: false },
            emit: { attribute: false },
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
            min-height: 100px;
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
            padding: 8px; 
            font-weight: bold; 
            text-align: center; 
        }
        hash-input, hash-select, hash-textarea {
            display: block;
            width: 100%;
        }
        textarea {
            border: 1px solid #d4d4d8;
            border-radius: 4px;
            font-family: sans-serif;
            font-size: medium;
            width: 97%;
            height: 100%;
            background-color: white;
            box-sizing: border-box; 
            padding: 8px;
            height: 125px;
            word-break: break-all;
            white-space: pre-wrap;
            overflow-y: auto;
            resize: none;
            color: 3f3f48;
        }
        textarea:hover { cursor: not-allowed; }
        textarea:focus { outline: none; }
        textarea::placeholder { padding: 5px; }
        textarea::-webkit-scrollbar {
            width: 6px;
        }
        textarea::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
        }
        textarea::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 3px;
        }
        textarea::-webkit-scrollbar-thumb:hover {
            background: #999;
        }  
        .socket-container {
            display: flex; justify-content: space-between; margin-top: auto;
        }
        .delete-button {
            position: absolute;
            top: 2px;
            right: 2px;
            font-size: 1.2rem;
            color: #888;
        }
        .delete-button::part(base):hover {
            color: #d9534f;
        }
        sl-icon {
            font-size: 24px;
            padding: 4px;
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

        let displayTitle = label;
        if (label === "HashFunction") displayTitle = "Hash Function";
        if (label === "HashValue") displayTitle = "Hash Value";

        return html`
            <style>
                :host {
                    width: ${width ? `${width}px` : "200px"};
                    height: ${height ? `${height}px` : "auto"};
                }
            </style>
            
            <div class="title">${displayTitle}</div>
            
            <sl-icon
                    class="delete-button"
                    src=${IconTrashFilled}
                    label="Delete Node"
                    @pointerdown=${(e: Event) => e.stopPropagation()} 
                    @click=${this.deleteNode}
            ></sl-icon>
            
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
import { html, PropertyValues, css } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, property, state } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { style } from "./hash-style";

import * as sha2 from "@noble/hashes/sha2";
import * as sha3 from "@noble/hashes/sha3";
import { sha1 } from "@noble/hashes/legacy";
import { blake3 } from "@noble/hashes/blake3";

import { setupGraph, addStarterNodes, type GraphAPI } from './graph/engine';

import { KeyNode } from "./nodes/key-node";
import { HashFunctionNode } from "./nodes/hash-function-node";
import { HashValueNode } from "./nodes/hash-value-node";

@customElement("webwriter-hash-new")
export class WebwriterHashNew extends LitElementWw {
    static styles = style;

    @property({ type: Boolean }) keyNodeCreated = true;
    @property({ type: Boolean }) hashFunctionNodeCreated = true;
    @property({ type: Boolean }) hashValueNodeCreated = true;

    @state() private keyValue = "";
    @state() private selectedHashFunction = "sha256";
    @state() private hashOutput = "";

    private graphApi!: GraphAPI;

    static get scopedElements() {
        return {
            "key-node": KeyNode,
            "hash-function-node": HashFunctionNode,
            "hash-value-node": HashValueNode,
        };
    }

    async firstUpdated() {
        const host = this.renderRoot.querySelector('.canvas') as HTMLDivElement;
        this.graphApi = await setupGraph(host);
        await addStarterNodes(this.graphApi);
    }

    private handleAddKey = () => {
        this.graphApi?.addKeyNode();
    };

    private handleAddHash = () => {
        this.graphApi?.addHashFnNode();
    };

    private handleAddValue = () => {
        this.graphApi?.addHashedValueNode();
    };

    private calculateHash(input: string, hashFunction: string): string {
        if (!input) return "";

        const data = new TextEncoder().encode(input);
        let output: Uint8Array;

        switch (hashFunction) {
            case "sha256": output = sha2.sha256(data); break;
            case "sha224": output = sha2.sha224(data); break;
            case "sha384": output = sha2.sha384(data); break;
            case "sha512": output = sha2.sha512(data); break;
            case "sha3_256": output = sha3.sha3_256(data); break;
            case "sha3_224": output = sha3.sha3_224(data); break;
            case "sha3_384": output = sha3.sha3_384(data); break;
            case "sha3_512": output = sha3.sha3_512(data); break;
            case "keccak_256": output = sha3.keccak_256(data); break;
            case "sha1": output = sha1(data); break;
            case "blake3": output = blake3(data); break;
            default: return "Unsupported hash function";
        }

        return Array.from(output)
            .map((b: number) => b.toString(16).padStart(2, "0"))
            .join("");
    }


    private onKeyValueChange = (e: CustomEvent) => {
        this.keyValue = e.detail.value;
        this.hashOutput = this.calculateHash(this.keyValue, this.selectedHashFunction);
    };

    private onHashFunctionChange = (e: CustomEvent) => {
        this.selectedHashFunction = e.detail.hashFunction;
        this.hashOutput = this.calculateHash(this.keyValue, this.selectedHashFunction);
    };

    render() {
        return html`
            <div class="container">
                <div class="instruction">Connect the nodes to create a hash of the key.</div>
                <div class="nodes-container">
                    <key-node
                        class="node-item-insert key"
                        .isCreated=${this.keyNodeCreated}
                        @key-value-changed=${this.onKeyValueChange}>
                    </key-node>

                    <hash-function-node
                        class="node-item-insert hash-function"
                        .isCreated=${this.hashFunctionNodeCreated}
                        @hash-function-changed=${this.onHashFunctionChange}>
                    </hash-function-node>

                    <hash-value-node
                        class="node-item-insert hash-value"
                        .isCreated=${this.hashValueNodeCreated}
                        .hashValue=${this.hashOutput}>
                    </hash-value-node>
                </div>
                
                <div class="graph-section">
                    <div class="graph-toolbar">
                        <button @click=${this.handleAddKey}>Add Key</button>
                        <button @click=${this.handleAddHash}>Add Hash</button>
                        <button @click=${this.handleAddValue}>Add Value</button>
                    </div>
                    <div class="graph-container"></div>
                </div>

                <div class="canvas" style="position:relative; width:100%; height:520px;"></div>
            </div>
        `;
    }
}

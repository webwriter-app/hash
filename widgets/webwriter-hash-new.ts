import { html, PropertyValues, css } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, property, state } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import "./src/styles.css";
import "./hash-styles.css";
import * as sha2 from "@noble/hashes/sha2";
import * as sha3 from "@noble/hashes/sha3";
import { SHA1, sha1 } from "@noble/hashes/legacy";
import * as sha3a from "@noble/hashes/sha3-addons";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { blake3 } from "@noble/hashes/blake3";
import { blake2b } from "@noble/hashes/blake2b";
import { blake2s } from "@noble/hashes/blake2s";
import { hmac } from "@noble/hashes/hmac";
import { hkdf } from "@noble/hashes/hkdf";
import * as pbkdf2 from "@noble/hashes/pbkdf2";
import * as scrypt from "@noble/hashes/scrypt";
import { randomBytes } from "@noble/hashes/utils";

import { KeyNode } from "./src/nodes/key-node";
import { HashFunctionNode } from "./src/nodes/hash-function-node";
import { HashValueNode } from "./src/nodes/hash-value-node";

import { createEditor } from "./src/editor";
import "./hash-styles.css";
import "./src/styles.css";


@customElement("webwriter-hash-new")
export class WebwriterHashNew extends LitElementWw {
    static styles = css`
        @import './src/styles.css';
        @import './hash-styles.css';
    `;


    @property({ type: Boolean }) keyNodeCreated = true;
    @property({ type: Boolean }) hashFunctionNodeCreated = true;
    @property({ type: Boolean }) hashValueNodeCreated = true;

    @state() private keyValue = "";
    @state() private selectedHashFunction = "sha256";
    @state() private hashOutput = "";

    static get scopedElements() {
        return {
            "key-node": KeyNode,
            "hash-function-node": HashFunctionNode,
            "hash-value-node": HashValueNode,
        };
    }

    firstUpdated() {
        const container = this.renderRoot.querySelector("#rete") as HTMLElement;
        createEditor(container);
    }

    createRenderRoot() {
        return this;
    }

    private onNodeInsert = (e: CustomEvent) => {
        e.stopPropagation();

        const node = e.target as HTMLElement;
        const node_kind = e.detail?.kind;

        if (node_kind === "key-node") {
            this.keyNodeCreated = true;
            node.removeAttribute("class");
            node.setAttribute("class", "node-item key");
            console.log("Key node created");
        } else if (node_kind === "hash-function-node") {
            this.hashFunctionNodeCreated = true;
            node.removeAttribute("class");
            node.setAttribute("class", "node-item hash-function");
        } else if (node_kind === "hash-value-node") {
            this.hashValueNodeCreated = true;
            node.removeAttribute("class");
            node.setAttribute("class", "node-item hash-value");
        }
        console.log("Key Node: ", this.keyNodeCreated);
        console.log("Hash Function Node: ", this.hashFunctionNodeCreated);
        console.log("Hash Value Node: ", this.hashValueNodeCreated);


        this.dispatchEvent(
            new CustomEvent("e-insert-node", {
                detail: e.detail,
                bubbles: true,
                composed: true
            })
        );
    };
    private calculateHash(input: string, hashFunction: string): string {
        if (!input) return "";

        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        let hashBytes: Uint8Array;

        try {
            switch (hashFunction) {
                // SHA-2
                case "sha256": hashBytes = sha2.sha256(data); break;
                case "sha224": hashBytes = sha2.sha224(data); break;
                case "sha384": hashBytes = sha2.sha384(data); break;
                case "sha512": hashBytes = sha2.sha512(data); break;
                case "sha512_256": hashBytes = sha2.sha512_256(data); break;
                case "sha3_256": hashBytes = sha3.sha3_256(data); break;
                case "sha3_224": hashBytes = sha3.sha3_224(data); break;
                case "sha3_384": hashBytes = sha3.sha3_384(data); break;
                case "sha3_512": hashBytes = sha3.sha3_512(data); break;
                case "keccak_256": hashBytes = sha3.keccak_256(data); break;
                case "sha1": hashBytes = sha1(data); break;
                case "blake3": hashBytes = blake3(data); break;

                default: return "Unsupported hash function";
            }

            // Convert bytes to hex string
            return Array.from(hashBytes)
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }

    private onKeyValueChange = (e: CustomEvent) => {
        this.keyValue = e.detail.value;
        this.hashOutput = this.calculateHash(this.keyValue, this.selectedHashFunction);
        console.log("Value to hash ", this.keyValue);
    };

    private onHashFunctionChange = (e: CustomEvent) => {
        this.selectedHashFunction = e.detail.hashFunction;
        this.hashOutput = this.calculateHash(this.keyValue, this.selectedHashFunction);
        console.log("Hash Function Change ", this.selectedHashFunction);
        debugger;
    };

    render() {
        return html`
            <div class="container">
                <div class="instruction">Connect the nodes to create a encoding of the key.</div>
                <!--<div class="nodes-container">
                    <key-node
                            class="node-item-insert key"
                            .isCreated=${this.keyNodeCreated}
                            @e-insert-node=${this.onNodeInsert}
                            @key-value-changed=${this.onKeyValueChange}>
                    </key-node>

                    <hash-function-node
                            class="node-item-insert hash-function"
                            .isCreated=${this.hashFunctionNodeCreated}
                            @e-insert-node=${this.onNodeInsert}
                            @hash-function-changed=${this.onHashFunctionChange}>
                    </hash-function-node>

                    <hash-value-node
                            class="node-item-insert hash-value"
                            .isCreated=${this.hashValueNodeCreated}
                            .hashValue=${this.hashOutput}
                            @e-insert-node=${this.onNodeInsert}>
                    </hash-value-node>
                </div> -->
                <div id="rete"></div>
            </div>
        `;
    }
}

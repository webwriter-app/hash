import { html, css } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import "./src/styles.css";
import "./hash-styles.css";

import * as sha2 from "@noble/hashes/sha2";
import * as sha3 from "@noble/hashes/sha3";
import { sha1 } from "@noble/hashes/legacy";
import { blake3 } from "@noble/hashes/blake3";

import { createEditor } from "./src/editor";

@customElement("webwriter-hash-new")
export class WebwriterHashNew extends LitElementWw {
    static styles = css`
    @import "./src/styles.css";
    @import "./hash-styles.css";
  `;

    async firstUpdated() {
        debugger;
        const container = this.renderRoot.querySelector("#rete") as HTMLElement;
        createEditor(container);

    }

    createRenderRoot() {
        // Www - light DOM
        return this;
    }

    private calculateHash(input: string, hashFunction: string): string {
        if (!input) return "";

        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        let hashBytes: Uint8Array;

        try {
            switch (hashFunction) {
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
                default:
                    return "Unsupported hash function";
            }

            return Array.from(hashBytes)
                .map((b) => b.toString(16).padStart(2, "0"))
                .join("");
        } catch (error: any) {
            return `Error: ${error?.message ?? error}`;
        }
    }

    render() {
        return html`
      <div class="container">
        <div class="instruction">
          Connect the nodes to create an encoding of the key.
        </div>
        <div id="rete"></div>
      </div>
    `;
    }
}

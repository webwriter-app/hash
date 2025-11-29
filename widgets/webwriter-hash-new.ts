import { html, css } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, query} from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";

import * as sha2 from "@noble/hashes/sha2";
import * as sha3 from "@noble/hashes/sha3";
import { sha1 } from "@noble/hashes/legacy";
import { blake3 } from "@noble/hashes/blake3";
import { createRef, ref } from "lit/directives/ref.js";
import { createEditor } from "./src/editor";

@customElement("webwriter-hash-new")
export class WebwriterHashNew extends LitElementWw {
    static styles = css`
    .rete {
        width: 100%;
        height: 600px;
    },
    :host {
        width: 100%;
        height: fit-content;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
    },
    //body {
    //    overflow: hidden;
    //    margin: 0;
    //    padding: 0;
    //},

    #rete {
        height: 100vh;
        width: 100vw;
    },
    .instruction {
    //    font-weight: bold;
    //    text-align: center;
    //    margin: 0;
    //    color: #333;
    //},
    .container {
        height: 50vh;
        max-width: 840px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        border: 2px solid #ccc;
        border-radius: 8px;
        background: white;
    }
	`;

    private reteRef = createRef<HTMLDivElement>();
    private destroyCallback?: () => void = undefined;

    async firstUpdated() {
        if (this.reteRef.value) {
            const { destroy } = await createEditor(this.reteRef.value);
            this.destroyCallback = destroy;
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.destroyCallback?.();
    }

    render() {
        return html`
			<strong>Rete.js Test</strong>
            <p class="instruction">Connect the nodes to create a hashing</p>
            <div id="app">
                <div ${ref(this.reteRef)} class="rete"></div>
            </div>
			
		`;
    }
}

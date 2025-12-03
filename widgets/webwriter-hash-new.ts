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
            background-image: radial-gradient(lightgrey 1px, transparent 0);  
            background-size: 20px 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
        }
        :host {
            width: 100%;
            height: fit-content;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
        } 
        #app{
            width: 99%;
            padding: 2px;
        }
        //body {
        //    overflow: hidden;
        //    margin: 0;
        //    padding: 0;
        //}
        #rete {
            height: 100vh;
            width: 100vw;
        }
        .instruction {
            font-weight: bold;
            text-align: center;
            margin: 15px;
            color: #333;
            font-size: 16px;
        }
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
        .dock {
            border: 2px solid #ccc; /* Adds a light grey border */
            border-radius: 8px; /* Optional: adds rounded corners */
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); /* Optional: adds a subtle shadow */
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
            <div class="instruction">Connect the Nodes to Create a Hashing</div>
            <div id="app">
                <div ${ref(this.reteRef)} class="rete"></div>
            </div>
			
		`;
    }
}

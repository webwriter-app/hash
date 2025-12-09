import { html, css } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, query} from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import "@shoelace-style/shoelace/dist/components/button/button.component.js";
import * as sha2 from "@noble/hashes/sha2";
import * as sha3 from "@noble/hashes/sha3";
import { sha1 } from "@noble/hashes/legacy";
import { blake3 } from "@noble/hashes/blake3";
import { createRef, ref } from "lit/directives/ref.js";
import { createEditor } from "./src/editor";
import IconFocus2 from "@tabler/icons/outline/focus-2.svg";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import {HashInput} from "./src/nodes/hash-input";
import {HashSelect} from "./src/nodes/hash-select";
import {HashTextarea} from "./src/nodes/hash-textarea";

@customElement("webwriter-hash-new")
export class WebwriterHashNew extends LitElementWw {

    static get scopedElements() {
        return {
            "sl-icon": SlIcon
        };
    }

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
        .controls{
            position: absolute;
            top: 20px; 
            z-index: 10;  
            left:25%;
            right: 25%;
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.9); /* Semi-transparent background */
            padding: 5px 10px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            justify-content: space-between;
            align-items: center;
        }

        .instruction {
            font-weight: bold;
            color: #333;
            font-size: 14px;
            width: 100%;
        }

        sl-icon {
            font-size: 18px;
            cursor: pointer;
            color: #555;
            transition: color 0.2s;
        }
        sl-icon:hover {
            color: #000;
        }
	`;

    private reteRef = createRef<HTMLDivElement>();
    private editorInstance?: { destroy: () => void; zoomToNodes: () => Promise<void> };

    async firstUpdated() {
        if (this.reteRef.value) {
            this.editorInstance = await createEditor(this.reteRef.value);
        }
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.editorInstance?.destroy();
    }

    render() {
        return html`
            <div class="controls">
                    <div class="instruction">Connect the Nodes to Create a Hashing</div>
                    <div class="controls-icon">
                        <sl-icon
                                src=${IconFocus2}
                                label="Focus on Nodes"
                                @click=${() => this.editorInstance?.zoomToNodes()}>
                        </sl-icon>
                    </div>
                </div>
                


            </div>
            
            <div id="app">
                <div ${ref(this.reteRef)} class="rete"></div>
            </div>
			
		`;
    }
}

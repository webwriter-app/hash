import { html, PropertyValues } from "lit";
import { LitElementWw } from "@webwriter/lit";
import { customElement, property } from "lit/decorators.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { style } from "./hash-style";

import { KeyNode } from "./nodes/key-node";
import { HashFunctionNode } from "./nodes/hash-function-node";
import { HashValueNode } from "./nodes/hash-value-node";


@customElement("webwriter-hash-new")
export class WebwriterHashNew extends LitElementWw {
    static styles = style;

    @property({ type: Boolean }) keyNodeCreated = true;
    @property({ type: Boolean }) hashFunctionNodeCreated = true;
    @property({ type: Boolean }) hashValueNodeCreated = true;

    protected firstUpdated(_changed: PropertyValues): void {}

    static get scopedElements() {
        return {
            "key-node": KeyNode,
            "hash-function-node": HashFunctionNode,
            "hash-value-node": HashValueNode,
        };
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

    render() {
        return html`
            <div class="container">
                <div class="instruction">Connect the nodes to create a encoding of the key.</div>
                <div class="nodes-container">
                    <key-node
                        class="node-item-insert key"
                        .isCreated=${this.keyNodeCreated}
                        @e-insert-node=${this.onNodeInsert}>
                    </key-node>
                    
                    <hash-function-node 
                        class="node-item-insert hash-function"
                        .isCreated=${this.hashFunctionNodeCreated}
                        @e-insert-node=${this.onNodeInsert}>
                    </hash-function-node>
                    <hash-value-node 
                        class="node-item-insert hash-value"
                        .isCreated=${this.hashValueNodeCreated}
                        @e-insert-node=${this.onNodeInsert}>
                    </hash-value-node>
                </div>
            </div>
        `;
    }
}

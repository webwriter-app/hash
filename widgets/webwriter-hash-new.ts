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

    @property({ type: Boolean }) insertable = true;

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
        if (!this.insertable) return;

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
                <h3>Click on the items to insert them to the canvas</h3>
                <div class="nodes-container">
                    <div class="node-item key" @click=${this.onNodeInsert}         
                        <span class="node-label">Key</span>
                        <span class="plus-icon">+</span>
                    </div>
                    <div class="node-item hash-function" @click=${this.onNodeInsert}>
                        <span class="node-label">Hash Function</span>
                        <span class="plus-icon">+</span>
                    </div>
                    <div class="node-item hash-value" @click=${this.onNodeInsert}>
                        <span class="node-label">Hash Value</span>
                        <span class="plus-icon">+</span>
                    </div>
                </div>
            </div>
        `;
    }
}

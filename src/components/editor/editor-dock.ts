import { widgetMsg } from "@webwriter/lit/localize";
import { LitElement, html } from "lit";
import { styles } from "./editor-dock.styles";

export class EditorDock extends LitElement {
  protected readonly msg = widgetMsg(this);

    static styles = [styles];

    render() {
        return html`
            <div class="dock-header">${this.msg("Nodes", { desc: "Header of the list of draggable nodes" })}</div>
            <div class="dock-instruction">
                ${this.msg("Drag and drop the nodes into the editor")}
            </div>

            <slot></slot>
        `;
    }
}
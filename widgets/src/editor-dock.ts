import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("editor-dock")
export class EditorDock extends LitElement {

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            width: 150px;
            padding: 10px;
            gap: 10px;
            box-sizing: border-box;
            height: 100%;
        }

        .dock-header {
            font-size: 12px;
            font-weight: bold;
            color: #6c757d;
            text-transform: uppercase;
            margin-bottom: 5px;
        }

        .dock-item {
            padding: 10px;
            background: white;
            border: 1px solid #ced4da;
            border-radius: 4px;
            cursor: grab;
            user-select: none;
            text-align: center;
            font-family: sans-serif;
            font-size: 14px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            font-weight: 550; 
            margin-bottom: px;
        }
        .dock-item:hover {
            box-shadow: 0 2px 4px gray
        }

        .dock-item:active {
            cursor: grabbing;
        }
        .key { 
            background: #f3f7f9; 
            border-color: #085886; 
        }
        .hash-function { 
            background: #fdf8ef; 
            border-color: #e78c1f; 
        }
        .hash-value { 
            background: #eef0f2; 
            border-color: #0f3048;
        }
    `;

    private handleDragStart(e: DragEvent, type: string) {
        e.dataTransfer?.setData("nodeType", type);
        e.dataTransfer!.effectAllowed = "copy";
    }

    render() {
        return html`
            <div class="dock-header">Nodes</div>
            
            <div 
                class="dock-item key" 
                draggable="true" 
                @dragstart=${(e: DragEvent) => this.handleDragStart(e, 'Key')}
            >
                Key
            </div>

            <div 
                class="dock-item hash-function" 
                draggable="true" 
                @dragstart=${(e: DragEvent) => this.handleDragStart(e, 'HashFunction')}
            >
                Hash Function
            </div>

            <div 
                class="dock-item hash-value" 
                draggable="true" 
                @dragstart=${(e: DragEvent) => this.handleDragStart(e, 'HashValue')}
            >
                Hash Value
            </div>
        `;
    }
}
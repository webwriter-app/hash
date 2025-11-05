import { css } from "lit";

export const style = css`
    :host {
        display: block;
    }
    .container {
        display: flex;
        gap: 20px;
        padding: 20px;
        background: #f5f5f5;
        border: 2px solid #4A90E2;
        border-radius: 8px;
    }
    .node-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        border: 2px dashed #ccc;
        border-radius: 8px;
        background: white;
        min-width: 150px;
        min-height: 100px;
        cursor: pointer;
        transition: border-color 0.3s;
    }

    .node-item:hover {
        border-color: #4A90E2;
    }
    .node-item.hash-function {
        border-radius: 50px; /* Oval shape for hash function */
        border-color: #FFA500;
    }

    .node-item.key {
        border-color: #4A90E2;
    }

    .node-item.hash-value {
        border-color: #666;
    }

    .plus-icon {
        font-size: 24px;
        color: #666;
        margin-top: 10px;
    }

    .node-label {
        font-weight: bold;
        margin-bottom: 10px;
        color: #333;
    }
    
    .hash-palette {
        padding: 20px;
        background: #f8f9fa;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .palette-header h3 {
        margin: 0 0 20px 0;
        color: #666;
        font-size: 14px;
        text-align: center;
    }

    .node-gallery {
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
    }

    .node-container {
        border: 2px dashed #ccc;
        border-radius: 8px;
        padding: 16px;
        min-width: 150px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s ease;
        background: white;
    }

    .node-container:hover {
        border-color: #0066cc;
        box-shadow: 0 2px 8px rgba(0,102,204,0.2);
    }

    .node-container.key-node {
        border-color: #007bff;
    }

    .node-container.hash-function-node {
        border-color: #ff8c00;
    }

    .node-container.hash-value-node {
        border-color: #666;
    }

    .header {
        font-weight: bold;
        margin-bottom: 12px;
        color: #333;
    }

    .insert-button {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }

    .connection-point {
        width: 12px;
        height: 12px;
        border: 2px solid #666;
        border-radius: 50%;
        background: white;
        position: absolute;
    }

    .connection-point.left {
        left: -6px;
        top: 50%;
        transform: translateY(-50%);
    }

    .connection-point.right {
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
    }

`;
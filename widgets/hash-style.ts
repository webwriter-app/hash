import { css } from "lit";

export const style = css`
    :host {
        width: 100%;
        height: fit-content;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
    }
    .instruction {
        font-weight: bold;  
        text-align: center;
        margin: 0;
        color: #333;
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

    .node-item,
    .node-item-insert {
        position: relative;
        align-items: center;
        padding: 20px;
        border-radius: 8px;
        background: white;
        min-width: 150px;
        min-height: 100px;
        transition: border-color 0.3s;
        margin: 5px;
        align-self: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .node-item {
        border: 2px solid #ccc;
    }
    .node-item-insert {
        border: 2px dashed #ccc;
    }

    .key {
        border-color: #4A90E2;
        background: #4A90E207
    }

    .hash-function {
        border-radius: 50px;
        border-color: #FFA500;
        background: #FFA50007;
    }

    .hash-value {
        border-color: rgb(102, 102, 102);
        background: rgba(159, 159, 159, 0.07);
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
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

    .nodes-container {
        position: relative;
        display: flex;
        flex-direction: row;
        padding: 16px;
        min-width: 150px;
        height: 80%;
        text-align: center;
        transition: all 0.2s ease;
        align-items: center;
    }
    
    .header {
        font-weight: bold;
        margin-bottom: 12px;
        color: #333;
        font-size: 16px;
    }

    .insert-button {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }

    .connection-point {
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #fff;
        border: 2px solid #333;
        cursor: pointer;
        z-index: 10;
    }

    .connection-point.right {
        right: -6px; 
        top: 50%;
        transform: translateY(-50%);
    }

    .connection-point.left {
        left: -6px;
        top: 50%;
        transform: translateY(-50%);
    }
`;
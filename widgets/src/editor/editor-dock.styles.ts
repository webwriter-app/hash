import { css } from "lit";

export const styles = css`
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
    color: #3f3f48;
    text-transform: uppercase;
    margin-top: 5px;
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
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    font-weight: 550;
  }
  .dock-item:hover {
    box-shadow: 0 2px 4px gray;
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
  .salt {
    background: #e8f5e9;
    border: 1.5px #2e7d32 dashed;
  }
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
    filter: grayscale(1);
  }

  .dock-instruction {
    color: #3f3f48;
    font-size: 11px;
    font-weight: 500;
    margin-bottom: 12px;
    padding: 8px;
    border-radius: 4px;
    line-height: 1.4;
  }
  sl-tooltip {
    --sl-tooltip-arrow-size: 0;
    --show-delay: 1000ms;
  }
  sl-tooltip::part(body) {
    background: #f1f1f1;
    border: #a1a1aa 1px solid;
    color: #131316;
    font-size: 14px;
    font-family: sans-serif;
  }
`;

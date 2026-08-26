import { css } from "lit";

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    border: 2px solid grey;
    border-radius: 10px;
    padding: 6px;
    position: relative;
    background: white;
    box-sizing: border-box;
    min-width: 200px;
    min-height: 100px;
    transition: height 0.1s ease-out;
    font-family: sans-serif;

    --socket-size: 16px;
    --socket-gap: 4px;
    --socket-hit-width: var(--socket-size);
    --socket-hit-height: var(--socket-size);
  }

  /* Node Colors */
  :host(.key) {
    background: #f3f7f9;
    border-color: #085886;
  }
  :host(.hash-function) {
    background: #fdf8ef;
    border-color: #e78c1f;
  }
  :host(.hash-value) {
    background: #eef0f2;
    border-color: #0f3048;
    width: 110%;
  }
  :host(.salt) {
    background: #e8f5e9;
    border: 2px #2e7d32 dashed;
  }

  /* Title Styling */
  .title {
    padding: 8px 28px;
    font-weight: bold;
    text-align: center;
    min-height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    cursor: text;
    width: 100%;
    box-sizing: border-box;
    overflow-wrap: break-word;
    line-height: 1.2;
  }

  .title-input {
    width: 100%;
    max-width: 160px;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    border: none;
    outline: none;
    background: transparent;
  }

  /* Reusable Box for Textarea (HashValue) */
  .data-box {
    box-sizing: border-box;
    display: block;
    width: 100%;
    border: 1px solid #d4d4d8;
    background: #fcfcfc;
    border-radius: 4px;
    font-family: sans-serif;
    font-size: medium;
    color: #3f3f48;
    padding: 6px 8px;
  }
  .data-box:focus {
    outline: none;
  }

  textarea.data-box {
    height: 125px;
    resize: none;
    white-space: pre-wrap;
    word-break: break-all;
    cursor: not-allowed;
  }

  /* Salt Layout */
  .salt-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 4px;
    cursor: not-allowed;
  }

  /* RICH TEXT INPUT SIMULATION */
  /* Mimics Shoelace Label */
  .shoelace-label {
    font-size: var(--sl-input-label-font-size-small, 0.85rem);
    color: var(--sl-input-label-color, black);
    font-weight: 500;
    margin-bottom: 2px;
    display: block;
  }

  /* Mimics the style of .data-box (Hash Value) and Hash Input */
  .salt-key-input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #d4d4d8;
    border-radius: 4px;
    background-color: white;
    font-family: sans-serif;
    font-size: medium;
    color: #3f3f48;
    padding: 6px 8px;
    line-height: 1.4;
    word-break: break-all;
    overflow-y: scroll;
    cursor: not-allowed;
    height: 125px;
  }

  .salt-key-input::-webkit-scrollbar {
    width: 6px;
  }

  .salt-key-input::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  .salt-key-input::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }

  .salt-key-input:hover {
    border-color: var(--sl-input-border-color-hover, #a8aaad);
  }

  /* Text Coloring Classes */
  .key-part {
    color: inherit;
  }
  .salt-part {
    font-weight: bold;
    color: black;
  }
  .placeholder {
    color: #aaa;
    font-style: italic;
  }

  /* Buttons & Icons */
  .icon-btn {
    cursor: pointer;
    color: #555;
  }
  .icon-btn:hover {
    color: #39bdf8;
  }

  .delete-button {
    position: absolute;
    top: 14px;
    right: 7px;
    font-size: 1.2rem;
    z-index: 50;
  }
  .delete-button.disabled {
    color: #ccc;
    pointer-events: none;
  }

  .copy-button {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }

  /* Shoelace overrides */
  sl-input::part(form-control-label) {
    font-size: 0.85rem;
    color: black;
    font-weight: 600;
    margin-bottom: 2px;
  }
  sl-input::part(base) {
    background: white;
    border-color: #d3d3d3;
  }

  .refresh-icon {
    font-size: 1.1rem;
    cursor: pointer;
    padding: 2px;
  }
  .refresh-icon:hover {
    color: #2e7d32;
  }

  /* Rete Sockets */
  .socket-container {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 8px;
  }

  .inputs,
  .outputs {
    display: flex;
    flex-direction: column;
    gap: var(--socket-gap);
  }

  .socket-row rete-ref {
    display: flex !important;
    align-items: center;
    justify-content: center;
    line-height: 0;
    box-sizing: border-box;
    width: var(--socket-hit-width);
    height: var(--socket-hit-height);
    margin: calc((var(--socket-size) - var(--socket-hit-height)) / 2)
      calc((var(--socket-size) - var(--socket-hit-width)) / 2);
  }

  /*
   * Grow the sockets and their hit targets on touch devices
   */
  @media (pointer: coarse) {
    :host {
      --socket-size: 20px;
      --socket-gap: 26px;
      --socket-hit-width: clamp(44px, calc(44px / var(--zoom, 1)), 88px);
      --socket-hit-height: 44px;
    }
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

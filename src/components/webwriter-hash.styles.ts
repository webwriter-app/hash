import { css } from "lit";

export const styles = css`
  :host {
    display: block;
    width: 100%;
    height: fit-content;
    font-family: sans-serif;
    position: relative;
  }

  .widget-container {
    position: relative;
    border: 1px solid #ccc;
    border-radius: 8px;
    height: 600px;
    overflow: hidden;
    background: white;
    display: flex;
    flex-direction: column;
  }

  .pill {
    position: absolute;
    top: 15px;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    height: 42px;
    padding: 0 20px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
    align-self: center;
  }

  .pill-center {
    left: 50%;
    transform: translateX(-50%);
  }

  .pill-right {
    right: 15px;
  }

  .instruction {
    font-weight: 600;
    color: #3f3f48;
    font-size: 14px;
    white-space: nowrap;
  }

  sl-icon {
    font-size: 20px;
    cursor: pointer;
    color: #555;
    transition: color 0.2s;
  }

  sl-icon:hover {
    color: #39bdf8;
  }

  .drawer-dock {
    --size: 170px;
  }
  .drawer-dock::part(overlay) {
    display: none;
  }
  .drawer-dock::part(panel) {
    box-shadow: 1px 0 0 #e5e5e5;
    border-right: 1px solid #ccc;
  }
  .drawer-dock::part(body) {
    padding: 0;
    overflow: hidden;
  }

  .stage {
    flex: 1;
    min-height: 0;
    width: 100%;
    position: relative;
    background-color: #f9fafb;
  }

  .stage:focus-visible {
    outline: 2px solid #39bdf8;
    outline-offset: -2px;
  }

  ww-scene {
    --ww-scene-grid-color: #d1d5db;
    --ww-scene-grid-size: 1.5;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  ww-path {
    stroke: grey;
    stroke-width: 3px;
  }
  ww-path:state(hover) {
    stroke-width: 4px;
  }
  ww-path[selected] {
    stroke: #39bdf8;
  }

  .stage[data-ww-drop-over] {
    outline: 2px solid #39bdf8;
    outline-offset: -2px;
  }

  /* The lifted dock entry leaves the drawer, so the drawer must not clip it. */
  .drawer-dock::part(panel),
  .drawer-dock::part(body) {
    overflow: visible;
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
  @media (hover: hover) {
    .dock-item:hover {
      box-shadow: 0 2px 4px gray;
    }
  }

  .dock-item:active,
  .dock-item[data-ww-dragging] {
    cursor: grabbing;
    box-shadow: 0 2px 4px gray;
  }
  .dock-item.key {
    background: #f3f7f9;
    border-color: #085886;
  }
  .dock-item.hash-function {
    background: #fdf8ef;
    border-color: #e78c1f;
  }
  .dock-item.hash-value {
    background: #eef0f2;
    border-color: #0f3048;
  }
  .dock-item.salt {
    background: #e8f5e9;
    border: 1.5px #2e7d32 dashed;
  }

  :host(:not([contenteditable="true"]):not([contenteditable=""])) .author-only {
    display: none !important;
  }
  .options {
    padding-left: 15px;
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
  .description {
    font-size: 13px;
    color: #3f3f48;
    margin-bottom: 8px;
  }
  .warning {
    color: #d28547;
  }
  sl-switch {
    color: #3f3f48;
  }

  /* Nodes */
  ww-node.node {
    --socket-size: 16px;
    --socket-gap: 4px;
    display: flex;
    flex-direction: column;
    width: 200px;
    min-height: 100px;
    padding: 6px;
    box-sizing: border-box;
    border: 2px solid grey;
    border-radius: 10px;
    background: white;
    font-family: sans-serif;
    color: #3f3f48;
  }
  ww-node.key {
    background: #f3f7f9;
    border-color: #085886;
  }
  ww-node.hash-function {
    background: #fdf8ef;
    border-color: #e78c1f;
  }
  ww-node.hash-value {
    width: 220px;
    background: #eef0f2;
    border-color: #0f3048;
  }
  ww-node.salt {
    background: #e8f5e9;
    border: 2px #2e7d32 dashed;
  }
  ww-node[selected] {
    outline-color: #39bdf8;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 24px;
    padding: 8px 28px;
    box-sizing: border-box;
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.2;
    text-align: center;
    overflow-wrap: break-word;
    color: black;
    cursor: text;
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
    z-index: 50;
    font-size: 1.2rem;
  }

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
  .socket {
    display: block;
    width: var(--socket-size);
    height: var(--socket-size);
    box-sizing: border-box;
    border: 2px solid #3b4451;
    border-radius: 50%;
    background: white;
    cursor: crosshair;
  }
  .socket:hover {
    background: lightgrey;
  }
  .socket[data-ww-port-candidate] {
    background: #fdd9a0;
  }
  .socket[data-ww-port-over] {
    background: #f59e0b;
    box-shadow: 0 0 0 4px #f59e0b66;
  }

  /* A larger socket for fingers: the invisible ring around it takes the press too, at any zoom. */
  @media (pointer: coarse) {
    ww-node.node {
      --socket-size: 24px;
      --socket-gap: 20px;
    }
    .socket {
      position: relative;
    }
    .socket::after {
      content: "";
      position: absolute;
      inset: -8px;
      border-radius: 50%;
    }
  }
`;

import { css } from "lit";

export const styles = css`
  :host {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 300px;
    max-width: 2100px;
    height: fit-content;
    font-family: var(--ww-font-family, sans-serif);
    color: var(--ww-text-color, #3f3f48);
    position: relative;
  }

  .responsive {
    container-type: inline-size;
  }

  .widget-container {
    --dock-size: 170px;
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
    color: var(--ww-text-color, #3f3f48);
    font-size: 14px;
    white-space: nowrap;
  }

  sl-icon {
    font-size: 20px;
    color: #555;
    transition: color 0.2s;
  }

  /* Icon buttons: native buttons with a visible focus ring and a target of at least 32 px (44 px for fingers). */
  .tool {
    display: grid;
    place-items: center;
    min-width: 32px;
    min-height: 32px;
    padding: 0;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: #555;
    font: inherit;
    cursor: pointer;
  }
  .tool:hover,
  .tool:hover sl-icon {
    color: var(--ww-theme-accent-1, #39bdf8);
  }
  .tool:focus-visible {
    outline: 2px solid var(--ww-theme-accent-1, #39bdf8);
    outline-offset: 1px;
  }

  .drawer-dock {
    --size: var(--dock-size);
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
    outline: 2px solid var(--ww-theme-accent-1, #39bdf8);
    outline-offset: -2px;
  }

  ww-scene {
    --ww-scene-selection: var(--ww-theme-accent-1, #39bdf8);
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
    stroke: var(--ww-theme-accent-1, #39bdf8);
  }

  .stage[data-ww-drop-over] {
    outline: 2px solid var(--ww-theme-accent-1, #39bdf8);
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
    touch-action: none;
    color: var(--ww-text-color, #3f3f48);
    text-align: center;
    font-family: inherit;
    font-size: 14px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    font-weight: 550;
  }
  @media (hover: hover) {
    .dock-item:hover {
      box-shadow: 0 2px 4px gray;
    }
  }

  .dock-item:focus-visible {
    outline: 2px solid var(--ww-theme-accent-1, #39bdf8);
    outline-offset: 1px;
  }
  .dock-item:active,
  .dock-item[data-ww-dragging] {
    cursor: grabbing;
    box-shadow: 0 2px 4px gray;
  }
  .dock-item.key {
    background: #f3f7f9;
    border-color: var(--ww-theme-accent-2, #085886);
  }
  .dock-item.hash-function {
    background: #fdf8ef;
    border-color: var(--ww-theme-accent-3, #e78c1f);
  }
  .dock-item.hash-value {
    background: #eef0f2;
    border-color: var(--ww-theme-accent-4, #0f3048);
  }
  .dock-item.salt {
    background: #e8f5e9;
    border: 1.5px var(--ww-theme-accent-5, #2e7d32) dashed;
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
    font-family: inherit;
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
    font-family: inherit;
    color: var(--ww-text-color, #3f3f48);
  }
  ww-node.key {
    background: #f3f7f9;
    border-color: var(--ww-theme-accent-2, #085886);
  }
  ww-node.hash-function {
    background: #fdf8ef;
    border-color: var(--ww-theme-accent-3, #e78c1f);
  }
  ww-node.hash-value {
    width: 220px;
    background: #eef0f2;
    border-color: var(--ww-theme-accent-4, #0f3048);
  }
  ww-node.salt {
    background: #e8f5e9;
    border: 2px var(--ww-theme-accent-5, #2e7d32) dashed;
  }
  ww-node[selected] {
    outline-color: var(--ww-theme-accent-1, #39bdf8);
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
    color: var(--ww-text-color, black);
    cursor: text;
  }
  .title:focus-visible,
  ww-node:focus-visible {
    outline: 2px solid var(--ww-theme-accent-1, #39bdf8);
    outline-offset: 1px;
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
    font-family: inherit;
    color: inherit;
  }

  .delete-button {
    position: absolute;
    top: 14px;
    right: 7px;
    z-index: 50;
    min-width: 28px;
    min-height: 28px;
  }
  .delete-button sl-icon {
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

  @media (pointer: coarse) {
    .tool {
      min-width: 44px;
      min-height: 44px;
    }
    .delete-button {
      min-width: 36px;
      min-height: 36px;
      top: 8px;
      right: 3px;
    }
  }

  ::slotted(img),
  ::slotted(video) {
    max-width: 100%;
    height: auto;
  }

  /* Narrow containers: a slimmer node menu, no title pill, a taller window for the graph. */
  @container (max-width: 479px) {
    .widget-container {
      --dock-size: 130px;
      height: 520px;
    }
    .pill-center {
      display: none;
    }
    .dock-item {
      padding: 8px 4px;
      font-size: 13px;
    }
  }
  @container (min-width: 1400px) {
    .widget-container {
      height: 700px;
    }
  }

  .print-picture {
    display: none;
  }
  .print-picture svg {
    display: block;
    width: 100%;
    height: auto;
    max-height: 100%;
  }
  .print-wire {
    fill: none;
    stroke: grey;
    stroke-width: 3px;
  }
  .print-node rect {
    fill: white;
    stroke: grey;
    stroke-width: 2px;
  }
  .print-node.key rect {
    fill: #f3f7f9;
    stroke: var(--ww-theme-accent-2, #085886);
  }
  .print-node.hash-function rect {
    fill: #fdf8ef;
    stroke: var(--ww-theme-accent-3, #e78c1f);
  }
  .print-node.hash-value rect {
    fill: #eef0f2;
    stroke: var(--ww-theme-accent-4, #0f3048);
  }
  .print-node.salt rect {
    fill: #e8f5e9;
    stroke: var(--ww-theme-accent-5, #2e7d32);
    stroke-dasharray: 6 4;
  }
  .print-card {
    box-sizing: border-box;
    height: 100%;
    padding: 10px 12px;
    overflow: hidden;
    color: var(--ww-text-color, #3f3f48);
    font-family: inherit;
    font-size: 14px;
    text-align: center;
  }
  .print-text {
    margin-top: 8px;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
    text-align: left;
  }

  /* Paper: the graph as it stands, without tools. */
  @media print {
    .widget-container[data-print] .stage {
      display: none;
    }
    .widget-container[data-print] .print-picture {
      display: block;
      flex: 1;
      min-height: 0;
    }
    .widget-container[data-print] {
      height: auto;
      min-height: 0;
    }
    :host {
      max-width: none;
      break-inside: avoid;
    }
    .widget-container {
      break-inside: avoid;
      border-color: #888;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .pill,
    .drawer-dock,
    .delete-button {
      display: none !important;
    }
    ww-scene {
      --ww-scene-grid-color: transparent;
    }
    .stage {
      background-color: white;
    }
    ww-node[selected] {
      outline: none;
    }
  }
`;

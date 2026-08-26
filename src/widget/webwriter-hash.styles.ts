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

  .icon-disabled {
    color: #ccc !important;
    opacity: 0.6;
    pointer-events: none;
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

  #app {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .rete {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #f9fafb;
  }

  .rete-grid {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
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
`;

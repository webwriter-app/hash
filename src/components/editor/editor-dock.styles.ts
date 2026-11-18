import { css } from "lit";

export const styles = css`
  :host {
    display: flex;
    flex-direction: column;
    width: calc(100% - 20px);
    min-width: 0;
    padding: 10px;
    gap: 10px;
    box-sizing: border-box;
    height: 100%;
  }

  .dock-header {
    font-size: 12px;
    font-weight: bold;
    color: var(--ww-text-color, #3f3f48);
    text-transform: uppercase;
    margin-top: 5px;
  }

  .dock-instruction {
    color: var(--ww-text-color, #3f3f48);
    font-size: 11px;
    font-weight: 500;
    margin-bottom: 12px;
    padding: 8px;
    border-radius: 4px;
    line-height: 1.4;
  }
`;

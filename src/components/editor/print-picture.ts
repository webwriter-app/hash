import { html, render, svg } from "lit";

export type PrintNode = { kind: string; title: string; x: number; y: number; width: number; height: number; text: string };
export type PrintWire = { x1: number; y1: number; x2: number; y2: number };

const PADDING = 12;

/** Draws the graph as one static SVG, which prints reliably where the live WebGL scene may not. Synchronous, so it can run in `beforeprint`. */
export function renderPrintPicture(container: HTMLElement, nodes: PrintNode[], wires: PrintWire[]) {
  if (!nodes.length) return render(html``, container);
  const left = Math.min(...nodes.map((node) => node.x)) - PADDING;
  const top = Math.min(...nodes.map((node) => node.y)) - PADDING;
  const width = Math.max(...nodes.map((node) => node.x + node.width)) + PADDING - left;
  const height = Math.max(...nodes.map((node) => node.y + node.height)) + PADDING - top;
  render(
    html`<svg viewBox="0 0 ${width} ${height}" width=${width} height=${height} role="img" aria-hidden="true">
      ${wires.map((wire) => {
        const reach = Math.max(40, Math.abs(wire.x2 - wire.x1) / 2);
        return svg`<path class="print-wire" d="M ${wire.x1 - left} ${wire.y1 - top} C ${wire.x1 - left + reach} ${wire.y1 - top} ${wire.x2 - left - reach} ${wire.y2 - top} ${wire.x2 - left} ${wire.y2 - top}"></path>`;
      })}
      ${nodes.map(
        (node) => svg`<g class="print-node ${node.kind}">
          <rect x=${node.x - left} y=${node.y - top} width=${node.width} height=${node.height} rx="10"></rect>
          <foreignObject x=${node.x - left} y=${node.y - top} width=${node.width} height=${node.height}>
            <div class="print-card">
              <strong>${node.title}</strong>
              <div class="print-text">${node.text}</div>
            </div>
          </foreignObject>
        </g>`,
      )}
    </svg>`,
    container,
  );
}

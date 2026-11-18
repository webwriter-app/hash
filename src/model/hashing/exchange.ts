import { NODE_LABELS, normalize, type Graph } from "./graph";

/** Why a file does not hold a usable hash flow. The widget words the problem. */
export type FlowProblem = "not-json" | "not-a-flow" | "no-nodes" | "bad-node";

/** The text of a flow file: the graph as the data block stores it, with its positions. */
export const writeFlow = (graph: Graph): string => JSON.stringify({ nodes: graph.nodes, connections: graph.connections }, null, 2) + "\n";

/**
 * Reads a flow file. The whole file is checked before a graph is returned, so a caller can apply it in one step.
 * Connections that do not fit the wiring rules are dropped, as they are when a document loads.
 */
export function readFlow(text: string): Graph | FlowProblem {
  let data: unknown;
  try { data = JSON.parse(text); }
  catch { return "not-json"; }
  const flow = data as { nodes?: unknown; connections?: unknown } | null;
  if (typeof flow !== "object" || flow === null || !Array.isArray(flow.nodes) || (flow.connections !== undefined && !Array.isArray(flow.connections))) return "not-a-flow";
  if (!flow.nodes.length) return "no-nodes";
  const ids = new Set<string>();
  for (const node of flow.nodes as Record<string, unknown>[]) {
    if (typeof node !== "object" || node === null || typeof node.id !== "string" || !node.id || ids.has(node.id) || !NODE_LABELS.includes(node.label as never)) return "bad-node";
    ids.add(node.id);
  }
  return normalize(flow as Partial<Graph>);
}

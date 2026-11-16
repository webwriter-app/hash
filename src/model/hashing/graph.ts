import { computeHashHex } from "./hash";

export type NodeLabel = "Key" | "Salt" | "HashFunction" | "HashValue";

/** A node as the data block stores it. Only the fields of its kind are present. */
export type GraphNode = {
  id: string;
  label: NodeLabel;
  customTitle?: string;
  x: number;
  y: number;
  value?: string;
  selectedFunction?: string;
  inputsCount?: number;
  saltValue?: string;
};

export type Connection = { source: string; sourceOutput: string; target: string; targetInput: string };
export type Graph = { nodes: GraphNode[]; connections: Connection[] };

/** What flows through the graph, by node: the text a salt node receives and the hash a value node shows. */
export type Flow = Map<string, { incoming?: string; display?: string }>;

export const MAX_CHANNELS = 4;

export const NODE_LABELS: readonly NodeLabel[] = ["Key", "Salt", "HashFunction", "HashValue"];

const isLabel = (label: unknown): label is NodeLabel => NODE_LABELS.includes(label as NodeLabel);

export function randomId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

const randomSalt = () => Math.random().toString(36).substring(2, 7);

/** The sockets of a node: inputs and outputs by key. A hash function has one pair per channel. */
export function ports(node: GraphNode): { inputs: string[]; outputs: string[] } {
  switch (node.label) {
    case "Key":
      return { inputs: [], outputs: ["key-output"] };
    case "Salt":
      return { inputs: ["salt-input"], outputs: ["salt-output"] };
    case "HashValue":
      return { inputs: ["hash-value-input"], outputs: [] };
    case "HashFunction": {
      const count = Math.min(Math.max(node.inputsCount ?? 1, 1), MAX_CHANNELS);
      const channels = Array.from({ length: count }, (_, index) => index);
      return { inputs: channels.map((index) => `in-${index}`), outputs: channels.map((index) => `out-${index}`) };
    }
  }
}

/** What a connection from an output carries, and what an input takes: the kinds of the wiring. */
export function linkKind(node: GraphNode): string {
  return node.label.toLowerCase();
}

export function acceptedKinds(node: GraphNode): string {
  switch (node.label) {
    case "Salt": return "key";
    case "HashFunction": return "key salt";
    case "HashValue": return "hashfunction";
    default: return "";
  }
}

/**
 * The wiring rules: data flows Key -> (Salt) -> HashFunction -> HashValue,
 * and a hash value ends the pipeline.
 */
export function canConnect(source: GraphNode, target: GraphNode): boolean {
  if (source.id === target.id) return false;
  if (source.label === "Key") return target.label === "Salt" || target.label === "HashFunction";
  if (source.label === "Salt") return target.label === "HashFunction";
  if (source.label === "HashFunction") return target.label === "HashValue";
  return false;
}

export function createNode(label: NodeLabel, x = 0, y = 0): GraphNode {
  const base = { id: randomId(), label, customTitle: label, x, y };
  switch (label) {
    case "Key": return { ...base, value: "" };
    case "Salt": return { ...base, saltValue: randomSalt() };
    case "HashFunction": return { ...base, selectedFunction: "sha256", inputsCount: 1 };
    case "HashValue": return base;
  }
}

/** Four nodes wired into a pipeline. */
export function defaultGraph(): Graph {
  const key = createNode("Key");
  const salt = createNode("Salt", 260, 0);
  const hash = createNode("HashFunction", 520, 0);
  const value = createNode("HashValue", 780, 0);
  return normalize({
    nodes: [key, salt, hash, value],
    connections: [
      { source: key.id, sourceOutput: "key-output", target: salt.id, targetInput: "salt-input" },
      { source: salt.id, sourceOutput: "salt-output", target: hash.id, targetInput: "in-0" },
      { source: hash.id, sourceOutput: "out-0", target: value.id, targetInput: "hash-value-input" },
    ],
  });
}

/** True if the connection joins existing sockets of nodes that may be wired. */
export function isValidConnection(graph: Graph, connection: Connection): boolean {
  const source = graph.nodes.find((node) => node.id === connection.source);
  const target = graph.nodes.find((node) => node.id === connection.target);
  if (!source || !target) return false;
  if (!ports(source).outputs.includes(connection.sourceOutput) || !ports(target).inputs.includes(connection.targetInput)) return false;
  return canConnect(source, target);
}

const sameSocket = (a: Connection, b: Connection) => a.source === b.source && a.sourceOutput === b.sourceOutput && a.target === b.target && a.targetInput === b.targetInput;

/** Adds a connection. A socket holds one connection, so the connections on its two sockets give way. */
export function connect(graph: Graph, connection: Connection): Graph {
  if (!isValidConnection(graph, connection)) return graph;
  const kept = graph.connections.filter((other) => !(other.source === connection.source && other.sourceOutput === connection.sourceOutput) && !(other.target === connection.target && other.targetInput === connection.targetInput));
  return normalize({ ...graph, connections: [...kept, connection] });
}

/** Moves an end of a connection: the previous one is replaced by the new one, or nothing changes if the rules forbid it. */
export function reconnect(graph: Graph, previous: Connection, next: Connection): Graph {
  const base = { ...graph, connections: graph.connections.filter((other) => !sameSocket(other, previous)) };
  const result = connect(base, next);
  return result === base ? graph : result;
}

export function disconnect(graph: Graph, connection: Connection): Graph {
  return normalize({ ...graph, connections: graph.connections.filter((other) => !sameSocket(other, connection)) });
}

export function removeNodes(graph: Graph, ids: ReadonlySet<string>): Graph {
  return normalize({
    nodes: graph.nodes.filter((node) => !ids.has(node.id)),
    connections: graph.connections.filter((connection) => !ids.has(connection.source) && !ids.has(connection.target)),
  });
}

export function updateNode(graph: Graph, id: string, change: Partial<GraphNode>): Graph {
  return { ...graph, nodes: graph.nodes.map((node) => (node.id === id ? { ...node, ...change } : node)) };
}

/** The key that stands for a connection. Every output holds at most one, so the output names it. */
export const connectionKey = (connection: Connection) => `wire:${connection.source}:${connection.sourceOutput}`;

const channelOf = (key: string) => Number(key.split("-")[1]);

/**
 * Gives a hash function as many channels as its connections need, plus one free pair,
 * and closes gaps by moving the connections of the next channel down.
 */
function reconcileChannels(node: GraphNode, connections: Connection[]): { node: GraphNode; connections: Connection[] } {
  let result = connections;
  for (;;) {
    const used = (index: number) => result.some((c) => (c.target === node.id && c.targetInput === `in-${index}`) || (c.source === node.id && c.sourceOutput === `out-${index}`));
    const count = ports(node).inputs.length;
    let highest = -1;
    for (let index = 0; index < count; index++) if (used(index)) highest = index;
    const gap = Array.from({ length: Math.max(highest, 0) }, (_, index) => index).find((index) => !used(index));
    if (gap === undefined) {
      const wanted = Math.min(Math.max(highest + 2, 1), MAX_CHANNELS);
      return { node: node.inputsCount === wanted ? node : { ...node, inputsCount: wanted }, connections: result };
    }
    result = result.map((c) => {
      if (c.target === node.id && c.targetInput === `in-${gap + 1}`) return { ...c, targetInput: `in-${gap}` };
      if (c.source === node.id && c.sourceOutput === `out-${gap + 1}`) return { ...c, sourceOutput: `out-${gap}` };
      return c;
    });
  }
}

/**
 * Brings a graph from the data block into the shape the editor works with: unknown nodes and
 * connections that no longer fit are dropped, missing fields get their defaults and the channels
 * of the hash functions follow their connections.
 */
export function normalize(input: Partial<Graph> | undefined): Graph {
  const nodes: GraphNode[] = [];
  for (const entry of input?.nodes ?? []) {
    if (!isLabel(entry?.label) || typeof entry.id !== "string") continue;
    const node: GraphNode = { id: entry.id, label: entry.label, customTitle: entry.customTitle || entry.label, x: Number(entry.x) || 0, y: Number(entry.y) || 0 };
    if (node.label === "Key") node.value = entry.value ?? "";
    if (node.label === "Salt") node.saltValue = entry.saltValue ?? randomSalt();
    if (node.label === "HashFunction") {
      node.selectedFunction = entry.selectedFunction || "sha256";
      node.inputsCount = entry.inputsCount || 1;
    }
    nodes.push(node);
  }

  const graph: Graph = { nodes, connections: [] };
  for (const connection of input?.connections ?? []) {
    const fits = isValidConnection(graph, connection)
      && !graph.connections.some((other) => (other.source === connection.source && other.sourceOutput === connection.sourceOutput) || (other.target === connection.target && other.targetInput === connection.targetInput));
    if (fits) {
      const { source, sourceOutput, target, targetInput } = connection;
      graph.connections.push({ source, sourceOutput, target, targetInput });
    } else console.warn("Skipped connection that no longer fits the graph", connection);
  }

  for (const [index, node] of graph.nodes.entries()) {
    if (node.label !== "HashFunction") continue;
    const reconciled = reconcileChannels(node, graph.connections);
    graph.nodes[index] = reconciled.node;
    graph.connections = reconciled.connections;
  }
  return graph;
}

/** The text on the output of a node, following the connections back to the keys. */
function outputOf(graph: Graph, node: GraphNode, output: string, seen: Set<string>): string {
  if (seen.has(node.id)) return "";
  seen = new Set(seen).add(node.id);
  const input = (key: string) => {
    const wire = graph.connections.find((c) => c.target === node.id && c.targetInput === key);
    const source = wire && graph.nodes.find((other) => other.id === wire.source);
    return source ? outputOf(graph, source, wire.sourceOutput, seen) : "";
  };
  switch (node.label) {
    case "Key": return node.value ?? "";
    case "Salt": return input("salt-input") + (node.saltValue ?? "");
    case "HashFunction": return computeHashHex(node.selectedFunction ?? "sha256", input(`in-${output.split("-")[1]}`));
    default: return "";
  }
}

/** Runs the dataflow: what each salt node receives and what each hash value node shows. */
export function evaluate(graph: Graph): Flow {
  const flow: Flow = new Map();
  for (const node of graph.nodes) {
    if (node.label !== "Salt" && node.label !== "HashValue") continue;
    const key = node.label === "Salt" ? "salt-input" : "hash-value-input";
    const wire = graph.connections.find((c) => c.target === node.id && c.targetInput === key);
    const source = wire && graph.nodes.find((other) => other.id === wire.source);
    const text = source ? outputOf(graph, source, wire.sourceOutput, new Set([node.id])) : "";
    flow.set(node.id, node.label === "Salt" ? { incoming: text } : { display: text });
  }
  return flow;
}

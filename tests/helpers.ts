import type { WebwriterHash } from "../src/widgets/webwriter-hash";

export type Hash = WebwriterHash & Record<string, any>;
type Point = { clientX: number; clientY: number };

export const GRAPH = {
  nodes: [
    { id: "k1", label: "Key", customTitle: "Key", x: 0, y: 0, value: "hello" },
    { id: "h1", label: "HashFunction", customTitle: "Hash Function", x: 300, y: 0, selectedFunction: "sha256", inputsCount: 2 },
    { id: "v1", label: "HashValue", customTitle: "Hash Value", x: 600, y: 0 },
  ],
  connections: [
    { source: "k1", sourceOutput: "key-output", target: "h1", targetInput: "in-0" },
    { source: "h1", sourceOutput: "out-0", target: "v1", targetInput: "hash-value-input" },
  ],
};

export const LOOSE = {
  nodes: [
    { id: "k1", label: "Key", customTitle: "Key", x: 0, y: 0, value: "abc" },
    { id: "s1", label: "Salt", customTitle: "Salt", x: 0, y: 330, saltValue: "xyz" },
    { id: "h1", label: "HashFunction", customTitle: "HashFunction", x: 300, y: 0, selectedFunction: "sha256", inputsCount: 1 },
    { id: "v1", label: "HashValue", customTitle: "HashValue", x: 600, y: 0 },
  ],
  connections: [] as typeof GRAPH.connections,
};

export const SHA256_HELLO = "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824";
export const SHA256_ABC = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
export const SHA1_ABC = "a9993e364706816aba3e25717850c26c9cd0d89d";

export const wait = (ms: number) => new Promise<void>((done) => setTimeout(done, ms));
export const frame = () => new Promise<void>((done) => requestAnimationFrame(() => done()));

export async function until<T>(condition: () => T | Promise<T>, message: string, timeout = 15000): Promise<T> {
  const end = performance.now() + timeout;
  while (performance.now() < end) {
    const value = await condition();
    if (value) return value;
    await wait(40);
  }
  throw new Error("timed out: " + message);
}

/** Settles when nothing new happens for a while: used to assert that something does not happen. */
export const quiet = async () => {
  for (let i = 0; i < 12; i++) await frame();
  await wait(250);
};

let mount: HTMLElement | undefined;
export function clearMount() {
  mount?.remove();
  mount = undefined;
}

export const block = (widget: Hash) => widget.querySelector<HTMLScriptElement>(':scope > script[type="application/json"][slot="data"]')!;
export const stored = (widget: Hash) => {
  try {
    return JSON.parse(block(widget)?.textContent ?? "null");
  } catch {
    return undefined;
  }
};
export const nodes = (widget: Hash) => [...widget.shadowRoot!.querySelectorAll<HTMLElement>("ww-node")];
export const nodeOf = (widget: Hash, id: string) => widget.shadowRoot!.querySelector<HTMLElement>(`ww-node[data-ww-key="${id}"]`)!;
export const portOf = (widget: Hash, id: string, key: string) => nodeOf(widget, id).querySelector<HTMLElement>(`[data-ww-port="${key}"]`)!;
export const wires = (widget: Hash) => [...widget.shadowRoot!.querySelectorAll<HTMLElement>("ww-path")];
export const graphOf = (widget: Hash) => stored(widget)?.editorState;

export async function create({ attrs = {}, data, editing = false, legacy }: { attrs?: Record<string, string>; data?: unknown; editing?: boolean; legacy?: unknown } = {}): Promise<Hash> {
  clearMount();
  mount = document.createElement("div");
  mount.style.cssText = "margin:16px;width:800px;font-family:system-ui";
  document.body.append(mount);
  const widget = document.createElement("webwriter-hash") as Hash;
  for (const [name, value] of Object.entries(attrs)) widget.setAttribute(name, value);
  if (editing) widget.setAttribute("contenteditable", "");
  if (legacy) widget.setAttribute("editorstate", JSON.stringify(legacy));
  if (data) {
    const script = document.createElement("script");
    script.type = "application/json";
    script.slot = "data";
    script.textContent = JSON.stringify({ editorState: data });
    widget.append(script);
  }
  mount.append(widget);
  await until(() => nodes(widget).length > 0, "nodes are rendered");
  await widget.updateComplete;
  await until(() => nodes(widget)[0].getBoundingClientRect().width > 0, "nodes are laid out");
  await quiet();
  return widget;
}

export const centre = (element: Element): Point => {
  const box = element.getBoundingClientRect();
  return { clientX: box.left + box.width / 2, clientY: box.top + box.height / 2 };
};
export const by = (element: Element, dx: number, dy: number): Point => {
  const at = centre(element);
  return { clientX: at.clientX + dx, clientY: at.clientY + dy };
};
export const fire = (target: EventTarget, type: string, position: Partial<PointerEventInit>, id = 7) =>
  target.dispatchEvent(new PointerEvent(type, { bubbles: true, composed: true, cancelable: true, pointerId: id, pointerType: "mouse", button: 0, isPrimary: true, ...position }));
export const key = (target: EventTarget, name: string) =>
  target.dispatchEvent(new KeyboardEvent("keydown", { key: name, bubbles: true, composed: true, cancelable: true }));
export const dockItem = (widget: Hash, kind: string) => widget.shadowRoot!.querySelector<HTMLElement>(`.dock-item[data-ww-key="${kind}"]`)!;
export const canvasPoint = (widget: Hash, fx: number, fy: number): Point => {
  const box = widget.shadowRoot!.querySelector(".stage")!.getBoundingClientRect();
  return { clientX: box.left + box.width * fx, clientY: box.top + box.height * fy };
};

/** A pointer drag of a dock entry to a point of the page. Resolves with what was seen on the way. */
export async function dragTo(widget: Hash, kind: string, to: Point, { cancel = false } = {}) {
  const item = dockItem(widget, kind);
  const from = centre(item);
  fire(item, "pointerdown", from);
  fire(item, "pointermove", { clientX: from.clientX + 12, clientY: from.clientY + 4 });
  await frame();
  await frame();
  const lifted = item.hasAttribute("data-ww-dragging");
  fire(item, "pointermove", to);
  await frame();
  await frame();
  const over = widget.shadowRoot!.querySelector(".stage")!.hasAttribute("data-ww-drop-over");
  if (cancel) window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
  else fire(item, "pointerup", to);
  await wait(400);
  await quiet();
  return { lifted, over, item };
}

/** A drag from one point to another on `target`, as pointer events. */
export async function sweep(target: EventTarget, from: Point, to: Point, { cancel = false } = {}) {
  fire(target, "pointerdown", from);
  fire(target, "pointermove", { clientX: from.clientX + 6, clientY: from.clientY + 6 });
  await frame();
  await frame();
  fire(target, "pointermove", to);
  await frame();
  await frame();
  if (cancel) window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true, composed: true }));
  else fire(target, "pointerup", to);
  await wait(300);
  await quiet();
}

export const valueOf = (widget: Hash, id: string): string => (nodeOf(widget, id).querySelector("hash-value-node") as any).value;
export const emit = (element: Element, type: string, value: unknown) =>
  element.dispatchEvent(new CustomEvent(type, { detail: { value }, bubbles: true, composed: true }));
export const eventLog = (widget: Hash, ...types: string[]) => {
  const log: string[] = [];
  for (const type of types) widget.addEventListener(type, () => log.push(type));
  return log;
};

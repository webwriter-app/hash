/// <reference types="mocha" />
import "mocha/mocha.js";
import { assert } from "chai";
import { getMochaConfig } from "@webwriter/build/test";
import "../src/widgets/webwriter-hash";

import { GRAPH, LOOSE, SHA1_ABC, SHA256_ABC, SHA256_HELLO, block, by, centre, clearMount, create, emit, eventLog, fire, frame, graphOf, key, nodeOf, nodes, portOf, quiet, sweep, until, valueOf, wait, wires, type Hash } from "./helpers";

mocha.setup(getMochaConfig());

describe("<webwriter-hash> scene", function () {
  this.timeout(30000);
  after(clearMount);

  describe("drawing and dataflow", function () {
    let widget: Hash;
    let root: ShadowRoot;
    before(async () => {
      widget = await create({ data: GRAPH });
      root = widget.shadowRoot!;
    });

    it("draws every node and every connection of the block", () => {
      assert.equal(nodes(widget).length, 3);
      assert.equal(wires(widget).length, 2);
    });
    it("runs a connection between the ports it names", () => {
      assert.equal(wires(widget).map((wire) => `${wire.getAttribute("from")}>${wire.getAttribute("to")}`).join(), "k1:key-output>h1:in-0,h1:out-0>v1:hash-value-input");
    });
    it("shows a free channel next to the connected one on a hash function", () => {
      assert.equal([...nodeOf(widget, "h1").querySelectorAll<HTMLElement>("[data-ww-port]")].map((port) => port.dataset.wwPort).join(), "in-0,in-1,out-0,out-1");
    });
    it("makes the stage the window of a canvas viewport", () => {
      assert.equal(root.querySelector("ww-scene")!.getAttribute("data-ww-viewport"), "canvas");
    });
    it("fits all nodes into the window on the first fit", () => {
      const view = root.querySelector("ww-scene")!.getBoundingClientRect();
      assert.isTrue(nodes(widget).every((node) => { const box = node.getBoundingClientRect(); return box.left >= view.left && box.right <= view.right && box.top >= view.top && box.bottom <= view.bottom; }));
    });
    it("shows the hash of the key in the hash value", () => {
      assert.equal(valueOf(widget, "v1"), SHA256_HELLO);
    });
    it("updates the hash and the block when the key is typed", async () => {
      emit(nodeOf(widget, "k1").querySelector("key-node")!, "val-change", "abc");
      await until(() => valueOf(widget, "v1") === SHA256_ABC, "the hash follows the key");
      assert.equal(graphOf(widget).nodes[0].value, "abc");
    });
    it("updates the hash and the block when another hash function is chosen", async () => {
      emit(nodeOf(widget, "h1").querySelector("hash-function-node")!, "val-change", "sha1");
      await until(() => valueOf(widget, "v1") === SHA1_ABC, "the hash follows the function");
      assert.equal(graphOf(widget).nodes[1].selectedFunction, "sha1");
    });
  });

  describe("moving and panning", function () {
    let widget: Hash;
    let root: ShadowRoot;
    let node: HTMLElement;
    let box: DOMRect;
    let scale = 1;
    let log: string[];
    before(async () => {
      widget = await create({ attrs: { allowdeleting: "" }, data: GRAPH });
      root = widget.shadowRoot!;
      log = eventLog(widget, "ww-transactionstart", "ww-move", "ww-transactionend");
      node = nodeOf(widget, "v1");
      box = node.getBoundingClientRect();
      scale = box.width / node.offsetWidth;
      const handle = node.querySelector(".title")!;
      await sweep(handle, centre(handle), by(handle, 60, 40));
    });

    it("stores the new position in the block after a drag", () => {
      const moved = graphOf(widget).nodes.find((n: any) => n.id === "v1");
      assert.isBelow(Math.abs(moved.x - (600 + 60 / scale)), 3);
      assert.isBelow(Math.abs(moved.y - (0 + 40 / scale)), 3);
    });
    it("makes the move one undo step", () => {
      assert.equal(log.join(), "ww-transactionstart,ww-move,ww-transactionend");
    });
    it("draws the node at the new position and the wire follows", () => {
      assert.isBelow(Math.abs(node.getBoundingClientRect().left - (box.left + 60)), 3);
      assert.isTrue(wires(widget).some((wire) => wire.getAttribute("to") === "v1:hash-value-input"));
    });
    it("changes nothing else of the block", () => {
      assert.equal(graphOf(widget).nodes.length, 3);
      assert.equal(graphOf(widget).connections.length, 2);
      assert.equal(graphOf(widget).nodes[0].x, 0);
    });
    it("cancels the drag with Escape", async () => {
      log = eventLog(widget, "ww-move");
      const handle = nodeOf(widget, "k1").querySelector(".title")!;
      await sweep(handle, centre(handle), by(handle, 80, 80), { cancel: true });
      assert.equal(log.length, 0);
      assert.equal(graphOf(widget).nodes[0].x, 0);
      assert.equal(graphOf(widget).nodes[0].y, 0);
    });
    it("pans the view on a plain drag of the background and writes nothing", async () => {
      node = nodeOf(widget, "k1");
      box = node.getBoundingClientRect();
      const stage = root.querySelector(".stage")!.getBoundingClientRect();
      const empty = { clientX: stage.left + stage.width * 0.7, clientY: stage.top + stage.height * 0.9 };
      await sweep(root.querySelector("ww-scene")!, empty, { clientX: empty.clientX - 70, clientY: empty.clientY - 30 });
      assert.isBelow(Math.abs(node.getBoundingClientRect().left - (box.left - 70)), 3);
      assert.isBelow(Math.abs(node.getBoundingClientRect().top - (box.top - 30)), 3);
      assert.equal(graphOf(widget).nodes[0].x, 0);
    });
    it("fits the nodes into the window again with the focus button", async () => {
      root.querySelector<HTMLElement>("sl-tooltip:not([data-ww-can]) sl-icon")!.click();
      await wait(300);
      await quiet();
      assert.isBelow(Math.abs(node.getBoundingClientRect().left - box.left), 3);
    });

    describe("selecting and deleting", function () {
      let handle: Element;
      it("selects a node on click and marks it", async () => {
        handle = nodeOf(widget, "h1").querySelector(".title")!;
        fire(handle, "pointerdown", centre(handle));
        fire(handle, "pointerup", centre(handle));
        await quiet();
        assert.isTrue(nodeOf(widget, "h1").hasAttribute("selected"));
        assert.equal([...widget.selection].join(), "h1");
      });
      it("adds a node to the selection with Ctrl", async () => {
        handle = nodeOf(widget, "k1").querySelector(".title")!;
        fire(handle, "pointerdown", { ...centre(handle), ctrlKey: true });
        fire(handle, "pointerup", { ...centre(handle), ctrlKey: true });
        await quiet();
        assert.equal([...widget.selection].sort().join(), "h1,k1");
      });
      it("removes the selected nodes with their connections on Delete", async () => {
        log = eventLog(widget, "ww-transactionstart", "ww-transactionend");
        key(nodeOf(widget, "k1"), "Delete");
        await until(() => nodes(widget).length === 1, "the selection is deleted");
        await quiet();
        assert.equal(graphOf(widget).nodes.map((n: any) => n.id).join(), "v1");
        assert.equal(graphOf(widget).connections.length, 0);
        assert.equal(wires(widget).length, 0);
      });
      it("deletes as one undo step and empties the selection", () => {
        assert.equal(log.join(), "ww-transactionstart,ww-transactionend");
        assert.equal(widget.selection.size, 0);
      });
    });
  });

  describe("deleting without moving", function () {
    it("removes a selected connection alone", async () => {
      const widget = await create({ attrs: { allowdeleting: "" }, data: GRAPH });
      widget.selection = new Set(["wire:k1:key-output"]);
      widget.deleteSelection();
      await until(() => wires(widget).length === 1, "the selected connection is removed");
      await quiet();
      assert.equal(nodes(widget).length, 3);
      assert.equal(graphOf(widget).connections.length, 1);
    });
    describe("without allowdeleting", function () {
      let widget: Hash;
      before(async () => {
        widget = await create({ data: GRAPH });
        widget.selection = new Set(["h1"]);
        key(nodeOf(widget, "h1"), "Delete");
        widget.deleteSelection();
        await quiet();
      });
      it("does nothing on the Delete key and the action", () => {
        assert.equal(nodes(widget).length, 3);
      });
      it("still lets a reader move nodes", async () => {
        const handle = nodeOf(widget, "v1").querySelector(".title")!;
        await sweep(handle, centre(handle), by(handle, 50, 0));
        assert.isAbove(graphOf(widget)?.nodes.find((n: any) => n.id === "v1").x, 600);
      });
    });
  });

  describe("rewiring", function () {
    let widget: Hash;
    let log: string[];
    const key1 = { source: "k1", sourceOutput: "key-output", target: "h1", targetInput: "in-0" };
    beforeEach(async () => {
      clearMount();
      widget = await create({ data: { ...LOOSE, connections: [key1] } });
      log = eventLog(widget, "ww-transactionstart", "ww-reconnect", "ww-disconnect", "ww-transactionend");
    });

    it("lets every wire take its ends elsewhere", () => {
      assert.equal(wires(widget)[0].getAttribute("rewire"), "from to");
    });
    it("moves the input end of a wire to another input in one undo step", async () => {
      const grab = portOf(widget, "h1", "in-0");
      await sweep(grab, centre(grab), centre(portOf(widget, "s1", "salt-input")));
      assert.deepEqual(graphOf(widget).connections, [{ source: "k1", sourceOutput: "key-output", target: "s1", targetInput: "salt-input" }]);
      assert.equal(log.join(), "ww-transactionstart,ww-reconnect,ww-transactionend");
      assert.equal(wires(widget)[0].getAttribute("to"), "s1:salt-input");
    });
    it("moves the output end of a wire to another output", async () => {
      const grab = portOf(widget, "k1", "key-output");
      await sweep(grab, centre(grab), centre(portOf(widget, "s1", "salt-output")));
      assert.deepEqual(graphOf(widget).connections, [{ source: "s1", sourceOutput: "salt-output", target: "h1", targetInput: "in-0" }]);
    });
    it("removes a wire whose end is dropped on empty space, in one undo step", async () => {
      const grab = portOf(widget, "h1", "in-0");
      await sweep(grab, centre(grab), by(grab, 0, 200));
      assert.lengthOf(graphOf(widget).connections, 0);
      assert.equal(log.join(), "ww-transactionstart,ww-disconnect,ww-transactionend");
      await until(() => wires(widget).length === 0, "the wire is gone");
    });
    it("removes the wire when its end is dropped where the rules forbid it", async () => {
      const grab = portOf(widget, "h1", "in-0");
      await sweep(grab, centre(grab), centre(portOf(widget, "v1", "hash-value-input")));
      assert.lengthOf(graphOf(widget).connections, 0);
    });
    it("keeps the wire when the new end is refused by the model", async () => {
      const wire = wires(widget)[0];
      const event = new CustomEvent("ww-reconnect", { bubbles: true, cancelable: true, detail: { path: wire, end: "to", from: "k1:key-output", to: "v1:hash-value-input", previous: { from: "k1:key-output", to: "h1:in-0" } } });
      wire.dispatchEvent(event);
      assert.isTrue(event.defaultPrevented);
      assert.deepEqual(graphOf(widget)?.connections ?? [key1], [key1]);
    });
    it("dims the wire while its end is held", async () => {
      const grab = portOf(widget, "h1", "in-0");
      fire(grab, "pointerdown", centre(grab));
      fire(grab, "pointermove", by(grab, -40, 80));
      await frame();
      await frame();
      assert.isTrue(wires(widget)[0].matches(":state(rewiring)"));
      fire(grab, "pointerup", centre(grab));
      await quiet();
    });
  });

  describe("zoom and fit", function () {
    let widget: Hash;
    beforeEach(async () => {
      clearMount();
      widget = await create({ data: GRAPH });
    });
    it("zooms about the pointer with the plain wheel", async () => {
      const node = nodeOf(widget, "k1");
      const before = node.getBoundingClientRect().width;
      const view = widget.shadowRoot!.querySelector("ww-scene")!;
      const at = centre(view);
      view.dispatchEvent(new WheelEvent("wheel", { ...at, deltaY: -120, bubbles: true, composed: true, cancelable: true }));
      await wait(300);
      assert.isAbove(node.getBoundingClientRect().width, before);
    });
    it("still zooms with Ctrl and the wheel", async () => {
      const node = nodeOf(widget, "k1");
      const before = node.getBoundingClientRect().width;
      const view = widget.shadowRoot!.querySelector("ww-scene")!;
      view.dispatchEvent(new WheelEvent("wheel", { ...centre(view), deltaY: -120, ctrlKey: true, bubbles: true, composed: true, cancelable: true }));
      await wait(300);
      assert.isAbove(node.getBoundingClientRect().width, before);
    });
    it("draws the grid in the scene and leaves nothing of it to the stage", () => {
      const scene = widget.shadowRoot!.querySelector("ww-scene")!;
      assert.equal(scene.getAttribute("background"), "dots");
      assert.equal(getComputedStyle(widget.shadowRoot!.querySelector(".stage")!).backgroundImage, "none");
    });
    it("fits beside an open drawer: the nodes stay out of its 170 px", async () => {
      widget = await create({ attrs: { allowadding: "" }, data: GRAPH });
      await wait(500);
      const view = widget.shadowRoot!.querySelector("ww-scene")!.getBoundingClientRect();
      assert.isTrue(widget.shadowRoot!.querySelector<any>("#drawer").open);
      assert.isTrue(nodes(widget).every((node) => node.getBoundingClientRect().left >= view.left + 170 - 2));
    });
    it("does not move the view when a node is added later", async () => {
      const node = nodeOf(widget, "k1");
      const box = node.getBoundingClientRect();
      block(widget).textContent = JSON.stringify({ editorState: { ...GRAPH, nodes: [...GRAPH.nodes, { id: "far", label: "Key", customTitle: "Far", x: 4000, y: 3000, value: "" }] } });
      await until(() => nodes(widget).length === 4, "the block is read");
      await wait(500);
      assert.isBelow(Math.abs(node.getBoundingClientRect().left - box.left), 2);
    });
  });

  describe("wiring", function () {
    let widget: Hash;
    let log: string[];
    let from: HTMLElement;
    before(async () => {
      widget = await create({ data: LOOSE });
      log = eventLog(widget, "ww-transactionstart", "ww-connect", "ww-transactionend");
    });

    it("starts wires only at outputs and accepts them only at the fitting inputs", () => {
      from = portOf(widget, "k1", "key-output");
      assert.isTrue(from.hasAttribute("data-ww-link"));
      assert.isFalse(portOf(widget, "v1", "hash-value-input").hasAttribute("data-ww-link"));
      assert.equal(portOf(widget, "h1", "in-0").dataset.wwAccept, "key salt");
      assert.equal(portOf(widget, "v1", "hash-value-input").dataset.wwAccept, "hashfunction");
    });
    it("stores the connection of a drag from an output to an input", async () => {
      await sweep(from, centre(from), centre(portOf(widget, "h1", "in-0")));
      assert.deepEqual(graphOf(widget).connections, [{ source: "k1", sourceOutput: "key-output", target: "h1", targetInput: "in-0" }]);
    });
    it("makes the connection one undo step", () => {
      assert.equal(log.join(), "ww-transactionstart,ww-connect,ww-transactionend");
    });
    it("draws a wire and gives the hash function a free channel", () => {
      assert.equal(wires(widget).length, 1);
      assert.equal(graphOf(widget).nodes.find((n: any) => n.id === "h1").inputsCount, 2);
      assert.isOk(portOf(widget, "h1", "in-1"));
    });
    it("shows the hash on a connected pipeline", async () => {
      from = portOf(widget, "h1", "out-0");
      await sweep(from, centre(from), centre(portOf(widget, "v1", "hash-value-input")));
      await until(() => valueOf(widget, "v1") === SHA256_ABC, "the value shows the hash of the key");
      assert.equal(valueOf(widget, "v1"), SHA256_ABC);
    });
    it("does not make a wire the rules forbid", async () => {
      log = eventLog(widget, "ww-connect");
      from = portOf(widget, "s1", "salt-output");
      await sweep(from, centre(from), centre(portOf(widget, "v1", "hash-value-input")));
      assert.equal(log.length, 0);
      assert.equal(graphOf(widget).connections.length, 2);
    });
    it("changes nothing when a drag ends on nothing", async () => {
      await sweep(from, centre(from), by(from, 30, 60), {});
      assert.equal(graphOf(widget).connections.length, 2);
    });
    it("lets a socket hold one wire only", () => {
      assert.equal(portOf(widget, "h1", "in-0").dataset.wwCapacity, "1");
      assert.equal(portOf(widget, "k1", "key-output").dataset.wwCapacity, "1");
    });
    it("does not replace the wire of an occupied input: a salt dropped on it takes the free channel", async () => {
      from = portOf(widget, "s1", "salt-output");
      await sweep(from, centre(from), centre(portOf(widget, "h1", "in-0")));
      const connections = graphOf(widget).connections;
      assert.equal(connections.find((c: any) => c.targetInput === "in-0")?.source, "k1");
      assert.isTrue(connections.some((c: any) => c.source === "s1" && c.targetInput === "in-1"));
    });
    it("keeps the other channel apart and opens a further free one", () => {
      assert.equal(valueOf(widget, "v1"), SHA256_ABC);
      assert.isOk(portOf(widget, "h1", "in-2"));
    });
    it("lets a key feed a salt, and the salt shows what it receives", async () => {
      from = portOf(widget, "h1", "in-0");
      await sweep(from, centre(from), centre(portOf(widget, "s1", "salt-input")));
      assert.isTrue(graphOf(widget).connections.some((c: any) => c.source === "k1" && c.target === "s1"));
      assert.equal((nodeOf(widget, "s1").querySelector("salt-node") as any).incoming, "abc");
    });
    it("closes a gap in the channels of a hash function on load", async () => {
      widget.selection = new Set();
      block(widget).textContent = JSON.stringify({ editorState: { nodes: LOOSE.nodes.map((n) => (n.id === "h1" ? { ...n, inputsCount: 3 } : n)), connections: [{ source: "k1", sourceOutput: "key-output", target: "h1", targetInput: "in-1" }, { source: "h1", sourceOutput: "out-1", target: "v1", targetInput: "hash-value-input" }] } });
      await until(() => !!portOf(widget, "h1", "in-0") && wires(widget).length === 2, "the block is read");
      await quiet();
      assert.equal(wires(widget).map((wire) => wire.getAttribute("to")).sort().join(), "h1:in-0,v1:hash-value-input");
      assert.isNull(widget.shadowRoot!.querySelector('ww-node[data-ww-key="h1"] [data-ww-port="in-2"]'));
    });
    it("skips connections that break the rules or name missing nodes", async () => {
      block(widget).textContent = JSON.stringify({ editorState: { nodes: LOOSE.nodes, connections: [{ source: "k1", sourceOutput: "key-output", target: "v1", targetInput: "hash-value-input" }, { source: "ghost", sourceOutput: "key-output", target: "h1", targetInput: "in-0" }] } });
      await until(() => wires(widget).length === 0, "invalid connections are skipped");
      assert.equal(wires(widget).length, 0);
      assert.equal(nodes(widget).length, 4);
    });
  });
});

mocha.run();

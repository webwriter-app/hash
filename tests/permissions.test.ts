/// <reference types="mocha" />
import "mocha/mocha.js";
import { assert } from "chai";
import { getMochaConfig } from "@webwriter/build/test";
import "../src/widgets/webwriter-hash";

import { GRAPH, block, canvasPoint, centre, clearMount, create, dockItem, dragTo, eventLog, frame, key, nodes, quiet, stored, until, wait, type Hash } from "./helpers";

mocha.setup(getMochaConfig());

describe("<webwriter-hash> permissions and dock drag", function () {
  this.timeout(30000);
  after(clearMount);

  describe("a reader without permissions", function () {
    let widget: Hash;
    before(async () => { widget = await create({ data: GRAPH }); });

    it("loads the saved graph from the data block", () => {
      assert.equal(nodes(widget).length, 3);
    });
    it("hides the node menu toggle", () => {
      assert.isTrue(widget.shadowRoot!.querySelector<HTMLElement>('[data-ww-can="allowAdding"]')!.hidden);
    });
    it("keeps the drawer closed", () => {
      assert.isFalse((widget.shadowRoot!.querySelector("#drawer") as any).open);
    });
    it("shows no delete button", () => {
      assert.isTrue(nodes(widget).every((node) => !node.querySelector(".delete-button")));
    });
    it("cannot edit titles", async () => {
      nodes(widget)[0].querySelector<HTMLElement>(".title")!.click();
      await widget.updateComplete;
      assert.isNull(widget.shadowRoot!.querySelector(".title-input"));
    });
    it("cannot drag a dock entry", async () => {
      const count = nodes(widget).length;
      await dragTo(widget, "Key", canvasPoint(widget, 0.6, 0.6));
      assert.equal(nodes(widget).length, count);
      assert.isNull(widget.shadowRoot!.querySelector("[data-ww-dragging]"));
    });
  });

  describe("a reader with permissions", function () {
    let widget: Hash;
    let root: ShadowRoot;
    let count = 0;
    let seen: Awaited<ReturnType<typeof dragTo>>;
    const target = () => canvasPoint(widget, 0.6, 0.65);
    before(async () => {
      widget = await create({ attrs: { allowadding: "", allowdeleting: "" }, data: GRAPH });
      root = widget.shadowRoot!;
    });

    it("shows the toggle with allowadding", () => {
      assert.isFalse(root.querySelector<HTMLElement>('[data-ww-can="allowAdding"]')!.hidden);
    });
    it("opens the drawer with allowadding", () => {
      assert.isTrue((root.querySelector("#drawer") as any).open);
    });
    it("shows delete buttons with allowdeleting", () => {
      assert.isTrue(nodes(widget).every((node) => node.querySelector(".delete-button")));
    });
    it("makes the dock entries shadow items with a key and the copy effect", () => {
      const items = [...root.querySelectorAll<HTMLElement>(".dock-item")].map((item) => `${item.dataset.wwKey}:${item.dataset.wwDragEffect}`);
      assert.equal(items.join(), "Key:copy,Salt:copy,HashFunction:copy,HashValue:copy");
    });
    it("lifts the entry and marks the canvas while dragging", async () => {
      count = nodes(widget).length;
      seen = await dragTo(widget, "Salt", target());
      assert.isTrue(seen.lifted && seen.over, JSON.stringify({ lifted: seen.lifted, over: seen.over }));
    });
    it("creates the node with its centre at the drop point", async () => {
      await until(() => nodes(widget).length === count + 1, "the dropped node is created");
      const where = centre(nodes(widget).at(-1)!);
      assert.isBelow(Math.abs(where.clientX - target().clientX), 60);
      assert.isBelow(Math.abs(where.clientY - target().clientY), 60);
    });
    it("leaves nothing behind on the dock entry or the canvas", () => {
      assert.isNull(root.querySelector("[data-ww-dragging], [data-ww-drop-over], .drag-preview, .drag-overlay"));
      assert.lengthOf(seen.item.getAnimations(), 0);
    });
    it("saves the new node in the data block", () => {
      assert.equal(stored(widget)?.editorState?.nodes?.length, count + 1);
    });
    it("keeps the data block format of the old widget", () => {
      assert.equal(Object.keys(stored(widget)).join(), "editorState");
      assert.equal(block(widget).slot, "data");
      assert.equal(block(widget).type, "application/json");
    });
    it("cancels a drag with Escape without a new node", async () => {
      count = nodes(widget).length;
      seen = await dragTo(widget, "Key", target(), { cancel: true });
      assert.isTrue(seen.lifted);
      assert.equal(nodes(widget).length, count);
      assert.isNull(root.querySelector("[data-ww-dragging]"));
    });
    it("creates nothing for a drop on the drawer", async () => {
      const box = root.querySelector(".dock-header, editor-dock")!.getBoundingClientRect();
      await dragTo(widget, "Key", { clientX: box.left + 40, clientY: box.top + box.height + 60 });
      assert.equal(nodes(widget).length, count);
    });
    it("picks up a dock entry and drops it with the keyboard", async () => {
      const item = dockItem(widget, "HashValue");
      item.focus();
      key(item, " ");
      await frame();
      await frame();
      const picked = !!root.querySelector("[data-ww-drop-candidate]");
      key(item, "ArrowRight");
      key(item, "Enter");
      await wait(400);
      await quiet();
      assert.isTrue(picked, "picked up");
      assert.equal(nodes(widget).length, count + 1);
    });
    describe("deleting a node", function () {
      let log: string[];
      let count = 0;
      before(async () => {
        count = nodes(widget).length;
        log = eventLog(widget, "ww-transactionstart", "ww-transactionend");
        nodes(widget).at(-1)!.querySelector(".delete-button")!.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
        await until(() => nodes(widget).length === count - 1, "the node is deleted");
        await quiet();
      });
      it("removes the node and the block follows", () => {
        assert.equal(stored(widget).editorState.nodes.length, count - 1);
      });
      it("is one undo step", () => {
        assert.equal(log.join(), "ww-transactionstart,ww-transactionend");
      });
    });
  });
});

mocha.run();

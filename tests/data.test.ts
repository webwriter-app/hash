/// <reference types="mocha" />
import "mocha/mocha.js";
import { assert } from "chai";
import { getMochaConfig } from "@webwriter/build/test";
import "../src/widgets/webwriter-hash";

import { GRAPH, LOOSE, block, canvasPoint, clearMount, create, dragTo, graphOf, nodes, quiet, stored, until, type Hash } from "./helpers";

mocha.setup(getMochaConfig());

describe("<webwriter-hash> data block, language and edit mode", function () {
  this.timeout(30000);
  afterEach(() => { document.designMode = "off"; });
  after(clearMount);

  describe("data block", function () {
    let widget: Hash;
    before(async () => {
      widget = await create({ data: LOOSE });
      block(widget).textContent = JSON.stringify({ editorState: { nodes: [GRAPH.nodes[0]], connections: [] } });
      await until(() => nodes(widget).length === 1, "a changed block replaces the graph");
    });

    it("replaces the graph when the block changes from outside", () => {
      assert.equal(nodes(widget).length, 1);
    });
    it("does not rewrite a different value on the echo of the import", async () => {
      await quiet();
      assert.equal(stored(widget).editorState.nodes.length, 1);
    });
    it("keeps the graph when the block is unreadable", async () => {
      block(widget).textContent = "{not json";
      await quiet();
      assert.equal(nodes(widget).length, 1);
    });
    it("loads a legacy editorstate attribute", async () => {
      widget = await create({ legacy: GRAPH });
      assert.equal(nodes(widget).length, 3);
    });
    it("moves the legacy attribute into the block", () => {
      assert.equal(stored(widget)?.editorState?.nodes?.length, 3);
      assert.isFalse(widget.hasAttribute("editorstate"));
    });
    it("shows the default graph without a block", async () => {
      widget = await create({});
      assert.equal(nodes(widget).length, 4);
    });
    it("writes the default graph to a new block", () => {
      assert.equal(stored(widget)?.editorState?.nodes?.length, 4);
      assert.equal(block(widget).slot, "data");
    });
  });

  describe("localization", function () {
    let widget: Hash;
    const header = () => widget.shadowRoot!.querySelector("editor-dock")?.shadowRoot?.querySelector(".dock-header")?.textContent?.trim();
    const title = () => nodes(widget)[0].querySelector(".title span")?.textContent?.trim();
    before(async () => {
      widget = await create({ data: GRAPH, attrs: { allowadding: "" } });
      widget.setAttribute("lang", "de");
      await until(() => header() === "Knoten", "the dock header is German");
      await until(() => title() !== "Key", "node title is German");
    });

    it("lets the dock, a component of the widget, follow lang", () => {
      assert.equal(header(), "Knoten");
    });
    it("lets a node follow lang", () => {
      assert.notEqual(title(), "Key");
    });
    it("declares the permissions in the language", () => {
      assert.equal(widget.permissions!.allowAdding.label, "Knoten hinzufügen");
    });
    it("does not copy lang onto the attribute of a nested widget", () => {
      assert.equal(widget.getAttribute("lang"), "de");
      assert.isFalse(nodes(widget)[0].hasAttribute("lang"));
    });
    it("keeps the static declaration in the source language", () => {
      const label = (customElements.get("webwriter-hash") as any).permissions.allowAdding.label;
      assert.equal(label({ msg: (text: string) => text }), "Adding Nodes");
    });
    it("finds the catalog of a regional tag (zh-TW)", async () => {
      widget.setAttribute("lang", "zh-TW");
      await until(() => header() && header() !== "Knoten", "zh-TW catalog");
      assert.match(header()!, /[一-鿿]/);
    });
    it("returns to the source language when lang is removed", async () => {
      widget.removeAttribute("lang");
      await until(() => header() === "Nodes", "back to the source language");
      assert.equal(header(), "Nodes");
    });
  });

  describe("an author in edit mode", function () {
    let widget: Hash;
    let root: ShadowRoot;
    let count = 0;
    beforeEach(() => { document.designMode = "on"; });
    // The edit-mode state is shared by the tests of this block, as the editor shares it.
    it("sees the toggle without any attribute", async () => {
      document.designMode = "on";
      widget = await create({ editing: true, data: GRAPH });
      root = widget.shadowRoot!;
      assert.isFalse(root.querySelector<HTMLElement>('[data-ww-can="allowAdding"]')!.hidden);
    });
    it("sees the delete buttons without any attribute", () => {
      assert.isTrue(nodes(widget).every((node) => node.querySelector(".delete-button")));
    });
    it("does not get attributes written on a filled widget", () => {
      assert.isFalse(widget.hasAttribute("allowadding"));
      assert.isFalse(widget.hasAttribute("allowdeleting"));
    });
    it("has the drawer open", () => {
      assert.isTrue((root.querySelector("#drawer") as any).open);
    });
    it("can drag a dock entry", async () => {
      count = nodes(widget).length;
      await dragTo(widget, "Key", canvasPoint(widget, 0.6, 0.65));
      await until(() => nodes(widget).length === count + 1, "an author can drag in edit mode");
      assert.equal(nodes(widget).length, count + 1);
    });
    it("can edit a title", async () => {
      nodes(widget)[0].querySelector<HTMLElement>(".title")!.click();
      await widget.updateComplete;
      assert.isOk(widget.shadowRoot!.querySelector(".title-input"), `editingTitle=${widget.editingTitle}`);
    });
    it("keeps a renamed node's title in the block and shows it", async () => {
      const input = widget.shadowRoot!.querySelector<HTMLInputElement>(".title-input")!;
      input.value = "My key";
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, composed: true }));
      await until(() => graphOf(widget).nodes[0].customTitle === "My key", "the title is stored");
      assert.equal(nodes(widget)[0].querySelector(".title span")!.textContent!.trim(), "My key");
    });
    it("grants adding and deleting to readers on a new empty widget", async () => {
      widget = await create({ editing: true });
      assert.isTrue(widget.hasAttribute("allowadding"));
      assert.isTrue(widget.hasAttribute("allowdeleting"));
    });
  });
});

mocha.run();

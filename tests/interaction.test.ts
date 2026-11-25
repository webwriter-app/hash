/// <reference types="mocha" />
import "mocha/mocha.js";
import { assert } from "chai";
import { getMochaConfig } from "@webwriter/build/test";
import "../src/widgets/webwriter-hash";

import { GRAPH, by, centre, clearMount, create, fire, frame, graphOf, LOOSE, nodeOf, nodes, portOf, quiet, until, wait, type Hash } from "./helpers";

mocha.setup(getMochaConfig());

const dispatchKey = (target: EventTarget, name: string) => target.dispatchEvent(new KeyboardEvent("keydown", { key: name, bubbles: true, composed: true, cancelable: true }));

describe("<webwriter-hash> input, layout, theme and print", function () {
  this.timeout(30000);
  after(() => {
    document.designMode = "off";
    clearMount();
  });

  describe("keyboard and pointer", function () {
    let widget: Hash;
    before(async () => {
      document.designMode = "on";
      widget = await create({ editing: true, data: GRAPH });
    });

    it("offers every icon control as a labelled native button", () => {
      const root = widget.shadowRoot!;
      const buttons = [...root.querySelectorAll<HTMLButtonElement>("button.tool")];
      assert.isAtLeast(buttons.length, 3);
      assert.isTrue(buttons.every((button) => button.getAttribute("aria-label")));
      const copy = nodeOf(widget, "v1").querySelector("hash-value-node")!.shadowRoot!.querySelector("button");
      assert.isOk(copy?.getAttribute("aria-label"));
    });
    it("gives a node title a role and a tab stop in edit mode, and renames with Enter", async () => {
      const title = nodes(widget)[0].querySelector<HTMLElement>(".title")!;
      assert.equal(title.getAttribute("role"), "button");
      assert.equal(title.tabIndex, 0);
      dispatchKey(title, "Enter");
      await until(() => widget.editingTitle !== null, "the title field opens");
      await widget.updateComplete;
      assert.isOk(widget.shadowRoot!.querySelector(".title-input"));
    });
    it("keeps typed Delete and arrow keys in the title field away from the nodes", async () => {
      const before = JSON.stringify(graphOf(widget)?.nodes ?? GRAPH.nodes);
      const input = widget.shadowRoot!.querySelector<HTMLInputElement>(".title-input")!;
      for (const name of ["Delete", "Backspace", "ArrowRight"]) dispatchKey(input, name);
      await quiet();
      assert.equal(nodes(widget).length, 3);
      assert.equal(JSON.stringify(graphOf(widget)?.nodes ?? GRAPH.nodes), before);
      dispatchKey(input, "Escape");
      await widget.updateComplete;
    });
    it("keeps Delete in the key field from deleting the selected nodes", async () => {
      const handle = nodeOf(widget, "k1").querySelector(".title")!;
      fire(handle, "pointerdown", centre(handle));
      fire(handle, "pointerup", centre(handle));
      await quiet();
      assert.isTrue(widget.selection.has("k1"));
      const field = nodeOf(widget, "k1").querySelector("key-node")!.shadowRoot!.querySelector("sl-textarea")!.shadowRoot!.querySelector("textarea")!;
      dispatchKey(field, "Delete");
      await quiet();
      assert.equal(nodes(widget).length, 3);
    });
    it("lets a click on a socket pick up a wire", () => {
      assert.isTrue(widget.shadowRoot!.querySelector("ww-scene")!.hasAttribute("connect-click"));
    });
    it("moves the selected node with the arrow keys", async () => {
      const handle = nodeOf(widget, "h1").querySelector(".title")!;
      fire(handle, "pointerdown", centre(handle));
      fire(handle, "pointerup", centre(handle));
      await quiet();
      const before = graphOf(widget).nodes.find((n: any) => n.id === "h1").x;
      const node = nodeOf(widget, "h1");
      node.focus();
      dispatchKey(node, "ArrowRight");
      dispatchKey(node, "ArrowRight");
      node.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowRight", bubbles: true, composed: true }));
      await wait(1200);
      await quiet();
      assert.notEqual(graphOf(widget).nodes.find((n: any) => n.id === "h1").x, before);
    });
    it("labels the sockets", () => {
      const ports = [...widget.shadowRoot!.querySelectorAll<HTMLElement>("[data-ww-port]")];
      assert.isTrue(ports.every((port) => port.getAttribute("aria-label")));
    });
  });

  describe("keyboard wiring", function () {
    it("connects two sockets with Enter on the output and then on the input", async () => {
      document.designMode = "on";
      const widget = await create({ editing: true, data: LOOSE });
      const out = portOf(widget, "k1", "key-output");
      const input = portOf(widget, "h1", "in-0");
      out.focus();
      dispatchKey(out, "Enter");
      await quiet();
      input.focus();
      dispatchKey(input, "Enter");
      await quiet();
      const found = (graphOf(widget)?.connections ?? []).some((c: any) => c.source === "k1" && c.target === "h1");
      assert.isTrue(found, "the wire exists");
    });
  });

  describe("touch", function () {
    let widget: Hash;
    before(async () => {
      document.designMode = "off";
      widget = await create({ attrs: { allowdeleting: "" }, data: GRAPH });
    });

    it("moves a node with a touch drag", async () => {
      const node = nodeOf(widget, "v1");
      const scale = node.getBoundingClientRect().width / node.offsetWidth;
      const handle = node.querySelector(".title")!;
      const from = centre(handle);
      const to = by(handle, 50, 30);
      const touch = (type: string, position: { clientX: number; clientY: number }) => fire(handle, type, { ...position, pointerType: "touch" }, 21);
      touch("pointerdown", from);
      touch("pointermove", { clientX: from.clientX + 6, clientY: from.clientY + 6 });
      await frame();
      await frame();
      touch("pointermove", to);
      await frame();
      await frame();
      touch("pointerup", to);
      await wait(300);
      await quiet();
      const moved = graphOf(widget).nodes.find((n: any) => n.id === "v1");
      assert.isBelow(Math.abs(moved.x - (600 + 50 / scale)), 3);
      assert.isBelow(Math.abs(moved.y - 30 / scale), 3);
    });
    it("keeps the controls at 24 px or more", () => {
      const sizes = [...widget.shadowRoot!.querySelectorAll<HTMLElement>("button.tool, .delete-button")].filter((element) => element.offsetWidth > 0);
      assert.isAbove(sizes.length, 0);
      // Sizes in CSS pixels before the zoom of the canvas.
      assert.isTrue(sizes.every((element) => element.offsetWidth >= 24 && element.offsetHeight >= 24));
    });
  });

  describe("responsive layout", function () {
    let widget: Hash;
    before(async () => {
      widget = await create({ attrs: { allowadding: "", allowdeleting: "" }, data: GRAPH });
    });
    const resize = async (width: number) => {
      (widget.parentElement as HTMLElement).style.width = `${width}px`;
      await wait(400);
      await quiet();
    };

    for (const width of [300, 768, 1280, 2100]) {
      it(`fits a container of ${width} px without sideways overflow`, async () => {
        await resize(width);
        assert.approximately(widget.getBoundingClientRect().width, width, 1);
        assert.isAtMost(widget.scrollWidth, widget.clientWidth + 1);
      });
    }
    it("hides the title pill and slims the node menu below 480 px", async () => {
      await resize(300);
      const root = widget.shadowRoot!;
      assert.equal(getComputedStyle(root.querySelector(".pill-center")!).display, "none");
      assert.equal(root.querySelector("#drawer")!.getBoundingClientRect().width < 170, true);
      await resize(800);
      assert.notEqual(getComputedStyle(root.querySelector(".pill-center")!).display, "none");
    });
    it("keeps the nodes inside the window after a resize without a manual fit", async () => {
      await resize(2100);
      await wait(600);
      await resize(300);
      await wait(800);
      const view = widget.shadowRoot!.querySelector("ww-scene")!.getBoundingClientRect();
      assert.isTrue(nodes(widget).every((node) => { const box = node.getBoundingClientRect(); return box.right <= view.right + 1 && box.bottom <= view.bottom + 1; }));
    });
  });

  describe("theme", function () {
    it("takes text color, font and accent colors from the document", async () => {
      const widget = await create({ attrs: { allowadding: "" }, data: GRAPH });
      const wrapper = widget.parentElement as HTMLElement;
      wrapper.style.cssText += ";--ww-text-color: rgb(10, 20, 30);--ww-font-family: Georgia, serif;--ww-theme-accent-2: rgb(1, 2, 3);--ww-theme-accent-1: rgb(9, 8, 7)";
      await frame();
      const root = widget.shadowRoot!;
      assert.equal(getComputedStyle(widget).color, "rgb(10, 20, 30)");
      assert.include(getComputedStyle(widget).fontFamily, "Georgia");
      assert.equal(getComputedStyle(root.querySelector("ww-node.key")!).borderTopColor, "rgb(1, 2, 3)");
      assert.equal(getComputedStyle(root.querySelector(".pill .instruction")!).color, "rgb(10, 20, 30)");
      assert.include(getComputedStyle(root.querySelector(".title")!).fontFamily, "Georgia");
    });
    it("keeps the current colors without a theme", async () => {
      const widget = await create({ data: GRAPH });
      const root = widget.shadowRoot!;
      assert.equal(getComputedStyle(root.querySelector("ww-node.key")!).borderTopColor, "rgb(8, 88, 134)");
      assert.equal(getComputedStyle(root.querySelector("ww-node.hash-function")!).borderTopColor, "rgb(231, 140, 31)");
    });
    it("exposes the canvas, node and title parts", async () => {
      const widget = await create({ data: GRAPH });
      const root = widget.shadowRoot!;
      assert.isOk(root.querySelector('[part~="canvas"]'));
      assert.isOk(root.querySelector('ww-node[part~="node"]'));
      assert.isOk(root.querySelector('.title[part~="title"]'));
    });
  });

  describe("print", function () {
    it("draws a static picture of the graph for paper and removes it afterwards", async () => {
      const widget = await create({ data: GRAPH });
      const root = widget.shadowRoot!;
      window.dispatchEvent(new Event("beforeprint"));
      const picture = root.querySelector(".print-picture")!;
      assert.equal(picture.querySelectorAll(".print-node").length, 3);
      assert.equal(picture.querySelectorAll(".print-wire").length, 2);
      assert.include(picture.textContent, "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824");
      assert.isOk(root.querySelector(".widget-container[data-print]"));
      window.dispatchEvent(new Event("afterprint"));
      assert.equal(picture.querySelectorAll(".print-node").length, 0);
      assert.isNotOk(root.querySelector(".widget-container[data-print]"));
    });
    it("stops listening when it is removed", async () => {
      const widget = await create({ data: GRAPH });
      const picture = widget.shadowRoot!.querySelector(".print-picture")!;
      widget.remove();
      window.dispatchEvent(new Event("beforeprint"));
      assert.equal(picture.querySelectorAll(".print-node").length, 0);
    });
  });
});

mocha.run();

/// <reference types="mocha" />
import "mocha/mocha.js";
import { assert } from "chai";
import { getMochaConfig } from "@webwriter/build/test";
import "../src/widgets/webwriter-hash";
import { WebwriterHash } from "../src/widgets/webwriter-hash";
import flowFixture from "./fixtures/hash-flow.json";

import { GRAPH, SHA1_ABC, SHA256_HELLO, clearMount, create, graphOf, nodes, until, type Hash } from "./helpers";

mocha.setup(getMochaConfig());

const file = (text: string, name = "flow.json") => new File([text], name, { type: "application/json" });
const FLOW = JSON.stringify(flowFixture);

describe("<webwriter-hash> conversions and signals", function () {
  this.timeout(30000);
  after(clearMount);

  describe("declarations", () => {
    it("declares the json file formats", () => {
      assert.deepEqual(WebwriterHash.convertFrom, { ".json": "importJson" });
      assert.deepEqual(WebwriterHash.convertTo, { "application/json": "exportJson" });
    });
  });

  describe("export", () => {
    let widget: Hash;
    before(async () => { widget = await create({ data: GRAPH }); });

    it("returns a json file with the nodes and connections", async () => {
      const exported = widget.exportJson() as File;
      assert.equal(exported.name, "hash-flow.json");
      assert.equal(exported.type, "application/json");
      const data = JSON.parse(await exported.text());
      assert.equal(data.nodes.length, 3);
      assert.equal(data.connections.length, 2);
      assert.equal(data.nodes[0].value, "hello");
    });
  });

  describe("import", () => {
    let widget: Hash;
    beforeEach(async () => { widget = await create({ data: GRAPH }); });

    it("does not change the widget before the apply function runs", async () => {
      const apply = await widget.importJson(file(FLOW));
      assert.equal(graphOf(widget).nodes.length, 3);
      assert.equal(typeof apply, "function");
    });
    it("replaces the graph when applied", async () => {
      const apply = await widget.importJson(file(FLOW));
      apply();
      await until(() => nodes(widget).length === 4, "four nodes are drawn");
      assert.equal(graphOf(widget).nodes[0].customTitle, "Password");
      await until(() => widget.signals.hash.get() === "9b10bb16bb575befe32494789b75b52db0259ca6", "the signal follows the import");
    });
    it("rejects text that is not json", async () => {
      let message = "";
      try { await widget.importJson(file("{nope")); } catch (error) { message = (error as Error).message; }
      assert.match(message, /JSON/);
      assert.equal(graphOf(widget).nodes.length, 3);
    });
    it("rejects json that is not a flow", async () => {
      for (const text of ["[]", '{"nodes": 3}', '{"nodes": []}', '{"nodes": [{"id": "a", "label": "Pepper"}]}', '{"nodes": [{"label": "Key"}]}']) {
        let failed = false;
        try { await widget.importJson(file(text)); } catch { failed = true; }
        assert.isTrue(failed, text);
      }
      assert.equal(graphOf(widget).nodes.length, 3);
    });
    it("drops connections that break the wiring rules", async () => {
      const flow = { nodes: flowFixture.nodes, connections: [...flowFixture.connections, { source: "v1", sourceOutput: "x", target: "k1", targetInput: "y" }] };
      (await widget.importJson(file(JSON.stringify(flow))))();
      await until(() => nodes(widget).length === 4, "four nodes are drawn");
      assert.equal(graphOf(widget).connections.length, 3);
    });
  });

  describe("round trip", () => {
    it("gives the same graph after export and import", async () => {
      const source = await create({ data: flowFixture });
      const exported = source.exportJson() as File;
      const target = await create({ data: GRAPH });
      (await target.importJson(exported))();
      await until(() => nodes(target).length === 4, "four nodes are drawn");
      assert.deepEqual(graphOf(target), graphOf(source));
    });
  });

  describe("hash signal", () => {
    it("publishes the hash of the first hash value node and follows changes", async () => {
      const widget = await create({ data: GRAPH });
      const published = widget.signals.hash;
      assert.strictEqual(widget.signals.hash, published, "the signal instance is stable");
      assert.equal(published.get(), SHA256_HELLO);
      const key = widget.shadowRoot!.querySelector("key-node")!;
      key.dispatchEvent(new CustomEvent("val-change", { detail: { value: "abc" } }));
      await until(() => published.get() !== SHA256_HELLO, "the hash follows the key");
      assert.equal(published.get(), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    });
    it("is an empty string while nothing is shown", async () => {
      const widget = await create({ data: { ...GRAPH, nodes: GRAPH.nodes.map((n) => (n.id === "k1" ? { ...n, value: "" } : n)) } });
      assert.equal(widget.signals.hash.get(), "");
    });
    it("a flow with a sha1 function publishes a sha1 hash", async () => {
      const widget = await create({ data: { ...GRAPH, nodes: GRAPH.nodes.map((n) => (n.id === "h1" ? { ...n, selectedFunction: "sha1" } : n.id === "k1" ? { ...n, value: "abc" } : n)) } });
      assert.equal(widget.signals.hash.get(), SHA1_ABC);
    });
  });
});

mocha.run();

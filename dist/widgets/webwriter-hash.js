var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __decoratorStart = (base) => [, , , __create(base?.[__knownSymbol("metadata")] ?? null)];
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i8 = 0, fns = array[flags >> 1], n7 = fns && fns.length; i8 < n7; i8++) flags & 1 ? fns[i8].call(self) : value = fns[i8].call(self, value);
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k3 = flags & 7, s5 = !!(flags & 8), p4 = !!(flags & 16);
  var j3 = k3 > 3 ? array.length + 1 : k3 ? s5 ? 1 : 2 : 0, key = __decoratorStrings[k3 + 5];
  var initializers = k3 > 3 && (array[j3 - 1] = []), extraInitializers = array[j3] || (array[j3] = []);
  var desc = k3 && (!p4 && !s5 && (target = target.prototype), k3 < 5 && (k3 > 3 || !p4) && __getOwnPropDesc(k3 < 4 ? target : { get [name]() {
    return __privateGet(this, extra);
  }, set [name](x3) {
    return __privateSet(this, extra, x3);
  } }, name));
  k3 ? p4 && k3 < 4 && __name(extra, (k3 > 2 ? "set " : k3 > 1 ? "get " : "") + name) : __name(target, name);
  for (var i8 = decorators.length - 1; i8 >= 0; i8--) {
    ctx = __decoratorContext(k3, name, done = {}, array[3], extraInitializers);
    if (k3) {
      ctx.static = s5, ctx.private = p4, access = ctx.access = { has: p4 ? (x3) => __privateIn(target, x3) : (x3) => name in x3 };
      if (k3 ^ 3) access.get = p4 ? (x3) => (k3 ^ 1 ? __privateGet : __privateMethod)(x3, target, k3 ^ 4 ? extra : desc.get) : (x3) => x3[name];
      if (k3 > 2) access.set = p4 ? (x3, y4) => __privateSet(x3, target, y4, k3 ^ 4 ? extra : desc.set) : (x3, y4) => x3[name] = y4;
    }
    it = (0, decorators[i8])(k3 ? k3 < 4 ? p4 ? extra : desc[key] : k3 > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k3 ^ 4 || it === void 0) __expectFn(it) && (k3 > 4 ? initializers.unshift(it) : k3 ? p4 ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError("Object expected");
    else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
  }
  return k3 || __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p4 ? k3 ^ 4 ? extra : desc : target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t7, e12, o10) {
    if (this._$cssResult$ = true, o10 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t7, this.t = e12;
  }
  get styleSheet() {
    let t7 = this.o;
    const s5 = this.t;
    if (e && void 0 === t7) {
      const e12 = void 0 !== s5 && 1 === s5.length;
      e12 && (t7 = o.get(s5)), void 0 === t7 && ((this.o = t7 = new CSSStyleSheet()).replaceSync(this.cssText), e12 && o.set(s5, t7));
    }
    return t7;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t7) => new n("string" == typeof t7 ? t7 : t7 + "", void 0, s);
var i = (t7, ...e12) => {
  const o10 = 1 === t7.length ? t7[0] : e12.reduce((e13, s5, o11) => e13 + ((t8) => {
    if (true === t8._$cssResult$) return t8.cssText;
    if ("number" == typeof t8) return t8;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t7[o11 + 1], t7[0]);
  return new n(o10, t7, s);
};
var S = (s5, o10) => {
  if (e) s5.adoptedStyleSheets = o10.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet);
  else for (const e12 of o10) {
    const o11 = document.createElement("style"), n7 = t.litNonce;
    void 0 !== n7 && o11.setAttribute("nonce", n7), o11.textContent = e12.cssText, s5.appendChild(o11);
  }
};
var c = e ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
  let e12 = "";
  for (const s5 of t8.cssRules) e12 += s5.cssText;
  return r(e12);
})(t7) : t7;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t7, s5) => t7;
var u = { toAttribute(t7, s5) {
  switch (s5) {
    case Boolean:
      t7 = t7 ? l : null;
      break;
    case Object:
    case Array:
      t7 = null == t7 ? t7 : JSON.stringify(t7);
  }
  return t7;
}, fromAttribute(t7, s5) {
  let i8 = t7;
  switch (s5) {
    case Boolean:
      i8 = null !== t7;
      break;
    case Number:
      i8 = null === t7 ? null : Number(t7);
      break;
    case Object:
    case Array:
      try {
        i8 = JSON.parse(t7);
      } catch (t8) {
        i8 = null;
      }
  }
  return i8;
} };
var f = (t7, s5) => !i2(t7, s5);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
  static addInitializer(t7) {
    this._$Ei(), (this.l ??= []).push(t7);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t7, s5 = b) {
    if (s5.state && (s5.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t7) && ((s5 = Object.create(s5)).wrapped = true), this.elementProperties.set(t7, s5), !s5.noAccessor) {
      const i8 = Symbol(), h4 = this.getPropertyDescriptor(t7, i8, s5);
      void 0 !== h4 && e2(this.prototype, t7, h4);
    }
  }
  static getPropertyDescriptor(t7, s5, i8) {
    const { get: e12, set: r8 } = h(this.prototype, t7) ?? { get() {
      return this[s5];
    }, set(t8) {
      this[s5] = t8;
    } };
    return { get: e12, set(s6) {
      const h4 = e12?.call(this);
      r8?.call(this, s6), this.requestUpdate(t7, h4, i8);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t7) {
    return this.elementProperties.get(t7) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t7 = n2(this);
    t7.finalize(), void 0 !== t7.l && (this.l = [...t7.l]), this.elementProperties = new Map(t7.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t8 = this.properties, s5 = [...r2(t8), ...o2(t8)];
      for (const i8 of s5) this.createProperty(i8, t8[i8]);
    }
    const t7 = this[Symbol.metadata];
    if (null !== t7) {
      const s5 = litPropertyMetadata.get(t7);
      if (void 0 !== s5) for (const [t8, i8] of s5) this.elementProperties.set(t8, i8);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t8, s5] of this.elementProperties) {
      const i8 = this._$Eu(t8, s5);
      void 0 !== i8 && this._$Eh.set(i8, t8);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s5) {
    const i8 = [];
    if (Array.isArray(s5)) {
      const e12 = new Set(s5.flat(1 / 0).reverse());
      for (const s6 of e12) i8.unshift(c(s6));
    } else void 0 !== s5 && i8.push(c(s5));
    return i8;
  }
  static _$Eu(t7, s5) {
    const i8 = s5.attribute;
    return false === i8 ? void 0 : "string" == typeof i8 ? i8 : "string" == typeof t7 ? t7.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t7) => this.enableUpdating = t7), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t7) => t7(this));
  }
  addController(t7) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t7), void 0 !== this.renderRoot && this.isConnected && t7.hostConnected?.();
  }
  removeController(t7) {
    this._$EO?.delete(t7);
  }
  _$E_() {
    const t7 = /* @__PURE__ */ new Map(), s5 = this.constructor.elementProperties;
    for (const i8 of s5.keys()) this.hasOwnProperty(i8) && (t7.set(i8, this[i8]), delete this[i8]);
    t7.size > 0 && (this._$Ep = t7);
  }
  createRenderRoot() {
    const t7 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t7, this.constructor.elementStyles), t7;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t7) => t7.hostConnected?.());
  }
  enableUpdating(t7) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t7) => t7.hostDisconnected?.());
  }
  attributeChangedCallback(t7, s5, i8) {
    this._$AK(t7, i8);
  }
  _$ET(t7, s5) {
    const i8 = this.constructor.elementProperties.get(t7), e12 = this.constructor._$Eu(t7, i8);
    if (void 0 !== e12 && true === i8.reflect) {
      const h4 = (void 0 !== i8.converter?.toAttribute ? i8.converter : u).toAttribute(s5, i8.type);
      this._$Em = t7, null == h4 ? this.removeAttribute(e12) : this.setAttribute(e12, h4), this._$Em = null;
    }
  }
  _$AK(t7, s5) {
    const i8 = this.constructor, e12 = i8._$Eh.get(t7);
    if (void 0 !== e12 && this._$Em !== e12) {
      const t8 = i8.getPropertyOptions(e12), h4 = "function" == typeof t8.converter ? { fromAttribute: t8.converter } : void 0 !== t8.converter?.fromAttribute ? t8.converter : u;
      this._$Em = e12, this[e12] = h4.fromAttribute(s5, t8.type) ?? this._$Ej?.get(e12) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t7, s5, i8) {
    if (void 0 !== t7) {
      const e12 = this.constructor, h4 = this[t7];
      if (i8 ??= e12.getPropertyOptions(t7), !((i8.hasChanged ?? f)(h4, s5) || i8.useDefault && i8.reflect && h4 === this._$Ej?.get(t7) && !this.hasAttribute(e12._$Eu(t7, i8)))) return;
      this.C(t7, s5, i8);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t7, s5, { useDefault: i8, reflect: e12, wrapped: h4 }, r8) {
    i8 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t7) && (this._$Ej.set(t7, r8 ?? s5 ?? this[t7]), true !== h4 || void 0 !== r8) || (this._$AL.has(t7) || (this.hasUpdated || i8 || (s5 = void 0), this._$AL.set(t7, s5)), true === e12 && this._$Em !== t7 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t7));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t8) {
      Promise.reject(t8);
    }
    const t7 = this.scheduleUpdate();
    return null != t7 && await t7, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t9, s6] of this._$Ep) this[t9] = s6;
        this._$Ep = void 0;
      }
      const t8 = this.constructor.elementProperties;
      if (t8.size > 0) for (const [s6, i8] of t8) {
        const { wrapped: t9 } = i8, e12 = this[s6];
        true !== t9 || this._$AL.has(s6) || void 0 === e12 || this.C(s6, void 0, i8, e12);
      }
    }
    let t7 = false;
    const s5 = this._$AL;
    try {
      t7 = this.shouldUpdate(s5), t7 ? (this.willUpdate(s5), this._$EO?.forEach((t8) => t8.hostUpdate?.()), this.update(s5)) : this._$EM();
    } catch (s6) {
      throw t7 = false, this._$EM(), s6;
    }
    t7 && this._$AE(s5);
  }
  willUpdate(t7) {
  }
  _$AE(t7) {
    this._$EO?.forEach((t8) => t8.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t7) {
    return true;
  }
  update(t7) {
    this._$Eq &&= this._$Eq.forEach((t8) => this._$ET(t8, this[t8])), this._$EM();
  }
  updated(t7) {
  }
  firstUpdated(t7) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.0");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = t2.trustedTypes;
var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
var e3 = "$lit$";
var h2 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var o3 = "?" + h2;
var n3 = `<${o3}>`;
var r3 = document;
var l2 = () => r3.createComment("");
var c3 = (t7) => null === t7 || "object" != typeof t7 && "function" != typeof t7;
var a2 = Array.isArray;
var u2 = (t7) => a2(t7) || "function" == typeof t7?.[Symbol.iterator];
var d2 = "[ 	\n\f\r]";
var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v = /-->/g;
var _ = />/g;
var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var p2 = /'/g;
var g = /"/g;
var $ = /^(?:script|style|textarea|title)$/i;
var y2 = (t7) => (i8, ...s5) => ({ _$litType$: t7, strings: i8, values: s5 });
var x = y2(1);
var b2 = y2(2);
var w = y2(3);
var T = Symbol.for("lit-noChange");
var E = Symbol.for("lit-nothing");
var A = /* @__PURE__ */ new WeakMap();
var C = r3.createTreeWalker(r3, 129);
function P(t7, i8) {
  if (!a2(t7) || !t7.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s2 ? s2.createHTML(i8) : i8;
}
var V = (t7, i8) => {
  const s5 = t7.length - 1, o10 = [];
  let r8, l6 = 2 === i8 ? "<svg>" : 3 === i8 ? "<math>" : "", c6 = f2;
  for (let i9 = 0; i9 < s5; i9++) {
    const s6 = t7[i9];
    let a5, u6, d4 = -1, y4 = 0;
    for (; y4 < s6.length && (c6.lastIndex = y4, u6 = c6.exec(s6), null !== u6); ) y4 = c6.lastIndex, c6 === f2 ? "!--" === u6[1] ? c6 = v : void 0 !== u6[1] ? c6 = _ : void 0 !== u6[2] ? ($.test(u6[2]) && (r8 = RegExp("</" + u6[2], "g")), c6 = m) : void 0 !== u6[3] && (c6 = m) : c6 === m ? ">" === u6[0] ? (c6 = r8 ?? f2, d4 = -1) : void 0 === u6[1] ? d4 = -2 : (d4 = c6.lastIndex - u6[2].length, a5 = u6[1], c6 = void 0 === u6[3] ? m : '"' === u6[3] ? g : p2) : c6 === g || c6 === p2 ? c6 = m : c6 === v || c6 === _ ? c6 = f2 : (c6 = m, r8 = void 0);
    const x3 = c6 === m && t7[i9 + 1].startsWith("/>") ? " " : "";
    l6 += c6 === f2 ? s6 + n3 : d4 >= 0 ? (o10.push(a5), s6.slice(0, d4) + e3 + s6.slice(d4) + h2 + x3) : s6 + h2 + (-2 === d4 ? i9 : x3);
  }
  return [P(t7, l6 + (t7[s5] || "<?>") + (2 === i8 ? "</svg>" : 3 === i8 ? "</math>" : "")), o10];
};
var N = class _N2 {
  constructor({ strings: t7, _$litType$: s5 }, n7) {
    let r8;
    this.parts = [];
    let c6 = 0, a5 = 0;
    const u6 = t7.length - 1, d4 = this.parts, [f5, v3] = V(t7, s5);
    if (this.el = _N2.createElement(f5, n7), C.currentNode = this.el.content, 2 === s5 || 3 === s5) {
      const t8 = this.el.content.firstChild;
      t8.replaceWith(...t8.childNodes);
    }
    for (; null !== (r8 = C.nextNode()) && d4.length < u6; ) {
      if (1 === r8.nodeType) {
        if (r8.hasAttributes()) for (const t8 of r8.getAttributeNames()) if (t8.endsWith(e3)) {
          const i8 = v3[a5++], s6 = r8.getAttribute(t8).split(h2), e12 = /([.?@])?(.*)/.exec(i8);
          d4.push({ type: 1, index: c6, name: e12[2], strings: s6, ctor: "." === e12[1] ? H : "?" === e12[1] ? I : "@" === e12[1] ? L : k }), r8.removeAttribute(t8);
        } else t8.startsWith(h2) && (d4.push({ type: 6, index: c6 }), r8.removeAttribute(t8));
        if ($.test(r8.tagName)) {
          const t8 = r8.textContent.split(h2), s6 = t8.length - 1;
          if (s6 > 0) {
            r8.textContent = i3 ? i3.emptyScript : "";
            for (let i8 = 0; i8 < s6; i8++) r8.append(t8[i8], l2()), C.nextNode(), d4.push({ type: 2, index: ++c6 });
            r8.append(t8[s6], l2());
          }
        }
      } else if (8 === r8.nodeType) if (r8.data === o3) d4.push({ type: 2, index: c6 });
      else {
        let t8 = -1;
        for (; -1 !== (t8 = r8.data.indexOf(h2, t8 + 1)); ) d4.push({ type: 7, index: c6 }), t8 += h2.length - 1;
      }
      c6++;
    }
  }
  static createElement(t7, i8) {
    const s5 = r3.createElement("template");
    return s5.innerHTML = t7, s5;
  }
};
function S2(t7, i8, s5 = t7, e12) {
  if (i8 === T) return i8;
  let h4 = void 0 !== e12 ? s5._$Co?.[e12] : s5._$Cl;
  const o10 = c3(i8) ? void 0 : i8._$litDirective$;
  return h4?.constructor !== o10 && (h4?._$AO?.(false), void 0 === o10 ? h4 = void 0 : (h4 = new o10(t7), h4._$AT(t7, s5, e12)), void 0 !== e12 ? (s5._$Co ??= [])[e12] = h4 : s5._$Cl = h4), void 0 !== h4 && (i8 = S2(t7, h4._$AS(t7, i8.values), h4, e12)), i8;
}
var M = class {
  constructor(t7, i8) {
    this._$AV = [], this._$AN = void 0, this._$AD = t7, this._$AM = i8;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t7) {
    const { el: { content: i8 }, parts: s5 } = this._$AD, e12 = (t7?.creationScope ?? r3).importNode(i8, true);
    C.currentNode = e12;
    let h4 = C.nextNode(), o10 = 0, n7 = 0, l6 = s5[0];
    for (; void 0 !== l6; ) {
      if (o10 === l6.index) {
        let i9;
        2 === l6.type ? i9 = new R(h4, h4.nextSibling, this, t7) : 1 === l6.type ? i9 = new l6.ctor(h4, l6.name, l6.strings, this, t7) : 6 === l6.type && (i9 = new z(h4, this, t7)), this._$AV.push(i9), l6 = s5[++n7];
      }
      o10 !== l6?.index && (h4 = C.nextNode(), o10++);
    }
    return C.currentNode = r3, e12;
  }
  p(t7) {
    let i8 = 0;
    for (const s5 of this._$AV) void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t7, s5, i8), i8 += s5.strings.length - 2) : s5._$AI(t7[i8])), i8++;
  }
};
var R = class _R2 {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t7, i8, s5, e12) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t7, this._$AB = i8, this._$AM = s5, this.options = e12, this._$Cv = e12?.isConnected ?? true;
  }
  get parentNode() {
    let t7 = this._$AA.parentNode;
    const i8 = this._$AM;
    return void 0 !== i8 && 11 === t7?.nodeType && (t7 = i8.parentNode), t7;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t7, i8 = this) {
    t7 = S2(this, t7, i8), c3(t7) ? t7 === E || null == t7 || "" === t7 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t7 !== this._$AH && t7 !== T && this._(t7) : void 0 !== t7._$litType$ ? this.$(t7) : void 0 !== t7.nodeType ? this.T(t7) : u2(t7) ? this.k(t7) : this._(t7);
  }
  O(t7) {
    return this._$AA.parentNode.insertBefore(t7, this._$AB);
  }
  T(t7) {
    this._$AH !== t7 && (this._$AR(), this._$AH = this.O(t7));
  }
  _(t7) {
    this._$AH !== E && c3(this._$AH) ? this._$AA.nextSibling.data = t7 : this.T(r3.createTextNode(t7)), this._$AH = t7;
  }
  $(t7) {
    const { values: i8, _$litType$: s5 } = t7, e12 = "number" == typeof s5 ? this._$AC(t7) : (void 0 === s5.el && (s5.el = N.createElement(P(s5.h, s5.h[0]), this.options)), s5);
    if (this._$AH?._$AD === e12) this._$AH.p(i8);
    else {
      const t8 = new M(e12, this), s6 = t8.u(this.options);
      t8.p(i8), this.T(s6), this._$AH = t8;
    }
  }
  _$AC(t7) {
    let i8 = A.get(t7.strings);
    return void 0 === i8 && A.set(t7.strings, i8 = new N(t7)), i8;
  }
  k(t7) {
    a2(this._$AH) || (this._$AH = [], this._$AR());
    const i8 = this._$AH;
    let s5, e12 = 0;
    for (const h4 of t7) e12 === i8.length ? i8.push(s5 = new _R2(this.O(l2()), this.O(l2()), this, this.options)) : s5 = i8[e12], s5._$AI(h4), e12++;
    e12 < i8.length && (this._$AR(s5 && s5._$AB.nextSibling, e12), i8.length = e12);
  }
  _$AR(t7 = this._$AA.nextSibling, i8) {
    for (this._$AP?.(false, true, i8); t7 && t7 !== this._$AB; ) {
      const i9 = t7.nextSibling;
      t7.remove(), t7 = i9;
    }
  }
  setConnected(t7) {
    void 0 === this._$AM && (this._$Cv = t7, this._$AP?.(t7));
  }
};
var k = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t7, i8, s5, e12, h4) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t7, this.name = i8, this._$AM = e12, this.options = h4, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = E;
  }
  _$AI(t7, i8 = this, s5, e12) {
    const h4 = this.strings;
    let o10 = false;
    if (void 0 === h4) t7 = S2(this, t7, i8, 0), o10 = !c3(t7) || t7 !== this._$AH && t7 !== T, o10 && (this._$AH = t7);
    else {
      const e13 = t7;
      let n7, r8;
      for (t7 = h4[0], n7 = 0; n7 < h4.length - 1; n7++) r8 = S2(this, e13[s5 + n7], i8, n7), r8 === T && (r8 = this._$AH[n7]), o10 ||= !c3(r8) || r8 !== this._$AH[n7], r8 === E ? t7 = E : t7 !== E && (t7 += (r8 ?? "") + h4[n7 + 1]), this._$AH[n7] = r8;
    }
    o10 && !e12 && this.j(t7);
  }
  j(t7) {
    t7 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 ?? "");
  }
};
var H = class extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t7) {
    this.element[this.name] = t7 === E ? void 0 : t7;
  }
};
var I = class extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t7) {
    this.element.toggleAttribute(this.name, !!t7 && t7 !== E);
  }
};
var L = class extends k {
  constructor(t7, i8, s5, e12, h4) {
    super(t7, i8, s5, e12, h4), this.type = 5;
  }
  _$AI(t7, i8 = this) {
    if ((t7 = S2(this, t7, i8, 0) ?? E) === T) return;
    const s5 = this._$AH, e12 = t7 === E && s5 !== E || t7.capture !== s5.capture || t7.once !== s5.once || t7.passive !== s5.passive, h4 = t7 !== E && (s5 === E || e12);
    e12 && this.element.removeEventListener(this.name, this, s5), h4 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
  }
  handleEvent(t7) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t7) : this._$AH.handleEvent(t7);
  }
};
var z = class {
  constructor(t7, i8, s5) {
    this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i8, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t7) {
    S2(this, t7);
  }
};
var Z = { M: e3, P: h2, A: o3, C: 1, L: V, R: M, D: u2, V: S2, I: R, H: k, N: I, U: L, B: H, F: z };
var j = t2.litHtmlPolyfillSupport;
j?.(N, R), (t2.litHtmlVersions ??= []).push("3.3.0");
var B = (t7, i8, s5) => {
  const e12 = s5?.renderBefore ?? i8;
  let h4 = e12._$litPart$;
  if (void 0 === h4) {
    const t8 = s5?.renderBefore ?? null;
    e12._$litPart$ = h4 = new R(i8.insertBefore(l2(), t8), t8, void 0, s5 ?? {});
  }
  return h4._$AI(t7), h4;
};

// node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t7 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t7.firstChild, t7;
  }
  update(t7) {
    const r8 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Do = B(r8, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return T;
  }
};
i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
var o4 = s3.litElementPolyfillSupport;
o4?.({ LitElement: i4 });
(s3.litElementVersions ??= []).push("4.2.0");

// node_modules/@webwriter/lit/index.js
var __create2 = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __knownSymbol2 = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError2 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name2 = (target, value) => __defProp2(target, "name", { value, configurable: true });
var __decoratorStart2 = (base) => [, , , __create2(base?.[__knownSymbol2("metadata")] ?? null)];
var __decoratorStrings2 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn2 = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError2("Function expected") : fn;
var __decoratorContext2 = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings2[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError2("Already initialized") : fns.push(__expectFn2(fn || null)) });
var __decoratorMetadata2 = (array, target) => __defNormalProp2(target, __knownSymbol2("metadata"), array[3]);
var __runInitializers2 = (array, flags, self, value) => {
  for (var i52 = 0, fns = array[flags >> 1], n52 = fns && fns.length; i52 < n52; i52++) flags & 1 ? fns[i52].call(self) : value = fns[i52].call(self, value);
  return value;
};
var __decorateElement2 = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k22 = flags & 7, s42 = !!(flags & 8), p32 = !!(flags & 16);
  var j22 = k22 > 3 ? array.length + 1 : k22 ? s42 ? 1 : 2 : 0, key = __decoratorStrings2[k22 + 5];
  var initializers = k22 > 3 && (array[j22 - 1] = []), extraInitializers = array[j22] || (array[j22] = []);
  var desc = k22 && (!p32 && !s42 && (target = target.prototype), k22 < 5 && (k22 > 3 || !p32) && __getOwnPropDesc2(k22 < 4 ? target : { get [name]() {
    return __privateGet2(this, extra);
  }, set [name](x22) {
    return __privateSet2(this, extra, x22);
  } }, name));
  k22 ? p32 && k22 < 4 && __name2(extra, (k22 > 2 ? "set " : k22 > 1 ? "get " : "") + name) : __name2(target, name);
  for (var i52 = decorators.length - 1; i52 >= 0; i52--) {
    ctx = __decoratorContext2(k22, name, done = {}, array[3], extraInitializers);
    if (k22) {
      ctx.static = s42, ctx.private = p32, access = ctx.access = { has: p32 ? (x22) => __privateIn2(target, x22) : (x22) => name in x22 };
      if (k22 ^ 3) access.get = p32 ? (x22) => (k22 ^ 1 ? __privateGet2 : __privateMethod2)(x22, target, k22 ^ 4 ? extra : desc.get) : (x22) => x22[name];
      if (k22 > 2) access.set = p32 ? (x22, y32) => __privateSet2(x22, target, y32, k22 ^ 4 ? extra : desc.set) : (x22, y32) => x22[name] = y32;
    }
    it = (0, decorators[i52])(k22 ? k22 < 4 ? p32 ? extra : desc[key] : k22 > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k22 ^ 4 || it === void 0) __expectFn2(it) && (k22 > 4 ? initializers.unshift(it) : k22 ? p32 ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError2("Object expected");
    else __expectFn2(fn = it.get) && (desc.get = fn), __expectFn2(fn = it.set) && (desc.set = fn), __expectFn2(fn = it.init) && initializers.unshift(fn);
  }
  return k22 || __decoratorMetadata2(array, target), desc && __defProp2(target, name, desc), p32 ? k22 ^ 4 ? extra : desc : target;
};
var __publicField2 = (obj, key, value) => __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck2 = (obj, member, msg) => member.has(obj) || __typeError2("Cannot " + msg);
var __privateIn2 = (member, obj) => Object(obj) !== obj ? __typeError2('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet2 = (obj, member, getter) => (__accessCheck2(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd2 = (obj, member, value) => member.has(obj) ? __typeError2("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet2 = (obj, member, value, setter) => (__accessCheck2(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod2 = (obj, member, method) => (__accessCheck2(obj, member, "access private method"), method);
var t3 = globalThis;
var e4 = t3.ShadowRoot && (void 0 === t3.ShadyCSS || t3.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s4 = Symbol();
var o5 = /* @__PURE__ */ new WeakMap();
var n4 = class {
  constructor(t32, e52, o62) {
    if (this._$cssResult$ = true, o62 !== s4) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t32, this.t = e52;
  }
  get styleSheet() {
    let t32 = this.o;
    const s42 = this.t;
    if (e4 && void 0 === t32) {
      const e52 = void 0 !== s42 && 1 === s42.length;
      e52 && (t32 = o5.get(s42)), void 0 === t32 && ((this.o = t32 = new CSSStyleSheet()).replaceSync(this.cssText), e52 && o5.set(s42, t32));
    }
    return t32;
  }
  toString() {
    return this.cssText;
  }
};
var r4 = (t32) => new n4("string" == typeof t32 ? t32 : t32 + "", void 0, s4);
var S3 = (s42, o62) => {
  if (e4) s42.adoptedStyleSheets = o62.map((t32) => t32 instanceof CSSStyleSheet ? t32 : t32.styleSheet);
  else for (const e52 of o62) {
    const o72 = document.createElement("style"), n52 = t3.litNonce;
    void 0 !== n52 && o72.setAttribute("nonce", n52), o72.textContent = e52.cssText, s42.appendChild(o72);
  }
};
var c4 = e4 ? (t32) => t32 : (t32) => t32 instanceof CSSStyleSheet ? ((t42) => {
  let e52 = "";
  for (const s42 of t42.cssRules) e52 += s42.cssText;
  return r4(e52);
})(t32) : t32;
var { is: i22, defineProperty: e22, getOwnPropertyDescriptor: h3, getOwnPropertyNames: r22, getOwnPropertySymbols: o22, getPrototypeOf: n22 } = Object;
var a3 = globalThis;
var c22 = a3.trustedTypes;
var l3 = c22 ? c22.emptyScript : "";
var p3 = a3.reactiveElementPolyfillSupport;
var d3 = (t32, s42) => t32;
var u3 = { toAttribute(t32, s42) {
  switch (s42) {
    case Boolean:
      t32 = t32 ? l3 : null;
      break;
    case Object:
    case Array:
      t32 = null == t32 ? t32 : JSON.stringify(t32);
  }
  return t32;
}, fromAttribute(t32, s42) {
  let i52 = t32;
  switch (s42) {
    case Boolean:
      i52 = null !== t32;
      break;
    case Number:
      i52 = null === t32 ? null : Number(t32);
      break;
    case Object:
    case Array:
      try {
        i52 = JSON.parse(t32);
      } catch (t42) {
        i52 = null;
      }
  }
  return i52;
} };
var f3 = (t32, s42) => !i22(t32, s42);
var b3 = { attribute: true, type: String, converter: u3, reflect: false, useDefault: false, hasChanged: f3 };
Symbol.metadata ??= Symbol("metadata"), a3.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y3 = class extends HTMLElement {
  static addInitializer(t32) {
    this._$Ei(), (this.l ??= []).push(t32);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t32, s42 = b3) {
    if (s42.state && (s42.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t32) && ((s42 = Object.create(s42)).wrapped = true), this.elementProperties.set(t32, s42), !s42.noAccessor) {
      const i52 = Symbol(), h32 = this.getPropertyDescriptor(t32, i52, s42);
      void 0 !== h32 && e22(this.prototype, t32, h32);
    }
  }
  static getPropertyDescriptor(t32, s42, i52) {
    const { get: e52, set: r52 } = h3(this.prototype, t32) ?? { get() {
      return this[s42];
    }, set(t42) {
      this[s42] = t42;
    } };
    return { get: e52, set(s5) {
      const h32 = e52?.call(this);
      r52?.call(this, s5), this.requestUpdate(t32, h32, i52);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t32) {
    return this.elementProperties.get(t32) ?? b3;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d3("elementProperties"))) return;
    const t32 = n22(this);
    t32.finalize(), void 0 !== t32.l && (this.l = [...t32.l]), this.elementProperties = new Map(t32.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d3("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d3("properties"))) {
      const t42 = this.properties, s42 = [...r22(t42), ...o22(t42)];
      for (const i52 of s42) this.createProperty(i52, t42[i52]);
    }
    const t32 = this[Symbol.metadata];
    if (null !== t32) {
      const s42 = litPropertyMetadata.get(t32);
      if (void 0 !== s42) for (const [t42, i52] of s42) this.elementProperties.set(t42, i52);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t42, s42] of this.elementProperties) {
      const i52 = this._$Eu(t42, s42);
      void 0 !== i52 && this._$Eh.set(i52, t42);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s42) {
    const i52 = [];
    if (Array.isArray(s42)) {
      const e52 = new Set(s42.flat(1 / 0).reverse());
      for (const s5 of e52) i52.unshift(c4(s5));
    } else void 0 !== s42 && i52.push(c4(s42));
    return i52;
  }
  static _$Eu(t32, s42) {
    const i52 = s42.attribute;
    return false === i52 ? void 0 : "string" == typeof i52 ? i52 : "string" == typeof t32 ? t32.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t32) => this.enableUpdating = t32), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t32) => t32(this));
  }
  addController(t32) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t32), void 0 !== this.renderRoot && this.isConnected && t32.hostConnected?.();
  }
  removeController(t32) {
    this._$EO?.delete(t32);
  }
  _$E_() {
    const t32 = /* @__PURE__ */ new Map(), s42 = this.constructor.elementProperties;
    for (const i52 of s42.keys()) this.hasOwnProperty(i52) && (t32.set(i52, this[i52]), delete this[i52]);
    t32.size > 0 && (this._$Ep = t32);
  }
  createRenderRoot() {
    const t32 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S3(t32, this.constructor.elementStyles), t32;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t32) => t32.hostConnected?.());
  }
  enableUpdating(t32) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t32) => t32.hostDisconnected?.());
  }
  attributeChangedCallback(t32, s42, i52) {
    this._$AK(t32, i52);
  }
  _$ET(t32, s42) {
    const i52 = this.constructor.elementProperties.get(t32), e52 = this.constructor._$Eu(t32, i52);
    if (void 0 !== e52 && true === i52.reflect) {
      const h32 = (void 0 !== i52.converter?.toAttribute ? i52.converter : u3).toAttribute(s42, i52.type);
      this._$Em = t32, null == h32 ? this.removeAttribute(e52) : this.setAttribute(e52, h32), this._$Em = null;
    }
  }
  _$AK(t32, s42) {
    const i52 = this.constructor, e52 = i52._$Eh.get(t32);
    if (void 0 !== e52 && this._$Em !== e52) {
      const t42 = i52.getPropertyOptions(e52), h32 = "function" == typeof t42.converter ? { fromAttribute: t42.converter } : void 0 !== t42.converter?.fromAttribute ? t42.converter : u3;
      this._$Em = e52, this[e52] = h32.fromAttribute(s42, t42.type) ?? this._$Ej?.get(e52) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t32, s42, i52) {
    if (void 0 !== t32) {
      const e52 = this.constructor, h32 = this[t32];
      if (i52 ??= e52.getPropertyOptions(t32), !((i52.hasChanged ?? f3)(h32, s42) || i52.useDefault && i52.reflect && h32 === this._$Ej?.get(t32) && !this.hasAttribute(e52._$Eu(t32, i52)))) return;
      this.C(t32, s42, i52);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t32, s42, { useDefault: i52, reflect: e52, wrapped: h32 }, r52) {
    i52 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t32) && (this._$Ej.set(t32, r52 ?? s42 ?? this[t32]), true !== h32 || void 0 !== r52) || (this._$AL.has(t32) || (this.hasUpdated || i52 || (s42 = void 0), this._$AL.set(t32, s42)), true === e52 && this._$Em !== t32 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t32));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t42) {
      Promise.reject(t42);
    }
    const t32 = this.scheduleUpdate();
    return null != t32 && await t32, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t52, s5] of this._$Ep) this[t52] = s5;
        this._$Ep = void 0;
      }
      const t42 = this.constructor.elementProperties;
      if (t42.size > 0) for (const [s5, i52] of t42) {
        const { wrapped: t52 } = i52, e52 = this[s5];
        true !== t52 || this._$AL.has(s5) || void 0 === e52 || this.C(s5, void 0, i52, e52);
      }
    }
    let t32 = false;
    const s42 = this._$AL;
    try {
      t32 = this.shouldUpdate(s42), t32 ? (this.willUpdate(s42), this._$EO?.forEach((t42) => t42.hostUpdate?.()), this.update(s42)) : this._$EM();
    } catch (s5) {
      throw t32 = false, this._$EM(), s5;
    }
    t32 && this._$AE(s42);
  }
  willUpdate(t32) {
  }
  _$AE(t32) {
    this._$EO?.forEach((t42) => t42.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t32)), this.updated(t32);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t32) {
    return true;
  }
  update(t32) {
    this._$Eq &&= this._$Eq.forEach((t42) => this._$ET(t42, this[t42])), this._$EM();
  }
  updated(t32) {
  }
  firstUpdated(t32) {
  }
};
y3.elementStyles = [], y3.shadowRootOptions = { mode: "open" }, y3[d3("elementProperties")] = /* @__PURE__ */ new Map(), y3[d3("finalized")] = /* @__PURE__ */ new Map(), p3?.({ ReactiveElement: y3 }), (a3.reactiveElementVersions ??= []).push("2.1.0");
var t22 = globalThis;
var i32 = t22.trustedTypes;
var s22 = i32 ? i32.createPolicy("lit-html", { createHTML: (t32) => t32 }) : void 0;
var e32 = "$lit$";
var h22 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var o32 = "?" + h22;
var n32 = `<${o32}>`;
var r32 = document;
var l22 = () => r32.createComment("");
var c32 = (t32) => null === t32 || "object" != typeof t32 && "function" != typeof t32;
var a22 = Array.isArray;
var u22 = (t32) => a22(t32) || "function" == typeof t32?.[Symbol.iterator];
var d22 = "[ 	\n\f\r]";
var f22 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var v2 = /-->/g;
var _2 = />/g;
var m2 = RegExp(`>|${d22}(?:([^\\s"'>=/]+)(${d22}*=${d22}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var p22 = /'/g;
var g2 = /"/g;
var $2 = /^(?:script|style|textarea|title)$/i;
var y22 = (t32) => (i52, ...s42) => ({ _$litType$: t32, strings: i52, values: s42 });
var x2 = y22(1);
var b22 = y22(2);
var w2 = y22(3);
var T2 = Symbol.for("lit-noChange");
var E2 = Symbol.for("lit-nothing");
var A2 = /* @__PURE__ */ new WeakMap();
var C2 = r32.createTreeWalker(r32, 129);
function P2(t32, i52) {
  if (!a22(t32) || !t32.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s22 ? s22.createHTML(i52) : i52;
}
var V2 = (t32, i52) => {
  const s42 = t32.length - 1, o62 = [];
  let r52, l32 = 2 === i52 ? "<svg>" : 3 === i52 ? "<math>" : "", c42 = f22;
  for (let i62 = 0; i62 < s42; i62++) {
    const s5 = t32[i62];
    let a32, u33, d32 = -1, y32 = 0;
    for (; y32 < s5.length && (c42.lastIndex = y32, u33 = c42.exec(s5), null !== u33); ) y32 = c42.lastIndex, c42 === f22 ? "!--" === u33[1] ? c42 = v2 : void 0 !== u33[1] ? c42 = _2 : void 0 !== u33[2] ? ($2.test(u33[2]) && (r52 = RegExp("</" + u33[2], "g")), c42 = m2) : void 0 !== u33[3] && (c42 = m2) : c42 === m2 ? ">" === u33[0] ? (c42 = r52 ?? f22, d32 = -1) : void 0 === u33[1] ? d32 = -2 : (d32 = c42.lastIndex - u33[2].length, a32 = u33[1], c42 = void 0 === u33[3] ? m2 : '"' === u33[3] ? g2 : p22) : c42 === g2 || c42 === p22 ? c42 = m2 : c42 === v2 || c42 === _2 ? c42 = f22 : (c42 = m2, r52 = void 0);
    const x22 = c42 === m2 && t32[i62 + 1].startsWith("/>") ? " " : "";
    l32 += c42 === f22 ? s5 + n32 : d32 >= 0 ? (o62.push(a32), s5.slice(0, d32) + e32 + s5.slice(d32) + h22 + x22) : s5 + h22 + (-2 === d32 ? i62 : x22);
  }
  return [P2(t32, l32 + (t32[s42] || "<?>") + (2 === i52 ? "</svg>" : 3 === i52 ? "</math>" : "")), o62];
};
var N2 = class _N {
  constructor({ strings: t32, _$litType$: s42 }, n52) {
    let r52;
    this.parts = [];
    let c42 = 0, a32 = 0;
    const u33 = t32.length - 1, d32 = this.parts, [f32, v22] = V2(t32, s42);
    if (this.el = _N.createElement(f32, n52), C2.currentNode = this.el.content, 2 === s42 || 3 === s42) {
      const t42 = this.el.content.firstChild;
      t42.replaceWith(...t42.childNodes);
    }
    for (; null !== (r52 = C2.nextNode()) && d32.length < u33; ) {
      if (1 === r52.nodeType) {
        if (r52.hasAttributes()) for (const t42 of r52.getAttributeNames()) if (t42.endsWith(e32)) {
          const i52 = v22[a32++], s5 = r52.getAttribute(t42).split(h22), e52 = /([.?@])?(.*)/.exec(i52);
          d32.push({ type: 1, index: c42, name: e52[2], strings: s5, ctor: "." === e52[1] ? H2 : "?" === e52[1] ? I2 : "@" === e52[1] ? L2 : k2 }), r52.removeAttribute(t42);
        } else t42.startsWith(h22) && (d32.push({ type: 6, index: c42 }), r52.removeAttribute(t42));
        if ($2.test(r52.tagName)) {
          const t42 = r52.textContent.split(h22), s5 = t42.length - 1;
          if (s5 > 0) {
            r52.textContent = i32 ? i32.emptyScript : "";
            for (let i52 = 0; i52 < s5; i52++) r52.append(t42[i52], l22()), C2.nextNode(), d32.push({ type: 2, index: ++c42 });
            r52.append(t42[s5], l22());
          }
        }
      } else if (8 === r52.nodeType) if (r52.data === o32) d32.push({ type: 2, index: c42 });
      else {
        let t42 = -1;
        for (; -1 !== (t42 = r52.data.indexOf(h22, t42 + 1)); ) d32.push({ type: 7, index: c42 }), t42 += h22.length - 1;
      }
      c42++;
    }
  }
  static createElement(t32, i52) {
    const s42 = r32.createElement("template");
    return s42.innerHTML = t32, s42;
  }
};
function S22(t32, i52, s42 = t32, e52) {
  if (i52 === T2) return i52;
  let h32 = void 0 !== e52 ? s42._$Co?.[e52] : s42._$Cl;
  const o62 = c32(i52) ? void 0 : i52._$litDirective$;
  return h32?.constructor !== o62 && (h32?._$AO?.(false), void 0 === o62 ? h32 = void 0 : (h32 = new o62(t32), h32._$AT(t32, s42, e52)), void 0 !== e52 ? (s42._$Co ??= [])[e52] = h32 : s42._$Cl = h32), void 0 !== h32 && (i52 = S22(t32, h32._$AS(t32, i52.values), h32, e52)), i52;
}
var M2 = class {
  constructor(t32, i52) {
    this._$AV = [], this._$AN = void 0, this._$AD = t32, this._$AM = i52;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t32) {
    const { el: { content: i52 }, parts: s42 } = this._$AD, e52 = (t32?.creationScope ?? r32).importNode(i52, true);
    C2.currentNode = e52;
    let h32 = C2.nextNode(), o62 = 0, n52 = 0, l32 = s42[0];
    for (; void 0 !== l32; ) {
      if (o62 === l32.index) {
        let i62;
        2 === l32.type ? i62 = new R2(h32, h32.nextSibling, this, t32) : 1 === l32.type ? i62 = new l32.ctor(h32, l32.name, l32.strings, this, t32) : 6 === l32.type && (i62 = new z2(h32, this, t32)), this._$AV.push(i62), l32 = s42[++n52];
      }
      o62 !== l32?.index && (h32 = C2.nextNode(), o62++);
    }
    return C2.currentNode = r32, e52;
  }
  p(t32) {
    let i52 = 0;
    for (const s42 of this._$AV) void 0 !== s42 && (void 0 !== s42.strings ? (s42._$AI(t32, s42, i52), i52 += s42.strings.length - 2) : s42._$AI(t32[i52])), i52++;
  }
};
var R2 = class _R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t32, i52, s42, e52) {
    this.type = 2, this._$AH = E2, this._$AN = void 0, this._$AA = t32, this._$AB = i52, this._$AM = s42, this.options = e52, this._$Cv = e52?.isConnected ?? true;
  }
  get parentNode() {
    let t32 = this._$AA.parentNode;
    const i52 = this._$AM;
    return void 0 !== i52 && 11 === t32?.nodeType && (t32 = i52.parentNode), t32;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t32, i52 = this) {
    t32 = S22(this, t32, i52), c32(t32) ? t32 === E2 || null == t32 || "" === t32 ? (this._$AH !== E2 && this._$AR(), this._$AH = E2) : t32 !== this._$AH && t32 !== T2 && this._(t32) : void 0 !== t32._$litType$ ? this.$(t32) : void 0 !== t32.nodeType ? this.T(t32) : u22(t32) ? this.k(t32) : this._(t32);
  }
  O(t32) {
    return this._$AA.parentNode.insertBefore(t32, this._$AB);
  }
  T(t32) {
    this._$AH !== t32 && (this._$AR(), this._$AH = this.O(t32));
  }
  _(t32) {
    this._$AH !== E2 && c32(this._$AH) ? this._$AA.nextSibling.data = t32 : this.T(r32.createTextNode(t32)), this._$AH = t32;
  }
  $(t32) {
    const { values: i52, _$litType$: s42 } = t32, e52 = "number" == typeof s42 ? this._$AC(t32) : (void 0 === s42.el && (s42.el = N2.createElement(P2(s42.h, s42.h[0]), this.options)), s42);
    if (this._$AH?._$AD === e52) this._$AH.p(i52);
    else {
      const t42 = new M2(e52, this), s5 = t42.u(this.options);
      t42.p(i52), this.T(s5), this._$AH = t42;
    }
  }
  _$AC(t32) {
    let i52 = A2.get(t32.strings);
    return void 0 === i52 && A2.set(t32.strings, i52 = new N2(t32)), i52;
  }
  k(t32) {
    a22(this._$AH) || (this._$AH = [], this._$AR());
    const i52 = this._$AH;
    let s42, e52 = 0;
    for (const h32 of t32) e52 === i52.length ? i52.push(s42 = new _R(this.O(l22()), this.O(l22()), this, this.options)) : s42 = i52[e52], s42._$AI(h32), e52++;
    e52 < i52.length && (this._$AR(s42 && s42._$AB.nextSibling, e52), i52.length = e52);
  }
  _$AR(t32 = this._$AA.nextSibling, i52) {
    for (this._$AP?.(false, true, i52); t32 && t32 !== this._$AB; ) {
      const i62 = t32.nextSibling;
      t32.remove(), t32 = i62;
    }
  }
  setConnected(t32) {
    void 0 === this._$AM && (this._$Cv = t32, this._$AP?.(t32));
  }
};
var k2 = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t32, i52, s42, e52, h32) {
    this.type = 1, this._$AH = E2, this._$AN = void 0, this.element = t32, this.name = i52, this._$AM = e52, this.options = h32, s42.length > 2 || "" !== s42[0] || "" !== s42[1] ? (this._$AH = Array(s42.length - 1).fill(new String()), this.strings = s42) : this._$AH = E2;
  }
  _$AI(t32, i52 = this, s42, e52) {
    const h32 = this.strings;
    let o62 = false;
    if (void 0 === h32) t32 = S22(this, t32, i52, 0), o62 = !c32(t32) || t32 !== this._$AH && t32 !== T2, o62 && (this._$AH = t32);
    else {
      const e62 = t32;
      let n52, r52;
      for (t32 = h32[0], n52 = 0; n52 < h32.length - 1; n52++) r52 = S22(this, e62[s42 + n52], i52, n52), r52 === T2 && (r52 = this._$AH[n52]), o62 ||= !c32(r52) || r52 !== this._$AH[n52], r52 === E2 ? t32 = E2 : t32 !== E2 && (t32 += (r52 ?? "") + h32[n52 + 1]), this._$AH[n52] = r52;
    }
    o62 && !e52 && this.j(t32);
  }
  j(t32) {
    t32 === E2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t32 ?? "");
  }
};
var H2 = class extends k2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t32) {
    this.element[this.name] = t32 === E2 ? void 0 : t32;
  }
};
var I2 = class extends k2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t32) {
    this.element.toggleAttribute(this.name, !!t32 && t32 !== E2);
  }
};
var L2 = class extends k2 {
  constructor(t32, i52, s42, e52, h32) {
    super(t32, i52, s42, e52, h32), this.type = 5;
  }
  _$AI(t32, i52 = this) {
    if ((t32 = S22(this, t32, i52, 0) ?? E2) === T2) return;
    const s42 = this._$AH, e52 = t32 === E2 && s42 !== E2 || t32.capture !== s42.capture || t32.once !== s42.once || t32.passive !== s42.passive, h32 = t32 !== E2 && (s42 === E2 || e52);
    e52 && this.element.removeEventListener(this.name, this, s42), h32 && this.element.addEventListener(this.name, this, t32), this._$AH = t32;
  }
  handleEvent(t32) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t32) : this._$AH.handleEvent(t32);
  }
};
var z2 = class {
  constructor(t32, i52, s42) {
    this.element = t32, this.type = 6, this._$AN = void 0, this._$AM = i52, this.options = s42;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t32) {
    S22(this, t32);
  }
};
var j2 = t22.litHtmlPolyfillSupport;
j2?.(N2, R2), (t22.litHtmlVersions ??= []).push("3.3.0");
var B2 = (t32, i52, s42) => {
  const e52 = s42?.renderBefore ?? i52;
  let h32 = e52._$litPart$;
  if (void 0 === h32) {
    const t42 = s42?.renderBefore ?? null;
    e52._$litPart$ = h32 = new R2(i52.insertBefore(l22(), t42), t42, void 0, s42 ?? {});
  }
  return h32._$AI(t32), h32;
};
var s32 = globalThis;
var i42 = class extends y3 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t32 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t32.firstChild, t32;
  }
  update(t32) {
    const r52 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t32), this._$Do = B2(r52, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return T2;
  }
};
i42._$litElement$ = true, i42["finalized"] = true, s32.litElementHydrateSupport?.({ LitElement: i42 });
var o42 = s32.litElementPolyfillSupport;
o42?.({ LitElement: i42 });
(s32.litElementVersions ??= []).push("4.2.0");
var o52 = { attribute: true, type: String, converter: u3, reflect: false, hasChanged: f3 };
var r42 = (t32 = o52, e52, r52) => {
  const { kind: n52, metadata: i52 } = r52;
  let s42 = globalThis.litPropertyMetadata.get(i52);
  if (void 0 === s42 && globalThis.litPropertyMetadata.set(i52, s42 = /* @__PURE__ */ new Map()), "setter" === n52 && ((t32 = Object.create(t32)).wrapped = true), s42.set(r52.name, t32), "accessor" === n52) {
    const { name: o62 } = r52;
    return { set(r62) {
      const n62 = e52.get.call(this);
      e52.set.call(this, r62), this.requestUpdate(o62, n62, t32);
    }, init(e62) {
      return void 0 !== e62 && this.C(o62, void 0, t32, e62), e62;
    } };
  }
  if ("setter" === n52) {
    const { name: o62 } = r52;
    return function(r62) {
      const n62 = this[o62];
      e52.call(this, r62), this.requestUpdate(o62, n62, t32);
    };
  }
  throw Error("Unsupported decorator location: " + n52);
};
function n42(t32) {
  return (e52, o62) => "object" == typeof o62 ? r42(t32, e52, o62) : ((t42, e62, o72) => {
    const r52 = e62.hasOwnProperty(o72);
    return e62.constructor.createProperty(o72, t42), r52 ? Object.getOwnPropertyDescriptor(e62, o72) : void 0;
  })(t32, e52, o62);
}
var appliedClassMixins = /* @__PURE__ */ new WeakMap();
function wasMixinPreviouslyApplied(mixin, superClass) {
  let klass = superClass;
  while (klass) {
    if (appliedClassMixins.get(klass) === mixin) {
      return true;
    }
    klass = Object.getPrototypeOf(klass);
  }
  return false;
}
function dedupeMixin(mixin) {
  return (superClass) => {
    if (wasMixinPreviouslyApplied(mixin, superClass)) {
      return superClass;
    }
    const mixedClass = mixin(superClass);
    appliedClassMixins.set(mixedClass, mixin);
    return mixedClass;
  };
}
var version = "3.0.0";
var versions = window.scopedElementsVersions || (window.scopedElementsVersions = []);
if (!versions.includes(version)) {
  versions.push(version);
}
var ScopedElementsMixinImplementation = (superclass) => (
  /** @type {ScopedElementsHost} */
  class ScopedElementsHost extends superclass {
    /**
     * Obtains the scoped elements definitions map if specified.
     *
     * @type {ScopedElementsMap=}
     */
    static scopedElements;
    static get scopedElementsVersion() {
      return version;
    }
    /** @type {CustomElementRegistry=} */
    static __registry;
    /**
     * Obtains the CustomElementRegistry associated to the ShadowRoot.
     *
     * @returns {CustomElementRegistry=}
     */
    get registry() {
      return (
        /** @type {typeof ScopedElementsHost} */
        this.constructor.__registry
      );
    }
    /**
     * Set the CustomElementRegistry associated to the ShadowRoot
     *
     * @param {CustomElementRegistry} registry
     */
    set registry(registry2) {
      this.constructor.__registry = registry2;
    }
    /**
     * @param {ShadowRootInit} options
     * @returns {ShadowRoot}
     */
    attachShadow(options) {
      const { scopedElements } = (
        /** @type {typeof ScopedElementsHost} */
        this.constructor
      );
      const shouldCreateRegistry = !this.registry || // @ts-ignore
      this.registry === this.constructor.__registry && !Object.prototype.hasOwnProperty.call(this.constructor, "__registry");
      if (shouldCreateRegistry) {
        this.registry = new CustomElementRegistry();
        for (const [tagName, klass] of Object.entries(scopedElements ?? {})) {
          this.registry.define(tagName, klass);
        }
      }
      return super.attachShadow({
        ...options,
        // The polyfill currently expects the registry to be passed as `customElements`
        customElements: this.registry,
        // But the proposal has moved forward, and renamed it to `registry`
        // For backwards compatibility, we pass it as both
        registry: this.registry
      });
    }
  }
);
var ScopedElementsMixin = dedupeMixin(ScopedElementsMixinImplementation);
var ScopedElementsMixinImplementation2 = (superclass) => (
  /** @type {ScopedElementsHost} */
  class ScopedElementsHost extends ScopedElementsMixin(superclass) {
    createRenderRoot() {
      const { shadowRootOptions, elementStyles } = (
        /** @type {TypeofLitElement} */
        this.constructor
      );
      const shadowRoot = this.attachShadow(shadowRootOptions);
      this.renderOptions.creationScope = shadowRoot;
      S3(shadowRoot, elementStyles);
      this.renderOptions.renderBefore ??= shadowRoot.firstChild;
      return shadowRoot;
    }
  }
);
var ScopedElementsMixin2 = dedupeMixin(ScopedElementsMixinImplementation2);
var _lang_dec;
var _contentEditable_dec;
var _a;
var _init;
var _contentEditable;
var _lang;
var LitElementWw = class extends (_a = ScopedElementsMixin2(i42), _contentEditable_dec = [n42({ type: String, attribute: true, reflect: true })], _lang_dec = [n42({ type: String, attribute: true, reflect: true })], _a) {
  constructor() {
    super(...arguments);
    __runInitializers2(_init, 5, this);
    __publicField2(this, "options");
    __publicField2(this, "actions", {});
    __publicField2(this, "localize");
    __privateAdd2(this, _contentEditable, __runInitializers2(_init, 8, this)), __runInitializers2(_init, 11, this);
    __privateAdd2(this, _lang, "");
    __publicField2(this, "_inTransaction", false);
  }
  get lang() {
    return (__privateGet2(this, _lang) || this.parentElement?.closest("[lang]")?.lang) ?? "";
  }
  set lang(value) {
    __privateSet2(this, _lang, value);
    this.localize?.setLocale(value).finally(() => this.requestUpdate("lang"));
  }
  connectedCallback() {
    super.connectedCallback();
    this.localize?.setLocale(this.lang).finally(() => this.requestUpdate());
    this.getAttributeNames().forEach((k22) => this.setAttribute(k22, this.getAttribute(k22)));
  }
};
_init = __decoratorStart2(_a);
_contentEditable = /* @__PURE__ */ new WeakMap();
_lang = /* @__PURE__ */ new WeakMap();
__decorateElement2(_init, 4, "contentEditable", _contentEditable_dec, LitElementWw, _contentEditable);
__decorateElement2(_init, 3, "lang", _lang_dec, LitElementWw);
__decoratorMetadata2(_init, LitElementWw);
__publicField2(LitElementWw, "scopedElements", {});
__publicField2(LitElementWw, "options", {});
__publicField2(LitElementWw, "actions", {});

// node_modules/@lit/reactive-element/decorators/custom-element.js
var t4 = (t7) => (e12, o10) => {
  void 0 !== o10 ? o10.addInitializer(() => {
    customElements.define(t7, e12);
  }) : customElements.define(t7, e12);
};

// node_modules/@lit/reactive-element/decorators/property.js
var o6 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r5 = (t7 = o6, e12, r8) => {
  const { kind: n7, metadata: i8 } = r8;
  let s5 = globalThis.litPropertyMetadata.get(i8);
  if (void 0 === s5 && globalThis.litPropertyMetadata.set(i8, s5 = /* @__PURE__ */ new Map()), "setter" === n7 && ((t7 = Object.create(t7)).wrapped = true), s5.set(r8.name, t7), "accessor" === n7) {
    const { name: o10 } = r8;
    return { set(r9) {
      const n8 = e12.get.call(this);
      e12.set.call(this, r9), this.requestUpdate(o10, n8, t7);
    }, init(e13) {
      return void 0 !== e13 && this.C(o10, void 0, t7, e13), e13;
    } };
  }
  if ("setter" === n7) {
    const { name: o10 } = r8;
    return function(r9) {
      const n8 = this[o10];
      e12.call(this, r9), this.requestUpdate(o10, n8, t7);
    };
  }
  throw Error("Unsupported decorator location: " + n7);
};
function n5(t7) {
  return (e12, o10) => "object" == typeof o10 ? r5(t7, e12, o10) : ((t8, e13, o11) => {
    const r8 = e13.hasOwnProperty(o11);
    return e13.constructor.createProperty(o11, t8), r8 ? Object.getOwnPropertyDescriptor(e13, o11) : void 0;
  })(t7, e12, o10);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r6(r8) {
  return n5({ ...r8, state: true, attribute: false });
}

// node_modules/@lit/reactive-element/decorators/base.js
var e5 = (e12, t7, c6) => (c6.configurable = true, c6.enumerable = true, Reflect.decorate && "object" != typeof t7 && Object.defineProperty(e12, t7, c6), c6);

// node_modules/@lit/reactive-element/decorators/query.js
function e6(e12, r8) {
  return (n7, s5, i8) => {
    const o10 = (t7) => t7.renderRoot?.querySelector(e12) ?? null;
    if (r8) {
      const { get: e13, set: r9 } = "object" == typeof s5 ? n7 : i8 ?? (() => {
        const t7 = Symbol();
        return { get() {
          return this[t7];
        }, set(e14) {
          this[t7] = e14;
        } };
      })();
      return e5(n7, s5, { get() {
        let t7 = e13.call(this);
        return void 0 === t7 && (t7 = o10(this), (null !== t7 || this.hasUpdated) && r9.call(this, t7)), t7;
      } });
    }
    return e5(n7, s5, { get() {
      return o10(this);
    } });
  };
}

// node_modules/@noble/hashes/esm/sha2.js
var sha2_exports = {};
__export(sha2_exports, {
  SHA224: () => SHA224,
  SHA256: () => SHA256,
  SHA384: () => SHA384,
  SHA512: () => SHA512,
  SHA512_224: () => SHA512_224,
  SHA512_256: () => SHA512_256,
  sha224: () => sha224,
  sha256: () => sha256,
  sha384: () => sha384,
  sha512: () => sha512,
  sha512_224: () => sha512_224,
  sha512_256: () => sha512_256
});

// node_modules/@noble/hashes/esm/crypto.js
var crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

// node_modules/@noble/hashes/esm/utils.js
function isBytes(a5) {
  return a5 instanceof Uint8Array || ArrayBuffer.isView(a5) && a5.constructor.name === "Uint8Array";
}
function anumber(n7) {
  if (!Number.isSafeInteger(n7) || n7 < 0)
    throw new Error("positive integer expected, got " + n7);
}
function abytes(b4, ...lengths) {
  if (!isBytes(b4))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b4.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b4.length);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min2 = instance.outputLen;
  if (out.length < min2) {
    throw new Error("digestInto() expects output buffer of length at least " + min2);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i8 = 0; i8 < arrays.length; i8++) {
    arrays[i8].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift3) {
  return word << 32 - shift3 | word >>> shift3;
}
function rotl(word, shift3) {
  return word << shift3 | word >>> 32 - shift3 >>> 0;
}
var isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i8 = 0; i8 < arr.length; i8++) {
    arr[i8] = byteSwap(arr[i8]);
  }
  return arr;
}
var swap32IfBE = isLE ? (u6) => u6 : byteSwap32;
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
var Hash = class {
};
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function createXOFer(hashCons) {
  const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
  const tmp = hashCons({});
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto && typeof crypto.getRandomValues === "function") {
    return crypto.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto && typeof crypto.randomBytes === "function") {
    return Uint8Array.from(crypto.randomBytes(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}

// node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h4 = isLE2 ? 4 : 0;
  const l6 = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h4, wh, isLE2);
  view.setUint32(byteOffset + l6, wl, isLE2);
}
function Chi(a5, b4, c6) {
  return a5 & b4 ^ ~a5 & c6;
}
function Maj(a5, b4, c6) {
  return a5 & b4 ^ a5 & c6 ^ b4 & c6;
}
var HashMD = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { view, buffer, blockLen } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    clean(this.buffer.subarray(pos));
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i8 = pos; i8 < blockLen; i8++)
      buffer[i8] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i8 = 0; i8 < outLen; i8++)
      oview.setUint32(4 * i8, state[i8], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to) {
    to || (to = new this.constructor());
    to.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to.destroyed = destroyed;
    to.finished = finished;
    to.length = length;
    to.pos = pos;
    if (length % blockLen)
      to.buffer.set(buffer);
    return to;
  }
  clone() {
    return this._cloneInto();
  }
};
var SHA256_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
var SHA224_IV = /* @__PURE__ */ Uint32Array.from([
  3238371032,
  914150663,
  812702999,
  4144912697,
  4290775857,
  1750603025,
  1694076839,
  3204075428
]);
var SHA384_IV = /* @__PURE__ */ Uint32Array.from([
  3418070365,
  3238371032,
  1654270250,
  914150663,
  2438529370,
  812702999,
  355462360,
  4144912697,
  1731405415,
  4290775857,
  2394180231,
  1750603025,
  3675008525,
  1694076839,
  1203062813,
  3204075428
]);
var SHA512_IV = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  4089235720,
  3144134277,
  2227873595,
  1013904242,
  4271175723,
  2773480762,
  1595750129,
  1359893119,
  2917565137,
  2600822924,
  725511199,
  528734635,
  4215389547,
  1541459225,
  327033209
]);

// node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
var _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n7, le = false) {
  if (le)
    return { h: Number(n7 & U32_MASK64), l: Number(n7 >> _32n & U32_MASK64) };
  return { h: Number(n7 >> _32n & U32_MASK64) | 0, l: Number(n7 & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i8 = 0; i8 < len; i8++) {
    const { h: h4, l: l6 } = fromBig(lst[i8], le);
    [Ah[i8], Al[i8]] = [h4, l6];
  }
  return [Ah, Al];
}
var shrSH = (h4, _l, s5) => h4 >>> s5;
var shrSL = (h4, l6, s5) => h4 << 32 - s5 | l6 >>> s5;
var rotrSH = (h4, l6, s5) => h4 >>> s5 | l6 << 32 - s5;
var rotrSL = (h4, l6, s5) => h4 << 32 - s5 | l6 >>> s5;
var rotrBH = (h4, l6, s5) => h4 << 64 - s5 | l6 >>> s5 - 32;
var rotrBL = (h4, l6, s5) => h4 >>> s5 - 32 | l6 << 64 - s5;
var rotlSH = (h4, l6, s5) => h4 << s5 | l6 >>> 32 - s5;
var rotlSL = (h4, l6, s5) => l6 << s5 | h4 >>> 32 - s5;
var rotlBH = (h4, l6, s5) => l6 << s5 - 32 | h4 >>> 64 - s5;
var rotlBL = (h4, l6, s5) => h4 << s5 - 32 | l6 >>> 64 - s5;
function add(Ah, Al, Bh, Bl) {
  const l6 = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l6 / 2 ** 32 | 0) | 0, l: l6 | 0 };
}
var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;

// node_modules/@noble/hashes/esm/sha2.js
var SHA256_K = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_W = /* @__PURE__ */ new Uint32Array(64);
var SHA256 = class extends HashMD {
  constructor(outputLen = 32) {
    super(64, outputLen, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A: A3, B: B3, C: C3, D, E: E3, F, G, H: H3 } = this;
    return [A3, B3, C3, D, E3, F, G, H3];
  }
  // prettier-ignore
  set(A3, B3, C3, D, E3, F, G, H3) {
    this.A = A3 | 0;
    this.B = B3 | 0;
    this.C = C3 | 0;
    this.D = D | 0;
    this.E = E3 | 0;
    this.F = F | 0;
    this.G = G | 0;
    this.H = H3 | 0;
  }
  process(view, offset3) {
    for (let i8 = 0; i8 < 16; i8++, offset3 += 4)
      SHA256_W[i8] = view.getUint32(offset3, false);
    for (let i8 = 16; i8 < 64; i8++) {
      const W15 = SHA256_W[i8 - 15];
      const W2 = SHA256_W[i8 - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i8] = s1 + SHA256_W[i8 - 7] + s0 + SHA256_W[i8 - 16] | 0;
    }
    let { A: A3, B: B3, C: C3, D, E: E3, F, G, H: H3 } = this;
    for (let i8 = 0; i8 < 64; i8++) {
      const sigma1 = rotr(E3, 6) ^ rotr(E3, 11) ^ rotr(E3, 25);
      const T1 = H3 + sigma1 + Chi(E3, F, G) + SHA256_K[i8] + SHA256_W[i8] | 0;
      const sigma0 = rotr(A3, 2) ^ rotr(A3, 13) ^ rotr(A3, 22);
      const T22 = sigma0 + Maj(A3, B3, C3) | 0;
      H3 = G;
      G = F;
      F = E3;
      E3 = D + T1 | 0;
      D = C3;
      C3 = B3;
      B3 = A3;
      A3 = T1 + T22 | 0;
    }
    A3 = A3 + this.A | 0;
    B3 = B3 + this.B | 0;
    C3 = C3 + this.C | 0;
    D = D + this.D | 0;
    E3 = E3 + this.E | 0;
    F = F + this.F | 0;
    G = G + this.G | 0;
    H3 = H3 + this.H | 0;
    this.set(A3, B3, C3, D, E3, F, G, H3);
  }
  roundClean() {
    clean(SHA256_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var SHA224 = class extends SHA256 {
  constructor() {
    super(28);
    this.A = SHA224_IV[0] | 0;
    this.B = SHA224_IV[1] | 0;
    this.C = SHA224_IV[2] | 0;
    this.D = SHA224_IV[3] | 0;
    this.E = SHA224_IV[4] | 0;
    this.F = SHA224_IV[5] | 0;
    this.G = SHA224_IV[6] | 0;
    this.H = SHA224_IV[7] | 0;
  }
};
var K512 = /* @__PURE__ */ (() => split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n7) => BigInt(n7))))();
var SHA512_Kh = /* @__PURE__ */ (() => K512[0])();
var SHA512_Kl = /* @__PURE__ */ (() => K512[1])();
var SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
var SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
var SHA512 = class extends HashMD {
  constructor(outputLen = 64) {
    super(128, outputLen, 16, false);
    this.Ah = SHA512_IV[0] | 0;
    this.Al = SHA512_IV[1] | 0;
    this.Bh = SHA512_IV[2] | 0;
    this.Bl = SHA512_IV[3] | 0;
    this.Ch = SHA512_IV[4] | 0;
    this.Cl = SHA512_IV[5] | 0;
    this.Dh = SHA512_IV[6] | 0;
    this.Dl = SHA512_IV[7] | 0;
    this.Eh = SHA512_IV[8] | 0;
    this.El = SHA512_IV[9] | 0;
    this.Fh = SHA512_IV[10] | 0;
    this.Fl = SHA512_IV[11] | 0;
    this.Gh = SHA512_IV[12] | 0;
    this.Gl = SHA512_IV[13] | 0;
    this.Hh = SHA512_IV[14] | 0;
    this.Hl = SHA512_IV[15] | 0;
  }
  // prettier-ignore
  get() {
    const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
  }
  // prettier-ignore
  set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
    this.Ah = Ah | 0;
    this.Al = Al | 0;
    this.Bh = Bh | 0;
    this.Bl = Bl | 0;
    this.Ch = Ch | 0;
    this.Cl = Cl | 0;
    this.Dh = Dh | 0;
    this.Dl = Dl | 0;
    this.Eh = Eh | 0;
    this.El = El | 0;
    this.Fh = Fh | 0;
    this.Fl = Fl | 0;
    this.Gh = Gh | 0;
    this.Gl = Gl | 0;
    this.Hh = Hh | 0;
    this.Hl = Hl | 0;
  }
  process(view, offset3) {
    for (let i8 = 0; i8 < 16; i8++, offset3 += 4) {
      SHA512_W_H[i8] = view.getUint32(offset3);
      SHA512_W_L[i8] = view.getUint32(offset3 += 4);
    }
    for (let i8 = 16; i8 < 80; i8++) {
      const W15h = SHA512_W_H[i8 - 15] | 0;
      const W15l = SHA512_W_L[i8 - 15] | 0;
      const s0h = rotrSH(W15h, W15l, 1) ^ rotrSH(W15h, W15l, 8) ^ shrSH(W15h, W15l, 7);
      const s0l = rotrSL(W15h, W15l, 1) ^ rotrSL(W15h, W15l, 8) ^ shrSL(W15h, W15l, 7);
      const W2h = SHA512_W_H[i8 - 2] | 0;
      const W2l = SHA512_W_L[i8 - 2] | 0;
      const s1h = rotrSH(W2h, W2l, 19) ^ rotrBH(W2h, W2l, 61) ^ shrSH(W2h, W2l, 6);
      const s1l = rotrSL(W2h, W2l, 19) ^ rotrBL(W2h, W2l, 61) ^ shrSL(W2h, W2l, 6);
      const SUMl = add4L(s0l, s1l, SHA512_W_L[i8 - 7], SHA512_W_L[i8 - 16]);
      const SUMh = add4H(SUMl, s0h, s1h, SHA512_W_H[i8 - 7], SHA512_W_H[i8 - 16]);
      SHA512_W_H[i8] = SUMh | 0;
      SHA512_W_L[i8] = SUMl | 0;
    }
    let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
    for (let i8 = 0; i8 < 80; i8++) {
      const sigma1h = rotrSH(Eh, El, 14) ^ rotrSH(Eh, El, 18) ^ rotrBH(Eh, El, 41);
      const sigma1l = rotrSL(Eh, El, 14) ^ rotrSL(Eh, El, 18) ^ rotrBL(Eh, El, 41);
      const CHIh = Eh & Fh ^ ~Eh & Gh;
      const CHIl = El & Fl ^ ~El & Gl;
      const T1ll = add5L(Hl, sigma1l, CHIl, SHA512_Kl[i8], SHA512_W_L[i8]);
      const T1h = add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i8], SHA512_W_H[i8]);
      const T1l = T1ll | 0;
      const sigma0h = rotrSH(Ah, Al, 28) ^ rotrBH(Ah, Al, 34) ^ rotrBH(Ah, Al, 39);
      const sigma0l = rotrSL(Ah, Al, 28) ^ rotrBL(Ah, Al, 34) ^ rotrBL(Ah, Al, 39);
      const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
      const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
      Hh = Gh | 0;
      Hl = Gl | 0;
      Gh = Fh | 0;
      Gl = Fl | 0;
      Fh = Eh | 0;
      Fl = El | 0;
      ({ h: Eh, l: El } = add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
      Dh = Ch | 0;
      Dl = Cl | 0;
      Ch = Bh | 0;
      Cl = Bl | 0;
      Bh = Ah | 0;
      Bl = Al | 0;
      const All = add3L(T1l, sigma0l, MAJl);
      Ah = add3H(All, T1h, sigma0h, MAJh);
      Al = All | 0;
    }
    ({ h: Ah, l: Al } = add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
    ({ h: Bh, l: Bl } = add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
    ({ h: Ch, l: Cl } = add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
    ({ h: Dh, l: Dl } = add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
    ({ h: Eh, l: El } = add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
    ({ h: Fh, l: Fl } = add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
    ({ h: Gh, l: Gl } = add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
    ({ h: Hh, l: Hl } = add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
    this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
  }
  roundClean() {
    clean(SHA512_W_H, SHA512_W_L);
  }
  destroy() {
    clean(this.buffer);
    this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
};
var SHA384 = class extends SHA512 {
  constructor() {
    super(48);
    this.Ah = SHA384_IV[0] | 0;
    this.Al = SHA384_IV[1] | 0;
    this.Bh = SHA384_IV[2] | 0;
    this.Bl = SHA384_IV[3] | 0;
    this.Ch = SHA384_IV[4] | 0;
    this.Cl = SHA384_IV[5] | 0;
    this.Dh = SHA384_IV[6] | 0;
    this.Dl = SHA384_IV[7] | 0;
    this.Eh = SHA384_IV[8] | 0;
    this.El = SHA384_IV[9] | 0;
    this.Fh = SHA384_IV[10] | 0;
    this.Fl = SHA384_IV[11] | 0;
    this.Gh = SHA384_IV[12] | 0;
    this.Gl = SHA384_IV[13] | 0;
    this.Hh = SHA384_IV[14] | 0;
    this.Hl = SHA384_IV[15] | 0;
  }
};
var T224_IV = /* @__PURE__ */ Uint32Array.from([
  2352822216,
  424955298,
  1944164710,
  2312950998,
  502970286,
  855612546,
  1738396948,
  1479516111,
  258812777,
  2077511080,
  2011393907,
  79989058,
  1067287976,
  1780299464,
  286451373,
  2446758561
]);
var T256_IV = /* @__PURE__ */ Uint32Array.from([
  573645204,
  4230739756,
  2673172387,
  3360449730,
  596883563,
  1867755857,
  2520282905,
  1497426621,
  2519219938,
  2827943907,
  3193839141,
  1401305490,
  721525244,
  746961066,
  246885852,
  2177182882
]);
var SHA512_224 = class extends SHA512 {
  constructor() {
    super(28);
    this.Ah = T224_IV[0] | 0;
    this.Al = T224_IV[1] | 0;
    this.Bh = T224_IV[2] | 0;
    this.Bl = T224_IV[3] | 0;
    this.Ch = T224_IV[4] | 0;
    this.Cl = T224_IV[5] | 0;
    this.Dh = T224_IV[6] | 0;
    this.Dl = T224_IV[7] | 0;
    this.Eh = T224_IV[8] | 0;
    this.El = T224_IV[9] | 0;
    this.Fh = T224_IV[10] | 0;
    this.Fl = T224_IV[11] | 0;
    this.Gh = T224_IV[12] | 0;
    this.Gl = T224_IV[13] | 0;
    this.Hh = T224_IV[14] | 0;
    this.Hl = T224_IV[15] | 0;
  }
};
var SHA512_256 = class extends SHA512 {
  constructor() {
    super(32);
    this.Ah = T256_IV[0] | 0;
    this.Al = T256_IV[1] | 0;
    this.Bh = T256_IV[2] | 0;
    this.Bl = T256_IV[3] | 0;
    this.Ch = T256_IV[4] | 0;
    this.Cl = T256_IV[5] | 0;
    this.Dh = T256_IV[6] | 0;
    this.Dl = T256_IV[7] | 0;
    this.Eh = T256_IV[8] | 0;
    this.El = T256_IV[9] | 0;
    this.Fh = T256_IV[10] | 0;
    this.Fl = T256_IV[11] | 0;
    this.Gh = T256_IV[12] | 0;
    this.Gl = T256_IV[13] | 0;
    this.Hh = T256_IV[14] | 0;
    this.Hl = T256_IV[15] | 0;
  }
};
var sha256 = /* @__PURE__ */ createHasher(() => new SHA256());
var sha224 = /* @__PURE__ */ createHasher(() => new SHA224());
var sha512 = /* @__PURE__ */ createHasher(() => new SHA512());
var sha384 = /* @__PURE__ */ createHasher(() => new SHA384());
var sha512_256 = /* @__PURE__ */ createHasher(() => new SHA512_256());
var sha512_224 = /* @__PURE__ */ createHasher(() => new SHA512_224());

// node_modules/@noble/hashes/esm/sha3.js
var sha3_exports = {};
__export(sha3_exports, {
  Keccak: () => Keccak,
  keccakP: () => keccakP,
  keccak_224: () => keccak_224,
  keccak_256: () => keccak_256,
  keccak_384: () => keccak_384,
  keccak_512: () => keccak_512,
  sha3_224: () => sha3_224,
  sha3_256: () => sha3_256,
  sha3_384: () => sha3_384,
  sha3_512: () => sha3_512,
  shake128: () => shake128,
  shake256: () => shake256
});
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var _7n = BigInt(7);
var _256n = BigInt(256);
var _0x71n = BigInt(113);
var SHA3_PI = [];
var SHA3_ROTL = [];
var _SHA3_IOTA = [];
for (let round2 = 0, R3 = _1n, x3 = 1, y4 = 0; round2 < 24; round2++) {
  [x3, y4] = [y4, (2 * x3 + 3 * y4) % 5];
  SHA3_PI.push(2 * (5 * y4 + x3));
  SHA3_ROTL.push((round2 + 1) * (round2 + 2) / 2 % 64);
  let t7 = _0n;
  for (let j3 = 0; j3 < 7; j3++) {
    R3 = (R3 << _1n ^ (R3 >> _7n) * _0x71n) % _256n;
    if (R3 & _2n)
      t7 ^= _1n << (_1n << /* @__PURE__ */ BigInt(j3)) - _1n;
  }
  _SHA3_IOTA.push(t7);
}
var IOTAS = split(_SHA3_IOTA, true);
var SHA3_IOTA_H = IOTAS[0];
var SHA3_IOTA_L = IOTAS[1];
var rotlH = (h4, l6, s5) => s5 > 32 ? rotlBH(h4, l6, s5) : rotlSH(h4, l6, s5);
var rotlL = (h4, l6, s5) => s5 > 32 ? rotlBL(h4, l6, s5) : rotlSL(h4, l6, s5);
function keccakP(s5, rounds = 24) {
  const B3 = new Uint32Array(5 * 2);
  for (let round2 = 24 - rounds; round2 < 24; round2++) {
    for (let x3 = 0; x3 < 10; x3++)
      B3[x3] = s5[x3] ^ s5[x3 + 10] ^ s5[x3 + 20] ^ s5[x3 + 30] ^ s5[x3 + 40];
    for (let x3 = 0; x3 < 10; x3 += 2) {
      const idx1 = (x3 + 8) % 10;
      const idx0 = (x3 + 2) % 10;
      const B0 = B3[idx0];
      const B1 = B3[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B3[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B3[idx1 + 1];
      for (let y4 = 0; y4 < 50; y4 += 10) {
        s5[x3 + y4] ^= Th;
        s5[x3 + y4 + 1] ^= Tl;
      }
    }
    let curH = s5[2];
    let curL = s5[3];
    for (let t7 = 0; t7 < 24; t7++) {
      const shift3 = SHA3_ROTL[t7];
      const Th = rotlH(curH, curL, shift3);
      const Tl = rotlL(curH, curL, shift3);
      const PI = SHA3_PI[t7];
      curH = s5[PI];
      curL = s5[PI + 1];
      s5[PI] = Th;
      s5[PI + 1] = Tl;
    }
    for (let y4 = 0; y4 < 50; y4 += 10) {
      for (let x3 = 0; x3 < 10; x3++)
        B3[x3] = s5[y4 + x3];
      for (let x3 = 0; x3 < 10; x3++)
        s5[y4 + x3] ^= ~B3[(x3 + 2) % 10] & B3[(x3 + 4) % 10];
    }
    s5[0] ^= SHA3_IOTA_H[round2];
    s5[1] ^= SHA3_IOTA_L[round2];
  }
  clean(B3);
}
var Keccak = class _Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    this.enableXOF = false;
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    anumber(outputLen);
    if (!(0 < blockLen && blockLen < 200))
      throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    swap32IfBE(this.state32);
    keccakP(this.state32, this.rounds);
    swap32IfBE(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists(this);
    data = toBytes(data);
    abytes(data);
    const { blockLen, state } = this;
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i8 = 0; i8 < take; i8++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    aexists(this, false);
    abytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes) {
    anumber(bytes);
    return this.xofInto(new Uint8Array(bytes));
  }
  digestInto(out) {
    aoutput(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    clean(this.state);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
};
var gen = (suffix, blockLen, outputLen) => createHasher(() => new Keccak(blockLen, suffix, outputLen));
var sha3_224 = /* @__PURE__ */ (() => gen(6, 144, 224 / 8))();
var sha3_256 = /* @__PURE__ */ (() => gen(6, 136, 256 / 8))();
var sha3_384 = /* @__PURE__ */ (() => gen(6, 104, 384 / 8))();
var sha3_512 = /* @__PURE__ */ (() => gen(6, 72, 512 / 8))();
var keccak_224 = /* @__PURE__ */ (() => gen(1, 144, 224 / 8))();
var keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();
var keccak_384 = /* @__PURE__ */ (() => gen(1, 104, 384 / 8))();
var keccak_512 = /* @__PURE__ */ (() => gen(1, 72, 512 / 8))();
var genShake = (suffix, blockLen, outputLen) => createXOFer((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
var shake128 = /* @__PURE__ */ (() => genShake(31, 168, 128 / 8))();
var shake256 = /* @__PURE__ */ (() => genShake(31, 136, 256 / 8))();

// node_modules/@noble/hashes/esm/legacy.js
var SHA1_IV = /* @__PURE__ */ Uint32Array.from([
  1732584193,
  4023233417,
  2562383102,
  271733878,
  3285377520
]);
var SHA1_W = /* @__PURE__ */ new Uint32Array(80);
var SHA1 = class extends HashMD {
  constructor() {
    super(64, 20, 8, false);
    this.A = SHA1_IV[0] | 0;
    this.B = SHA1_IV[1] | 0;
    this.C = SHA1_IV[2] | 0;
    this.D = SHA1_IV[3] | 0;
    this.E = SHA1_IV[4] | 0;
  }
  get() {
    const { A: A3, B: B3, C: C3, D, E: E3 } = this;
    return [A3, B3, C3, D, E3];
  }
  set(A3, B3, C3, D, E3) {
    this.A = A3 | 0;
    this.B = B3 | 0;
    this.C = C3 | 0;
    this.D = D | 0;
    this.E = E3 | 0;
  }
  process(view, offset3) {
    for (let i8 = 0; i8 < 16; i8++, offset3 += 4)
      SHA1_W[i8] = view.getUint32(offset3, false);
    for (let i8 = 16; i8 < 80; i8++)
      SHA1_W[i8] = rotl(SHA1_W[i8 - 3] ^ SHA1_W[i8 - 8] ^ SHA1_W[i8 - 14] ^ SHA1_W[i8 - 16], 1);
    let { A: A3, B: B3, C: C3, D, E: E3 } = this;
    for (let i8 = 0; i8 < 80; i8++) {
      let F, K;
      if (i8 < 20) {
        F = Chi(B3, C3, D);
        K = 1518500249;
      } else if (i8 < 40) {
        F = B3 ^ C3 ^ D;
        K = 1859775393;
      } else if (i8 < 60) {
        F = Maj(B3, C3, D);
        K = 2400959708;
      } else {
        F = B3 ^ C3 ^ D;
        K = 3395469782;
      }
      const T3 = rotl(A3, 5) + F + E3 + K + SHA1_W[i8] | 0;
      E3 = D;
      D = C3;
      C3 = rotl(B3, 30);
      B3 = A3;
      A3 = T3;
    }
    A3 = A3 + this.A | 0;
    B3 = B3 + this.B | 0;
    C3 = C3 + this.C | 0;
    D = D + this.D | 0;
    E3 = E3 + this.E | 0;
    this.set(A3, B3, C3, D, E3);
  }
  roundClean() {
    clean(SHA1_W);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0);
    clean(this.buffer);
  }
};
var sha1 = /* @__PURE__ */ createHasher(() => new SHA1());

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6KE6SBMU.js
var textarea_styles_default = i`
  :host {
    display: block;
  }

  .textarea {
    display: grid;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-hover);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    color: var(--sl-input-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: var(--sl-input-color-focus);
  }

  .textarea--standard.textarea--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control,
  .textarea__size-adjuster {
    grid-area: 1 / 1 / 2 / 2;
  }

  .textarea__size-adjuster {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: var(--sl-input-color-disabled);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .textarea--filled.textarea--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .textarea__control::-webkit-search-decoration,
  .textarea__control::-webkit-search-cancel-button,
  .textarea__control::-webkit-search-results-button,
  .textarea__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .textarea__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
  }

  .textarea--small .textarea__control {
    padding: 0.5em var(--sl-input-spacing-small);
  }

  .textarea--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .textarea--medium .textarea__control {
    padding: 0.5em var(--sl-input-spacing-medium);
  }

  .textarea--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
  }

  .textarea--large .textarea__control {
    padding: 0.5em var(--sl-input-spacing-large);
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
    overflow-y: hidden;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GI7VDIWX.js
var defaultValue = (propertyName = "value") => (proto, key) => {
  const ctor = proto.constructor;
  const attributeChangedCallback = ctor.prototype.attributeChangedCallback;
  ctor.prototype.attributeChangedCallback = function(name, old, value) {
    var _a3;
    const options = ctor.getPropertyOptions(propertyName);
    const attributeName = typeof options.attribute === "string" ? options.attribute : propertyName;
    if (name === attributeName) {
      const converter = options.converter || u;
      const fromAttribute = typeof converter === "function" ? converter : (_a3 = converter == null ? void 0 : converter.fromAttribute) != null ? _a3 : u.fromAttribute;
      const newValue = fromAttribute(value, options.type);
      if (this[propertyName] !== newValue) {
        this[key] = newValue;
      }
    }
    attributeChangedCallback.call(this, name, old, value);
  };
};

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.SI4ACBFK.js
var form_control_styles_default = i`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.KAW7D32O.js
var __defProp3 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __typeError3 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a5, b4) => {
  for (var prop in b4 || (b4 = {}))
    if (__hasOwnProp.call(b4, prop))
      __defNormalProp3(a5, prop, b4[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b4)) {
      if (__propIsEnum.call(b4, prop))
        __defNormalProp3(a5, prop, b4[prop]);
    }
  return a5;
};
var __spreadProps = (a5, b4) => __defProps(a5, __getOwnPropDescs(b4));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc3(target, key) : target;
  for (var i8 = decorators.length - 1, decorator; i8 >= 0; i8--)
    if (decorator = decorators[i8])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp3(target, key, result);
  return result;
};
var __accessCheck3 = (obj, member, msg) => member.has(obj) || __typeError3("Cannot " + msg);
var __privateGet3 = (obj, member, getter) => (__accessCheck3(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd3 = (obj, member, value) => member.has(obj) ? __typeError3("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet3 = (obj, member, value, setter) => (__accessCheck3(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3RPBFEDE.js
var formCollections = /* @__PURE__ */ new WeakMap();
var reportValidityOverloads = /* @__PURE__ */ new WeakMap();
var checkValidityOverloads = /* @__PURE__ */ new WeakMap();
var userInteractedControls = /* @__PURE__ */ new WeakSet();
var interactions = /* @__PURE__ */ new WeakMap();
var FormControlController = class {
  constructor(host, options) {
    this.handleFormData = (event) => {
      const disabled = this.options.disabled(this.host);
      const name = this.options.name(this.host);
      const value = this.options.value(this.host);
      const isButton = this.host.tagName.toLowerCase() === "sl-button";
      if (this.host.isConnected && !disabled && !isButton && typeof name === "string" && name.length > 0 && typeof value !== "undefined") {
        if (Array.isArray(value)) {
          value.forEach((val) => {
            event.formData.append(name, val.toString());
          });
        } else {
          event.formData.append(name, value.toString());
        }
      }
    };
    this.handleFormSubmit = (event) => {
      var _a3;
      const disabled = this.options.disabled(this.host);
      const reportValidity = this.options.reportValidity;
      if (this.form && !this.form.noValidate) {
        (_a3 = formCollections.get(this.form)) == null ? void 0 : _a3.forEach((control) => {
          this.setUserInteracted(control, true);
        });
      }
      if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    this.handleFormReset = () => {
      this.options.setValue(this.host, this.options.defaultValue(this.host));
      this.setUserInteracted(this.host, false);
      interactions.set(this.host, []);
    };
    this.handleInteraction = (event) => {
      const emittedEvents = interactions.get(this.host);
      if (!emittedEvents.includes(event.type)) {
        emittedEvents.push(event.type);
      }
      if (emittedEvents.length === this.options.assumeInteractionOn.length) {
        this.setUserInteracted(this.host, true);
      }
    };
    this.checkFormValidity = () => {
      if (this.form && !this.form.noValidate) {
        const elements = this.form.querySelectorAll("*");
        for (const element of elements) {
          if (typeof element.checkValidity === "function") {
            if (!element.checkValidity()) {
              return false;
            }
          }
        }
      }
      return true;
    };
    this.reportFormValidity = () => {
      if (this.form && !this.form.noValidate) {
        const elements = this.form.querySelectorAll("*");
        for (const element of elements) {
          if (typeof element.reportValidity === "function") {
            if (!element.reportValidity()) {
              return false;
            }
          }
        }
      }
      return true;
    };
    (this.host = host).addController(this);
    this.options = __spreadValues({
      form: (input) => {
        const formId = input.form;
        if (formId) {
          const root = input.getRootNode();
          const form = root.querySelector(`#${formId}`);
          if (form) {
            return form;
          }
        }
        return input.closest("form");
      },
      name: (input) => input.name,
      value: (input) => input.value,
      defaultValue: (input) => input.defaultValue,
      disabled: (input) => {
        var _a3;
        return (_a3 = input.disabled) != null ? _a3 : false;
      },
      reportValidity: (input) => typeof input.reportValidity === "function" ? input.reportValidity() : true,
      checkValidity: (input) => typeof input.checkValidity === "function" ? input.checkValidity() : true,
      setValue: (input, value) => input.value = value,
      assumeInteractionOn: ["sl-input"]
    }, options);
  }
  hostConnected() {
    const form = this.options.form(this.host);
    if (form) {
      this.attachForm(form);
    }
    interactions.set(this.host, []);
    this.options.assumeInteractionOn.forEach((event) => {
      this.host.addEventListener(event, this.handleInteraction);
    });
  }
  hostDisconnected() {
    this.detachForm();
    interactions.delete(this.host);
    this.options.assumeInteractionOn.forEach((event) => {
      this.host.removeEventListener(event, this.handleInteraction);
    });
  }
  hostUpdated() {
    const form = this.options.form(this.host);
    if (!form) {
      this.detachForm();
    }
    if (form && this.form !== form) {
      this.detachForm();
      this.attachForm(form);
    }
    if (this.host.hasUpdated) {
      this.setValidity(this.host.validity.valid);
    }
  }
  attachForm(form) {
    if (form) {
      this.form = form;
      if (formCollections.has(this.form)) {
        formCollections.get(this.form).add(this.host);
      } else {
        formCollections.set(this.form, /* @__PURE__ */ new Set([this.host]));
      }
      this.form.addEventListener("formdata", this.handleFormData);
      this.form.addEventListener("submit", this.handleFormSubmit);
      this.form.addEventListener("reset", this.handleFormReset);
      if (!reportValidityOverloads.has(this.form)) {
        reportValidityOverloads.set(this.form, this.form.reportValidity);
        this.form.reportValidity = () => this.reportFormValidity();
      }
      if (!checkValidityOverloads.has(this.form)) {
        checkValidityOverloads.set(this.form, this.form.checkValidity);
        this.form.checkValidity = () => this.checkFormValidity();
      }
    } else {
      this.form = void 0;
    }
  }
  detachForm() {
    if (!this.form) return;
    const formCollection = formCollections.get(this.form);
    if (!formCollection) {
      return;
    }
    formCollection.delete(this.host);
    if (formCollection.size <= 0) {
      this.form.removeEventListener("formdata", this.handleFormData);
      this.form.removeEventListener("submit", this.handleFormSubmit);
      this.form.removeEventListener("reset", this.handleFormReset);
      if (reportValidityOverloads.has(this.form)) {
        this.form.reportValidity = reportValidityOverloads.get(this.form);
        reportValidityOverloads.delete(this.form);
      }
      if (checkValidityOverloads.has(this.form)) {
        this.form.checkValidity = checkValidityOverloads.get(this.form);
        checkValidityOverloads.delete(this.form);
      }
      this.form = void 0;
    }
  }
  setUserInteracted(el, hasInteracted) {
    if (hasInteracted) {
      userInteractedControls.add(el);
    } else {
      userInteractedControls.delete(el);
    }
    el.requestUpdate();
  }
  doAction(type, submitter) {
    if (this.form) {
      const button = document.createElement("button");
      button.type = type;
      button.style.position = "absolute";
      button.style.width = "0";
      button.style.height = "0";
      button.style.clipPath = "inset(50%)";
      button.style.overflow = "hidden";
      button.style.whiteSpace = "nowrap";
      if (submitter) {
        button.name = submitter.name;
        button.value = submitter.value;
        ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"].forEach((attr) => {
          if (submitter.hasAttribute(attr)) {
            button.setAttribute(attr, submitter.getAttribute(attr));
          }
        });
      }
      this.form.append(button);
      button.click();
      button.remove();
    }
  }
  /** Returns the associated `<form>` element, if one exists. */
  getForm() {
    var _a3;
    return (_a3 = this.form) != null ? _a3 : null;
  }
  /** Resets the form, restoring all the control to their default value */
  reset(submitter) {
    this.doAction("reset", submitter);
  }
  /** Submits the form, triggering validation and form data injection. */
  submit(submitter) {
    this.doAction("submit", submitter);
  }
  /**
   * Synchronously sets the form control's validity. Call this when you know the future validity but need to update
   * the host element immediately, i.e. before Lit updates the component in the next update.
   */
  setValidity(isValid) {
    const host = this.host;
    const hasInteracted = Boolean(userInteractedControls.has(host));
    const required = Boolean(host.required);
    host.toggleAttribute("data-required", required);
    host.toggleAttribute("data-optional", !required);
    host.toggleAttribute("data-invalid", !isValid);
    host.toggleAttribute("data-valid", isValid);
    host.toggleAttribute("data-user-invalid", !isValid && hasInteracted);
    host.toggleAttribute("data-user-valid", isValid && hasInteracted);
  }
  /**
   * Updates the form control's validity based on the current value of `host.validity.valid`. Call this when anything
   * that affects constraint validation changes so the component receives the correct validity states.
   */
  updateValidity() {
    const host = this.host;
    this.setValidity(host.validity.valid);
  }
  /**
   * Dispatches a non-bubbling, cancelable custom event of type `sl-invalid`.
   * If the `sl-invalid` event will be cancelled then the original `invalid`
   * event (which may have been passed as argument) will also be cancelled.
   * If no original `invalid` event has been passed then the `sl-invalid`
   * event will be cancelled before being dispatched.
   */
  emitInvalidEvent(originalInvalidEvent) {
    const slInvalidEvent = new CustomEvent("sl-invalid", {
      bubbles: false,
      composed: false,
      cancelable: true,
      detail: {}
    });
    if (!originalInvalidEvent) {
      slInvalidEvent.preventDefault();
    }
    if (!this.host.dispatchEvent(slInvalidEvent)) {
      originalInvalidEvent == null ? void 0 : originalInvalidEvent.preventDefault();
    }
  }
};
var validValidityState = Object.freeze({
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: true,
  valueMissing: false
});
var valueMissingValidityState = Object.freeze(__spreadProps(__spreadValues({}, validValidityState), {
  valid: false,
  valueMissing: true
}));
var customErrorValidityState = Object.freeze(__spreadProps(__spreadValues({}, validValidityState), {
  valid: false,
  customError: true
}));

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.NYIIDP5N.js
var HasSlotController = class {
  constructor(host, ...slotNames) {
    this.slotNames = [];
    this.handleSlotChange = (event) => {
      const slot = event.target;
      if (this.slotNames.includes("[default]") && !slot.name || slot.name && this.slotNames.includes(slot.name)) {
        this.host.requestUpdate();
      }
    };
    (this.host = host).addController(this);
    this.slotNames = slotNames;
  }
  hasDefaultSlot() {
    return [...this.host.childNodes].some((node) => {
      if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== "") {
        return true;
      }
      if (node.nodeType === node.ELEMENT_NODE) {
        const el = node;
        const tagName = el.tagName.toLowerCase();
        if (tagName === "sl-visually-hidden") {
          return false;
        }
        if (!el.hasAttribute("slot")) {
          return true;
        }
      }
      return false;
    });
  }
  hasNamedSlot(name) {
    return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
  }
  test(slotName) {
    return slotName === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
  }
  hostConnected() {
    this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
  }
  hostDisconnected() {
    this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
};

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GMYPQTFK.js
function watch(propertyName, options) {
  const resolvedOptions = __spreadValues({
    waitUntilFirstUpdate: false
  }, options);
  return (proto, decoratedFnName) => {
    const { update: update2 } = proto;
    const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];
    proto.update = function(changedProps) {
      watchedProperties.forEach((property) => {
        const key = property;
        if (changedProps.has(key)) {
          const oldValue = changedProps.get(key);
          const newValue = this[key];
          if (oldValue !== newValue) {
            if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
              this[decoratedFnName](oldValue, newValue);
            }
          }
        }
      });
      update2.call(this, changedProps);
    };
  };
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.TUVJKY7S.js
var component_styles_default = i`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.4TUIT776.js
var _hasRecordedInitialProperties;
var ShoelaceElement = class extends i4 {
  constructor() {
    super();
    __privateAdd3(this, _hasRecordedInitialProperties, false);
    this.initialReflectedProperties = /* @__PURE__ */ new Map();
    Object.entries(this.constructor.dependencies).forEach(([name, component]) => {
      this.constructor.define(name, component);
    });
  }
  emit(name, options) {
    const event = new CustomEvent(name, __spreadValues({
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {}
    }, options));
    this.dispatchEvent(event);
    return event;
  }
  /* eslint-enable */
  static define(name, elementConstructor = this, options = {}) {
    const currentlyRegisteredConstructor = customElements.get(name);
    if (!currentlyRegisteredConstructor) {
      try {
        customElements.define(name, elementConstructor, options);
      } catch (_err) {
        customElements.define(name, class extends elementConstructor {
        }, options);
      }
      return;
    }
    let newVersion = " (unknown version)";
    let existingVersion = newVersion;
    if ("version" in elementConstructor && elementConstructor.version) {
      newVersion = " v" + elementConstructor.version;
    }
    if ("version" in currentlyRegisteredConstructor && currentlyRegisteredConstructor.version) {
      existingVersion = " v" + currentlyRegisteredConstructor.version;
    }
    if (newVersion && existingVersion && newVersion === existingVersion) {
      return;
    }
    console.warn(
      `Attempted to register <${name}>${newVersion}, but <${name}>${existingVersion} has already been registered.`
    );
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (!__privateGet3(this, _hasRecordedInitialProperties)) {
      this.constructor.elementProperties.forEach(
        (obj, prop) => {
          if (obj.reflect && this[prop] != null) {
            this.initialReflectedProperties.set(prop, this[prop]);
          }
        }
      );
      __privateSet3(this, _hasRecordedInitialProperties, true);
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }
  willUpdate(changedProperties) {
    super.willUpdate(changedProperties);
    this.initialReflectedProperties.forEach((value, prop) => {
      if (changedProperties.has(prop) && this[prop] == null) {
        this[prop] = value;
      }
    });
  }
};
_hasRecordedInitialProperties = /* @__PURE__ */ new WeakMap();
ShoelaceElement.version = "2.20.1";
ShoelaceElement.dependencies = {};
__decorateClass([
  n5()
], ShoelaceElement.prototype, "dir", 2);
__decorateClass([
  n5()
], ShoelaceElement.prototype, "lang", 2);

// node_modules/lit-html/directive.js
var t5 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e7 = (t7) => (...e12) => ({ _$litDirective$: t7, values: e12 });
var i5 = class {
  constructor(t7) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t7, e12, i8) {
    this._$Ct = t7, this._$AM = e12, this._$Ci = i8;
  }
  _$AS(t7, e12) {
    return this.update(t7, e12);
  }
  update(t7, e12) {
    return this.render(...e12);
  }
};

// node_modules/lit-html/directives/class-map.js
var e8 = e7(class extends i5 {
  constructor(t7) {
    if (super(t7), t7.type !== t5.ATTRIBUTE || "class" !== t7.name || t7.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t7) {
    return " " + Object.keys(t7).filter((s5) => t7[s5]).join(" ") + " ";
  }
  update(s5, [i8]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s5.strings && (this.nt = new Set(s5.strings.join(" ").split(/\s/).filter((t7) => "" !== t7)));
      for (const t7 in i8) i8[t7] && !this.nt?.has(t7) && this.st.add(t7);
      return this.render(i8);
    }
    const r8 = s5.element.classList;
    for (const t7 of this.st) t7 in i8 || (r8.remove(t7), this.st.delete(t7));
    for (const t7 in i8) {
      const s6 = !!i8[t7];
      s6 === this.st.has(t7) || this.nt?.has(t7) || (s6 ? (r8.add(t7), this.st.add(t7)) : (r8.remove(t7), this.st.delete(t7)));
    }
    return T;
  }
});

// node_modules/lit-html/directives/if-defined.js
var o7 = (o10) => o10 ?? E;

// node_modules/lit-html/directive-helpers.js
var { I: t6 } = Z;
var e9 = (o10, t7) => void 0 === t7 ? void 0 !== o10?._$litType$ : o10?._$litType$ === t7;
var f4 = (o10) => void 0 === o10.strings;
var u4 = {};
var m3 = (o10, t7 = u4) => o10._$AH = t7;

// node_modules/lit-html/directives/live.js
var l4 = e7(class extends i5 {
  constructor(r8) {
    if (super(r8), r8.type !== t5.PROPERTY && r8.type !== t5.ATTRIBUTE && r8.type !== t5.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!f4(r8)) throw Error("`live` bindings can only contain a single expression");
  }
  render(r8) {
    return r8;
  }
  update(i8, [t7]) {
    if (t7 === T || t7 === E) return t7;
    const o10 = i8.element, l6 = i8.name;
    if (i8.type === t5.PROPERTY) {
      if (t7 === o10[l6]) return T;
    } else if (i8.type === t5.BOOLEAN_ATTRIBUTE) {
      if (!!t7 === o10.hasAttribute(l6)) return T;
    } else if (i8.type === t5.ATTRIBUTE && o10.getAttribute(l6) === t7 + "") return T;
    return m3(i8), t7;
  }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.Q3IETUAU.js
var SlTextarea = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      assumeInteractionOn: ["sl-blur", "sl-input"]
    });
    this.hasSlotController = new HasSlotController(this, "help-text", "label");
    this.hasFocus = false;
    this.title = "";
    this.name = "";
    this.value = "";
    this.size = "medium";
    this.filled = false;
    this.label = "";
    this.helpText = "";
    this.placeholder = "";
    this.rows = 4;
    this.resize = "vertical";
    this.disabled = false;
    this.readonly = false;
    this.form = "";
    this.required = false;
    this.spellcheck = true;
    this.defaultValue = "";
  }
  /** Gets the validity state object */
  get validity() {
    return this.input.validity;
  }
  /** Gets the validation message */
  get validationMessage() {
    return this.input.validationMessage;
  }
  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => this.setTextareaHeight());
    this.updateComplete.then(() => {
      this.setTextareaHeight();
      this.resizeObserver.observe(this.input);
    });
  }
  firstUpdated() {
    this.formControlController.updateValidity();
  }
  disconnectedCallback() {
    var _a3;
    super.disconnectedCallback();
    if (this.input) {
      (_a3 = this.resizeObserver) == null ? void 0 : _a3.unobserve(this.input);
    }
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleChange() {
    this.value = this.input.value;
    this.setTextareaHeight();
    this.emit("sl-change");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleInput() {
    this.value = this.input.value;
    this.emit("sl-input");
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  setTextareaHeight() {
    if (this.resize === "auto") {
      this.sizeAdjuster.style.height = `${this.input.clientHeight}px`;
      this.input.style.height = "auto";
      this.input.style.height = `${this.input.scrollHeight}px`;
    } else {
      this.input.style.height = "";
    }
  }
  handleDisabledChange() {
    this.formControlController.setValidity(this.disabled);
  }
  handleRowsChange() {
    this.setTextareaHeight();
  }
  async handleValueChange() {
    await this.updateComplete;
    this.formControlController.updateValidity();
    this.setTextareaHeight();
  }
  /** Sets focus on the textarea. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the textarea. */
  blur() {
    this.input.blur();
  }
  /** Selects all the text in the textarea. */
  select() {
    this.input.select();
  }
  /** Gets or sets the textarea's scroll position. */
  scrollPosition(position) {
    if (position) {
      if (typeof position.top === "number") this.input.scrollTop = position.top;
      if (typeof position.left === "number") this.input.scrollLeft = position.left;
      return void 0;
    }
    return {
      top: this.input.scrollTop,
      left: this.input.scrollTop
    };
  }
  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  /** Replaces a range of text with a new string. */
  setRangeText(replacement, start, end, selectMode = "preserve") {
    const selectionStart = start != null ? start : this.input.selectionStart;
    const selectionEnd = end != null ? end : this.input.selectionEnd;
    this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
      this.setTextareaHeight();
    }
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.input.checkValidity();
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    return x`
      <div
        part="form-control"
        class=${e8({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${e8({
      textarea: true,
      "textarea--small": this.size === "small",
      "textarea--medium": this.size === "medium",
      "textarea--large": this.size === "large",
      "textarea--standard": !this.filled,
      "textarea--filled": this.filled,
      "textarea--disabled": this.disabled,
      "textarea--focused": this.hasFocus,
      "textarea--empty": !this.value,
      "textarea--resize-none": this.resize === "none",
      "textarea--resize-vertical": this.resize === "vertical",
      "textarea--resize-auto": this.resize === "auto"
    })}
          >
            <textarea
              part="textarea"
              id="input"
              class="textarea__control"
              title=${this.title}
              name=${o7(this.name)}
              .value=${l4(this.value)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${o7(this.placeholder)}
              rows=${o7(this.rows)}
              minlength=${o7(this.minlength)}
              maxlength=${o7(this.maxlength)}
              autocapitalize=${o7(this.autocapitalize)}
              autocorrect=${o7(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${o7(this.spellcheck)}
              enterkeyhint=${o7(this.enterkeyhint)}
              inputmode=${o7(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            ></textarea>
            <!-- This "adjuster" exists to prevent layout shifting. https://github.com/shoelace-style/shoelace/issues/2180 -->
            <div part="textarea-adjuster" class="textarea__size-adjuster" ?hidden=${this.resize !== "auto"}></div>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
};
SlTextarea.styles = [component_styles_default, form_control_styles_default, textarea_styles_default];
__decorateClass([
  e6(".textarea__control")
], SlTextarea.prototype, "input", 2);
__decorateClass([
  e6(".textarea__size-adjuster")
], SlTextarea.prototype, "sizeAdjuster", 2);
__decorateClass([
  r6()
], SlTextarea.prototype, "hasFocus", 2);
__decorateClass([
  n5()
], SlTextarea.prototype, "title", 2);
__decorateClass([
  n5()
], SlTextarea.prototype, "name", 2);
__decorateClass([
  n5()
], SlTextarea.prototype, "value", 2);
__decorateClass([
  n5({ reflect: true })
], SlTextarea.prototype, "size", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlTextarea.prototype, "filled", 2);
__decorateClass([
  n5()
], SlTextarea.prototype, "label", 2);
__decorateClass([
  n5({ attribute: "help-text" })
], SlTextarea.prototype, "helpText", 2);
__decorateClass([
  n5()
], SlTextarea.prototype, "placeholder", 2);
__decorateClass([
  n5({ type: Number })
], SlTextarea.prototype, "rows", 2);
__decorateClass([
  n5()
], SlTextarea.prototype, "resize", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlTextarea.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlTextarea.prototype, "readonly", 2);
__decorateClass([
  n5({ reflect: true })
], SlTextarea.prototype, "form", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlTextarea.prototype, "required", 2);
__decorateClass([
  n5({ type: Number })
], SlTextarea.prototype, "minlength", 2);
__decorateClass([
  n5({ type: Number })
], SlTextarea.prototype, "maxlength", 2);
__decorateClass([
  n5()
], SlTextarea.prototype, "autocapitalize", 2);
__decorateClass([
  n5()
], SlTextarea.prototype, "autocorrect", 2);
__decorateClass([
  n5()
], SlTextarea.prototype, "autocomplete", 2);
__decorateClass([
  n5({ type: Boolean })
], SlTextarea.prototype, "autofocus", 2);
__decorateClass([
  n5()
], SlTextarea.prototype, "enterkeyhint", 2);
__decorateClass([
  n5({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], SlTextarea.prototype, "spellcheck", 2);
__decorateClass([
  n5()
], SlTextarea.prototype, "inputmode", 2);
__decorateClass([
  defaultValue()
], SlTextarea.prototype, "defaultValue", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlTextarea.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("rows", { waitUntilFirstUpdate: true })
], SlTextarea.prototype, "handleRowsChange", 1);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], SlTextarea.prototype, "handleValueChange", 1);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7DUCI5S4.js
var spinner_styles_default = i`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;

// node_modules/@shoelace-style/localize/dist/index.js
var connectedElements = /* @__PURE__ */ new Set();
var translations = /* @__PURE__ */ new Map();
var fallback;
var documentDirection = "ltr";
var documentLanguage = "en";
var isClient = typeof MutationObserver !== "undefined" && typeof document !== "undefined" && typeof document.documentElement !== "undefined";
if (isClient) {
  const documentElementObserver = new MutationObserver(update);
  documentDirection = document.documentElement.dir || "ltr";
  documentLanguage = document.documentElement.lang || navigator.language;
  documentElementObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir", "lang"]
  });
}
function registerTranslation(...translation2) {
  translation2.map((t7) => {
    const code = t7.$code.toLowerCase();
    if (translations.has(code)) {
      translations.set(code, Object.assign(Object.assign({}, translations.get(code)), t7));
    } else {
      translations.set(code, t7);
    }
    if (!fallback) {
      fallback = t7;
    }
  });
  update();
}
function update() {
  if (isClient) {
    documentDirection = document.documentElement.dir || "ltr";
    documentLanguage = document.documentElement.lang || navigator.language;
  }
  [...connectedElements.keys()].map((el) => {
    if (typeof el.requestUpdate === "function") {
      el.requestUpdate();
    }
  });
}
var LocalizeController = class {
  constructor(host) {
    this.host = host;
    this.host.addController(this);
  }
  hostConnected() {
    connectedElements.add(this.host);
  }
  hostDisconnected() {
    connectedElements.delete(this.host);
  }
  dir() {
    return `${this.host.dir || documentDirection}`.toLowerCase();
  }
  lang() {
    return `${this.host.lang || documentLanguage}`.toLowerCase();
  }
  getTranslationData(lang) {
    var _a3, _b;
    const locale = new Intl.Locale(lang.replace(/_/g, "-"));
    const language = locale === null || locale === void 0 ? void 0 : locale.language.toLowerCase();
    const region = (_b = (_a3 = locale === null || locale === void 0 ? void 0 : locale.region) === null || _a3 === void 0 ? void 0 : _a3.toLowerCase()) !== null && _b !== void 0 ? _b : "";
    const primary = translations.get(`${language}-${region}`);
    const secondary = translations.get(language);
    return { locale, language, region, primary, secondary };
  }
  exists(key, options) {
    var _a3;
    const { primary, secondary } = this.getTranslationData((_a3 = options.lang) !== null && _a3 !== void 0 ? _a3 : this.lang());
    options = Object.assign({ includeFallback: false }, options);
    if (primary && primary[key] || secondary && secondary[key] || options.includeFallback && fallback && fallback[key]) {
      return true;
    }
    return false;
  }
  term(key, ...args) {
    const { primary, secondary } = this.getTranslationData(this.lang());
    let term;
    if (primary && primary[key]) {
      term = primary[key];
    } else if (secondary && secondary[key]) {
      term = secondary[key];
    } else if (fallback && fallback[key]) {
      term = fallback[key];
    } else {
      console.error(`No translation found for: ${String(key)}`);
      return String(key);
    }
    if (typeof term === "function") {
      return term(...args);
    }
    return term;
  }
  date(dateToFormat, options) {
    dateToFormat = new Date(dateToFormat);
    return new Intl.DateTimeFormat(this.lang(), options).format(dateToFormat);
  }
  number(numberToFormat, options) {
    numberToFormat = Number(numberToFormat);
    return isNaN(numberToFormat) ? "" : new Intl.NumberFormat(this.lang(), options).format(numberToFormat);
  }
  relativeTime(value, unit, options) {
    return new Intl.RelativeTimeFormat(this.lang(), options).format(value, unit);
  }
};

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7BTDLTNI.js
var translation = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  carousel: "Carousel",
  clearEntry: "Clear entry",
  close: "Close",
  copied: "Copied",
  copy: "Copy",
  currentValue: "Current value",
  error: "Error",
  goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
  hidePassword: "Hide password",
  loading: "Loading",
  nextSlide: "Next slide",
  numOptionsSelected: (num) => {
    if (num === 0) return "No options selected";
    if (num === 1) return "1 option selected";
    return `${num} options selected`;
  },
  previousSlide: "Previous slide",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  slideNum: (slide) => `Slide ${slide}`,
  toggleColorFormat: "Toggle color format"
};
registerTranslation(translation);
var en_default = translation;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6CTB5ZDJ.js
var LocalizeController2 = class extends LocalizeController {
};
registerTranslation(en_default);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.36O46B5H.js
var SlSpinner = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
  }
  render() {
    return x`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
};
SlSpinner.styles = [component_styles_default, spinner_styles_default];

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.MAQXLKQ7.js
var button_styles_default = i`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3Y6SB6QS.js
var basePath = "";
function setBasePath(path) {
  basePath = path;
}
function getBasePath(subpath = "") {
  if (!basePath) {
    const scripts = [...document.getElementsByTagName("script")];
    const configScript = scripts.find((script) => script.hasAttribute("data-shoelace"));
    if (configScript) {
      setBasePath(configScript.getAttribute("data-shoelace"));
    } else {
      const fallbackScript = scripts.find((s5) => {
        return /shoelace(\.min)?\.js($|\?)/.test(s5.src) || /shoelace-autoloader(\.min)?\.js($|\?)/.test(s5.src);
      });
      let path = "";
      if (fallbackScript) {
        path = fallbackScript.getAttribute("src");
      }
      setBasePath(path.split("/").slice(0, -1).join("/"));
    }
  }
  return basePath.replace(/\/$/, "") + (subpath ? `/${subpath.replace(/^\//, "")}` : ``);
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.P7ZG6EMR.js
var library = {
  name: "default",
  resolver: (name) => getBasePath(`assets/icons/${name}.svg`)
};
var library_default_default = library;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3TFKS637.js
var icons = {
  caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
  check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
  "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  copy: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,
  eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
  "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
  eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
  "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
  indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
  "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
  "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
  radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
  "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
  "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
  "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
};
var systemLibrary = {
  name: "system",
  resolver: (name) => {
    if (name in icons) {
      return `data:image/svg+xml,${encodeURIComponent(icons[name])}`;
    }
    return "";
  }
};
var library_system_default = systemLibrary;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.ZL53POKZ.js
var registry = [library_default_default, library_system_default];
var watchedIcons = [];
function watchIcon(icon) {
  watchedIcons.push(icon);
}
function unwatchIcon(icon) {
  watchedIcons = watchedIcons.filter((el) => el !== icon);
}
function getIconLibrary(name) {
  return registry.find((lib) => lib.name === name);
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.QLXRCYS4.js
var icon_styles_default = i`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.YHLNUJ7P.js
var CACHEABLE_ERROR = Symbol();
var RETRYABLE_ERROR = Symbol();
var parser;
var iconCache = /* @__PURE__ */ new Map();
var SlIcon = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.initialRender = false;
    this.svg = null;
    this.label = "";
    this.library = "default";
  }
  /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
  async resolveIcon(url, library2) {
    var _a3;
    let fileData;
    if (library2 == null ? void 0 : library2.spriteSheet) {
      this.svg = x`<svg part="svg">
        <use part="use" href="${url}"></use>
      </svg>`;
      return this.svg;
    }
    try {
      fileData = await fetch(url, { mode: "cors" });
      if (!fileData.ok) return fileData.status === 410 ? CACHEABLE_ERROR : RETRYABLE_ERROR;
    } catch (e12) {
      return RETRYABLE_ERROR;
    }
    try {
      const div = document.createElement("div");
      div.innerHTML = await fileData.text();
      const svg = div.firstElementChild;
      if (((_a3 = svg == null ? void 0 : svg.tagName) == null ? void 0 : _a3.toLowerCase()) !== "svg") return CACHEABLE_ERROR;
      if (!parser) parser = new DOMParser();
      const doc = parser.parseFromString(svg.outerHTML, "text/html");
      const svgEl = doc.body.querySelector("svg");
      if (!svgEl) return CACHEABLE_ERROR;
      svgEl.part.add("svg");
      return document.adoptNode(svgEl);
    } catch (e12) {
      return CACHEABLE_ERROR;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    watchIcon(this);
  }
  firstUpdated() {
    this.initialRender = true;
    this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchIcon(this);
  }
  getIconSource() {
    const library2 = getIconLibrary(this.library);
    if (this.name && library2) {
      return {
        url: library2.resolver(this.name),
        fromLibrary: true
      };
    }
    return {
      url: this.src,
      fromLibrary: false
    };
  }
  handleLabelChange() {
    const hasLabel = typeof this.label === "string" && this.label.length > 0;
    if (hasLabel) {
      this.setAttribute("role", "img");
      this.setAttribute("aria-label", this.label);
      this.removeAttribute("aria-hidden");
    } else {
      this.removeAttribute("role");
      this.removeAttribute("aria-label");
      this.setAttribute("aria-hidden", "true");
    }
  }
  async setIcon() {
    var _a3;
    const { url, fromLibrary } = this.getIconSource();
    const library2 = fromLibrary ? getIconLibrary(this.library) : void 0;
    if (!url) {
      this.svg = null;
      return;
    }
    let iconResolver = iconCache.get(url);
    if (!iconResolver) {
      iconResolver = this.resolveIcon(url, library2);
      iconCache.set(url, iconResolver);
    }
    if (!this.initialRender) {
      return;
    }
    const svg = await iconResolver;
    if (svg === RETRYABLE_ERROR) {
      iconCache.delete(url);
    }
    if (url !== this.getIconSource().url) {
      return;
    }
    if (e9(svg)) {
      this.svg = svg;
      if (library2) {
        await this.updateComplete;
        const shadowSVG = this.shadowRoot.querySelector("[part='svg']");
        if (typeof library2.mutator === "function" && shadowSVG) {
          library2.mutator(shadowSVG);
        }
      }
      return;
    }
    switch (svg) {
      case RETRYABLE_ERROR:
      case CACHEABLE_ERROR:
        this.svg = null;
        this.emit("sl-error");
        break;
      default:
        this.svg = svg.cloneNode(true);
        (_a3 = library2 == null ? void 0 : library2.mutator) == null ? void 0 : _a3.call(library2, this.svg);
        this.emit("sl-load");
    }
  }
  render() {
    return this.svg;
  }
};
SlIcon.styles = [component_styles_default, icon_styles_default];
__decorateClass([
  r6()
], SlIcon.prototype, "svg", 2);
__decorateClass([
  n5({ reflect: true })
], SlIcon.prototype, "name", 2);
__decorateClass([
  n5()
], SlIcon.prototype, "src", 2);
__decorateClass([
  n5()
], SlIcon.prototype, "label", 2);
__decorateClass([
  n5({ reflect: true })
], SlIcon.prototype, "library", 2);
__decorateClass([
  watch("label")
], SlIcon.prototype, "handleLabelChange", 1);
__decorateClass([
  watch(["name", "src", "library"])
], SlIcon.prototype, "setIcon", 1);

// node_modules/lit-html/static.js
var a4 = Symbol.for("");
var o8 = (t7) => {
  if (t7?.r === a4) return t7?._$litStatic$;
};
var i6 = (t7, ...r8) => ({ _$litStatic$: r8.reduce((r9, e12, a5) => r9 + ((t8) => {
  if (void 0 !== t8._$litStatic$) return t8._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t8}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(e12) + t7[a5 + 1], t7[0]), r: a4 });
var l5 = /* @__PURE__ */ new Map();
var n6 = (t7) => (r8, ...e12) => {
  const a5 = e12.length;
  let s5, i8;
  const n7 = [], u6 = [];
  let c6, $4 = 0, f5 = false;
  for (; $4 < a5; ) {
    for (c6 = r8[$4]; $4 < a5 && void 0 !== (i8 = e12[$4], s5 = o8(i8)); ) c6 += s5 + r8[++$4], f5 = true;
    $4 !== a5 && u6.push(i8), n7.push(c6), $4++;
  }
  if ($4 === a5 && n7.push(r8[a5]), f5) {
    const t8 = n7.join("$$lit$$");
    void 0 === (r8 = l5.get(t8)) && (n7.raw = n7, l5.set(t8, r8 = n7)), e12 = u6;
  }
  return t7(r8, ...e12);
};
var u5 = n6(x);
var c5 = n6(b2);
var $3 = n6(w);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.SBCFYC2S.js
var SlButton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      assumeInteractionOn: ["click"]
    });
    this.hasSlotController = new HasSlotController(this, "[default]", "prefix", "suffix");
    this.localize = new LocalizeController2(this);
    this.hasFocus = false;
    this.invalid = false;
    this.title = "";
    this.variant = "default";
    this.size = "medium";
    this.caret = false;
    this.disabled = false;
    this.loading = false;
    this.outline = false;
    this.pill = false;
    this.circle = false;
    this.type = "button";
    this.name = "";
    this.value = "";
    this.href = "";
    this.rel = "noreferrer noopener";
  }
  /** Gets the validity state object */
  get validity() {
    if (this.isButton()) {
      return this.button.validity;
    }
    return validValidityState;
  }
  /** Gets the validation message */
  get validationMessage() {
    if (this.isButton()) {
      return this.button.validationMessage;
    }
    return "";
  }
  firstUpdated() {
    if (this.isButton()) {
      this.formControlController.updateValidity();
    }
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleClick() {
    if (this.type === "submit") {
      this.formControlController.submit(this);
    }
    if (this.type === "reset") {
      this.formControlController.reset(this);
    }
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  isButton() {
    return this.href ? false : true;
  }
  isLink() {
    return this.href ? true : false;
  }
  handleDisabledChange() {
    if (this.isButton()) {
      this.formControlController.setValidity(this.disabled);
    }
  }
  /** Simulates a click on the button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    if (this.isButton()) {
      return this.button.checkValidity();
    }
    return true;
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    if (this.isButton()) {
      return this.button.reportValidity();
    }
    return true;
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    if (this.isButton()) {
      this.button.setCustomValidity(message);
      this.formControlController.updateValidity();
    }
  }
  render() {
    const isLink = this.isLink();
    const tag = isLink ? i6`a` : i6`button`;
    return u5`
      <${tag}
        part="base"
        class=${e8({
      button: true,
      "button--default": this.variant === "default",
      "button--primary": this.variant === "primary",
      "button--success": this.variant === "success",
      "button--neutral": this.variant === "neutral",
      "button--warning": this.variant === "warning",
      "button--danger": this.variant === "danger",
      "button--text": this.variant === "text",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--standard": !this.outline,
      "button--outline": this.outline,
      "button--pill": this.pill,
      "button--rtl": this.localize.dir() === "rtl",
      "button--has-label": this.hasSlotController.test("[default]"),
      "button--has-prefix": this.hasSlotController.test("prefix"),
      "button--has-suffix": this.hasSlotController.test("suffix")
    })}
        ?disabled=${o7(isLink ? void 0 : this.disabled)}
        type=${o7(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${o7(isLink ? void 0 : this.name)}
        value=${o7(isLink ? void 0 : this.value)}
        href=${o7(isLink && !this.disabled ? this.href : void 0)}
        target=${o7(isLink ? this.target : void 0)}
        download=${o7(isLink ? this.download : void 0)}
        rel=${o7(isLink ? this.rel : void 0)}
        role=${o7(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton() ? this.handleInvalid : null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret ? u5` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> ` : ""}
        ${this.loading ? u5`<sl-spinner part="spinner"></sl-spinner>` : ""}
      </${tag}>
    `;
  }
};
SlButton.styles = [component_styles_default, button_styles_default];
SlButton.dependencies = {
  "sl-icon": SlIcon,
  "sl-spinner": SlSpinner
};
__decorateClass([
  e6(".button")
], SlButton.prototype, "button", 2);
__decorateClass([
  r6()
], SlButton.prototype, "hasFocus", 2);
__decorateClass([
  r6()
], SlButton.prototype, "invalid", 2);
__decorateClass([
  n5()
], SlButton.prototype, "title", 2);
__decorateClass([
  n5({ reflect: true })
], SlButton.prototype, "variant", 2);
__decorateClass([
  n5({ reflect: true })
], SlButton.prototype, "size", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlButton.prototype, "caret", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlButton.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlButton.prototype, "loading", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlButton.prototype, "outline", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlButton.prototype, "pill", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlButton.prototype, "circle", 2);
__decorateClass([
  n5()
], SlButton.prototype, "type", 2);
__decorateClass([
  n5()
], SlButton.prototype, "name", 2);
__decorateClass([
  n5()
], SlButton.prototype, "value", 2);
__decorateClass([
  n5()
], SlButton.prototype, "href", 2);
__decorateClass([
  n5()
], SlButton.prototype, "target", 2);
__decorateClass([
  n5()
], SlButton.prototype, "rel", 2);
__decorateClass([
  n5()
], SlButton.prototype, "download", 2);
__decorateClass([
  n5()
], SlButton.prototype, "form", 2);
__decorateClass([
  n5({ attribute: "formaction" })
], SlButton.prototype, "formAction", 2);
__decorateClass([
  n5({ attribute: "formenctype" })
], SlButton.prototype, "formEnctype", 2);
__decorateClass([
  n5({ attribute: "formmethod" })
], SlButton.prototype, "formMethod", 2);
__decorateClass([
  n5({ attribute: "formnovalidate", type: Boolean })
], SlButton.prototype, "formNoValidate", 2);
__decorateClass([
  n5({ attribute: "formtarget" })
], SlButton.prototype, "formTarget", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlButton.prototype, "handleDisabledChange", 1);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.V2OL7VMD.js
var tag_styles_default = i`
  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6I2T3DLI.js
var icon_button_styles_default = i`
  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.7E4JTYWU.js
var SlIconButton = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.hasFocus = false;
    this.label = "";
    this.disabled = false;
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  /** Simulates a click on the icon button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the icon button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the icon button. */
  blur() {
    this.button.blur();
  }
  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? i6`a` : i6`button`;
    return u5`
      <${tag}
        part="base"
        class=${e8({
      "icon-button": true,
      "icon-button--disabled": !isLink && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${o7(isLink ? void 0 : this.disabled)}
        type=${o7(isLink ? void 0 : "button")}
        href=${o7(isLink ? this.href : void 0)}
        target=${o7(isLink ? this.target : void 0)}
        download=${o7(isLink ? this.download : void 0)}
        rel=${o7(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${o7(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${o7(this.name)}
          library=${o7(this.library)}
          src=${o7(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${tag}>
    `;
  }
};
SlIconButton.styles = [component_styles_default, icon_button_styles_default];
SlIconButton.dependencies = { "sl-icon": SlIcon };
__decorateClass([
  e6(".icon-button")
], SlIconButton.prototype, "button", 2);
__decorateClass([
  r6()
], SlIconButton.prototype, "hasFocus", 2);
__decorateClass([
  n5()
], SlIconButton.prototype, "name", 2);
__decorateClass([
  n5()
], SlIconButton.prototype, "library", 2);
__decorateClass([
  n5()
], SlIconButton.prototype, "src", 2);
__decorateClass([
  n5()
], SlIconButton.prototype, "href", 2);
__decorateClass([
  n5()
], SlIconButton.prototype, "target", 2);
__decorateClass([
  n5()
], SlIconButton.prototype, "download", 2);
__decorateClass([
  n5()
], SlIconButton.prototype, "label", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlIconButton.prototype, "disabled", 2);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.6R4LM7O6.js
var SlTag = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.variant = "neutral";
    this.size = "medium";
    this.pill = false;
    this.removable = false;
  }
  handleRemoveClick() {
    this.emit("sl-remove");
  }
  render() {
    return x`
      <span
        part="base"
        class=${e8({
      tag: true,
      // Types
      "tag--primary": this.variant === "primary",
      "tag--success": this.variant === "success",
      "tag--neutral": this.variant === "neutral",
      "tag--warning": this.variant === "warning",
      "tag--danger": this.variant === "danger",
      "tag--text": this.variant === "text",
      // Sizes
      "tag--small": this.size === "small",
      "tag--medium": this.size === "medium",
      "tag--large": this.size === "large",
      // Modifiers
      "tag--pill": this.pill,
      "tag--removable": this.removable
    })}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable ? x`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            ` : ""}
      </span>
    `;
  }
};
SlTag.styles = [component_styles_default, tag_styles_default];
SlTag.dependencies = { "sl-icon-button": SlIconButton };
__decorateClass([
  n5({ reflect: true })
], SlTag.prototype, "variant", 2);
__decorateClass([
  n5({ reflect: true })
], SlTag.prototype, "size", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlTag.prototype, "pill", 2);
__decorateClass([
  n5({ type: Boolean })
], SlTag.prototype, "removable", 2);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.XNOUITPX.js
var select_styles_default = i`
  :host {
    display: block;
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
  }

  .select::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .select[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .select[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  /* Combobox */
  .select__combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    position: relative;
    align-items: center;
    justify-content: start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: pointer;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  .select__display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    color: var(--sl-input-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
  }

  .select__display-input::placeholder {
    color: var(--sl-input-placeholder-color);
  }

  .select:not(.select--disabled):hover .select__display-input {
    color: var(--sl-input-color-hover);
  }

  .select__display-input:focus {
    outline: none;
  }

  /* Visually hide the display input when multiple is enabled */
  .select--multiple:not(.select--placeholder-visible) .select__display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .select__value-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    z-index: -1;
  }

  .select__tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    margin-inline-start: var(--sl-spacing-2x-small);
  }

  .select__tags::slotted(sl-tag) {
    cursor: pointer !important;
  }

  .select--disabled .select__tags,
  .select--disabled .select__tags::slotted(sl-tag) {
    cursor: not-allowed !important;
  }

  /* Standard selects */
  .select--standard .select__combobox {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .select--standard.select--disabled .select__combobox {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    color: var(--sl-input-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select--standard:not(.select--disabled).select--open .select__combobox,
  .select--standard:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  /* Filled selects */
  .select--filled .select__combobox {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .select--filled:hover:not(.select--disabled) .select__combobox {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .select--filled.select--disabled .select__combobox {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .select--filled:not(.select--disabled).select--open .select__combobox,
  .select--filled:not(.select--disabled).select--focused .select__combobox {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
  }

  /* Sizes */
  .select--small .select__combobox {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    min-height: var(--sl-input-height-small);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-small);
  }

  .select--small .select__clear {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .select--small.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-block: 2px;
    padding-inline-start: 0;
  }

  .select--small .select__tags {
    gap: 2px;
  }

  .select--medium .select__combobox {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    min-height: var(--sl-input-height-medium);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-medium);
  }

  .select--medium .select__clear {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .select--medium.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 3px;
  }

  .select--medium .select__tags {
    gap: 3px;
  }

  .select--large .select__combobox {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    min-height: var(--sl-input-height-large);
    padding-block: 0;
    padding-inline: var(--sl-input-spacing-large);
  }

  .select--large .select__clear {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large .select__prefix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .select--large.select--multiple:not(.select--placeholder-visible) .select__combobox {
    padding-inline-start: 0;
    padding-block: 4px;
  }

  .select--large .select__tags {
    gap: 4px;
  }

  /* Pills */
  .select--pill.select--small .select__combobox {
    border-radius: var(--sl-input-height-small);
  }

  .select--pill.select--medium .select__combobox {
    border-radius: var(--sl-input-height-medium);
  }

  .select--pill.select--large .select__combobox {
    border-radius: var(--sl-input-height-large);
  }

  /* Prefix and Suffix */
  .select__prefix,
  .select__suffix {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--sl-input-placeholder-color);
  }

  .select__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-small);
  }

  /* Clear button */
  .select__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .select__clear:focus {
    outline: none;
  }

  /* Expand icon */
  .select__expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
    rotate: 0;
    margin-inline-start: var(--sl-spacing-small);
  }

  .select--open .select__expand-icon {
    rotate: -180deg;
  }

  /* Listbox */
  .select__listbox {
    display: block;
    position: relative;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding-block: var(--sl-spacing-x-small);
    padding-inline: 0;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);
  }

  .select__listbox ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }

  .select__listbox ::slotted(small) {
    display: block;
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    color: var(--sl-color-neutral-500);
    padding-block: var(--sl-spacing-2x-small);
    padding-inline: var(--sl-spacing-x-large);
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.RWUUFNUL.js
function getOffset(element, parent) {
  return {
    top: Math.round(element.getBoundingClientRect().top - parent.getBoundingClientRect().top),
    left: Math.round(element.getBoundingClientRect().left - parent.getBoundingClientRect().left)
  };
}
function scrollIntoView(element, container, direction = "vertical", behavior = "smooth") {
  const offset3 = getOffset(element, container);
  const offsetTop = offset3.top + container.scrollTop;
  const offsetLeft = offset3.left + container.scrollLeft;
  const minX = container.scrollLeft;
  const maxX = container.scrollLeft + container.offsetWidth;
  const minY = container.scrollTop;
  const maxY = container.scrollTop + container.offsetHeight;
  if (direction === "horizontal" || direction === "both") {
    if (offsetLeft < minX) {
      container.scrollTo({ left: offsetLeft, behavior });
    } else if (offsetLeft + element.clientWidth > maxX) {
      container.scrollTo({ left: offsetLeft - container.offsetWidth + element.clientWidth, behavior });
    }
  }
  if (direction === "vertical" || direction === "both") {
    if (offsetTop < minY) {
      container.scrollTo({ top: offsetTop, behavior });
    } else if (offsetTop + element.clientHeight > maxY) {
      container.scrollTo({ top: offsetTop - container.offsetHeight + element.clientHeight, behavior });
    }
  }
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.3KSWVBQ5.js
var popup_styles_default = i`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v3) => ({
  x: v3,
  y: v3
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x3,
    y: y4,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y4,
    left: x3,
    right: x3 + width,
    bottom: y4 + height,
    x: x3,
    y: y4
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x3,
    y: y4
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i8 = 0; i8 < validMiddleware.length; i8++) {
    const {
      name,
      fn
    } = validMiddleware[i8];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x3,
      y: y4,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x3 = nextX != null ? nextX : x3;
    y4 = nextY != null ? nextY : y4;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x3,
          y: y4
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i8 = -1;
    }
  }
  return {
    x: x3,
    y: y4,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x3,
    y: y4,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x3,
    y: y4,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x: x3,
      y: y4,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x: x3,
      y: y4
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset3 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset3,
        centerOffset: center - offset3 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d4) => d4.overflows[0] <= 0).sort((a5, b4) => a5.overflows[1] - b4.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d4) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d4.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d4) => [d4.placement, d4.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a5, b4) => a5[1] - b4[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x: x3,
        y: y4,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x3 + diffCoords.x,
        y: y4 + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x: x3,
        y: y4,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x4,
              y: y5
            } = _ref;
            return {
              x: x4,
              y: y5
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x: x3,
        y: y4
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x3,
          y: limitedCoords.y - y4,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e12) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((value) => css[value] ? css[value] !== "none" : false) || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $4
  } = getCssDimensions(domElement);
  let x3 = ($4 ? round(rect.width) : rect.width) / width;
  let y4 = ($4 ? round(rect.height) : rect.height) / height;
  if (!x3 || !Number.isFinite(x3)) {
    x3 = 1;
  }
  if (!y4 || !Number.isFinite(y4)) {
    y4 = 1;
  }
  return {
    x: x3,
    y: y4
  };
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x3 = (clientRect.left + visualOffsets.x) / scale.x;
  let y4 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x3 *= iframeScale.x;
      y4 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x3 += left;
      y4 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x3,
    y: y4
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x3 = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : (
    // RTL <body> scrollbar.
    getWindowScrollBarX(documentElement, htmlRect)
  ));
  const y4 = htmlRect.top + scroll.scrollTop;
  return {
    x: x3,
    y: y4
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x3 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y4 = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x3 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x3,
    y: y4
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x3 = 0;
  let y4 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x3 = visualViewport.offsetLeft;
      y4 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x3,
    y: y4
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x3 = left * scale.x;
  const y4 = top * scale.y;
  return {
    width,
    height,
    x: x3,
    y: y4
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x3 = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y4 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x: x3,
    y: y4,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a5, b4) {
  return a5.x === b4.x && a5.y === b4.y && a5.width === b4.width && a5.height === b4.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e12) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update2, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update2, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update2);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update2) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update2();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update2();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update2();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update2);
      ancestorResize && ancestor.removeEventListener("resize", update2);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var arrow2 = arrow;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/composed-offset-position/dist/composed-offset-position.browser.min.mjs
function e10(t7) {
  return i7(t7);
}
function r7(t7) {
  return t7.assignedSlot ? t7.assignedSlot : t7.parentNode instanceof ShadowRoot ? t7.parentNode.host : t7.parentNode;
}
function i7(e12) {
  for (let t7 = e12; t7; t7 = r7(t7)) if (t7 instanceof Element && "none" === getComputedStyle(t7).display) return null;
  for (let n7 = r7(e12); n7; n7 = r7(n7)) {
    if (!(n7 instanceof Element)) continue;
    const e13 = getComputedStyle(n7);
    if ("contents" !== e13.display) {
      if ("static" !== e13.position || isContainingBlock(e13)) return n7;
      if ("BODY" === n7.tagName) return n7;
    }
  }
  return null;
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5JY5FUCG.js
function isVirtualElement(e12) {
  return e12 !== null && typeof e12 === "object" && "getBoundingClientRect" in e12 && ("contextElement" in e12 ? e12.contextElement instanceof Element : true);
}
var SlPopup = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.active = false;
    this.placement = "top";
    this.strategy = "absolute";
    this.distance = 0;
    this.skidding = 0;
    this.arrow = false;
    this.arrowPlacement = "anchor";
    this.arrowPadding = 10;
    this.flip = false;
    this.flipFallbackPlacements = "";
    this.flipFallbackStrategy = "best-fit";
    this.flipPadding = 0;
    this.shift = false;
    this.shiftPadding = 0;
    this.autoSizePadding = 0;
    this.hoverBridge = false;
    this.updateHoverBridge = () => {
      if (this.hoverBridge && this.anchorEl) {
        const anchorRect = this.anchorEl.getBoundingClientRect();
        const popupRect = this.popup.getBoundingClientRect();
        const isVertical = this.placement.includes("top") || this.placement.includes("bottom");
        let topLeftX = 0;
        let topLeftY = 0;
        let topRightX = 0;
        let topRightY = 0;
        let bottomLeftX = 0;
        let bottomLeftY = 0;
        let bottomRightX = 0;
        let bottomRightY = 0;
        if (isVertical) {
          if (anchorRect.top < popupRect.top) {
            topLeftX = anchorRect.left;
            topLeftY = anchorRect.bottom;
            topRightX = anchorRect.right;
            topRightY = anchorRect.bottom;
            bottomLeftX = popupRect.left;
            bottomLeftY = popupRect.top;
            bottomRightX = popupRect.right;
            bottomRightY = popupRect.top;
          } else {
            topLeftX = popupRect.left;
            topLeftY = popupRect.bottom;
            topRightX = popupRect.right;
            topRightY = popupRect.bottom;
            bottomLeftX = anchorRect.left;
            bottomLeftY = anchorRect.top;
            bottomRightX = anchorRect.right;
            bottomRightY = anchorRect.top;
          }
        } else {
          if (anchorRect.left < popupRect.left) {
            topLeftX = anchorRect.right;
            topLeftY = anchorRect.top;
            topRightX = popupRect.left;
            topRightY = popupRect.top;
            bottomLeftX = anchorRect.right;
            bottomLeftY = anchorRect.bottom;
            bottomRightX = popupRect.left;
            bottomRightY = popupRect.bottom;
          } else {
            topLeftX = popupRect.right;
            topLeftY = popupRect.top;
            topRightX = anchorRect.left;
            topRightY = anchorRect.top;
            bottomLeftX = popupRect.right;
            bottomLeftY = popupRect.bottom;
            bottomRightX = anchorRect.left;
            bottomRightY = anchorRect.bottom;
          }
        }
        this.style.setProperty("--hover-bridge-top-left-x", `${topLeftX}px`);
        this.style.setProperty("--hover-bridge-top-left-y", `${topLeftY}px`);
        this.style.setProperty("--hover-bridge-top-right-x", `${topRightX}px`);
        this.style.setProperty("--hover-bridge-top-right-y", `${topRightY}px`);
        this.style.setProperty("--hover-bridge-bottom-left-x", `${bottomLeftX}px`);
        this.style.setProperty("--hover-bridge-bottom-left-y", `${bottomLeftY}px`);
        this.style.setProperty("--hover-bridge-bottom-right-x", `${bottomRightX}px`);
        this.style.setProperty("--hover-bridge-bottom-right-y", `${bottomRightY}px`);
      }
    };
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.start();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop();
  }
  async updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has("active")) {
      if (this.active) {
        this.start();
      } else {
        this.stop();
      }
    }
    if (changedProps.has("anchor")) {
      this.handleAnchorChange();
    }
    if (this.active) {
      await this.updateComplete;
      this.reposition();
    }
  }
  async handleAnchorChange() {
    await this.stop();
    if (this.anchor && typeof this.anchor === "string") {
      const root = this.getRootNode();
      this.anchorEl = root.getElementById(this.anchor);
    } else if (this.anchor instanceof Element || isVirtualElement(this.anchor)) {
      this.anchorEl = this.anchor;
    } else {
      this.anchorEl = this.querySelector('[slot="anchor"]');
    }
    if (this.anchorEl instanceof HTMLSlotElement) {
      this.anchorEl = this.anchorEl.assignedElements({ flatten: true })[0];
    }
    if (this.anchorEl && this.active) {
      this.start();
    }
  }
  start() {
    if (!this.anchorEl || !this.active) {
      return;
    }
    this.cleanup = autoUpdate(this.anchorEl, this.popup, () => {
      this.reposition();
    });
  }
  async stop() {
    return new Promise((resolve) => {
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = void 0;
        this.removeAttribute("data-current-placement");
        this.style.removeProperty("--auto-size-available-width");
        this.style.removeProperty("--auto-size-available-height");
        requestAnimationFrame(() => resolve());
      } else {
        resolve();
      }
    });
  }
  /** Forces the popup to recalculate and reposition itself. */
  reposition() {
    if (!this.active || !this.anchorEl) {
      return;
    }
    const middleware = [
      // The offset middleware goes first
      offset2({ mainAxis: this.distance, crossAxis: this.skidding })
    ];
    if (this.sync) {
      middleware.push(
        size2({
          apply: ({ rects }) => {
            const syncWidth = this.sync === "width" || this.sync === "both";
            const syncHeight = this.sync === "height" || this.sync === "both";
            this.popup.style.width = syncWidth ? `${rects.reference.width}px` : "";
            this.popup.style.height = syncHeight ? `${rects.reference.height}px` : "";
          }
        })
      );
    } else {
      this.popup.style.width = "";
      this.popup.style.height = "";
    }
    if (this.flip) {
      middleware.push(
        flip2({
          boundary: this.flipBoundary,
          // @ts-expect-error - We're converting a string attribute to an array here
          fallbackPlacements: this.flipFallbackPlacements,
          fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
          padding: this.flipPadding
        })
      );
    }
    if (this.shift) {
      middleware.push(
        shift2({
          boundary: this.shiftBoundary,
          padding: this.shiftPadding
        })
      );
    }
    if (this.autoSize) {
      middleware.push(
        size2({
          boundary: this.autoSizeBoundary,
          padding: this.autoSizePadding,
          apply: ({ availableWidth, availableHeight }) => {
            if (this.autoSize === "vertical" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-height", `${availableHeight}px`);
            } else {
              this.style.removeProperty("--auto-size-available-height");
            }
            if (this.autoSize === "horizontal" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-width", `${availableWidth}px`);
            } else {
              this.style.removeProperty("--auto-size-available-width");
            }
          }
        })
      );
    } else {
      this.style.removeProperty("--auto-size-available-width");
      this.style.removeProperty("--auto-size-available-height");
    }
    if (this.arrow) {
      middleware.push(
        arrow2({
          element: this.arrowEl,
          padding: this.arrowPadding
        })
      );
    }
    const getOffsetParent2 = this.strategy === "absolute" ? (element) => platform.getOffsetParent(element, e10) : platform.getOffsetParent;
    computePosition2(this.anchorEl, this.popup, {
      placement: this.placement,
      middleware,
      strategy: this.strategy,
      platform: __spreadProps(__spreadValues({}, platform), {
        getOffsetParent: getOffsetParent2
      })
    }).then(({ x: x3, y: y4, middlewareData, placement }) => {
      const isRtl = this.localize.dir() === "rtl";
      const staticSide = { top: "bottom", right: "left", bottom: "top", left: "right" }[placement.split("-")[0]];
      this.setAttribute("data-current-placement", placement);
      Object.assign(this.popup.style, {
        left: `${x3}px`,
        top: `${y4}px`
      });
      if (this.arrow) {
        const arrowX = middlewareData.arrow.x;
        const arrowY = middlewareData.arrow.y;
        let top = "";
        let right = "";
        let bottom = "";
        let left = "";
        if (this.arrowPlacement === "start") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          top = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? value : "";
          left = isRtl ? "" : value;
        } else if (this.arrowPlacement === "end") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? "" : value;
          left = isRtl ? value : "";
          bottom = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
        } else if (this.arrowPlacement === "center") {
          left = typeof arrowX === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
          top = typeof arrowY === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
        } else {
          left = typeof arrowX === "number" ? `${arrowX}px` : "";
          top = typeof arrowY === "number" ? `${arrowY}px` : "";
        }
        Object.assign(this.arrowEl.style, {
          top,
          right,
          bottom,
          left,
          [staticSide]: "calc(var(--arrow-size-diagonal) * -1)"
        });
      }
    });
    requestAnimationFrame(() => this.updateHoverBridge());
    this.emit("sl-reposition");
  }
  render() {
    return x`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${e8({
      "popup-hover-bridge": true,
      "popup-hover-bridge--visible": this.hoverBridge && this.active
    })}
      ></span>

      <div
        part="popup"
        class=${e8({
      popup: true,
      "popup--active": this.active,
      "popup--fixed": this.strategy === "fixed",
      "popup--has-arrow": this.arrow
    })}
      >
        <slot></slot>
        ${this.arrow ? x`<div part="arrow" class="popup__arrow" role="presentation"></div>` : ""}
      </div>
    `;
  }
};
SlPopup.styles = [component_styles_default, popup_styles_default];
__decorateClass([
  e6(".popup")
], SlPopup.prototype, "popup", 2);
__decorateClass([
  e6(".popup__arrow")
], SlPopup.prototype, "arrowEl", 2);
__decorateClass([
  n5()
], SlPopup.prototype, "anchor", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlPopup.prototype, "active", 2);
__decorateClass([
  n5({ reflect: true })
], SlPopup.prototype, "placement", 2);
__decorateClass([
  n5({ reflect: true })
], SlPopup.prototype, "strategy", 2);
__decorateClass([
  n5({ type: Number })
], SlPopup.prototype, "distance", 2);
__decorateClass([
  n5({ type: Number })
], SlPopup.prototype, "skidding", 2);
__decorateClass([
  n5({ type: Boolean })
], SlPopup.prototype, "arrow", 2);
__decorateClass([
  n5({ attribute: "arrow-placement" })
], SlPopup.prototype, "arrowPlacement", 2);
__decorateClass([
  n5({ attribute: "arrow-padding", type: Number })
], SlPopup.prototype, "arrowPadding", 2);
__decorateClass([
  n5({ type: Boolean })
], SlPopup.prototype, "flip", 2);
__decorateClass([
  n5({
    attribute: "flip-fallback-placements",
    converter: {
      fromAttribute: (value) => {
        return value.split(" ").map((p4) => p4.trim()).filter((p4) => p4 !== "");
      },
      toAttribute: (value) => {
        return value.join(" ");
      }
    }
  })
], SlPopup.prototype, "flipFallbackPlacements", 2);
__decorateClass([
  n5({ attribute: "flip-fallback-strategy" })
], SlPopup.prototype, "flipFallbackStrategy", 2);
__decorateClass([
  n5({ type: Object })
], SlPopup.prototype, "flipBoundary", 2);
__decorateClass([
  n5({ attribute: "flip-padding", type: Number })
], SlPopup.prototype, "flipPadding", 2);
__decorateClass([
  n5({ type: Boolean })
], SlPopup.prototype, "shift", 2);
__decorateClass([
  n5({ type: Object })
], SlPopup.prototype, "shiftBoundary", 2);
__decorateClass([
  n5({ attribute: "shift-padding", type: Number })
], SlPopup.prototype, "shiftPadding", 2);
__decorateClass([
  n5({ attribute: "auto-size" })
], SlPopup.prototype, "autoSize", 2);
__decorateClass([
  n5()
], SlPopup.prototype, "sync", 2);
__decorateClass([
  n5({ type: Object })
], SlPopup.prototype, "autoSizeBoundary", 2);
__decorateClass([
  n5({ attribute: "auto-size-padding", type: Number })
], SlPopup.prototype, "autoSizePadding", 2);
__decorateClass([
  n5({ attribute: "hover-bridge", type: Boolean })
], SlPopup.prototype, "hoverBridge", 2);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.K7JGTRV7.js
var defaultAnimationRegistry = /* @__PURE__ */ new Map();
var customAnimationRegistry = /* @__PURE__ */ new WeakMap();
function ensureAnimation(animation) {
  return animation != null ? animation : { keyframes: [], options: { duration: 0 } };
}
function getLogicalAnimation(animation, dir) {
  if (dir.toLowerCase() === "rtl") {
    return {
      keyframes: animation.rtlKeyframes || animation.keyframes,
      options: animation.options
    };
  }
  return animation;
}
function setDefaultAnimation(animationName, animation) {
  defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
}
function getAnimation(el, animationName, options) {
  const customAnimation = customAnimationRegistry.get(el);
  if (customAnimation == null ? void 0 : customAnimation[animationName]) {
    return getLogicalAnimation(customAnimation[animationName], options.dir);
  }
  const defaultAnimation = defaultAnimationRegistry.get(animationName);
  if (defaultAnimation) {
    return getLogicalAnimation(defaultAnimation, options.dir);
  }
  return {
    keyframes: [],
    options: { duration: 0 }
  };
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.B4BZKR24.js
function waitForEvent(el, eventName) {
  return new Promise((resolve) => {
    function done(event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done);
        resolve();
      }
    }
    el.addEventListener(eventName, done);
  });
}

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AJ3ENQ5C.js
function animateTo(el, keyframes, options) {
  return new Promise((resolve) => {
    if ((options == null ? void 0 : options.duration) === Infinity) {
      throw new Error("Promise-based animations must be finite.");
    }
    const animation = el.animate(keyframes, __spreadProps(__spreadValues({}, options), {
      duration: prefersReducedMotion() ? 0 : options.duration
    }));
    animation.addEventListener("cancel", resolve, { once: true });
    animation.addEventListener("finish", resolve, { once: true });
  });
}
function prefersReducedMotion() {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  return query.matches;
}
function stopAnimations(el) {
  return Promise.all(
    el.getAnimations().map((animation) => {
      return new Promise((resolve) => {
        animation.cancel();
        requestAnimationFrame(resolve);
      });
    })
  );
}

// node_modules/lit-html/directives/unsafe-html.js
var e11 = class extends i5 {
  constructor(i8) {
    if (super(i8), this.it = E, i8.type !== t5.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r8) {
    if (r8 === E || null == r8) return this._t = void 0, this.it = r8;
    if (r8 === T) return r8;
    if ("string" != typeof r8) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r8 === this.it) return this._t;
    this.it = r8;
    const s5 = [r8];
    return s5.raw = s5, this._t = { _$litType$: this.constructor.resultType, strings: s5, values: [] };
  }
};
e11.directiveName = "unsafeHTML", e11.resultType = 1;
var o9 = e7(e11);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.AILU2HNL.js
var SlSelect = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      assumeInteractionOn: ["sl-blur", "sl-input"]
    });
    this.hasSlotController = new HasSlotController(this, "help-text", "label");
    this.localize = new LocalizeController2(this);
    this.typeToSelectString = "";
    this.hasFocus = false;
    this.displayLabel = "";
    this.selectedOptions = [];
    this.valueHasChanged = false;
    this.name = "";
    this._value = "";
    this.defaultValue = "";
    this.size = "medium";
    this.placeholder = "";
    this.multiple = false;
    this.maxOptionsVisible = 3;
    this.disabled = false;
    this.clearable = false;
    this.open = false;
    this.hoist = false;
    this.filled = false;
    this.pill = false;
    this.label = "";
    this.placement = "bottom";
    this.helpText = "";
    this.form = "";
    this.required = false;
    this.getTag = (option) => {
      return x`
      <sl-tag
        part="tag"
        exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
        ?pill=${this.pill}
        size=${this.size}
        removable
        @sl-remove=${(event) => this.handleTagRemove(event, option)}
      >
        ${option.getTextLabel()}
      </sl-tag>
    `;
    };
    this.handleDocumentFocusIn = (event) => {
      const path = event.composedPath();
      if (this && !path.includes(this)) {
        this.hide();
      }
    };
    this.handleDocumentKeyDown = (event) => {
      const target = event.target;
      const isClearButton = target.closest(".select__clear") !== null;
      const isIconButton = target.closest("sl-icon-button") !== null;
      if (isClearButton || isIconButton) {
        return;
      }
      if (event.key === "Escape" && this.open && !this.closeWatcher) {
        event.preventDefault();
        event.stopPropagation();
        this.hide();
        this.displayInput.focus({ preventScroll: true });
      }
      if (event.key === "Enter" || event.key === " " && this.typeToSelectString === "") {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (!this.open) {
          this.show();
          return;
        }
        if (this.currentOption && !this.currentOption.disabled) {
          this.valueHasChanged = true;
          if (this.multiple) {
            this.toggleOptionSelection(this.currentOption);
          } else {
            this.setSelectedOptions(this.currentOption);
          }
          this.updateComplete.then(() => {
            this.emit("sl-input");
            this.emit("sl-change");
          });
          if (!this.multiple) {
            this.hide();
            this.displayInput.focus({ preventScroll: true });
          }
        }
        return;
      }
      if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
        const allOptions = this.getAllOptions();
        const currentIndex = allOptions.indexOf(this.currentOption);
        let newIndex = Math.max(0, currentIndex);
        event.preventDefault();
        if (!this.open) {
          this.show();
          if (this.currentOption) {
            return;
          }
        }
        if (event.key === "ArrowDown") {
          newIndex = currentIndex + 1;
          if (newIndex > allOptions.length - 1) newIndex = 0;
        } else if (event.key === "ArrowUp") {
          newIndex = currentIndex - 1;
          if (newIndex < 0) newIndex = allOptions.length - 1;
        } else if (event.key === "Home") {
          newIndex = 0;
        } else if (event.key === "End") {
          newIndex = allOptions.length - 1;
        }
        this.setCurrentOption(allOptions[newIndex]);
      }
      if (event.key && event.key.length === 1 || event.key === "Backspace") {
        const allOptions = this.getAllOptions();
        if (event.metaKey || event.ctrlKey || event.altKey) {
          return;
        }
        if (!this.open) {
          if (event.key === "Backspace") {
            return;
          }
          this.show();
        }
        event.stopPropagation();
        event.preventDefault();
        clearTimeout(this.typeToSelectTimeout);
        this.typeToSelectTimeout = window.setTimeout(() => this.typeToSelectString = "", 1e3);
        if (event.key === "Backspace") {
          this.typeToSelectString = this.typeToSelectString.slice(0, -1);
        } else {
          this.typeToSelectString += event.key.toLowerCase();
        }
        for (const option of allOptions) {
          const label = option.getTextLabel().toLowerCase();
          if (label.startsWith(this.typeToSelectString)) {
            this.setCurrentOption(option);
            break;
          }
        }
      }
    };
    this.handleDocumentMouseDown = (event) => {
      const path = event.composedPath();
      if (this && !path.includes(this)) {
        this.hide();
      }
    };
  }
  get value() {
    return this._value;
  }
  set value(val) {
    if (this.multiple) {
      val = Array.isArray(val) ? val : val.split(" ");
    } else {
      val = Array.isArray(val) ? val.join(" ") : val;
    }
    if (this._value === val) {
      return;
    }
    this.valueHasChanged = true;
    this._value = val;
  }
  /** Gets the validity state object */
  get validity() {
    return this.valueInput.validity;
  }
  /** Gets the validation message */
  get validationMessage() {
    return this.valueInput.validationMessage;
  }
  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      this.handleDefaultSlotChange();
    });
    this.open = false;
  }
  addOpenListeners() {
    var _a3;
    document.addEventListener("focusin", this.handleDocumentFocusIn);
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    document.addEventListener("mousedown", this.handleDocumentMouseDown);
    if (this.getRootNode() !== document) {
      this.getRootNode().addEventListener("focusin", this.handleDocumentFocusIn);
    }
    if ("CloseWatcher" in window) {
      (_a3 = this.closeWatcher) == null ? void 0 : _a3.destroy();
      this.closeWatcher = new CloseWatcher();
      this.closeWatcher.onclose = () => {
        if (this.open) {
          this.hide();
          this.displayInput.focus({ preventScroll: true });
        }
      };
    }
  }
  removeOpenListeners() {
    var _a3;
    document.removeEventListener("focusin", this.handleDocumentFocusIn);
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    document.removeEventListener("mousedown", this.handleDocumentMouseDown);
    if (this.getRootNode() !== document) {
      this.getRootNode().removeEventListener("focusin", this.handleDocumentFocusIn);
    }
    (_a3 = this.closeWatcher) == null ? void 0 : _a3.destroy();
  }
  handleFocus() {
    this.hasFocus = true;
    this.displayInput.setSelectionRange(0, 0);
    this.emit("sl-focus");
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleLabelClick() {
    this.displayInput.focus();
  }
  handleComboboxMouseDown(event) {
    const path = event.composedPath();
    const isIconButton = path.some((el) => el instanceof Element && el.tagName.toLowerCase() === "sl-icon-button");
    if (this.disabled || isIconButton) {
      return;
    }
    event.preventDefault();
    this.displayInput.focus({ preventScroll: true });
    this.open = !this.open;
  }
  handleComboboxKeyDown(event) {
    if (event.key === "Tab") {
      return;
    }
    event.stopPropagation();
    this.handleDocumentKeyDown(event);
  }
  handleClearClick(event) {
    event.stopPropagation();
    this.valueHasChanged = true;
    if (this.value !== "") {
      this.setSelectedOptions([]);
      this.displayInput.focus({ preventScroll: true });
      this.updateComplete.then(() => {
        this.emit("sl-clear");
        this.emit("sl-input");
        this.emit("sl-change");
      });
    }
  }
  handleClearMouseDown(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  handleOptionClick(event) {
    const target = event.target;
    const option = target.closest("sl-option");
    const oldValue = this.value;
    if (option && !option.disabled) {
      this.valueHasChanged = true;
      if (this.multiple) {
        this.toggleOptionSelection(option);
      } else {
        this.setSelectedOptions(option);
      }
      this.updateComplete.then(() => this.displayInput.focus({ preventScroll: true }));
      if (this.value !== oldValue) {
        this.updateComplete.then(() => {
          this.emit("sl-input");
          this.emit("sl-change");
        });
      }
      if (!this.multiple) {
        this.hide();
        this.displayInput.focus({ preventScroll: true });
      }
    }
  }
  /* @internal - used by options to update labels */
  handleDefaultSlotChange() {
    if (!customElements.get("sl-option")) {
      customElements.whenDefined("sl-option").then(() => this.handleDefaultSlotChange());
    }
    const allOptions = this.getAllOptions();
    const val = this.valueHasChanged ? this.value : this.defaultValue;
    const value = Array.isArray(val) ? val : [val];
    const values = [];
    allOptions.forEach((option) => values.push(option.value));
    this.setSelectedOptions(allOptions.filter((el) => value.includes(el.value)));
  }
  handleTagRemove(event, option) {
    event.stopPropagation();
    this.valueHasChanged = true;
    if (!this.disabled) {
      this.toggleOptionSelection(option, false);
      this.updateComplete.then(() => {
        this.emit("sl-input");
        this.emit("sl-change");
      });
    }
  }
  // Gets an array of all <sl-option> elements
  getAllOptions() {
    return [...this.querySelectorAll("sl-option")];
  }
  // Gets the first <sl-option> element
  getFirstOption() {
    return this.querySelector("sl-option");
  }
  // Sets the current option, which is the option the user is currently interacting with (e.g. via keyboard). Only one
  // option may be "current" at a time.
  setCurrentOption(option) {
    const allOptions = this.getAllOptions();
    allOptions.forEach((el) => {
      el.current = false;
      el.tabIndex = -1;
    });
    if (option) {
      this.currentOption = option;
      option.current = true;
      option.tabIndex = 0;
      option.focus();
    }
  }
  // Sets the selected option(s)
  setSelectedOptions(option) {
    const allOptions = this.getAllOptions();
    const newSelectedOptions = Array.isArray(option) ? option : [option];
    allOptions.forEach((el) => el.selected = false);
    if (newSelectedOptions.length) {
      newSelectedOptions.forEach((el) => el.selected = true);
    }
    this.selectionChanged();
  }
  // Toggles an option's selected state
  toggleOptionSelection(option, force) {
    if (force === true || force === false) {
      option.selected = force;
    } else {
      option.selected = !option.selected;
    }
    this.selectionChanged();
  }
  // This method must be called whenever the selection changes. It will update the selected options cache, the current
  // value, and the display value
  selectionChanged() {
    var _a3, _b, _c;
    const options = this.getAllOptions();
    this.selectedOptions = options.filter((el) => el.selected);
    const cachedValueHasChanged = this.valueHasChanged;
    if (this.multiple) {
      this.value = this.selectedOptions.map((el) => el.value);
      if (this.placeholder && this.value.length === 0) {
        this.displayLabel = "";
      } else {
        this.displayLabel = this.localize.term("numOptionsSelected", this.selectedOptions.length);
      }
    } else {
      const selectedOption = this.selectedOptions[0];
      this.value = (_a3 = selectedOption == null ? void 0 : selectedOption.value) != null ? _a3 : "";
      this.displayLabel = (_c = (_b = selectedOption == null ? void 0 : selectedOption.getTextLabel) == null ? void 0 : _b.call(selectedOption)) != null ? _c : "";
    }
    this.valueHasChanged = cachedValueHasChanged;
    this.updateComplete.then(() => {
      this.formControlController.updateValidity();
    });
  }
  get tags() {
    return this.selectedOptions.map((option, index) => {
      if (index < this.maxOptionsVisible || this.maxOptionsVisible <= 0) {
        const tag = this.getTag(option, index);
        return x`<div @sl-remove=${(e12) => this.handleTagRemove(e12, option)}>
          ${typeof tag === "string" ? o9(tag) : tag}
        </div>`;
      } else if (index === this.maxOptionsVisible) {
        return x`<sl-tag size=${this.size}>+${this.selectedOptions.length - index}</sl-tag>`;
      }
      return x``;
    });
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  handleDisabledChange() {
    if (this.disabled) {
      this.open = false;
      this.handleOpenChange();
    }
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === "value") {
      const cachedValueHasChanged = this.valueHasChanged;
      this.value = this.defaultValue;
      this.valueHasChanged = cachedValueHasChanged;
    }
  }
  handleValueChange() {
    if (!this.valueHasChanged) {
      const cachedValueHasChanged = this.valueHasChanged;
      this.value = this.defaultValue;
      this.valueHasChanged = cachedValueHasChanged;
    }
    const allOptions = this.getAllOptions();
    const value = Array.isArray(this.value) ? this.value : [this.value];
    this.setSelectedOptions(allOptions.filter((el) => value.includes(el.value)));
  }
  async handleOpenChange() {
    if (this.open && !this.disabled) {
      this.setCurrentOption(this.selectedOptions[0] || this.getFirstOption());
      this.emit("sl-show");
      this.addOpenListeners();
      await stopAnimations(this);
      this.listbox.hidden = false;
      this.popup.active = true;
      requestAnimationFrame(() => {
        this.setCurrentOption(this.currentOption);
      });
      const { keyframes, options } = getAnimation(this, "select.show", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      if (this.currentOption) {
        scrollIntoView(this.currentOption, this.listbox, "vertical", "auto");
      }
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      this.removeOpenListeners();
      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, "select.hide", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.listbox.hidden = true;
      this.popup.active = false;
      this.emit("sl-after-hide");
    }
  }
  /** Shows the listbox. */
  async show() {
    if (this.open || this.disabled) {
      this.open = false;
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  /** Hides the listbox. */
  async hide() {
    if (!this.open || this.disabled) {
      this.open = false;
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.valueInput.checkValidity();
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.valueInput.reportValidity();
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    this.valueInput.setCustomValidity(message);
    this.formControlController.updateValidity();
  }
  /** Sets focus on the control. */
  focus(options) {
    this.displayInput.focus(options);
  }
  /** Removes focus from the control. */
  blur() {
    this.displayInput.blur();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && this.value.length > 0;
    const isPlaceholderVisible = this.placeholder && this.value && this.value.length <= 0;
    return x`
      <div
        part="form-control"
        class=${e8({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${hasLabel ? "false" : "true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <sl-popup
            class=${e8({
      select: true,
      "select--standard": true,
      "select--filled": this.filled,
      "select--pill": this.pill,
      "select--open": this.open,
      "select--disabled": this.disabled,
      "select--multiple": this.multiple,
      "select--focused": this.hasFocus,
      "select--placeholder-visible": isPlaceholderVisible,
      "select--top": this.placement === "top",
      "select--bottom": this.placement === "bottom",
      "select--small": this.size === "small",
      "select--medium": this.size === "medium",
      "select--large": this.size === "large"
    })}
            placement=${this.placement}
            strategy=${this.hoist ? "fixed" : "absolute"}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="select__combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="select__prefix"></slot>

              <input
                part="display-input"
                class="select__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-controls="listbox"
                aria-expanded=${this.open ? "true" : "false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled ? "true" : "false"}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}
              />

              ${this.multiple ? x`<div part="tags" class="select__tags">${this.tags}</div>` : ""}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value) ? this.value.join(", ") : this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${() => this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${hasClearIcon ? x`
                    <button
                      part="clear-button"
                      class="select__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  ` : ""}

              <slot name="suffix" part="suffix" class="select__suffix"></slot>

              <slot name="expand-icon" part="expand-icon" class="select__expand-icon">
                <sl-icon library="system" name="chevron-down"></sl-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open ? "true" : "false"}
              aria-multiselectable=${this.multiple ? "true" : "false"}
              aria-labelledby="label"
              part="listbox"
              class="select__listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
              @slotchange=${this.handleDefaultSlotChange}
            >
              <slot></slot>
            </div>
          </sl-popup>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
};
SlSelect.styles = [component_styles_default, form_control_styles_default, select_styles_default];
SlSelect.dependencies = {
  "sl-icon": SlIcon,
  "sl-popup": SlPopup,
  "sl-tag": SlTag
};
__decorateClass([
  e6(".select")
], SlSelect.prototype, "popup", 2);
__decorateClass([
  e6(".select__combobox")
], SlSelect.prototype, "combobox", 2);
__decorateClass([
  e6(".select__display-input")
], SlSelect.prototype, "displayInput", 2);
__decorateClass([
  e6(".select__value-input")
], SlSelect.prototype, "valueInput", 2);
__decorateClass([
  e6(".select__listbox")
], SlSelect.prototype, "listbox", 2);
__decorateClass([
  r6()
], SlSelect.prototype, "hasFocus", 2);
__decorateClass([
  r6()
], SlSelect.prototype, "displayLabel", 2);
__decorateClass([
  r6()
], SlSelect.prototype, "currentOption", 2);
__decorateClass([
  r6()
], SlSelect.prototype, "selectedOptions", 2);
__decorateClass([
  r6()
], SlSelect.prototype, "valueHasChanged", 2);
__decorateClass([
  n5()
], SlSelect.prototype, "name", 2);
__decorateClass([
  r6()
], SlSelect.prototype, "value", 1);
__decorateClass([
  n5({ attribute: "value" })
], SlSelect.prototype, "defaultValue", 2);
__decorateClass([
  n5({ reflect: true })
], SlSelect.prototype, "size", 2);
__decorateClass([
  n5()
], SlSelect.prototype, "placeholder", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlSelect.prototype, "multiple", 2);
__decorateClass([
  n5({ attribute: "max-options-visible", type: Number })
], SlSelect.prototype, "maxOptionsVisible", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlSelect.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Boolean })
], SlSelect.prototype, "clearable", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlSelect.prototype, "open", 2);
__decorateClass([
  n5({ type: Boolean })
], SlSelect.prototype, "hoist", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlSelect.prototype, "filled", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlSelect.prototype, "pill", 2);
__decorateClass([
  n5()
], SlSelect.prototype, "label", 2);
__decorateClass([
  n5({ reflect: true })
], SlSelect.prototype, "placement", 2);
__decorateClass([
  n5({ attribute: "help-text" })
], SlSelect.prototype, "helpText", 2);
__decorateClass([
  n5({ reflect: true })
], SlSelect.prototype, "form", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlSelect.prototype, "required", 2);
__decorateClass([
  n5()
], SlSelect.prototype, "getTag", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlSelect.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch(["defaultValue", "value"], { waitUntilFirstUpdate: true })
], SlSelect.prototype, "handleValueChange", 1);
__decorateClass([
  watch("open", { waitUntilFirstUpdate: true })
], SlSelect.prototype, "handleOpenChange", 1);
setDefaultAnimation("select.show", {
  keyframes: [
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 100, easing: "ease" }
});
setDefaultAnimation("select.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.9 }
  ],
  options: { duration: 100, easing: "ease" }
});

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.FXXKMG2P.js
var option_styles_default = i`
  :host {
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }

  :host(:focus) {
    outline: none;
  }

  .option {
    position: relative;
    display: flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-x-small) var(--sl-spacing-medium) var(--sl-spacing-x-small) var(--sl-spacing-x-small);
    transition: var(--sl-transition-fast) fill;
    cursor: pointer;
  }

  .option--hover:not(.option--current):not(.option--disabled) {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  .option--current,
  .option--current.option--disabled {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .option--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .option__label {
    flex: 1 1 auto;
    display: inline-block;
    line-height: var(--sl-line-height-dense);
  }

  .option .option__check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    padding-inline-end: var(--sl-spacing-2x-small);
  }

  .option--selected .option__check {
    visibility: visible;
  }

  .option__prefix,
  .option__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .option__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .option__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .option {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.BBCWSAUE.js
var SlOption = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.isInitialized = false;
    this.current = false;
    this.selected = false;
    this.hasHover = false;
    this.value = "";
    this.disabled = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "option");
    this.setAttribute("aria-selected", "false");
  }
  handleDefaultSlotChange() {
    if (this.isInitialized) {
      customElements.whenDefined("sl-select").then(() => {
        const controller = this.closest("sl-select");
        if (controller) {
          controller.handleDefaultSlotChange();
        }
      });
    } else {
      this.isInitialized = true;
    }
  }
  handleMouseEnter() {
    this.hasHover = true;
  }
  handleMouseLeave() {
    this.hasHover = false;
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleSelectedChange() {
    this.setAttribute("aria-selected", this.selected ? "true" : "false");
  }
  handleValueChange() {
    if (typeof this.value !== "string") {
      this.value = String(this.value);
    }
    if (this.value.includes(" ")) {
      console.error(`Option values cannot include a space. All spaces have been replaced with underscores.`, this);
      this.value = this.value.replace(/ /g, "_");
    }
  }
  /** Returns a plain text label based on the option's content. */
  getTextLabel() {
    const nodes = this.childNodes;
    let label = "";
    [...nodes].forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (!node.hasAttribute("slot")) {
          label += node.textContent;
        }
      }
      if (node.nodeType === Node.TEXT_NODE) {
        label += node.textContent;
      }
    });
    return label.trim();
  }
  render() {
    return x`
      <div
        part="base"
        class=${e8({
      option: true,
      "option--current": this.current,
      "option--disabled": this.disabled,
      "option--selected": this.selected,
      "option--hover": this.hasHover
    })}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <sl-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></sl-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `;
  }
};
SlOption.styles = [component_styles_default, option_styles_default];
SlOption.dependencies = { "sl-icon": SlIcon };
__decorateClass([
  e6(".option__label")
], SlOption.prototype, "defaultSlot", 2);
__decorateClass([
  r6()
], SlOption.prototype, "current", 2);
__decorateClass([
  r6()
], SlOption.prototype, "selected", 2);
__decorateClass([
  r6()
], SlOption.prototype, "hasHover", 2);
__decorateClass([
  n5({ reflect: true })
], SlOption.prototype, "value", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlOption.prototype, "disabled", 2);
__decorateClass([
  watch("disabled")
], SlOption.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("selected")
], SlOption.prototype, "handleSelectedChange", 1);
__decorateClass([
  watch("value")
], SlOption.prototype, "handleValueChange", 1);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.R3NF57O3.js
var checkbox_styles_default = i`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.XSFJLY2D.js
var SlCheckbox = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      value: (control) => control.checked ? control.value || "on" : void 0,
      defaultValue: (control) => control.defaultChecked,
      setValue: (control, checked) => control.checked = checked
    });
    this.hasSlotController = new HasSlotController(this, "help-text");
    this.hasFocus = false;
    this.title = "";
    this.name = "";
    this.size = "medium";
    this.disabled = false;
    this.checked = false;
    this.indeterminate = false;
    this.defaultChecked = false;
    this.form = "";
    this.required = false;
    this.helpText = "";
  }
  /** Gets the validity state object */
  get validity() {
    return this.input.validity;
  }
  /** Gets the validation message */
  get validationMessage() {
    return this.input.validationMessage;
  }
  firstUpdated() {
    this.formControlController.updateValidity();
  }
  handleClick() {
    this.checked = !this.checked;
    this.indeterminate = false;
    this.emit("sl-change");
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleInput() {
    this.emit("sl-input");
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleDisabledChange() {
    this.formControlController.setValidity(this.disabled);
  }
  handleStateChange() {
    this.input.checked = this.checked;
    this.input.indeterminate = this.indeterminate;
    this.formControlController.updateValidity();
  }
  /** Simulates a click on the checkbox. */
  click() {
    this.input.click();
  }
  /** Sets focus on the checkbox. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the checkbox. */
  blur() {
    this.input.blur();
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.input.checkValidity();
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }
  /**
   * Sets a custom validation message. The value provided will be shown to the user when the form is submitted. To clear
   * the custom validation message, call this method with an empty string.
   */
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }
  render() {
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    return x`
      <div
        class=${e8({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          part="base"
          class=${e8({
      checkbox: true,
      "checkbox--checked": this.checked,
      "checkbox--disabled": this.disabled,
      "checkbox--focused": this.hasFocus,
      "checkbox--indeterminate": this.indeterminate,
      "checkbox--small": this.size === "small",
      "checkbox--medium": this.size === "medium",
      "checkbox--large": this.size === "large"
    })}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${o7(this.value)}
            .indeterminate=${l4(this.indeterminate)}
            .checked=${l4(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked ? "true" : "false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked ? " control--checked" : ""}${this.indeterminate ? " control--indeterminate" : ""}"
            class="checkbox__control"
          >
            ${this.checked ? x`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                ` : ""}
            ${!this.checked && this.indeterminate ? x`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                ` : ""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${hasHelpText ? "false" : "true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
};
SlCheckbox.styles = [component_styles_default, form_control_styles_default, checkbox_styles_default];
SlCheckbox.dependencies = { "sl-icon": SlIcon };
__decorateClass([
  e6('input[type="checkbox"]')
], SlCheckbox.prototype, "input", 2);
__decorateClass([
  r6()
], SlCheckbox.prototype, "hasFocus", 2);
__decorateClass([
  n5()
], SlCheckbox.prototype, "title", 2);
__decorateClass([
  n5()
], SlCheckbox.prototype, "name", 2);
__decorateClass([
  n5()
], SlCheckbox.prototype, "value", 2);
__decorateClass([
  n5({ reflect: true })
], SlCheckbox.prototype, "size", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "disabled", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "checked", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "indeterminate", 2);
__decorateClass([
  defaultValue("checked")
], SlCheckbox.prototype, "defaultChecked", 2);
__decorateClass([
  n5({ reflect: true })
], SlCheckbox.prototype, "form", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlCheckbox.prototype, "required", 2);
__decorateClass([
  n5({ attribute: "help-text" })
], SlCheckbox.prototype, "helpText", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlCheckbox.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch(["checked", "indeterminate"], { waitUntilFirstUpdate: true })
], SlCheckbox.prototype, "handleStateChange", 1);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.GGT72J62.js
var input_styles_default = i`
  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition:
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) border,
      var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: inherit;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix ::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.VM65NPGC.js
var SlInput = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      assumeInteractionOn: ["sl-blur", "sl-input"]
    });
    this.hasSlotController = new HasSlotController(this, "help-text", "label");
    this.localize = new LocalizeController2(this);
    this.hasFocus = false;
    this.title = "";
    this.__numberInput = Object.assign(document.createElement("input"), { type: "number" });
    this.__dateInput = Object.assign(document.createElement("input"), { type: "date" });
    this.type = "text";
    this.name = "";
    this.value = "";
    this.defaultValue = "";
    this.size = "medium";
    this.filled = false;
    this.pill = false;
    this.label = "";
    this.helpText = "";
    this.clearable = false;
    this.disabled = false;
    this.placeholder = "";
    this.readonly = false;
    this.passwordToggle = false;
    this.passwordVisible = false;
    this.noSpinButtons = false;
    this.form = "";
    this.required = false;
    this.spellcheck = true;
  }
  //
  // NOTE: We use an in-memory input for these getters/setters instead of the one in the template because the properties
  // can be set before the component is rendered.
  //
  /**
   * Gets or sets the current value as a `Date` object. Returns `null` if the value can't be converted. This will use the native `<input type="{{type}}">` implementation and may result in an error.
   */
  get valueAsDate() {
    var _a3;
    this.__dateInput.type = this.type;
    this.__dateInput.value = this.value;
    return ((_a3 = this.input) == null ? void 0 : _a3.valueAsDate) || this.__dateInput.valueAsDate;
  }
  set valueAsDate(newValue) {
    this.__dateInput.type = this.type;
    this.__dateInput.valueAsDate = newValue;
    this.value = this.__dateInput.value;
  }
  /** Gets or sets the current value as a number. Returns `NaN` if the value can't be converted. */
  get valueAsNumber() {
    var _a3;
    this.__numberInput.value = this.value;
    return ((_a3 = this.input) == null ? void 0 : _a3.valueAsNumber) || this.__numberInput.valueAsNumber;
  }
  set valueAsNumber(newValue) {
    this.__numberInput.valueAsNumber = newValue;
    this.value = this.__numberInput.value;
  }
  /** Gets the validity state object */
  get validity() {
    return this.input.validity;
  }
  /** Gets the validation message */
  get validationMessage() {
    return this.input.validationMessage;
  }
  firstUpdated() {
    this.formControlController.updateValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleChange() {
    this.value = this.input.value;
    this.emit("sl-change");
  }
  handleClearClick(event) {
    event.preventDefault();
    if (this.value !== "") {
      this.value = "";
      this.emit("sl-clear");
      this.emit("sl-input");
      this.emit("sl-change");
    }
    this.input.focus();
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleInput() {
    this.value = this.input.value;
    this.formControlController.updateValidity();
    this.emit("sl-input");
  }
  handleInvalid(event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }
  handleKeyDown(event) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      setTimeout(() => {
        if (!event.defaultPrevented && !event.isComposing) {
          this.formControlController.submit();
        }
      });
    }
  }
  handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }
  handleDisabledChange() {
    this.formControlController.setValidity(this.disabled);
  }
  handleStepChange() {
    this.input.step = String(this.step);
    this.formControlController.updateValidity();
  }
  async handleValueChange() {
    await this.updateComplete;
    this.formControlController.updateValidity();
  }
  /** Sets focus on the input. */
  focus(options) {
    this.input.focus(options);
  }
  /** Removes focus from the input. */
  blur() {
    this.input.blur();
  }
  /** Selects all the text in the input. */
  select() {
    this.input.select();
  }
  /** Sets the start and end positions of the text selection (0-based). */
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  /** Replaces a range of text with a new string. */
  setRangeText(replacement, start, end, selectMode = "preserve") {
    const selectionStart = start != null ? start : this.input.selectionStart;
    const selectionEnd = end != null ? end : this.input.selectionEnd;
    this.input.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
  showPicker() {
    if ("showPicker" in HTMLInputElement.prototype) {
      this.input.showPicker();
    }
  }
  /** Increments the value of a numeric input type by the value of the step attribute. */
  stepUp() {
    this.input.stepUp();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Decrements the value of a numeric input type by the value of the step attribute. */
  stepDown() {
    this.input.stepDown();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.input.checkValidity();
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.formControlController.updateValidity();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && !this.readonly;
    const isClearIconVisible = hasClearIcon && (typeof this.value === "number" || this.value.length > 0);
    return x`
      <div
        part="form-control"
        class=${e8({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${e8({
      input: true,
      // Sizes
      "input--small": this.size === "small",
      "input--medium": this.size === "medium",
      "input--large": this.size === "large",
      // States
      "input--pill": this.pill,
      "input--standard": !this.filled,
      "input--filled": this.filled,
      "input--disabled": this.disabled,
      "input--focused": this.hasFocus,
      "input--empty": !this.value,
      "input--no-spin-buttons": this.noSpinButtons
    })}
          >
            <span part="prefix" class="input__prefix">
              <slot name="prefix"></slot>
            </span>

            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
              title=${this.title}
              name=${o7(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${o7(this.placeholder)}
              minlength=${o7(this.minlength)}
              maxlength=${o7(this.maxlength)}
              min=${o7(this.min)}
              max=${o7(this.max)}
              step=${o7(this.step)}
              .value=${l4(this.value)}
              autocapitalize=${o7(this.autocapitalize)}
              autocomplete=${o7(this.autocomplete)}
              autocorrect=${o7(this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${o7(this.pattern)}
              enterkeyhint=${o7(this.enterkeyhint)}
              inputmode=${o7(this.inputmode)}
              aria-describedby="help-text"
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${isClearIconVisible ? x`
                  <button
                    part="clear-button"
                    class="input__clear"
                    type="button"
                    aria-label=${this.localize.term("clearEntry")}
                    @click=${this.handleClearClick}
                    tabindex="-1"
                  >
                    <slot name="clear-icon">
                      <sl-icon name="x-circle-fill" library="system"></sl-icon>
                    </slot>
                  </button>
                ` : ""}
            ${this.passwordToggle && !this.disabled ? x`
                  <button
                    part="password-toggle-button"
                    class="input__password-toggle"
                    type="button"
                    aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                    @click=${this.handlePasswordToggle}
                    tabindex="-1"
                  >
                    ${this.passwordVisible ? x`
                          <slot name="show-password-icon">
                            <sl-icon name="eye-slash" library="system"></sl-icon>
                          </slot>
                        ` : x`
                          <slot name="hide-password-icon">
                            <sl-icon name="eye" library="system"></sl-icon>
                          </slot>
                        `}
                  </button>
                ` : ""}

            <span part="suffix" class="input__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        </div>

        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
};
SlInput.styles = [component_styles_default, form_control_styles_default, input_styles_default];
SlInput.dependencies = { "sl-icon": SlIcon };
__decorateClass([
  e6(".input__control")
], SlInput.prototype, "input", 2);
__decorateClass([
  r6()
], SlInput.prototype, "hasFocus", 2);
__decorateClass([
  n5()
], SlInput.prototype, "title", 2);
__decorateClass([
  n5({ reflect: true })
], SlInput.prototype, "type", 2);
__decorateClass([
  n5()
], SlInput.prototype, "name", 2);
__decorateClass([
  n5()
], SlInput.prototype, "value", 2);
__decorateClass([
  defaultValue()
], SlInput.prototype, "defaultValue", 2);
__decorateClass([
  n5({ reflect: true })
], SlInput.prototype, "size", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlInput.prototype, "filled", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlInput.prototype, "pill", 2);
__decorateClass([
  n5()
], SlInput.prototype, "label", 2);
__decorateClass([
  n5({ attribute: "help-text" })
], SlInput.prototype, "helpText", 2);
__decorateClass([
  n5({ type: Boolean })
], SlInput.prototype, "clearable", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlInput.prototype, "disabled", 2);
__decorateClass([
  n5()
], SlInput.prototype, "placeholder", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlInput.prototype, "readonly", 2);
__decorateClass([
  n5({ attribute: "password-toggle", type: Boolean })
], SlInput.prototype, "passwordToggle", 2);
__decorateClass([
  n5({ attribute: "password-visible", type: Boolean })
], SlInput.prototype, "passwordVisible", 2);
__decorateClass([
  n5({ attribute: "no-spin-buttons", type: Boolean })
], SlInput.prototype, "noSpinButtons", 2);
__decorateClass([
  n5({ reflect: true })
], SlInput.prototype, "form", 2);
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlInput.prototype, "required", 2);
__decorateClass([
  n5()
], SlInput.prototype, "pattern", 2);
__decorateClass([
  n5({ type: Number })
], SlInput.prototype, "minlength", 2);
__decorateClass([
  n5({ type: Number })
], SlInput.prototype, "maxlength", 2);
__decorateClass([
  n5()
], SlInput.prototype, "min", 2);
__decorateClass([
  n5()
], SlInput.prototype, "max", 2);
__decorateClass([
  n5()
], SlInput.prototype, "step", 2);
__decorateClass([
  n5()
], SlInput.prototype, "autocapitalize", 2);
__decorateClass([
  n5()
], SlInput.prototype, "autocorrect", 2);
__decorateClass([
  n5()
], SlInput.prototype, "autocomplete", 2);
__decorateClass([
  n5({ type: Boolean })
], SlInput.prototype, "autofocus", 2);
__decorateClass([
  n5()
], SlInput.prototype, "enterkeyhint", 2);
__decorateClass([
  n5({
    type: Boolean,
    converter: {
      // Allow "true|false" attribute values but keep the property boolean
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], SlInput.prototype, "spellcheck", 2);
__decorateClass([
  n5()
], SlInput.prototype, "inputmode", 2);
__decorateClass([
  watch("disabled", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("step", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleStepChange", 1);
__decorateClass([
  watch("value", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleValueChange", 1);

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.SUSCR7CI.js
var divider_styles_default = i`
  :host {
    --color: var(--sl-panel-border-color);
    --width: var(--sl-panel-border-width);
    --spacing: var(--sl-spacing-medium);
  }

  :host(:not([vertical])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([vertical]) {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`;

// node_modules/@shoelace-style/shoelace/dist/chunks/chunk.5ZSXZIE6.js
var SlDivider = class extends ShoelaceElement {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "separator");
  }
  handleVerticalChange() {
    this.setAttribute("aria-orientation", this.vertical ? "vertical" : "horizontal");
  }
};
SlDivider.styles = [component_styles_default, divider_styles_default];
__decorateClass([
  n5({ type: Boolean, reflect: true })
], SlDivider.prototype, "vertical", 2);
__decorateClass([
  watch("vertical")
], SlDivider.prototype, "handleVerticalChange", 1);

// widgets/hash-style.ts
var style = i`

  #container{
      position: relative;
      height: 50vh;
      border-width: 2px;
    border-style: solid;
    border-radius: 5px;
    border-color: #6a6a6a;
  }
  #context,
  #draggable {
      position: absolute;
      border: 5px solid #fff;
      outline: 10px solid #fff; 
      border-radius: 10px;
      padding: 5px;
      box-shadow: 10px 10px 25px 10px #00466666;
      background-color: #fff;
    }
  #context{
    display: none;
    flex-direction: column;
    outline: 4px solid #fff;
    box-shadow: 8px 8px 20px 2px #00466666;
  }
  #context *,
  #draggable * {
    padding: 2px
  }
  
  #header {
    font-size: 12pt;
    width: 100%;
  }

  #hashSelect {
    width: 200px
  }

  #saltCheck {
    font-size: 1.5rem;
    margin-top: -5px; 
  }
  
  #flexDiv {
    display: flex;
    flex-direction: row;
  }
  
  #flexDiv2 {
    display: none;
    flex-direction: row;
  }

  #saltText {
    width: 200px;
  }

  sl-divider {
    margin-block: 0
  }
`;

// widgets/material-symbols--text-compare-rounded.svg
var material_symbols_text_compare_rounded_default = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 22v-1H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h5V2q0-.425.288-.712T11 1t.713.288T12 2v20q0 .425-.288.713T11 23t-.712-.288T10 22m5-1q-.425 0-.712-.288T14 20t.288-.712T15 19h4V5h-4q-.425 0-.712-.288T14 4t.288-.712T15 3h4q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-8q-.425 0-.712-.288T14 12t.288-.712T15 11h1q.425 0 .713.288T17 12t-.288.713T16 13zm0-4q-.425 0-.712-.288T14 8t.288-.712T15 7h1q.425 0 .713.288T17 8t-.288.713T16 9zm-7 8h1q.425 0 .713-.288T10 16t-.288-.712T9 15H8q-.425 0-.712.288T7 16t.288.713T8 17m0-4h1q.425 0 .713-.288T10 12t-.288-.712T9 11H8q-.425 0-.712.288T7 12t.288.713T8 13m0-4h1q.425 0 .713-.288T10 8t-.288-.712T9 7H8q-.425 0-.712.288T7 8t.288.713T8 9"/></svg>';

// widgets/material-symbols--code-blocks-outline-rounded.svg
var material_symbols_code_blocks_outline_rounded_default = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m8.825 12l1.475-1.475q.3-.3.3-.7t-.3-.7t-.712-.3t-.713.3L6.7 11.3q-.15.15-.213.325T6.425 12t.062.375t.213.325l2.175 2.175q.3.3.713.3t.712-.3t.3-.7t-.3-.7zm6.35 0L13.7 13.475q-.3.3-.3.7t.3.7t.713.3t.712-.3L17.3 12.7q.15-.15.213-.325t.062-.375t-.062-.375t-.213-.325l-2.175-2.175q-.15-.15-.337-.225t-.376-.075t-.375.075t-.337.225q-.3.3-.3.7t.3.7zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z"/></svg>';

// widgets/f7--text-append.svg
var f7_text_append_default = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><path fill="currentColor" d="M6.168 11.36h43.64c1.008 0 1.805-.774 1.805-1.782c0-.984-.797-1.758-1.804-1.758H6.168c-1.008 0-1.781.774-1.781 1.758a1.75 1.75 0 0 0 1.78 1.781m0 12.28h43.64c1.008 0 1.805-.773 1.805-1.78c0-.985-.797-1.758-1.804-1.758H6.168c-1.008 0-1.781.773-1.781 1.757c0 1.008.773 1.782 1.78 1.782M10.058 43h6.891v2.438c0 1.921 1.828 2.624 3.281 1.453l6.352-5.086c.96-.774.96-2.11 0-2.86l-6.352-5.062c-1.406-1.149-3.28-.422-3.28 1.406v2.344h-6.376c-.562 0-.797-.305-.797-.797v-4.5c0-1.898-.984-3.07-2.695-3.07s-2.695 1.172-2.695 3.07v5.32c0 3.305 2.367 5.344 5.672 5.344m23.743-7.078H49.81a1.786 1.786 0 0 0 1.804-1.781c0-.985-.797-1.758-1.804-1.758H33.8c-1.008 0-1.782.773-1.782 1.758c0 .984.774 1.78 1.782 1.78m0 12.258h16.008c1.008 0 1.804-.774 1.804-1.758s-.797-1.781-1.804-1.781H33.8a1.766 1.766 0 0 0-1.782 1.78c0 .985.774 1.759 1.782 1.759"/></svg>';

// widgets/mdi--trash-outline.svg
var mdi_trash_outline_default = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>';

// widgets/mingcute--link-line.svg
var mingcute_link_line_default = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M10.232 10.231a5 5 0 0 1 6.89-.172l.181.172l2.828 2.829a5 5 0 0 1-6.89 7.243l-.18-.172l-2.122-2.122a1 1 0 0 1 1.32-1.497l.094.083l2.122 2.122a3 3 0 0 0 4.377-4.1l-.135-.143l-2.828-2.828a3 3 0 0 0-4.243 0a1 1 0 0 1-1.414-1.415M3.868 3.867a5 5 0 0 1 6.89-.172l.181.172L13.06 5.99a1 1 0 0 1-1.32 1.497l-.094-.083l-2.121-2.121A3 3 0 0 0 5.147 9.38l.135.144l2.829 2.829a3 3 0 0 0 4.242 0a1 1 0 1 1 1.415 1.414a5 5 0 0 1-6.89.172l-.182-.172l-2.828-2.829a5 5 0 0 1 0-7.07Z"/></g></svg>';

// widgets/webwriter-hash.ts
var _mousePos_dec, _curHash_dec, _conBuffer_dec, _connections_dec, _cons_dec, _elems_dec, _context_dec, _container_dec, _a2, _WebwriterHash_decorators, _init2, _container, _context, _elems, _cons, _connections, _conBuffer, _curHash, _mousePos;
_WebwriterHash_decorators = [t4("webwriter-hash")];
var WebwriterHash = class extends (_a2 = LitElementWw, _container_dec = [e6("#container")], _context_dec = [e6("#context")], _elems_dec = [n5({
  attribute: true,
  type: Object,
  reflect: true,
  converter: {
    toAttribute(value) {
      return value != null ? JSON.stringify(value) : null;
    },
    fromAttribute(value) {
      try {
        return value ? JSON.parse(value) : null;
      } catch (e12) {
        console.error("Failed to parse attribute value:", value, e12);
        return null;
      }
    }
  }
})], _cons_dec = [n5({
  attribute: true,
  type: Object,
  reflect: true,
  converter: {
    toAttribute(value) {
      return value != null ? JSON.stringify(value) : null;
    },
    fromAttribute(value) {
      try {
        return value ? JSON.parse(value) : null;
      } catch (e12) {
        console.error("Failed to parse attribute value:", value, e12);
        return null;
      }
    }
  }
})], _connections_dec = [n5({ attribute: false })], _conBuffer_dec = [n5({ attribute: false })], _curHash_dec = [n5({ attribute: false })], _mousePos_dec = [n5({ attribute: false })], _a2) {
  constructor() {
    super(...arguments);
    __privateAdd(this, _container, __runInitializers(_init2, 8, this)), __runInitializers(_init2, 11, this);
    __privateAdd(this, _context, __runInitializers(_init2, 12, this)), __runInitializers(_init2, 15, this);
    __privateAdd(this, _elems, __runInitializers(_init2, 16, this, {})), __runInitializers(_init2, 19, this);
    __privateAdd(this, _cons, __runInitializers(_init2, 20, this, {})), __runInitializers(_init2, 23, this);
    __privateAdd(this, _connections, __runInitializers(_init2, 24, this, [])), __runInitializers(_init2, 27, this);
    __privateAdd(this, _conBuffer, __runInitializers(_init2, 28, this, null)), __runInitializers(_init2, 31, this);
    __privateAdd(this, _curHash, __runInitializers(_init2, 32, this, "")), __runInitializers(_init2, 35, this);
    __privateAdd(this, _mousePos, __runInitializers(_init2, 36, this, [0, 0])), __runInitializers(_init2, 39, this);
    __publicField(this, "drawObject", null);
    __publicField(this, "currConSelect", null);
    __publicField(this, "hex_string", "0123456789abcdef");
    __publicField(this, "allHashes", Object.assign(
      sha2_exports,
      sha1,
      sha3_exports
    ));
  }
  static get scopedElements() {
    return {
      "sl-textarea": SlTextarea,
      "sl-button": SlButton,
      "sl-select": SlSelect,
      "sl-option": SlOption,
      "sl-input": SlInput,
      "sl-checkbox": SlCheckbox,
      "sl-icon-button": SlIconButton,
      "sl-divider": SlDivider
    };
  }
  firstUpdated(_changedProperties) {
    this.addEventListener("contextmenu", (e12) => {
      e12.preventDefault();
      this.context.style.top = e12.offsetY + "px";
      this.context.style.left = e12.offsetX + "px";
      this.context.style.display = this.context.style.display === "flex" ? "" : "flex";
    });
    this.addEventListener("click", (e12) => {
      this.context.style.display = "";
    });
    this.addEventListener("mousemove", (e12) => {
      this.mousePos[0] = e12.offsetX;
      this.mousePos[1] = e12.offsetY;
    });
    Object.keys(this.elems).forEach((key) => {
      let object = this.spawnDiv(
        this.elems[key].type,
        this.elems[key].x,
        this.elems[key].y,
        false
      );
      if (object.getAttribute("type") === "input") {
        object.getElementsByTagName("sl-select")[0].value = this.elems[key].hash;
      }
      object.getElementsByTagName("sl-textarea")[0].value = this.elems[key].text != void 0 ? this.elems[key].text : "";
      object.setAttribute("identifier", key);
    });
    Object.keys(this.cons).forEach((key) => {
      let object1;
      let object2;
      for (let element of this.container.getElementsByTagName("div")) {
        if (element.getAttribute("identifier") === key) {
          object1 = element;
        }
        if (element.getAttribute("identifier") === this.cons[key]) {
          object2 = element;
        }
      }
      if (object1.getAttribute("type") === "input") {
        this.curHash = object1.getElementsByTagName("sl-select")[0].value;
      } else {
        this.curHash = object2.getElementsByTagName("sl-select")[0].value;
      }
      this.establishCon(object1, false, true, object2);
    });
  }
  toHex(bytes) {
    return Array.from(bytes || []).map((b4) => this.hex_string[b4 >> 4] + this.hex_string[b4 & 15]).join("");
  }
  updateElems(path, value, options = {}) {
    const parts = Array.isArray(path) ? path : path.split(".");
    let data = { ...this.elems };
    if (options.delete || value === void 0 && !options.rename) {
      if (parts.length === 1) {
        delete data[parts[0]];
      } else {
        let current2 = data;
        for (let i8 = 0; i8 < parts.length - 1; i8++) {
          const part = parts[i8];
          current2[part] = { ...current2[part] ?? {} };
          current2 = current2[part];
        }
        delete current2[parts[parts.length - 1]];
      }
      this.elems = data;
      return;
    }
    if (options.rename) {
      const fromKey = parts[0];
      const toKey = options.rename;
      if (data.hasOwnProperty(fromKey)) {
        data[toKey] = data[fromKey];
        delete data[fromKey];
        this.elems = data;
        return;
      } else {
        console.warn(`Key "${fromKey}" not found, cannot rename.`);
        return;
      }
    }
    let current = data;
    for (let i8 = 0; i8 < parts.length - 1; i8++) {
      const part = parts[i8];
      current[part] = { ...current[part] ?? {} };
      current = current[part];
    }
    const lastKey = parts[parts.length - 1];
    current[lastKey] = value;
    this.elems = data;
  }
  updateCons(path, value, options = {}) {
    const parts = Array.isArray(path) ? path : path.split(".");
    let data = { ...this.cons };
    if (options.delete || value === void 0 && !options.rename) {
      if (parts.length === 1) {
        delete data[parts[0]];
      } else {
        let current2 = data;
        for (let i8 = 0; i8 < parts.length - 1; i8++) {
          const part = parts[i8];
          current2[part] = { ...current2[part] ?? {} };
          current2 = current2[part];
        }
        delete current2[parts[parts.length - 1]];
      }
      this.cons = data;
      return;
    }
    if (options.rename) {
      const fromKey = parts[0];
      const toKey = options.rename;
      if (data.hasOwnProperty(fromKey)) {
        data[toKey] = data[fromKey];
        delete data[fromKey];
        this.cons = data;
        return;
      } else {
        console.warn(`Key "${fromKey}" not found, cannot rename.`);
        return;
      }
    }
    let current = data;
    for (let i8 = 0; i8 < parts.length - 1; i8++) {
      const part = parts[i8];
      current[part] = { ...current[part] ?? {} };
      current = current[part];
    }
    const lastKey = parts[parts.length - 1];
    current[lastKey] = value;
    this.cons = data;
  }
  fillOptions(element) {
    let keys = Object.keys(this.allHashes);
    keys.forEach((key) => {
      let option = this.shadowRoot.createElement(
        "sl-option"
      );
      option.value = key;
      option.innerText = key;
      element.appendChild(option);
    });
  }
  spawnDiv(type, x3, y4, addToElems) {
    let node = this.shadowRoot.createElement(
      "div"
    );
    node.id = "draggable";
    node.setAttribute("type", type);
    node.setAttribute(
      "identifier",
      Math.floor(Date.now() / 1e3).toString()
    );
    node.setAttribute("useSalt", "false");
    node.style.top = y4 + "px";
    node.style.left = x3 + "px";
    node.style.zIndex = "5";
    let header = this.shadowRoot.createElement(
      "div"
    );
    header.id = "header";
    header.style.display = "flex";
    header.style.flexDirection = "row";
    let title = this.shadowRoot.createElement(
      "b"
    );
    title.innerHTML = type;
    let remButton = this.shadowRoot.createElement(
      "sl-icon-button"
    );
    remButton.src = mdi_trash_outline_default;
    remButton.onclick = (e12) => {
      this.updateElems(node.getAttribute("identifier"), void 0);
      this.removeNode(node);
    };
    let conButton = this.shadowRoot.createElement(
      "sl-icon-button"
    );
    conButton.src = mingcute_link_line_default;
    conButton.onclick = (e12) => {
      this.establishCon(node);
      if (this.conBuffer != null) {
        this.currConSelect = conButton;
        this.currConSelect.style.color = "#2594c9";
      } else {
        this.currConSelect.style.color = "";
      }
    };
    header.appendChild(title);
    header.appendChild(remButton);
    header.appendChild(conButton);
    let text = this.shadowRoot.createElement(
      "sl-textarea"
    );
    text.id = "text";
    text.oninput = (e12) => {
      if (!text.disabled) {
        if (this.curHash != select.value) {
          this.curHash = select.value;
        }
        this.changedInput(node, text.value);
        this.updateElems(
          `${node.getAttribute("identifier")}.text`,
          text.value
        );
      }
    };
    text.onmousedown = (e12) => e12.stopPropagation();
    let flexDiv = this.shadowRoot.createElement(
      "div"
    );
    flexDiv.id = "flexDiv";
    let select = this.shadowRoot.createElement(
      "sl-select"
    );
    this.fillOptions(select);
    select.id = "hashSelect";
    select.placeholder = "select hash";
    select.size = "small";
    select.addEventListener("sl-change", (e12) => {
      this.curHash = select.value;
      this.updateElems(
        `${node.getAttribute("identifier")}.hash`,
        select.value
      );
      if (node.getAttribute("useSalt") === "true") {
        this.changedInput(node, text.value, saltText.value);
      } else {
        text.value != "" ? this.changedInput(node, text.value) : "";
      }
    });
    setTimeout(() => {
      select.shadowRoot.getElementById("listbox").style.height = "175px";
    });
    let flexDiv2 = this.shadowRoot.createElement(
      "div"
    );
    flexDiv2.id = "flexDiv2";
    let saltText = this.shadowRoot.createElement(
      "sl-input"
    );
    saltText.id = "saltText";
    saltText.disabled = true;
    saltText.size = "small";
    let reloadSalt = this.shadowRoot.createElement(
      "sl-button"
    );
    reloadSalt.innerText = "\u21BB";
    reloadSalt.size = "small";
    reloadSalt.onclick = (e12) => {
      saltText.value = this.toHex(randomBytes(32));
      if (this.curHash != select.value) {
        this.curHash = select.value;
      }
      this.changedInput(node, text.value, saltText.value);
    };
    let saltCheck = this.shadowRoot.createElement(
      "sl-icon-button"
    );
    saltCheck.id = "saltCheck";
    saltCheck.src = f7_text_append_default;
    saltCheck.onclick = (e12) => {
      if (this.curHash != select.value) {
        this.curHash = select.value;
      }
      if (flexDiv2.style.display === "none" || flexDiv2.style.display === "") {
        flexDiv2.style.display = "flex";
        saltText.value = this.toHex(randomBytes(32));
        node.setAttribute("useSalt", "true");
        this.changedInput(node, text.value, saltText.value);
      } else {
        flexDiv2.style.display = "none";
        saltCheck.style.color = "";
        node.setAttribute("useSalt", "false");
        this.changedInput(node, text.value);
      }
    };
    if (type === "output") {
      text.disabled = true;
      select.style.display = "none";
      flexDiv.style.display = "none";
      saltCheck.style.display = "none";
    }
    if (type === "input") {
      select.style.display = "";
      flexDiv.style.display = "flex";
      saltCheck.style.display = "";
    }
    flexDiv.appendChild(select);
    flexDiv.appendChild(saltCheck);
    flexDiv2.appendChild(saltText);
    flexDiv2.appendChild(reloadSalt);
    node.appendChild(header);
    node.appendChild(flexDiv);
    node.appendChild(flexDiv2);
    node.appendChild(text);
    this.container.appendChild(node);
    this.dragElement(node);
    if (addToElems != false) {
      this.updateElems(
        `${node.getAttribute("identifier")}.x`,
        node.getBoundingClientRect().x
      );
      this.updateElems(
        `${node.getAttribute("identifier")}.y`,
        node.getBoundingClientRect().y
      );
      this.updateElems(
        `${node.getAttribute("identifier")}.type`,
        node.getAttribute("type")
      );
    }
    return node;
  }
  changedInput(node, value, saltValue) {
    this.connections.forEach((con) => {
      if (con[0].getAttribute("identifier") === node.getAttribute("identifier")) {
        con[1].getElementsByTagName("sl-textarea")[0].value = value != "" ? this.toHex(
          this.allHashes[this.curHash](
            saltValue != void 0 ? String.prototype.concat(
              value,
              saltValue
            ) : value
          )
        ) : "";
      } else if (con[1].getAttribute("identifier") === node.getAttribute("identifier")) {
        con[0].getElementsByTagName("sl-textarea")[0].value = value != "" ? this.toHex(
          this.allHashes[this.curHash](
            saltValue != void 0 ? String.prototype.concat(
              value,
              saltValue
            ) : value
          )
        ) : "";
      }
    });
  }
  removeNode(node) {
    let removeIndices = [];
    this.connections.forEach((arr) => {
      if (arr.includes(node)) {
        removeIndices.push(this.connections.indexOf(arr));
      }
    });
    removeIndices.forEach((index) => {
      this.connections.splice(index, 1);
      let remKey = "";
      Object.keys(this.cons).forEach((key) => {
        if (key === node.getAttribute("identifier") || this.cons[key] === node.getAttribute("identifier")) {
          remKey = key;
        }
      });
      this.updateCons(remKey, void 0);
    });
    node.remove();
  }
  establishCon(node, addToCons = true, existing, partner) {
    console.log("ENTER", node, partner);
    if (this.conBuffer === null && existing != true) {
      this.conBuffer = node;
      this.drawObject = this.createMouseLineDrawer(
        this.mousePos[0],
        this.mousePos[1],
        this,
        this.getBoundingClientRect()
      );
      this.drawObject.toggle();
    } else {
      let noPriorCon = true;
      this.connections.forEach((con) => {
        if (con[0] === node && con[1] === this.conBuffer || con[1] === node && con[0] === this.conBuffer) {
          noPriorCon = false;
        }
      });
      if (existing) {
        this.conBuffer = partner;
      }
      if (this.conBuffer != node && this.conBuffer.getAttribute("type") != node.getAttribute("type") && noPriorCon) {
        this.connections.push([this.conBuffer, node]);
        if (addToCons) {
          this.updateCons(node.getAttribute("identifier"), this.conBuffer.getAttribute("identifier"));
        }
        let stopLineDrwawing = this.drawCon(
          this.conBuffer,
          node,
          this.container,
          this.container.getBoundingClientRect()
        );
        let text1 = this.conBuffer.getElementsByTagName("sl-textarea")[0].value;
        let text2 = node.getElementsByTagName("sl-textarea")[0].value;
        if (node.getAttribute("type") === "input") {
          if (node.getAttribute("useSalt") === "true") {
            let saltText = node.getElementsByTagName("sl-input")[0].value;
            this.changedInput(node, text2, saltText);
          } else {
            this.changedInput(node, text2);
          }
        } else if (this.conBuffer.getAttribute("type") === "input") {
          if (this.conBuffer.getAttribute("useSalt") === "true") {
            let saltText = this.conBuffer.getElementsByTagName("sl-input")[0].value;
            this.changedInput(this.conBuffer, text1, saltText);
          } else {
            this.changedInput(this.conBuffer, text1);
          }
        }
      }
      this.conBuffer = null;
      if (existing != true) {
        this.drawObject.toggle();
        this.drawObject.destroy();
      }
      this.drawObject = null;
      console.log(this.connections);
    }
  }
  drawCon(div1, div2, container, parentDims) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.position = "sticky";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = (Math.min(
      Number.parseInt(div1.style.zIndex),
      Number.parseInt(div2.style.zIndex)
    ) - 1).toString();
    svg.style.overflow = "visible";
    svg.setAttribute("width", "10");
    svg.setAttribute("height", "10");
    let defs = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "defs"
    );
    let filter = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "filter"
    );
    filter.setAttribute("id", "curve-shadow");
    filter.setAttribute("x", "-50%");
    filter.setAttribute("y", "-50%");
    filter.setAttribute("width", "200%");
    filter.setAttribute("height", "200%");
    let dropShadow = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "feDropShadow"
    );
    dropShadow.setAttribute("dx", "5");
    dropShadow.setAttribute("dy", "10");
    dropShadow.setAttribute("stdDeviation", "3");
    dropShadow.setAttribute("flood-color", "#00466666");
    filter.appendChild(dropShadow);
    defs.appendChild(filter);
    svg.appendChild(defs);
    let path = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path.setAttribute("stroke", "#2594c9");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    svg.appendChild(path);
    path.setAttribute("filter", "url(#curve-shadow)");
    container.appendChild(svg);
    let animationFrameId;
    function updatePath() {
      if (!container.contains(div1) || !container.contains(div2)) {
        cleanup();
        return;
      }
      let rect1 = div1.getBoundingClientRect();
      let rect2 = div2.getBoundingClientRect();
      let center1 = {
        x: rect1.left - parentDims.left - rect1.width / 2,
        y: rect1.top - parentDims.top - rect1.height / 2
      };
      let center2 = {
        x: rect2.left - parentDims.left - rect2.width / 2,
        y: rect2.top - parentDims.top - rect2.height / 2
      };
      let horizontal = Math.abs(center1.x - center2.x) > Math.abs(center1.y - center2.y);
      let x1 = horizontal ? center1.x < center2.x ? div1.offsetLeft + rect1.width : div1.offsetLeft : div1.offsetLeft;
      let y1 = horizontal ? div1.offsetTop : center1.y < center2.y ? div1.offsetTop + rect1.height : div1.offsetTop;
      let x22 = horizontal ? center1.x < center2.x ? div2.offsetLeft : div2.offsetLeft + rect2.width : div2.offsetLeft;
      let y23 = horizontal ? div2.offsetTop : center1.y < center2.y ? div2.offsetTop + rect2.height : div2.offsetTop;
      let curveOffset = 75;
      let cp1x = horizontal ? x1 + curveOffset * (x1 < x22 ? 1 : -1) : x1;
      let cp1y = horizontal ? y1 : y1 + curveOffset * (y1 < y23 ? 1 : -1);
      let cp2x = horizontal ? x22 - curveOffset * (x1 < x22 ? 1 : -1) : x22;
      let cp2y = horizontal ? y23 : y23 - curveOffset * (y1 < y23 ? 1 : -1);
      let pathData = `M ${x1},${y1} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x22},${y23}`;
      path.setAttribute("d", pathData);
      path.style.transition = "d 50ms ease";
      animationFrameId = requestAnimationFrame(updatePath);
    }
    function cleanup() {
      cancelAnimationFrame(animationFrameId);
      svg.remove();
      observer.disconnect();
    }
    let observer = new MutationObserver(() => {
      if (!container.contains(div1) || !container.contains(div2)) {
        cleanup();
      }
    });
    observer.observe(container, {
      childList: true,
      subtree: true
    });
    updatePath();
    return cleanup;
  }
  dragElement(elmnt, parent = this) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    function dragMouseDown(e12) {
      e12 = e12 || window.event;
      pos3 = e12.clientX;
      pos4 = e12.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e12) {
      e12 = e12 || window.event;
      e12.preventDefault();
      pos1 = pos3 - e12.clientX;
      pos2 = pos4 - e12.clientY;
      pos3 = e12.clientX;
      pos4 = e12.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      parent.updateElems(`${elmnt.getAttribute("identifier")}.x`, elmnt.offsetLeft - pos1);
      parent.updateElems(`${elmnt.getAttribute("identifier")}.y`, elmnt.offsetTop - pos2);
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  createMouseLineDrawer(fixedX, fixedY, parent, parentRect) {
    const fixedPoint = { x: fixedX, y: fixedY };
    let svg = null;
    let line = null;
    let isDrawing = false;
    let animationFrameId = null;
    function setupSVG() {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute(
        "style",
        `
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			pointer-events: none;
			z-index: 9999;
		  `
      );
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", fixedPoint.x.toString());
      line.setAttribute("y1", fixedPoint.y.toString());
      line.setAttribute("x2", fixedPoint.x.toString());
      line.setAttribute("y2", fixedPoint.y.toString());
      line.setAttribute("stroke", "darkgrey");
      line.setAttribute("stroke-opacity", "0.5");
      line.setAttribute("stroke-linecap", "butt");
      line.setAttribute("stroke-dasharray", "35,10");
      line.setAttribute("stroke-width", "2");
      svg.appendChild(line);
      parent.container.appendChild(svg);
    }
    function updateLine() {
      if (line) {
        line.setAttribute("x2", parent.mousePos[0].toString());
        line.setAttribute("y2", parent.mousePos[1].toString());
      }
    }
    function drawLoop() {
      if (!isDrawing) return;
      updateLine();
      animationFrameId = requestAnimationFrame(drawLoop);
    }
    function start() {
      if (!svg) setupSVG();
      isDrawing = true;
      drawLoop();
    }
    function stop() {
      isDrawing = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      if (line) {
        line.setAttribute("x2", fixedPoint.x.toString());
        line.setAttribute("y2", fixedPoint.y.toString());
      }
    }
    function destroy() {
      stop();
      svg?.remove();
      svg = null;
      line = null;
    }
    function toggle() {
      isDrawing ? stop() : start();
    }
    return {
      toggle,
      stop,
      destroy
    };
  }
  render() {
    return x`
			<div id="container">
				<div id="context">
					<div
						style="display: flex; flex-direction: row; align-items: center"
					>
						<sl-icon-button
							src=${material_symbols_code_blocks_outline_rounded_default}
							@click=${(e12) => {
      this.spawnDiv(
        "input",
        this.mousePos[0],
        this.mousePos[1]
      );
      this.context.style.display = "none";
    }}
							>spawn input</sl-icon-button
						>
						<b style="font-size: 10pt; font-weight: 500">input</b>
					</div>
					<sl-divider></sl-divider>
					<div
						style="display: flex; flex-direction: row; align-items: center"
					>
						<sl-icon-button
							src=${material_symbols_text_compare_rounded_default}
							@click=${(e12) => {
      this.spawnDiv(
        "output",
        this.mousePos[0],
        this.mousePos[1]
      );
      this.context.style.display = "none";
    }}
							>spawn output</sl-icon-button
						>
						<b style="font-size: 10pt; font-weight: 500">output</b>
					</div>
				</div>
			</div>
		`;
  }
};
_init2 = __decoratorStart(_a2);
_container = new WeakMap();
_context = new WeakMap();
_elems = new WeakMap();
_cons = new WeakMap();
_connections = new WeakMap();
_conBuffer = new WeakMap();
_curHash = new WeakMap();
_mousePos = new WeakMap();
__decorateElement(_init2, 4, "container", _container_dec, WebwriterHash, _container);
__decorateElement(_init2, 4, "context", _context_dec, WebwriterHash, _context);
__decorateElement(_init2, 4, "elems", _elems_dec, WebwriterHash, _elems);
__decorateElement(_init2, 4, "cons", _cons_dec, WebwriterHash, _cons);
__decorateElement(_init2, 4, "connections", _connections_dec, WebwriterHash, _connections);
__decorateElement(_init2, 4, "conBuffer", _conBuffer_dec, WebwriterHash, _conBuffer);
__decorateElement(_init2, 4, "curHash", _curHash_dec, WebwriterHash, _curHash);
__decorateElement(_init2, 4, "mousePos", _mousePos_dec, WebwriterHash, _mousePos);
WebwriterHash = __decorateElement(_init2, 0, "WebwriterHash", _WebwriterHash_decorators, WebwriterHash);
__publicField(WebwriterHash, "styles", style);
__runInitializers(_init2, 1, WebwriterHash);
export {
  WebwriterHash
};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@webwriter/lit/index.js:
  (*! Bundled license information:
  
  @lit/reactive-element/css-tag.js:
    (**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/reactive-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  lit-html/lit-html.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  lit-element/lit-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  lit-html/is-server.js:
    (**
     * @license
     * Copyright 2022 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/custom-element.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/property.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/state.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/event-options.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/base.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query-all.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query-async.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query-assigned-elements.js:
    (**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  
  @lit/reactive-element/decorators/query-assigned-nodes.js:
    (**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     *)
  *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/static.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/

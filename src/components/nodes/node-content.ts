import { adoptStyles, LitElement } from "lit";

/**
 * Base of the node bodies. A plain Lit element would attach its shadow root without a registry
 * and not find the Shoelace elements of the widget, so its root takes the registry of the root it sits in.
 */
export abstract class NodeContent extends LitElement {
  protected createRenderRoot() {
    const constructor = this.constructor as typeof LitElement;
    const customElementRegistry = (this.getRootNode() as ShadowRoot).customElementRegistry ?? undefined;
    const renderRoot = this.attachShadow({ ...constructor.shadowRootOptions, customElementRegistry });
    adoptStyles(renderRoot, constructor.elementStyles);
    // Lit clones templates through the creation scope, which has to import them with the registry.
    this.renderOptions.creationScope = {
      importNode: (node, deep) => this.ownerDocument.importNode(node, { customElementRegistry, selfOnly: !deep } as ImportNodeOptions),
    };
    return renderRoot;
  }
}

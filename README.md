# Hash (`@webwriter/hash@2.0.0`)
[License: MIT](LICENSE) | Version: 2.0.0

Visually create hashing workflows with keys, salts, and hash functions.

## Snippets
[Snippets](https://webwriter.app/docs/snippets/snippets/) are examples and templates using the package's widgets.

| Name | Import Path |
| :--: | :---------: |
| Password Pioneers Station 1 | `@webwriter/hash/snippets/password-pioneers-station-1.html` |
| Password Pioneers Station 2 | `@webwriter/hash/snippets/password-pioneers-station-2.html` |
| Password Pioneers Station 3 | `@webwriter/hash/snippets/password-pioneers-station-3.html` |



## `WebwriterHash` (`<webwriter-hash>`)
Node-and-edge editor for hashing workflows: connect key, salt and hash-function nodes to a hash value node.
The graph (nodes, their positions and settings, and the connections) is stored in the widget's JSON data block
and drawn on a Scene.

Keyboard: nodes and sockets are tab stops (Enter on an output socket starts a wire, Enter on an input socket ends it),
arrow keys move the selected nodes, Delete removes the selection, a node title can be renamed with Enter or F2 in edit mode.
Pointer and touch: drag to move, drag from a socket to wire, tap a socket and then another to wire.
Layout: block widget from 300 px to 2100 px; the node menu narrows and the title pill hides below 480 px.
Print: the graph and its hash values as drawn, without tools.

Files: `.json` is imported and `application/json` exported (`hash-flow.json`): the nodes with their positions and settings and the
connections, the same shape as the data block. An import replaces the whole graph and drops connections that break the wiring rules;
unknown node kinds or a missing id make the file invalid. A hash flow has no native HTML counterpart, so there are no DOM conversions.

Signals: `hash` (string) is the hash shown by the first hash value node, an empty string while it shows nothing.
The widget takes no effects: its keys are typed in the nodes, and several key nodes would leave open which one a source feeds.

### Usage

Use with a CDN (e.g. [jsdelivr](https://jsdelivr.com)):
```html
<link href="https://cdn.jsdelivr.net/npm/@webwriter/hash/widgets/webwriter-hash.css" rel="stylesheet">
<script type="module" src="https://cdn.jsdelivr.net/npm/@webwriter/hash/widgets/webwriter-hash.js"></script>
<webwriter-hash></webwriter-hash>
```

Or use with a bundler (e.g. [Vite](https://vite.dev)):

```
npm install @webwriter/hash
```

```html
<link href="@webwriter/hash/widgets/webwriter-hash.css" rel="stylesheet">
<script type="module" src="@webwriter/hash/widgets/webwriter-hash.js"></script>
<webwriter-hash></webwriter-hash>
```

## Fields
| Name (Attribute Name) | Type | Description | Default | Reflects |
| :-------------------: | :--: | :---------: | :-----: | :------: |
| `WebwriterHash.scopedElements` | `object` | - | `{ ...sceneElements, "ww-scene": webglAvailable() ? PixiScene : sceneElements["ww-scene"], "sl-icon": SlIcon, "sl-drawer": SlDrawer, "sl-tooltip": SlTooltip, "sl-select": SlSelect, "sl-option": SlOption, "sl-textarea": SlTextarea, "sl-input": SlInput, "editor-dock": EditorDock, "key-node": KeyNodeUI, "salt-node": SaltNodeUI, "hash-function-node": HashFunctionNodeUI, "hash-value-node": HashValueNodeUI, }` | ✗ |
| `WebwriterHash.convertFrom` | `object` | - | `{ ".json": "importJson" }` | ✗ |
| `WebwriterHash.convertTo` | `object` | - | `{ "application/json": "exportJson" }` | ✗ |
| `WebwriterHash.permissions` | `object` | - | `{ allowAdding: { label: (widget: { msg: MsgFn }) => widget.msg("Adding Nodes") }, allowDeleting: { label: (widget: { msg: MsgFn }) => widget.msg("Deleting Nodes") }, }` | ✗ |
| `WebwriterHash.actions` | `object` | - | `{ deleteSelection: { label: (widget: { msg: MsgFn }) => widget.msg("Delete selection", { desc: "Action that removes the selected nodes and connections" }), shortcut: "Delete", can: "allowDeleting", }, }` | ✗ |
| `signals` | `object` | - | `{ hash: computed(() => this.#hash.get()) }` | ✗ |
| `msg` | - | - | - | ✗ |
| `allowAdding` (`allowAdding`) | `boolean` | If true, enables the side drawer and allow drag-and-drop new nodes (Key, Salt, HashFunction, HashValue) to editor. | `false` | ✓ |
| `allowDeleting` (`allowDeleting`) | `boolean` | If true, allows user to delete selected nodes from the graph. | `false` | ✓ |
| `selection` | `ReadonlySet<string>` | - | `new Set()` | ✗ |
| `editingTitle` | `string \| null` | - | `null` | ✗ |
| `graph` | `Graph` | The graph from the data block, in the shape the editor works with. Without nodes the default pipeline shows. | - | ✗ |

*Fields including [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) and [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) define the current state of the widget and offer customization options.*

## Methods
| Name | Description | Parameters |
| :--: | :---------: | :-------: |
| `importJson` | Import handler for `.json`: reads and checks the whole file, then returns the function that replaces the graph. | `file: File`
| `exportJson` | Export handler for `application/json`: the current graph, including the default pipeline of an untouched widget. | -
| `zoomToNodes` | Fits the view to the nodes, beside the drawer if it is open. | -
| `deleteSelection` | Widget action: removes the selected nodes with their connections, and the selected connections. | -

*[Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) allow programmatic access to the widget.*

## Custom CSS properties
| Name | Description |
| :--: | :---------: |
| --ww-text-color | Text color of titles and labels. |
| --ww-font-family | Font family. |
| --ww-theme-accent-1 | Selection and focus. |
| --ww-theme-accent-2 | Border of key nodes. |
| --ww-theme-accent-3 | Border of hash function nodes. |
| --ww-theme-accent-4 | Border of hash value nodes. |
| --ww-theme-accent-5 | Border of salt nodes. |

*[Custom CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties) offer defined customization of the widget's style.*

## CSS parts
| Name | Description |
| :--: | :---------: |
| canvas | The area that holds the graph. |
| node | A node. |
| title | The title of a node. |

*[CSS parts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts) allow freely styling internals of the widget with CSS.*

## Editing config
| Name | Value |
| :--: | :---------: |


*The [editing config](https://webwriter.app/docs/packages/configuring/#editingconfig) defines how explorable authoring tools such as [WebWriter](https://webwriter.app) treat the widget.*

*No public slots, or events.*


---
*Generated with @webwriter/build@1.14.0*
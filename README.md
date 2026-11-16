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
| `WebwriterHash.permissions` | `object` | - | `{ allowAdding: { label: (widget: { msg: MsgFn }) => widget.msg("Adding Nodes") }, allowDeleting: { label: (widget: { msg: MsgFn }) => widget.msg("Deleting Nodes") }, }` | ✗ |
| `WebwriterHash.actions` | `object` | - | `{ deleteSelection: { label: (widget: { msg: MsgFn }) => widget.msg("Delete selection", { desc: "Action that removes the selected nodes and connections" }), shortcut: "Delete", can: "allowDeleting", }, }` | ✗ |
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
| `zoomToNodes` | Fits the view to the nodes, beside the drawer if it is open. | -
| `deleteSelection` | Widget action: removes the selected nodes with their connections, and the selected connections. | -

*[Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) allow programmatic access to the widget.*

## Editing config
| Name | Value |
| :--: | :---------: |


*The [editing config](https://webwriter.app/docs/packages/configuring/#editingconfig) defines how explorable authoring tools such as [WebWriter](https://webwriter.app) treat the widget.*

*No public slots, events, custom CSS properties, or CSS parts.*


---
*Generated with @webwriter/build@1.14.0*
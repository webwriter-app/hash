# Hash (`@webwriter/hash@1.0.2`)
[License: MIT](LICENSE) | Version: 1.0.2

Visually create hashing workflows with keys, salts, and hash functions.

## Snippets
[Snippets](https://webwriter.app/docs/snippets/snippets/) are examples and templates using the package's widgets.

| Name | Import Path |
| :--: | :---------: |
| Password Pioneers Station 1 | `@webwriter/hash/snippets/password-pioneers-station-1.html` |
| Password Pioneers Station 2 | `@webwriter/hash/snippets/password-pioneers-station-2.html` |
| Password Pioneers Station 3 | `@webwriter/hash/snippets/password-pioneers-station-3.html` |



## `WebwriterHash` (`<webwriter-hash>`)


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
| `allowAdding` (`allowAdding`) | `boolean` | If true, enables the side drawer and allow drag-and-drop new nodes (Key, Salt, HashFunction, HashValue) to editor. | `false` | ✓ |
| `allowDeleting` (`allowDeleting`) | `boolean` | If true, allows user to delete selected nodes from the graph. | `false` | ✓ |
| `editorState` (`editorState`) | `any` | The JSON representation of the graph, containing all nodes, positions, and connections. Used for saving state in rerender. | `{}` | ✓ |
| `WebwriterHash.scopedElements` | - | - | - | ✗ |

*Fields including [properties](https://developer.mozilla.org/en-US/docs/Glossary/Property/JavaScript) and [attributes](https://developer.mozilla.org/en-US/docs/Glossary/Attribute) define the current state of the widget and offer customization options.*

## Editing config
| Name | Value |
| :--: | :---------: |


*The [editing config](https://webwriter.app/docs/packages/configuring/#editingconfig) defines how explorable authoring tools such as [WebWriter](https://webwriter.app) treat the widget.*

*No public methods, slots, events, custom CSS properties, or CSS parts.*

## Editor (`editor.ts`)
The editor instance created by `createEditor()` contains the following methods.

| Name | Description | Parameters |
| :--- | :--- | :--- |
| `addNode` | Adds a new node of the specified type at the given coordinates. | `type: string`<br>`clientX: number`<br>`clientY: number` |
| `zoomToNodes` | Zooms and pans the view to fit all current nodes. Adjusts slightly if the sidebar is open. | `sidebarOpen: boolean` |
| `importGraph` | Loads a complete graph state (nodes and connections) from a data object. Clears existing state first. | `data: any` |
| `getGraph` | Exports the current state of the editor (nodes, positions, connections) as a JSON object. | - |
| `process` | Triggers the data flow engine to recalculate hashes based on current connections and inputs. | - |
| `updatePermissions` | Updates the interactive permissions for the editor and propagates them to all nodes. | `newPerms: { canDelete: boolean, isAuthor: boolean, allowAdding: boolean }` |
| `destroy` | Cleans up the editor, destroys the area plugin, and clears the engine. | - |

## Hash Nodes (`<hash-node>`)
Represents the UI for a general node within the Rete.js canvas. All specified nodes are instances of the `<hash-node>` custom element.

#### Fields

| Attribute | Type | Description | Reflected |
| :--- | :--- | :--- | :--- |
| `data` | `Object` | Internal Rete.js node data object containing label, id, inputs, and outputs. | ✗ |
| `canDelete` (`candelete`) | `boolean` | Indicates if the user is allowed to delete this node. Shows/hides the delete button. | ✓ |
| `isAuthor` (`isauthor`) | `boolean` | Indicates if the user is in author mode. Enables title editing. | ✓ |
| `isEditingTitle` | `boolean` | Internal state to track if the node title is currently being edited. | ✗ |
| `width` | `number` | The width of the node in pixels. | ✗ |
| `height` | `number` | The height of the node in pixels. | ✗ |


---
*Generated with @webwriter/build@1.9.1*
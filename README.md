# WebWriter Hash

License: [MIT](security-systems/LICENSE) | Version: 1.0.0

The Hashing Widget intends to familiarize students with the concept of hash functions using a visual node editor.
This widget uses the [Rete.js](https://retejs.org/) library to render content via its internal engine. Students can connect different node types (Keys, Salts, Hash Functions, Hash Values) to generate hashes and understand the data flow.

## Snippets

[Snippets](https://webwriter.app/docs/snippets/snippets/) are examples and templates using the package's widgets.

| Name | Import Path |
| ------------- | ------------- |
| Password Pioneers Station 1 | `@webwriter/security-systems/snippets/password-pioneers-station-1.html` |
| Password Pioneers Station 2 | `@webwriter/security-systems/snippets/password-pioneers-station-2.html` |
| Password Pioneers Station 3 | `@webwriter/security-systems/snippets/password-pioneers-station-3.html` |

## WebwriterHash (`<webwriter-hash>`)

A visual editor container allowing users to create and manipulate hashing graphs.

### Usage

Use with a CDN (e.g. [jsdelivr](https://www.jsdelivr.com/):
```html
<link href="https://cdn.jsdelivr.net/npm/@webwriter/security-systems/widgets/webwriter-hash.css" rel="stylesheet">
<script type="module" src="[https://cdn.jsdelivr.net/npm/@webwriter/security-systems/widgets/webwriter-hash.js]"></script>
<webwriter-hash allowadding allowdeleting></webwriter-hash>
```

Or use with a bundler (e.g. [Vite](https://vite.dev/):
```html
<link href="@webwriter/security-systems/widgets/webwriter-hash.css" rel="stylesheet">
<script type="module" src="@webwriter/security-systems/widgets/webwriter-hash.js"></script>
<webwriter-hash allowadding allowdeleting></webwriter-hash>
```

## Fields
| Attribute |	Type |Description |	Default |	Reflected |
| ------------- | ------------- | ------------- | ------------- |------------- |
| allowAdding	  | boolean	      |If true, enables the side drawer and allow drag-and-drop new nodes (Key, Salt, HashFunction, HashValue) to editor.         | false   |	✓ |
| allowDeleting	| boolean	      |If true, allows user to delete selected nodes from the graph.                                                              | false   |	✓ |
| editorState   |	Object        |	The JSON representation of the graph, containing all nodes, positions, and connections. Used for saving state in rerender | {}	    | ✓ |

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
| `data` | `Object` | Internal Rete.js node data object containing label, id, inputs, and outputs. | ✕ |
| `canDelete` (`candelete`) | `boolean` | Indicates if the user is allowed to delete this node. Shows/hides the delete button. | ✓ |
| `isAuthor` (`isauthor`) | `boolean` | Indicates if the user is in author mode. Enables title editing. | ✓ |
| `isEditingTitle` | `boolean` | Internal state to track if the node title is currently being edited. | ✕ |
| `width` | `number` | The width of the node in pixels. | ✕ |
| `height` | `number` | The height of the node in pixels. | ✕ |

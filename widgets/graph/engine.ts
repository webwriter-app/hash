import { html } from 'lit';
import {
    ClassicPreset,
    NodeEditor,
    GetSchemes
} from 'rete';

import {
    AreaPlugin,
    AreaExtensions
} from 'rete-area-plugin';

import {
    ConnectionPlugin,
    Presets as ConnectionPresets
} from 'rete-connection-plugin';

import {
    LitPlugin,
    Presets,
    LitArea2D
} from '@retejs/lit-plugin';


type Node = ClassicPreset.Node & { width?: number; height?: number };
type Conn = ClassicPreset.Connection<Node, Node>;
type Schemes = GetSchemes<Node, Conn>;
type AreaExtra = LitArea2D<Schemes>;


export const KeySocket = new ClassicPreset.Socket('Key');
export const HashFnSocket = new ClassicPreset.Socket('HashFn');

function isCompatible(a: ClassicPreset.Socket, b: ClassicPreset.Socket) {
    return (
        (a === KeySocket && b === KeySocket) ||
        (a === HashFnSocket && b === HashFnSocket)
    );
}


class KeyControl extends ClassicPreset.Control {
    value = '';

    constructor() {
        super();
    }

    setValue(v: string) {
        this.value = v ?? '';
    }

    render() {
        return html`
            <div class="hash-node key-node" style="padding:8px;">
                <key-node
                        class="node-item key"
                        @key-value-changed=${(e: CustomEvent) => this.setValue(e.detail?.value)}
                ></key-node>
            </div>
        `;
    }
}

class HashFnControl extends ClassicPreset.Control {
    algo = 'sha256';

    constructor() {
        super();
    }

    setAlgo(a: string) {
        this.algo = a || 'sha256';
    }

    render() {
        return html`
            <div class="hash-node hash-function-node" style="padding:8px;">
                <hash-function-node
                        class="node-item hash-function"
                        @hash-function-changed=${(e: CustomEvent) =>
                                this.setAlgo(e.detail?.algo)}
                ></hash-function-node>
            </div>
        `;
    }
}

class HashedValueControl extends ClassicPreset.Control {
    hashValue = '';

    constructor() {
        super();
    }

    setHash(v: string) {
        this.hashValue = v ?? '';
    }

    render() {
        return html`
            <div class="hash-node hash-value-node" style="padding:8px;">
                <hash-value-node
                        class="node-item hash-value"
                        .value=${this.hashValue}
                ></hash-value-node>
            </div>
        `;
    }
}

export class ReteKeyNode extends ClassicPreset.Node {
    width = 220;
    height = 90;

    constructor() {
        super('Key');
        this.addOutput('key', new ClassicPreset.Output(KeySocket, ''));
        this.addControl('ctrl', new KeyControl());
    }
}

export class ReteHashFnNode extends ClassicPreset.Node {
    width = 220;
    height = 90;

    constructor() {
        super('Hash Function');
        this.addOutput('fn', new ClassicPreset.Output(HashFnSocket, ''));
        this.addControl('ctrl', new HashFnControl());
    }
}

export class ReteHashedValueNode extends ClassicPreset.Node {
    width = 240;
    height = 100;

    constructor() {
        super('Hashed Value');
        this.addInput('key', new ClassicPreset.Input(KeySocket, ''));
        this.addInput('fn', new ClassicPreset.Input(HashFnSocket, ''));
        this.addControl('ctrl', new HashedValueControl());
    }
}


export type GraphAPI = {
    editor: NodeEditor<Schemes>;
    area: AreaPlugin<Schemes, AreaExtra>;
    connection: ConnectionPlugin<Schemes, AreaExtra>;
    render: LitPlugin<Schemes, AreaExtra>;
    addKeyNode: (pos?: { x: number; y: number }) => Promise<ReteKeyNode>;
    addHashFnNode: (pos?: { x: number; y: number }) => Promise<ReteHashFnNode>;
    addHashedValueNode: (
        pos?: { x: number; y: number }
    ) => Promise<ReteHashedValueNode>;
    zoom: { in: () => void; out: () => void; reset: () => void };
};


const GRID = 24;

function makePlacer() {
    let x = 160;
    let row = 0;
    return (w = 200, h = 120, at?: { x: number; y: number }) => {
        if (at) return { x: at.x, y: at.y };
        const y = 160 + row * (h + GRID);
        const pos = { x, y };
        x += w + GRID;
        if (x > 900) {
            x = 160;
            row++;
        }
        return pos;
    };
}


export async function setupGraph(host: HTMLElement): Promise<GraphAPI> {
    const editor = new NodeEditor<Schemes>();

    const area = new AreaPlugin<Schemes, AreaExtra>(host);

    const render = new LitPlugin<Schemes, AreaExtra>();
    render.addPreset(
        Presets.classic.setup({
            customize: {
                control(context: { payload: ClassicPreset.Control }) {
                    const ctrl = context.payload;

                    if (ctrl instanceof KeyControl) return () => ctrl.render();
                    if (ctrl instanceof HashFnControl) return () => ctrl.render();
                    if (ctrl instanceof HashedValueControl) return () => ctrl.render();

                    return undefined;
                }
            }
        })
    );

    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    connection.addPreset(ConnectionPresets.classic.setup());

    editor.use(area);
    area.use(render);
    area.use(connection);

    connection.addPipe((ctx: any) => {
        if (ctx?.type === 'connectioncreate') {
            const outSock = ctx.data?.sourceOutput?.socket;
            const inSock = ctx.data?.targetInput?.socket;
            if (!outSock || !inSock) return;
            if (!isCompatible(outSock, inSock)) return;
        }
        return ctx;
    });

    const place = makePlacer();

    async function placeAndAdd<T extends Node>(
        node: T,
        at?: { x: number; y: number }
    ) {
        const w = (node as any).width ?? 200;
        const h = (node as any).height ?? 100;
        const pos = place(w, h, at);
        (node as any).position = [pos.x, pos.y];
        await editor.addNode(node);
        return node as any;
    }

    const addKeyNode = (at?: { x: number; y: number }) =>
        placeAndAdd(new ReteKeyNode(), at);
    const addHashFnNode = (at?: { x: number; y: number }) =>
        placeAndAdd(new ReteHashFnNode(), at);
    const addHashedValueNode = (at?: { x: number; y: number }) =>
        placeAndAdd(new ReteHashedValueNode(), at);

    const zoom = {
        in: () => AreaExtensions.zoomAt(area, editor.getNodes()),
        out: () => AreaExtensions.zoomAt(area, editor.getNodes()),
        reset: () => AreaExtensions.zoomAt(area, editor.getNodes())
    };

    return {
        editor,
        area,
        connection,
        render,
        addKeyNode,
        addHashFnNode,
        addHashedValueNode,
        zoom
    };
}

export async function addStarterNodes(api: GraphAPI) {
    const key = await api.addKeyNode({ x: 280, y: 260 });
    const fn = await api.addHashFnNode({ x: 540, y: 240 });
    const hv = await api.addHashedValueNode({ x: 820, y: 260 });

    const n1 = key as unknown as Node;
    const n2 = fn as unknown as Node;
    const n3 = hv as unknown as Node;

    await api.editor.addConnection(
        new ClassicPreset.Connection(n1, 'key', n3, 'key')
    );
    await api.editor.addConnection(
        new ClassicPreset.Connection(n2, 'fn', n3, 'fn')
    );
}

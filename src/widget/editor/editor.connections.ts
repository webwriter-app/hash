import { NodeEditor } from "rete";
import { ClassicFlow, getSourceTarget } from "rete-connection-plugin";
import type { Context, PickParams, Preset, Side, SocketData } from "rete-connection-plugin";

import {
    KeyNode,
    SaltNode,
    HashFunctionNode,
    HashValueNode,
    Nodes,
    Connection,
    Schemes
} from "./editor.nodes";

type FlowContext = Context<Schemes, any[]>;

export type ConnectionData = Pick<Connection, "source" | "sourceOutput" | "target" | "targetInput">;

/**
 * Single source of truth for the wiring rules. The graph models a hashing pipeline,
 * so data always flows Key -> (Salt) -> HashFunction -> HashValue.
 */
export function canConnect(source: Nodes, target: Nodes): boolean {
    if (source.id === target.id) return false;
    if (source instanceof KeyNode) return target instanceof SaltNode || target instanceof HashFunctionNode;
    if (source instanceof SaltNode) return target instanceof HashFunctionNode;
    if (source instanceof HashFunctionNode) return target instanceof HashValueNode;
    return false; // hash values end the pipeline
}

// rete does not verify that the nodes and ports referenced by a connection still exist
export function isValidConnection(editor: NodeEditor<Schemes>, data: ConnectionData): boolean {
    const source = editor.getNode(data.source);
    const target = editor.getNode(data.target);
    if (!source || !target) return false;

    const outputs = source.outputs as Record<string, unknown>;
    const inputs = target.inputs as Record<string, unknown>;
    if (!outputs[String(data.sourceOutput)] || !inputs[String(data.targetInput)]) return false;

    return canConnect(source, target);
}

export function areSocketsFree(editor: NodeEditor<Schemes>, data: ConnectionData): boolean {
    return !editor.getConnections().some(c =>
        (c.source === data.source && c.sourceOutput === data.sourceOutput) ||
        (c.target === data.target && c.targetInput === data.targetInput)
    );
}

const findSocketData = (context: FlowContext, nodeId: string, side: Side, key: string) =>
    Array.from(context.socketsCache.values()).find(
        data => data.nodeId === nodeId && data.side === side && data.key === key
    );

/**
 * Rete's classic flow only reuses an existing connection when it is grabbed by its input
 * end; grabbing an output starts a second, parallel connection. Since every socket here
 * holds at most one connection, an occupied output has to reuse its connection as well.
 *
 * Handing rete the connection's input end does exactly that: it detaches the connection,
 * keeps it anchored at the output the user grabbed and lets the loose input end follow the
 * cursor. Dragging therefore always ends on an input socket, whichever end was picked up.
 */
class SingleConnectionFlow extends ClassicFlow<Schemes, any[]> {
    async pick(params: PickParams, context: FlowContext) {
        const { socket, event } = params;

        if (event === "down" && socket.side === "output" && !this.getPickedSocket()) {
            const existing = context.editor.getConnections().find(
                c => c.source === socket.nodeId && String(c.sourceOutput) === socket.key
            );
            const farEnd = existing
                ? findSocketData(context, existing.target, "input", String(existing.targetInput))
                : undefined;

            if (farEnd) {
                await super.pick({ socket: farEnd, event }, context);
                return;
            }
        }

        await super.pick(params, context);
    }
}

/**
 * Connection preset for this editor. Validating in `canMakeConnection` matters:
 * rete drops the connections occupying both sockets before it calls `makeConnection`,
 * so a rejection that comes later would already have destroyed a valid connection.
 */
export function createConnectionPreset(editor: NodeEditor<Schemes>): Preset<Schemes> {
    return () => new SingleConnectionFlow({
        canMakeConnection: (from: SocketData, to: SocketData) => {
            const [source, target] = getSourceTarget(from, to) ?? [];
            if (!source || !target) return false;

            return isValidConnection(editor, {
                source: source.nodeId,
                sourceOutput: source.key,
                target: target.nodeId,
                targetInput: target.key
            } as ConnectionData);
        }
    });
}

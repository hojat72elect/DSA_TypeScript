import {Graph} from "../../../../../DSA_TypeScript/src/data_structures/graph/Graph.ts";
import {GraphVertex} from "../../../../../DSA_TypeScript/src/data_structures/graph/GraphVertex.ts";

interface TraversalParams {
    previousVertex: GraphVertex | null;
    currentVertex: GraphVertex;
    nextVertex: GraphVertex;
}

interface VertexEventParams {
    currentVertex: GraphVertex;
    previousVertex: GraphVertex | null;
}

interface Callbacks {
    allowTraversal?: (params: TraversalParams) => boolean;
    enterVertex?: (params: VertexEventParams) => void;
    leaveVertex?: (params: VertexEventParams) => void;
}

interface RequiredCallbacks {
    allowTraversal: (params: TraversalParams) => boolean;
    enterVertex: (params: VertexEventParams) => void;
    leaveVertex: (params: VertexEventParams) => void;
}

/**
 * Initializes missing lifecycle hooks with default behaviors.
 */
function initCallbacks(callbacks: Callbacks = {}): RequiredCallbacks {
    const initiatedCallback = {...callbacks} as RequiredCallbacks;

    const stubCallback = (): void => {
    };

    const allowTraversalCallback = (() => {
        const seen: Record<string | number, boolean> = {};

        // Note: The original JS implicitly extracted nextVertex. 
        // We type the full block parameters to safely extract it.
        return ({nextVertex}: TraversalParams): boolean => {
            const key = nextVertex.getKey();
            if (!seen[key]) {
                seen[key] = true;
                return true;
            }
            return false;
        };
    })();

    initiatedCallback.allowTraversal = callbacks.allowTraversal || allowTraversalCallback;
    initiatedCallback.enterVertex = callbacks.enterVertex || stubCallback;
    initiatedCallback.leaveVertex = callbacks.leaveVertex || stubCallback;

    return initiatedCallback;
}

/**
 * Core recursive DFS processor.
 */
function depthFirstSearchRecursive(
    graph: Graph,
    currentVertex: GraphVertex,
    previousVertex: GraphVertex | null,
    callbacks: RequiredCallbacks
): void {
    callbacks.enterVertex({currentVertex, previousVertex});

    graph.getNeighbors(currentVertex).forEach((nextVertex) => {
        if (callbacks.allowTraversal({previousVertex, currentVertex, nextVertex})) {
            depthFirstSearchRecursive(graph, nextVertex, currentVertex, callbacks);
        }
    });

    callbacks.leaveVertex({currentVertex, previousVertex});
}

/**
 * Traverses a graph using Depth-First Search.
 */
export function depthFirstSearch(
    graph: Graph,
    startVertex: GraphVertex,
    callbacks?: Callbacks
): void {
    const previousVertex = null;
    depthFirstSearchRecursive(graph, startVertex, previousVertex, initCallbacks(callbacks));
}
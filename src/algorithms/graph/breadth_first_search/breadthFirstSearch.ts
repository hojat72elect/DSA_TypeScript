import {GraphVertex} from "../../../data_structures/graph/GraphVertex.ts";
import {Graph} from "../../../data_structures/graph/Graph.ts";
import {Queue} from "../../../data_structures/queue/Queue.ts";

interface TraversalVertices {
    currentVertex?: GraphVertex;
    previousVertex?: GraphVertex | null;
    nextVertex?: GraphVertex;
}

interface Callbacks {
    allowTraversal?: (vertices: Required<Pick<TraversalVertices, 'previousVertex' | 'currentVertex' | 'nextVertex'>>) => boolean;
    enterVertex?: (vertices: Required<Pick<TraversalVertices, 'currentVertex' | 'previousVertex'>>) => void;
    leaveVertex?: (vertices: Required<Pick<TraversalVertices, 'currentVertex' | 'previousVertex'>>) => void;
}

function initCallbacks(callbacks: Callbacks = {}): Required<Callbacks> {
    const initiatedCallback = callbacks as Required<Callbacks>;

    const stubCallback = () => {
    };

    const allowTraversalCallback = (() => {
        const seen: Record<string | number, boolean> = {};
        return ({nextVertex}: { nextVertex: GraphVertex }) => {
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

export function breadthFirstSearch(
    graph: Graph,
    startVertex: GraphVertex,
    originalCallbacks?: Callbacks
) {
    const callbacks = initCallbacks(originalCallbacks);
    const vertexQueue = new Queue();

    // Do initial queue setup.
    vertexQueue.enqueue(startVertex);

    let previousVertex: GraphVertex | null = null;

// Traverse all vertices from the queue.
    while (!vertexQueue.isEmpty()) {
        const currentVertex = vertexQueue.dequeue();

        if (!currentVertex) break; // Safety check depending on Queue implementation

        callbacks.enterVertex({currentVertex, previousVertex});

        // Add all neighbors to the queue for future traversals.
        graph.getNeighbors(currentVertex).forEach((nextVertex) => {
            if (callbacks.allowTraversal({previousVertex, currentVertex, nextVertex})) {
                vertexQueue.enqueue(nextVertex);
            }
        });

        callbacks.leaveVertex({currentVertex, previousVertex});

        // Memorize current vertex before next loop.
        previousVertex = currentVertex;
    }
}
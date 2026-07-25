import {depthFirstSearch} from '../depth_first_search/depthFirstSearch.ts';
import {Graph} from "../../../data_structures/graph/Graph.ts";
import {GraphVertex} from "../../../data_structures/graph/GraphVertex.ts";

/**
 * Detect cycle in undirected graph using Depth First Search.
 */
export function detectUndirectedCycle(graph: Graph): Record<string, GraphVertex> | null {
    let cycle: Record<string, GraphVertex> | null = null;

    // List of vertices that we have visited.
    const visitedVertices: Record<string, GraphVertex> = {};

    // List of parents vertices for every visited vertex.
    const parents: Record<string, GraphVertex | null> = {};

    // Callbacks for DFS traversing.
    const callbacks = {
        allowTraversal: ({currentVertex, nextVertex}: {
            currentVertex: GraphVertex;
            nextVertex: GraphVertex
        }) => {
            // Don't allow further traversal in case if cycle has been detected.
            if (cycle) return false;

            // Don't allow traversal from child back to its parent.
            const currentVertexParent = parents[currentVertex.getKey()];
            const currentVertexParentKey = currentVertexParent ? currentVertexParent.getKey() : null;

            return currentVertexParentKey !== nextVertex.getKey();
        },
        enterVertex: ({currentVertex, previousVertex}: {
            currentVertex: GraphVertex;
            previousVertex: GraphVertex | null
        }) => {
            if (visitedVertices[currentVertex.getKey()]) {
                // Compile cycle path based on parents of previous vertices.
                cycle = {};

                let currentCycleVertex = currentVertex;
                let previousCycleVertex = previousVertex!;

                while (previousCycleVertex.getKey() !== currentVertex.getKey()) {
                    cycle[currentCycleVertex.getKey()] = previousCycleVertex;
                    currentCycleVertex = previousCycleVertex;
                    previousCycleVertex = parents[previousCycleVertex.getKey()]!;
                }

                cycle[currentCycleVertex.getKey()] = previousCycleVertex;
            } else {
                // Add next vertex to visited set.
                visitedVertices[currentVertex.getKey()] = currentVertex;
                parents[currentVertex.getKey()] = previousVertex;
            }
        },
    };

    // Start DFS traversing.
    const startVertex = graph.getAllVertices()[0]!;
    depthFirstSearch(graph, startVertex, callbacks);

    return cycle;
}

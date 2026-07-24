import {depthFirstSearch} from '../depth-first-search/depthFirstSearch.ts';
import {Graph} from "../../../../../DSA_TypeScript/src/data_structures/graph/Graph.ts";
import {GraphVertex} from "../../../../../DSA_TypeScript/src/data_structures/graph/GraphVertex.ts";

/**
 * Helper class for visited vertex metadata.
 */
class VisitMetadata {
    public discoveryTime: number;
    public lowDiscoveryTime: number;
    public independentChildrenCount: number;

    constructor(discoveryTime: number, lowDiscoveryTime: number) {
        this.discoveryTime = discoveryTime;
        this.lowDiscoveryTime = lowDiscoveryTime;
        // We need this in order to check graph root node, whether it has two
        // disconnected children or not.
        this.independentChildrenCount = 0;
    }
}

/**
 * Tarjan's algorithm for finding articulation points in graph.
 */
export function articulationPoints(graph: Graph): Record<string, GraphVertex> {
    // Set of vertices we've already visited during DFS.
    const visitedSet: Record<string, VisitMetadata> = {};

    // Set of articulation points.
    const articulationPointsSet: Record<string, GraphVertex> = {};

    // Time needed to discover to the current vertex.
    let discoveryTime = 0;

    // Peek the start vertex for DFS traversal.
    const startVertex = graph.getAllVertices()[0]!;

    const dfsCallbacks = {

        enterVertex: ({currentVertex, previousVertex}: {
            currentVertex: GraphVertex;
            previousVertex: GraphVertex | null
        }) => {
            // Tick discovery time.
            discoveryTime++;

            // Put current vertex to visited set.
            visitedSet[currentVertex.getKey()] = new VisitMetadata(discoveryTime, discoveryTime);

            if (previousVertex) {
                // Update children counter for previous vertex.
                visitedSet[previousVertex.getKey()]!.independentChildrenCount += 1;
            }
        },

        leaveVertex: ({currentVertex, previousVertex}: {
            currentVertex: GraphVertex;
            previousVertex: GraphVertex | null
        }) => {
            if (previousVertex === null) {
                // Don't do anything for the root vertex if it is already current (not previous one)
                return;
            }

            // Update the low time with the smallest time of adjacent vertices.
            // Get minimum low discovery time from all neighbors.

            visitedSet[currentVertex.getKey()]!.lowDiscoveryTime = currentVertex.getNeighbors()
                .filter((earlyNeighbor) => earlyNeighbor.getKey() !== previousVertex.getKey())
                .reduce(
                    (lowestDiscoveryTime, neighbor) => {
                        const neighborLowTime = visitedSet[neighbor.getKey()]!.lowDiscoveryTime;
                        return neighborLowTime < lowestDiscoveryTime ? neighborLowTime : lowestDiscoveryTime;
                    },
                    visitedSet[currentVertex.getKey()]!.lowDiscoveryTime,
                );

            // Detect whether previous vertex is articulation point or not.
            // To do so we need to check two [OR] conditions:
            // 1. Is it a root vertex with at least two independent children.
            // 2. If its visited time is <= low time of adjacent vertex.
            if (previousVertex === startVertex) {
                // Check that root vertex has at least two independent children.
                if (visitedSet[previousVertex.getKey()]!.independentChildrenCount >= 2) {
                    articulationPointsSet[previousVertex.getKey()] = previousVertex;
                }
            } else {
                // Get current vertex low discovery time.
                const currentLowDiscoveryTime = visitedSet[currentVertex.getKey()]!.lowDiscoveryTime;

                // Compare current vertex low discovery time with parent discovery time. Check if there
                // are any short path (back edge) exists. If we can't get to current vertex other then
                // via parent then the parent vertex is articulation point for current one.
                const parentDiscoveryTime = visitedSet[previousVertex.getKey()]!.discoveryTime;
                if (parentDiscoveryTime <= currentLowDiscoveryTime) {
                    articulationPointsSet[previousVertex.getKey()] = previousVertex;
                }
            }
        },
        allowTraversal: ({nextVertex}: {
            currentVertex: GraphVertex;
            nextVertex: GraphVertex
        }) => {
            return !visitedSet[nextVertex.getKey()];
        },
    };

    // Do Depth First Search traversal over submitted graph.
    depthFirstSearch(graph, startVertex, dfsCallbacks);

    return articulationPointsSet;
}

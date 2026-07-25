import {depthFirstSearch} from '../depth_first_search/depthFirstSearch.ts';
import {GraphVertex} from "../../../data_structures/graph/GraphVertex.ts";
import {Graph} from "../../../data_structures/graph/Graph.ts";
import {GraphEdge} from "../../../data_structures/graph/GraphEdge.ts";

interface DfsCallbackPayload {
    currentVertex: GraphVertex;
    previousVertex: GraphVertex | null;
    nextVertex: GraphVertex;
}

interface DfsCallbacks {
    enterVertex?: (payload: Pick<DfsCallbackPayload, 'currentVertex'>) => void;
    leaveVertex?: (payload: Pick<DfsCallbackPayload, 'currentVertex' | 'previousVertex'>) => void;
    allowTraversal?: (payload: Pick<DfsCallbackPayload, 'nextVertex'>) => boolean;
}

interface VisitMetadataParams {
    discoveryTime: number;
    lowDiscoveryTime: number;
}

/**
 * Helper class for visited vertex metadata.
 */
class VisitMetadata {
    public discoveryTime: number;
    public lowDiscoveryTime: number;

    constructor({discoveryTime, lowDiscoveryTime}: VisitMetadataParams) {
        this.discoveryTime = discoveryTime;
        this.lowDiscoveryTime = lowDiscoveryTime;
    }
}

/**
 * Finds bridges in a given graph.
 */
export function graphBridges(graph: Graph): Record<string, GraphEdge> {
    // Set of vertices we've already visited during DFS.
    const visitedSet: Record<string, VisitMetadata> = {};

    // Set of bridges.
    const bridges: Record<string, GraphEdge> = {};

    // Time needed to discover to the current vertex.
    let discoveryTime = 0;

    // Peek the start vertex for DFS traversal.
    const startVertex = graph.getAllVertices()[0];

    const dfsCallbacks: DfsCallbacks = {
        /**
         * @param {GraphVertex} currentVertex
         */
        enterVertex: ({currentVertex}) => {
            // Tick discovery time.
            discoveryTime += 1;

            // Put current vertex to visited set.
            visitedSet[currentVertex.getKey()] = new VisitMetadata({
                discoveryTime,
                lowDiscoveryTime: discoveryTime,
            });
        },
        leaveVertex: ({currentVertex, previousVertex}) => {
            if (previousVertex === null) {
                // Don't do anything for the root vertex if it is already current (not previous one).
                return;
            }

            // Check if current node is connected to any early node other than previous one.
            visitedSet[currentVertex.getKey()]!.lowDiscoveryTime = currentVertex.getNeighbors()
                .filter((earlyNeighbor) => earlyNeighbor.getKey() !== previousVertex.getKey())
                .reduce(
                    (lowestDiscoveryTime: number, neighbor: GraphVertex) => {
                        const neighborLowTime = visitedSet[neighbor.getKey()]!.lowDiscoveryTime;
                        return neighborLowTime < lowestDiscoveryTime ? neighborLowTime : lowestDiscoveryTime;
                    },
                    visitedSet[currentVertex.getKey()]!.lowDiscoveryTime,
                );

            // Compare low discovery times. In case if current low discovery time is less than the one
            // in previous vertex then update previous vertex low time.
            const currentLowDiscoveryTime = visitedSet[currentVertex.getKey()]!.lowDiscoveryTime;
            const previousLowDiscoveryTime = visitedSet[previousVertex.getKey()]!.lowDiscoveryTime;
            if (currentLowDiscoveryTime < previousLowDiscoveryTime) {
                visitedSet[previousVertex.getKey()]!.lowDiscoveryTime = currentLowDiscoveryTime;
            }

            // Compare current vertex low discovery time with parent discovery time. Check if there
            // are any short path (back edge) exists. If we can't get to current vertex other than
            // via parent then the parent vertex is an articulation point for current one.
            const parentDiscoveryTime = visitedSet[previousVertex.getKey()]!.discoveryTime;
            if (parentDiscoveryTime < currentLowDiscoveryTime) {
                const bridge = graph.findEdge(previousVertex, currentVertex)!;
                bridges[bridge.getKey()] = bridge;
            }
        },
        allowTraversal: ({nextVertex}) => {
            return !visitedSet[nextVertex.getKey()];
        },
    };

    // Do Depth First Search traversal over submitted graph.
    depthFirstSearch(graph, startVertex!, dfsCallbacks);

    return bridges;
}
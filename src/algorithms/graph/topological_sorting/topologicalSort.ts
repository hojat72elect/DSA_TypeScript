import {depthFirstSearch} from '../depth_first_search/depthFirstSearch.ts';
import {Graph} from "../../../data_structures/graph/Graph.ts";
import {GraphVertex} from "../../../data_structures/graph/GraphVertex.ts";
import {Stack} from "../../../data_structures/stack/Stack.ts";


export function topologicalSort(graph: Graph): GraphVertex[] {
    // Create a set of all vertices we want to visit.
    const unvisitedSet: Record<string, GraphVertex> = {};
    graph.getAllVertices().forEach((vertex) => {
        unvisitedSet[vertex.getKey()] = vertex;
    });

    // Create a set for all vertices that we've already visited.
    const visitedSet: Record<string, GraphVertex> = {};

    // Create a stack of already ordered vertices.
    const sortedStack = new Stack();

    const dfsCallbacks: {
        enterVertex?: (args: { currentVertex: GraphVertex }) => void;
        leaveVertex?: (args: { currentVertex: GraphVertex }) => void;
        allowTraversal?: (args: { nextVertex: GraphVertex }) => boolean
    } = {
        enterVertex: ({currentVertex}) => {
            // Add vertex to visited set in case if all its children has been explored.
            visitedSet[currentVertex.getKey()] = currentVertex;

            // Remove this vertex from unvisited set.
            delete unvisitedSet[currentVertex.getKey()];
        },
        leaveVertex: ({currentVertex}) => {
            // If the vertex has been totally explored then we may push it to stack.
            sortedStack.push(currentVertex);
        },
        allowTraversal: ({nextVertex}) => {
            return !visitedSet[nextVertex.getKey()];
        },
    };

    // Let's go and do DFS for all unvisited nodes.
    while (Object.keys(unvisitedSet).length) {
        const currentVertexKey = Object.keys(unvisitedSet)[0]!;
        const currentVertex = unvisitedSet[currentVertexKey]!;

        // Do DFS for current node.
        depthFirstSearch(graph, currentVertex, dfsCallbacks);
    }

    return sortedStack.toArray();
}

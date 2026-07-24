import {DisjointSet} from '../../../../../DSA_TypeScript/src/data_structures/disjoint_set/DisjointSet.ts';
import {Graph} from "../../../../../DSA_TypeScript/src/data_structures/graph/Graph.ts";
import {GraphVertex} from "../../../../../DSA_TypeScript/src/data_structures/graph/GraphVertex.ts";

/**
 * Detect cycle in undirected graph using disjoint sets.
 */
export function detectUndirectedCycleUsingDisjointSet(graph: Graph) {
    // Create initial singleton disjoint sets for each graph vertex.
    const keyExtractor = (graphVertex: GraphVertex) => graphVertex.getKey();
    const disjointSet = new DisjointSet(keyExtractor);
    graph.getAllVertices().forEach((graphVertex) => disjointSet.makeSet(graphVertex));

    // Go through all graph edges one by one and check if edge vertices are from the
    // different sets. In this case joint those sets together. Do this until you find
    // an edge where to edge vertices are already in one set. This means that current
    // edge will create a cycle.
    let cycleFound = false;
    graph.getAllEdges().forEach((graphEdge) => {
        if (disjointSet.inSameSet(graphEdge.startVertex, graphEdge.endVertex)) {
            // Cycle found.
            cycleFound = true;
        } else {
            disjointSet.union(graphEdge.startVertex, graphEdge.endVertex);
        }
    });

    return cycleFound;
}

import {GraphVertex} from '../../../../../DSA_TypeScript/src/data_structures/graph/GraphVertex.ts';
import {GraphEdge} from '../../../../../DSA_TypeScript/src/data_structures/graph/GraphEdge.ts';
import {Graph} from '../../../../../DSA_TypeScript/src/data_structures/graph/Graph.ts';
import {detectUndirectedCycle} from '../../../../src/algorithms/graph/detect_cycle/detectUndirectedCycle.ts';
import {describe, expect, it} from "bun:test";

describe('detectUndirectedCycle', () => {
    it('should detect undirected cycle', () => {
        const vertexA = new GraphVertex('A');
        const vertexB = new GraphVertex('B');
        const vertexC = new GraphVertex('C');
        const vertexD = new GraphVertex('D');
        const vertexE = new GraphVertex('E');
        const vertexF = new GraphVertex('F');

        const edgeAF = new GraphEdge(vertexA, vertexF);
        const edgeAB = new GraphEdge(vertexA, vertexB);
        const edgeBE = new GraphEdge(vertexB, vertexE);
        const edgeBC = new GraphEdge(vertexB, vertexC);
        const edgeCD = new GraphEdge(vertexC, vertexD);
        const edgeDE = new GraphEdge(vertexD, vertexE);

        const graph = new Graph();
        graph
            .addEdge(edgeAF)
            .addEdge(edgeAB)
            .addEdge(edgeBE)
            .addEdge(edgeBC)
            .addEdge(edgeCD);

        expect(detectUndirectedCycle(graph)).toBeNull();

        graph.addEdge(edgeDE);

        expect(detectUndirectedCycle(graph)).toEqual({
            B: vertexC,
            C: vertexD,
            D: vertexE,
            E: vertexB,
        });
    });
});

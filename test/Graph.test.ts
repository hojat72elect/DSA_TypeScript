import {expect, test} from "bun:test";

import {SimpleGraph} from "../src/Graph";

test("General behavior of a simple graph", () => {
    const graph = new SimpleGraph();

    // Test initial state
    expect(graph.getNodeCount()).toBe(0);

    // Test adding vertices
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    expect(graph.getNodeCount()).toBe(3);

    // Test adding edges
    graph.addEdge("A", "B");
    graph.addEdge("B", "C");
    graph.addEdge("A", "C");

    // Test that graph structure is correct by checking internal adjacency list
    // Note: We need to access private members for testing, so we'll use type assertion
    const adjacencyList = (graph as any)._adjacencyList;

    expect(adjacencyList["A"].has("B")).toBe(true);
    expect(adjacencyList["A"].has("C")).toBe(true);
    expect(adjacencyList["B"].has("A")).toBe(true);
    expect(adjacencyList["B"].has("C")).toBe(true);
    expect(adjacencyList["C"].has("A")).toBe(true);
    expect(adjacencyList["C"].has("B")).toBe(true);
});

test("Adding single vertex", () => {
    const graph = new SimpleGraph();
    graph.addVertex("X");
    expect(graph.getNodeCount()).toBe(1);

    const adjacencyList = (graph as any)._adjacencyList;
    expect(adjacencyList["X"]).toBeDefined();
    expect(adjacencyList["X"].size).toBe(0);
});

test("Adding multiple vertices", () => {
    const graph = new SimpleGraph();
    const vertices = ["A", "B", "C", "D", "E"];

    vertices.forEach(vertex => graph.addVertex(vertex));

    expect(graph.getNodeCount()).toBe(5);

    const adjacencyList = (graph as any)._adjacencyList;
    vertices.forEach(vertex => {
        expect(adjacencyList[vertex]).toBeDefined();
        expect(adjacencyList[vertex].size).toBe(0);
    });
});

test("Adding single edge", () => {
    const graph = new SimpleGraph();
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addEdge("A", "B");

    const adjacencyList = (graph as any)._adjacencyList;
    expect(adjacencyList["A"].has("B")).toBe(true);
    expect(adjacencyList["B"].has("A")).toBe(true);
    expect(adjacencyList["A"].size).toBe(1);
    expect(adjacencyList["B"].size).toBe(1);
});

test("Adding multiple edges", () => {
    const graph = new SimpleGraph();
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addVertex("D");

    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.addEdge("B", "D");

    const adjacencyList = (graph as any)._adjacencyList;

    // Check A's connections
    expect(adjacencyList["A"].has("B")).toBe(true);
    expect(adjacencyList["A"].has("C")).toBe(true);
    expect(adjacencyList["A"].size).toBe(2);

    // Check B's connections
    expect(adjacencyList["B"].has("A")).toBe(true);
    expect(adjacencyList["B"].has("D")).toBe(true);
    expect(adjacencyList["B"].size).toBe(2);

    // Check C's connections
    expect(adjacencyList["C"].has("A")).toBe(true);
    expect(adjacencyList["C"].size).toBe(1);

    // Check D's connections
    expect(adjacencyList["D"].has("B")).toBe(true);
    expect(adjacencyList["D"].size).toBe(1);
});

test("Self-loop edge", () => {
    const graph = new SimpleGraph();
    graph.addVertex("A");
    graph.addEdge("A", "A");

    const adjacencyList = (graph as any)._adjacencyList;
    expect(adjacencyList["A"].has("A")).toBe(true);
    expect(adjacencyList["A"].size).toBe(1);
});

test("Graph with isolated vertices", () => {
    const graph = new SimpleGraph();
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addVertex("D");

    // Only connect A and B
    graph.addEdge("A", "B");

    const adjacencyList = (graph as any)._adjacencyList;

    // A and B should be connected
    expect(adjacencyList["A"].has("B")).toBe(true);
    expect(adjacencyList["B"].has("A")).toBe(true);

    // C and D should be isolated
    expect(adjacencyList["C"].size).toBe(0);
    expect(adjacencyList["D"].size).toBe(0);
});

test("Complete graph", () => {
    const graph = new SimpleGraph();
    const vertices = ["A", "B", "C", "D"];

    vertices.forEach(vertex => graph.addVertex(vertex));

    // Create a complete graph (every vertex connected to every other vertex)
    for (let i = 0; i < vertices.length; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
            graph.addEdge(vertices[i]!, vertices[j]!);
        }
    }

    const adjacencyList = (graph as any)._adjacencyList;

    // In a complete graph with n vertices, each vertex should have n-1 connections
    vertices.forEach(vertex => {
        expect(adjacencyList[vertex].size).toBe(vertices.length - 1);
    });
});

test("Linear chain graph", () => {
    const graph = new SimpleGraph();
    const vertices = ["A", "B", "C", "D", "E"];

    vertices.forEach(vertex => graph.addVertex(vertex));

    // Create a linear chain: A-B-C-D-E
    for (let i = 0; i < vertices.length - 1; i++) {
        graph.addEdge(vertices[i]!, vertices[i + 1]!);
    }

    const adjacencyList = (graph as any)._adjacencyList;

    // End vertices should have 1 connection
    expect(adjacencyList["A"].size).toBe(1);
    expect(adjacencyList["E"].size).toBe(1);

    // Middle vertices should have 2 connections
    expect(adjacencyList["B"].size).toBe(2);
    expect(adjacencyList["C"].size).toBe(2);
    expect(adjacencyList["D"].size).toBe(2);
});

test("Adding duplicate edges", () => {
    const graph = new SimpleGraph();
    graph.addVertex("A");
    graph.addVertex("B");

    graph.addEdge("A", "B");
    graph.addEdge("A", "B"); // Add the same edge again
    graph.addEdge("B", "A"); // Add the reverse edge (should be the same in undirected graph)

    const adjacencyList = (graph as any)._adjacencyList;

    // Should still only have one edge between A and B (Set prevents duplicates)
    expect(adjacencyList["A"].size).toBe(1);
    expect(adjacencyList["B"].size).toBe(1);
    expect(adjacencyList["A"].has("B")).toBe(true);
    expect(adjacencyList["B"].has("A")).toBe(true);
});

test("Empty graph", () => {
    const graph = new SimpleGraph();
    expect(graph.getNodeCount()).toBe(0);

    const adjacencyList = (graph as any)._adjacencyList;
    expect(Object.keys(adjacencyList).length).toBe(0);
});
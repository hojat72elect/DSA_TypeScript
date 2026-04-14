import {expect, test} from "bun:test";
import {SimpleGraph} from "../src/Graph";

test("General behavior of a simple graph", () => {
    const sut = new SimpleGraph();

    expect(sut.getNodeCount()).toBe(0);

    sut.addVertex("A");
    sut.addVertex("B");
    sut.addVertex("C");
    expect(sut.getNodeCount()).toBe(3);

    sut.addEdge("A", "B");
    sut.addEdge("B", "C");
    sut.addEdge("A", "C");

    const graphRepresentation = sut.toString();
    expect(graphRepresentation).toEqual("A--->  { B, C }\nB--->  { A, C }\nC--->  { B, A }\n");
});

test("Just a single vertex", () => {
    const sut = new SimpleGraph();
    sut.addVertex("X");
    expect(sut.getNodeCount()).toBe(1);

    const graphRepresentation = sut.toString();
    expect(graphRepresentation).toBe("X--->  { }\n");
});

test("multiple vertices without any edges", () => {
    const sut = new SimpleGraph();
    const vertices = ["A", "B", "C", "D", "E"];

    vertices.forEach(vertex => sut.addVertex(vertex));
    expect(sut.getNodeCount()).toBe(5);

    const graphRepresentation = sut.toString();
    expect(graphRepresentation).toEqual("A--->  { }\nB--->  { }\nC--->  { }\nD--->  { }\nE--->  { }\n");
});

test("2 vertices with 1 edge between them", () => {
    const sut = new SimpleGraph();
    sut.addVertex("A");
    sut.addVertex("B");
    sut.addEdge("A", "B");

    const graphRepresentation = sut.toString();
    expect(graphRepresentation).toEqual("A--->  { B }\nB--->  { A }\n");
});

test("4 vertices and 3 edges between them", () => {
    const sut = new SimpleGraph();
    sut.addVertex("A");
    sut.addVertex("B");
    sut.addVertex("C");
    sut.addVertex("D");

    sut.addEdge("A", "B");
    sut.addEdge("A", "C");
    sut.addEdge("B", "D");

    const graphRepresentation = sut.toString();
    expect(graphRepresentation).toEqual("A--->  { B, C }\nB--->  { A, D }\nC--->  { A }\nD--->  { B }\n");
});

test("Just one vertex with a loop edge", () => {
    const sut = new SimpleGraph();
    sut.addVertex("A");
    sut.addEdge("A", "A");

    const graphRepresentation = sut.toString();
    expect(graphRepresentation).toEqual("A--->  { A }\n");
});

test("Multiple vertices with just 1 edge", () => {
    const sut = new SimpleGraph();
    sut.addVertex("A");
    sut.addVertex("B");
    sut.addVertex("C");
    sut.addVertex("D");

    sut.addEdge("A", "B");

    const graphRepresentation = sut.toString();
    expect(graphRepresentation).toEqual("A--->  { B }\nB--->  { A }\nC--->  { }\nD--->  { }\n");
});

test("A complete graph", () => {
    const sut = new SimpleGraph();
    const vertices = ["A", "B", "C", "D"];

    vertices.forEach(vertex => sut.addVertex(vertex));

    // Create a complete graph (every vertex connected to every other vertex)
    for (let i = 0; i < vertices.length; i++) {
        for (let j = i + 1; j < vertices.length; j++) {
            sut.addEdge(vertices[i]!, vertices[j]!);
        }
    }

    const graphRepresentation = sut.toString();
    expect(graphRepresentation).toEqual("A--->  { B, C, D }\nB--->  { A, C, D }\nC--->  { A, B, D }\nD--->  { A, B, C }\n");
});

test("Linear chain graph (each vertex gets connected to the next vertex)", () => {
    const sut = new SimpleGraph();
    const vertices = ["A", "B", "C", "D", "E"];

    vertices.forEach(vertex => sut.addVertex(vertex));

    // Create a linear chain: A-B-C-D-E
    for (let i = 0; i < vertices.length - 1; i++) {
        sut.addEdge(vertices[i]!, vertices[i + 1]!);
    }

    const graphRepresentation = sut.toString();
    expect(graphRepresentation).toEqual("A--->  { B }\nB--->  { A, C }\nC--->  { B, D }\nD--->  { C, E }\nE--->  { D }\n");
});

test("Adding duplicate edges shouldn't make any changes", () => {
    const sut = new SimpleGraph();
    sut.addVertex("A");
    sut.addVertex("B");

    sut.addEdge("A", "B");
    sut.addEdge("A", "B");
    sut.addEdge("B", "A");

    const graphRepresentation = sut.toString();
    expect(graphRepresentation).toEqual("A--->  { B }\nB--->  { A }\n");
});

test("Empty graph", () => {
    const sut = new SimpleGraph();
    expect(sut.getNodeCount()).toBe(0);

    const graphRepresentation = sut.toString();
    expect(graphRepresentation).toEqual("");
});
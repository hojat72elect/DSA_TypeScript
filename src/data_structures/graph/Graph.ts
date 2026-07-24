import {GraphEdge} from "./GraphEdge.ts";
import {GraphVertex} from "./GraphVertex.ts";

export class Graph {
    public vertices: Record<string, GraphVertex>;
    public edges: Record<string, GraphEdge>;
    public isDirected: boolean;

    constructor(isDirected: boolean = false) {
        this.vertices = {};
        this.edges = {};
        this.isDirected = isDirected;
    }

    public addVertex(newVertex: GraphVertex) {
        const key = newVertex.getKey();

        if (this.vertices[key]) throw new Error('Vertex has already been added before');

        this.vertices[key] = newVertex;
        return this;
    }

    public getVertexByKey(vertexKey: string): GraphVertex | undefined {
        return this.vertices[vertexKey];
    }

    public getNeighbors(vertex: GraphVertex): GraphVertex[] {
        return vertex.getNeighbors();
    }

    public getAllVertices(): GraphVertex[] {
        return Object.values(this.vertices);
    }

    public getAllEdges(): GraphEdge[] {
        return Object.values(this.edges);
    }

    addEdge(edge: GraphEdge): Graph {
        // Try to find and end start vertices.
        let startVertex = this.getVertexByKey(edge.startVertex.getKey());
        let endVertex = this.getVertexByKey(edge.endVertex.getKey());

        // Insert start vertex if it wasn't inserted.
        if (!startVertex) {
            this.addVertex(edge.startVertex);
            startVertex = this.getVertexByKey(edge.startVertex.getKey());
        }

        // Insert end vertex if it wasn't inserted.
        if (!endVertex) {
            this.addVertex(edge.endVertex);
            endVertex = this.getVertexByKey(edge.endVertex.getKey());
        }

        // Check if edge has been already added.
        if (this.edges[edge.getKey()]) {
            throw new Error('Edge has already been added before');
        } else {
            this.edges[edge.getKey()] = edge;
        }

        // Add edge to the vertices.
        if (this.isDirected) {
            // If graph IS directed then add the edge only to start vertex.
            startVertex?.addEdge(edge);
        } else {
            // If graph ISN'T directed then add the edge to both vertices.
            startVertex?.addEdge(edge);
            endVertex?.addEdge(edge);
        }

        return this;
    }

    public deleteEdge(edge: GraphEdge) {
        // Delete edge from the list of edges.
        if (this.edges[edge.getKey()]) {
            delete this.edges[edge.getKey()];
        } else {
            throw new Error('Edge not found in graph');
        }

        // Try to find and end start vertices and delete edge from them.
        const startVertex = this.getVertexByKey(edge.startVertex.getKey());
        const endVertex = this.getVertexByKey(edge.endVertex.getKey());

        startVertex?.deleteEdge(edge);
        endVertex?.deleteEdge(edge);
    }

    public findEdge(startVertex: GraphVertex, endVertex: GraphVertex): GraphEdge | null {
        const vertex = this.getVertexByKey(startVertex.getKey());

        if (!vertex) return null;
        return vertex.findEdge(endVertex);
    }

    public getWeight() {
        return this.getAllEdges().reduce((weight, graphEdge) => {
            return weight + graphEdge.weight;
        }, 0);
    }

    /**
     * Reverse all the edges in directed graph.
     */
    public reverse(): Graph {

        this.getAllEdges().forEach((edge: GraphEdge) => {
            // Delete straight edge from graph and from vertices.
            this.deleteEdge(edge);

            // Reverse the edge.
            edge.reverse();

            // Add reversed edge back to the graph and its vertices.
            this.addEdge(edge);
        });

        return this;
    }

    public getVerticesIndices(): Record<string, number> {
        const verticesIndices: Record<string, number> = {};
        this.getAllVertices().forEach((vertex: GraphVertex, index: number) => {
            verticesIndices[vertex.getKey()] = index;
        });

        return verticesIndices;
    }

    public getAdjacencyMatrix(): number[][] {
        const vertices = this.getAllVertices();
        const verticesIndices = this.getVerticesIndices();

        // Init matrix with infinities meaning that there is no ways of
        // getting from one vertex to another yet.
        const adjacencyMatrix: number[][] = Array(vertices.length)
            .fill(null)
            .map(() => {
                return Array(vertices.length).fill(Infinity);
            });

        // Fill the columns.
        vertices.forEach((vertex: GraphVertex, vertexIndex: number) => {
            vertex.getNeighbors().forEach((neighbor: GraphVertex) => {
                const neighborIndex = verticesIndices[neighbor.getKey()];
                const edge = this.findEdge(vertex, neighbor);
                adjacencyMatrix[vertexIndex]![neighborIndex!] = edge ? edge.weight : Infinity;
            });
        });

        return adjacencyMatrix;
    }

    public toString() {
        return Object.keys(this.vertices).toString();
    }
}

import {GraphEdge} from "./GraphEdge.ts";
import {LinkedListNode, SinglyLinkedList} from "../linked_list/SinglyLinkedList.ts";

export class GraphVertex {
    public value: any;
    public edges: SinglyLinkedList<GraphEdge>;

    constructor(value: any) {
        if (value === undefined) throw new Error('Graph vertex must have a value');

        const edgeComparator = (edgeA: GraphEdge, edgeB: GraphEdge): number => {
            if (edgeA.getKey() === edgeB.getKey()) {
                return 0;
            }

            return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
        };

        // Normally you would store a string value like a vertex name,
        // but it may be any object as well.
        this.value = value;
        this.edges = new SinglyLinkedList<GraphEdge>(edgeComparator);
    }

    public addEdge(edge: GraphEdge): this {
        this.edges.append(edge);

        return this;
    }

    public deleteEdge(edge: GraphEdge): void {
        this.edges.delete(edge);
    }

    public getNeighbors(): GraphVertex[] {
        const edges = this.edges.toArray();

        const neighborsConverter = (node: LinkedListNode<GraphEdge>): GraphVertex => {
            return node.data.startVertex === this ? node.data.endVertex : node.data.startVertex;
        };

        // Return either start or end vertex.
        // For undirected graphs it is possible that current vertex will be the end one.
        return edges.map(neighborsConverter);
    }

    public getEdges(): GraphEdge[] {
        return this.edges.toArray().map((linkedListNode: LinkedListNode<GraphEdge>) => linkedListNode.data);
    }

    public getDegree(): number {
        return this.edges.toArray().length;
    }

    public hasEdge(requiredEdge: GraphEdge): boolean {
        const edgeNode = this.edges.find(undefined, (edge: GraphEdge) => edge.getKey() === requiredEdge.getKey());

        return !!edgeNode;
    }

    public hasNeighbor(vertex: GraphVertex): boolean {
        const vertexNode = this.edges.find(undefined, (edge: GraphEdge) => edge.startVertex === vertex || edge.endVertex === vertex);

        return !!vertexNode;
    }

    public findEdge(vertex: GraphVertex): GraphEdge | null {
        const edgeFinder = (edge: GraphEdge): boolean => {
            return edge.startVertex === vertex || edge.endVertex === vertex;
        };

        const edge = this.edges.find(undefined, edgeFinder);

        return edge ? edge.data : null;
    }

    public getKey(): string {
        return String(this.value);
    }

    public deleteAllEdges(): this {
        this.getEdges().forEach((edge: GraphEdge) => this.deleteEdge(edge));

        return this;
    }

    public toString(callback?: (value: any) => string): string {
        return callback ? callback(this.value) : String(this.value);
    }
}
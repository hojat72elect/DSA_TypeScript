import {GraphVertex} from "./GraphVertex.ts";

export class GraphEdge {
    public startVertex: GraphVertex;
    public endVertex: GraphVertex;
    public weight: number;
    public key: string | null;

    constructor(
        startVertex: GraphVertex,
        endVertex: GraphVertex,
        weight: number = 0,
        key: string | null = null
    ) {
        this.startVertex = startVertex;
        this.endVertex = endVertex;
        this.weight = weight;
        this.key = key;
    }

    public getKey() {
        if (this.key) return this.key;

        const startVertexKey = this.startVertex.getKey();
        const endVertexKey = this.endVertex.getKey();

        this.key = `${startVertexKey}_${endVertexKey}`;

        return this.key;
    }

    /**
     * Reverses the direction of the edge (in directed graphs).
     */
    reverse(): GraphEdge {
        const tmp = this.startVertex;
        this.startVertex = this.endVertex;
        this.endVertex = tmp;

        return this;
    }

    toString() {
        return this.getKey().toString();
    }
}

/**
 * This is the simplest possible graph there is, it's undirected and unweighted.
 * All the connections are both ways, and edges do not have any weights
 * assigned to them.
 */
export class SimpleGraph {
    private _numberOfNodes: number;

    // This is an index signature which is how we define key-value pairs in TypeScript
    private readonly _adjacencyList: { [index: string]: Set<string> };

    constructor() {
        this._numberOfNodes = 0;
        this._adjacencyList = {};
    }

    public getNodeCount(): number {
        return this._numberOfNodes;
    }

    public addVertex(node: string) {
        this._adjacencyList[node] = new Set<string>();
        this._numberOfNodes++;
    }

    public addEdge(node1: string, node2: string) {
        this._adjacencyList[node1]!.add(node2);
        this._adjacencyList[node2]!.add(node1);
    }

    /**
     * This function is only used for debugging purposes.
     */
    private toString(): string {
        const allNodes = Object.keys(this._adjacencyList);
        let graphRepresentation = "";
        for (let node of allNodes) {
            const nodeConnections = this._adjacencyList[node]!;
            let count = 0;
            let connections = "  { ";
            for (let vertex of nodeConnections) {
                connections += vertex + (count < nodeConnections.size - 1 ? ", " : " ");
                count++;
            }
            graphRepresentation += (node + "--->" + connections + "}\n");
        }
        return graphRepresentation;
    }

    public print() {
        console.log(this.toString());
    }
}
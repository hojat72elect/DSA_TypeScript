/**
 * The minimalistic (ad hoc) version of a MaxHeap data structure that doesn't have
 * external dependencies and that is easy to copy-paste and use during the
 * coding interview if allowed by the interviewer (since many data
 * structures in JS are missing).
 */
export class MaxHeapAdhoc<T> {
    private heap: T[];

    constructor(initialHeap: T[] = []) {
        // The "initialHeap" will be assigned to "heap"
        this.heap = [];
        initialHeap.forEach(item => this.add(item));
    }

    public add(item: T) {
        this.heap.push(item);
        this.heapifyUp();
    }

    public peek(): T | null {
        return this.heap[0] ? this.heap[0] : null;
    }

    public poll(): T | null {
        if (this.heap.length === 0) return null;
        const top = this.heap[0] ? this.heap[0] : null;
        const last = this.heap.pop();

        if (this.heap.length > 0 && last !== undefined) {
            this.heap[0] = last;
            this.heapifyDown();
        }

        return top;
    }

    public isEmpty() {
        return this.heap.length === 0;
    }

    toString() {
        return this.heap.join(",");
    }

    private getLeftChildIndex(parentIndex: number) {
        return (2 * parentIndex) + 1;
    }

    private getRightChildIndex(parentIndex: number) {
        return (2 * parentIndex) + 2;
    }

    private getParentIndex(childIndex: number) {
        return Math.floor((childIndex - 1) / 2);
    }

    private hasLeftChild(parentIndex: number) {
        return this.getLeftChildIndex(parentIndex) < this.heap.length;
    }

    private hasRightChild(parentIndex: number) {
        return this.getRightChildIndex(parentIndex) < this.heap.length;
    }

    private leftChild(parentIndex: number): T | undefined {
        return this.heap[this.getLeftChildIndex(parentIndex)];
    }

    private rightChild(parentIndex: number): T | undefined {
        return this.heap[this.getRightChildIndex(parentIndex)];
    }

    private swap(indexOne: number, indexTwo: number) {
        const tmp = this.heap[indexTwo]!;
        this.heap[indexTwo] = this.heap[indexOne]!;
        this.heap[indexOne] = tmp;
    }

    private heapifyUp() {
        let nodeIndex = this.heap.length - 1;
        while (nodeIndex > 0) {
            const parentIndex = this.getParentIndex(nodeIndex);
            if (this.heap[parentIndex]! >= this.heap[nodeIndex]!) break;
            this.swap(parentIndex, nodeIndex);
            nodeIndex = parentIndex;
        }
    }

    private heapifyDown() {
        let nodeIndex = 0;

        while (
            (this.hasLeftChild(nodeIndex) && this.heap[nodeIndex]! < this.leftChild(nodeIndex)!) ||
            (this.hasRightChild(nodeIndex) && this.heap[nodeIndex]! < this.rightChild(nodeIndex)!)
            ) {
            const leftIndex = this.getLeftChildIndex(nodeIndex);
            const rightIndex = this.getRightChildIndex(nodeIndex);
            const left = this.leftChild(nodeIndex)!;
            const right = this.rightChild(nodeIndex)!;

            if (this.hasLeftChild(nodeIndex) && this.hasRightChild(nodeIndex)) {
                if (left >= right) {
                    this.swap(leftIndex, nodeIndex);
                    nodeIndex = leftIndex;
                } else {
                    this.swap(rightIndex, nodeIndex);
                    nodeIndex = rightIndex;
                }
            } else if (this.hasLeftChild(nodeIndex)) {
                this.swap(leftIndex, nodeIndex);
                nodeIndex = leftIndex;
            }
        }
    }
}
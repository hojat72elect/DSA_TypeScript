/**
 * The minimalistic (ad hoc) version of a MinHeap data structure that doesn't have
 * external dependencies and that is easy to copy-paste and use during the
 * coding interview if allowed by the interviewer (since many data
 * structures in JS are missing).
 */
export class MinHeapAdhoc<T> {
    private heap: T[];

    constructor(initialHeap: T[] = []) {
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

    poll(): T | null {
        if (this.heap.length === 0) return null;
        const top = this.heap[0] ? this.heap[0] : null;
        this.heap[0] = this.heap[this.heap.length - 1]!;
        this.heap.pop();
        this.heapifyDown();
        return top;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    toString() {
        return this.heap.join(',');
    }

    heapifyUp() {
        let nodeIndex = this.heap.length - 1;
        while (nodeIndex > 0) {
            const parentIndex = this.getParentIndex(nodeIndex);
            if (this.heap[parentIndex]! <= this.heap[nodeIndex]!) break;
            this.swap(parentIndex, nodeIndex);
            nodeIndex = parentIndex;
        }
    }

    heapifyDown() {
        let nodeIndex = 0;

        while (
            (this.hasLeftChild(nodeIndex) && this.heap[nodeIndex]! > this.leftChild(nodeIndex)!)
            || (this.hasRightChild(nodeIndex) && this.heap[nodeIndex]! > this.rightChild(nodeIndex)!)
            ) {
            const leftIndex = this.getLeftChildIndex(nodeIndex);
            const rightIndex = this.getRightChildIndex(nodeIndex);
            const left = this.leftChild(nodeIndex)!;
            const right = this.rightChild(nodeIndex)!;

            if (this.hasLeftChild(nodeIndex) && this.hasRightChild(nodeIndex)) {
                if (left <= right) {
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

    getLeftChildIndex(parentIndex: number) {
        return 2 * parentIndex + 1;
    }

    getRightChildIndex(parentIndex: number) {
        return 2 * parentIndex + 2;
    }

    getParentIndex(childIndex: number) {
        return Math.floor((childIndex - 1) / 2);
    }

    hasLeftChild(parentIndex: number) {
        return this.getLeftChildIndex(parentIndex) < this.heap.length;
    }

    hasRightChild(parentIndex: number) {
        return this.getRightChildIndex(parentIndex) < this.heap.length;
    }

    leftChild(parentIndex: number) {
        return this.heap[this.getLeftChildIndex(parentIndex)];
    }

    rightChild(parentIndex: number) {
        return this.heap[this.getRightChildIndex(parentIndex)];
    }

    swap(indexOne: number, indexTwo: number) {
        const tmp = this.heap[indexTwo]!;
        this.heap[indexTwo] = this.heap[indexOne]!;
        this.heap[indexOne] = tmp;
    }
}
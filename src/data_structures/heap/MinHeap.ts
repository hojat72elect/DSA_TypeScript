import {Heap} from './Heap.ts';

export class MinHeap<T> extends Heap<T> {
    /**
     * Checks if pair of heap elements is in correct order.
     * For MinHeap the first element must be always smaller or equal.
     * For MaxHeap the first element must be always bigger or equal.
     */
    pairIsInCorrectOrder(firstElement: T, secondElement: T) {
        return this.compare.lessThanOrEqual(firstElement, secondElement);
    }
}

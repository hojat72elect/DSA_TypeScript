import Sort from '../Sort.ts';
import {MinHeap} from "../../../data_structures/heap/MinHeap.ts";

export class HeapSort<T> extends Sort<T> {
    public override sort(originalArray: T[]): T[] {
        const sortedArray: T[] = [];
        const minHeap = new MinHeap<T>(this.callbacks.compareCallback);

        // Insert all array elements to the heap.
        originalArray.forEach((element) => {
            // Call visiting callback.
            this.callbacks.visitingCallback(element);

            minHeap.add(element);
        });

        // Now we have min heap with minimal element always on top.
        // Let's poll that minimal element one by one and thus form the sorted array.
        while (!minHeap.isEmpty()) {
            const nextMinElement = minHeap.poll()!;

            // Call visiting callback.
            this.callbacks.visitingCallback(nextMinElement);

            sortedArray.push(nextMinElement);
        }

        return sortedArray;
    }
}

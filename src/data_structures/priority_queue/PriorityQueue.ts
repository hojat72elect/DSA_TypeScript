import {MinHeap} from '../heap/MinHeap';
import {Comparator} from "../../utils/comparator/Comparator.ts";


/**
 * It is the same as min heap except that when comparing two elements,
 * we take into account its priority instead of the element's value.
 *
 * A lower number for priority means that item has `higher` priority in the queue.
 */
export class PriorityQueue<T> extends MinHeap<T> {
    protected override compare: Comparator;
    protected priorities: Map<T, number>;

    constructor() {
        // Call MinHip constructor first.
        super();

        // Setup priorities map.
        this.priorities = new Map();

        // Use custom comparator for heap elements that will take element priority
        // instead of element value into account.
        this.compare = new Comparator(this.comparePriority.bind(this));
    }

    /**
     * Add item to the priority queue.
     * @param item - item we're going to add to the queue.
     * @param priority - items priority.
     */
    addItemWithPriority(item: T, priority: number = 0): PriorityQueue<T> {
        this.priorities.set(item, priority);
        super.add(item);
        return this;
    }

    /**
     * Remove item from priority queue.
     * @param item - item we're going to remove.
     * @param [customFindingComparator] - custom function for finding the item to remove.
     */
    removeItemWithPriority(item: T, customFindingComparator?: Comparator): PriorityQueue<T> {
        super.remove(item, customFindingComparator);
        this.priorities.delete(item);
        return this;
    }

    /**
     * Change priority of the item in a queue.
     * @param item - item we're going to re-prioritize.
     * @param priority - new item's priority.
     */
    changePriority(item: T, priority: number): PriorityQueue<T> {
        this.remove(item, new Comparator(this.compareValue));
        this.addItemWithPriority(item, priority);
        return this;
    }

    /**
     * Find item by its value.
     */
    findByValue(item: T): number[] {
        return this.find(item, new Comparator(this.compareValue));
    }

    /**
     * Check if item already exists in a queue.
     */
    hasValue(item: T): boolean {
        return this.findByValue(item).length > 0;
    }

    /**
     * Compares priorities of two items.
     */
    comparePriority(a: T, b: T): number {
        if (this.priorities.get(a) === this.priorities.get(b)) {
            return 0;
        }
        return this.priorities.get(a)! < this.priorities.get(b)! ? -1 : 1;
    }

    /**
     * Compares values of two items.
     */
    compareValue(a: T, b: T): number {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    }
}

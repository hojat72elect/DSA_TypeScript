import {LinkedList} from "../linked_list/LinkedList.ts";

/**
 * We implemented Stack based on LinkedList since these
 * structures are quite similar. Compare push/pop operations of the Stack
 * with prepend/deleteHead operations of LinkedList.
 */
export class Stack<T> {

    private readonly linkedList: LinkedList<T>;

    constructor() {
        this.linkedList = new LinkedList();
    }

    getList() {
        return this.linkedList;
    }

    isEmpty(): boolean {
        return !this.linkedList.head; // The list doesn't have a head
    }

    /**
     * Reads the value from the top of the stack, without removing it.
     */
    peek(): T | null {
        if (this.isEmpty()) return null;

        return this.linkedList.head?.value;
    }

    /**
     * Lays the new value on top of the stack.
     */
    push(value: T) {
        this.linkedList.prepend(value);
    }

    pop(): T | null {
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.value : null;
    }

    toArray(): T[] {
        return this.linkedList
            .toArray()
            .map((node) => node.value);
    }

    toString(callback?: (value: T) => string) {
        return this.linkedList.toString(callback);
    }
}
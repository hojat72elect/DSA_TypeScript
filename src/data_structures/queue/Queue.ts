import {SinglyLinkedList} from "../linked_list/SinglyLinkedList.ts";

/**
 * We're going to implement `Queue` based on `LinkedList` since the two
 * structures are quite similar. Namely, they both operate mostly on
 * the elements at the beginning and the end. Compare enqueue/dequeue
 * operations of Queue with append/deleteHead operations of LinkedList.
 */
export class Queue {
    linkedList: SinglyLinkedList<any>;

    constructor() {
        this.linkedList = new SinglyLinkedList<any>();
    }

    isEmpty(): boolean {
        return !this.linkedList.head;
    }

    /**
     * Read the element at the front of the queue without removing it.
     */
    peek() {
        if (this.isEmpty()) return null;

        return this.linkedList.head?.data;
    }

    /**
     * Add a new element to the end of the queue (the tail of the linked list).
     * This element will be processed after all elements ahead of it.
     */
    enqueue(value: any) {
        this.linkedList.append(value);
    }

    /**
     * Remove the element at the front of the queue (the head of the linked list).
     * If the queue is empty, return null.
     */
    dequeue() {
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.data : null;
    }
}
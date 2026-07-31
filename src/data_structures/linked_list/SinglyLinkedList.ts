import {Comparator} from "../../utils/comparator/Comparator.ts";

/**
 * This node is only used for a singly linked list.
 */
export class LinkedListNode<T> {
    data: T;
    next: LinkedListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

export class SinglyLinkedList<T> {
    head: LinkedListNode<T> | null;
    tail: LinkedListNode<T> | null;
    protected compare: Comparator;
    private length: number;

    constructor(comparatorFunction?: (a: T, b: T) => number) {
        this.head = null;
        this.tail = null;
        this.compare = new Comparator(comparatorFunction);
        this.length = 0;
    }

    /**
     * Add an item to the end of the list.
     */
    append(data: T): SinglyLinkedList<T> {
        const newNode = new LinkedListNode(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }

        this.length++;
        return this;
    }

    /**
     * Add an item to the beginning of the list.
     */
    prepend(data: T) {
        const newNode = new LinkedListNode(data);
        newNode.next = this.head;
        this.head = newNode;

        if (!this.tail) this.tail = newNode; // The list has been empty, we need to update the tail as well

        this.length++;
    }

    /**
     * Deletes the first occurrence of the `data` if it exists.
     */
    delete(value: T): LinkedListNode<T> | null {
        if (!this.head) return null;

        let deletedNode = null;
        let deletedCount = 0;

        while (this.head && this.compare.equal(this.head.data, value)) {
            deletedNode = this.head;
            this.head = this.head.next;
            deletedCount++;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            while (currentNode?.next) {
                if (this.compare.equal(currentNode.next.data, value)) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                    deletedCount++;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        // Check if tail must be deleted.
        if (this.compare.equal(this.tail?.data, value)) {
            this.tail = currentNode;
        }

        this.length -= deletedCount;
        return deletedNode;
    }

    size() {
        return this.length;
    }

    insert(value: T, rawIndex: number): SinglyLinkedList<T> {
        if (rawIndex < 0 || rawIndex > this.length) {
            throw new Error(`Index ${rawIndex} is out of bounds for LinkedList of length ${this.length}`);
        }

        if (rawIndex === 0) {
            this.prepend(value);
            return this;
        }

        if (rawIndex === this.length) {
            this.append(value);
            return this;
        }

        // We're inserting somewhere in the middle
        let previousNode = this.head!;
        for (let i = 0; i < rawIndex - 1; i++) {
            previousNode = previousNode.next!;
        }

        const newNode = new LinkedListNode(value);
        newNode.next = previousNode.next;
        previousNode.next = newNode;
        this.length++;

        return this;
    }

    find(value?: T, callback?: (value: T) => boolean): LinkedListNode<T> | null {

        if (!this.head) return null;

        let currentNode = this.head;
        while (currentNode) {
            if (callback && callback(currentNode.data)) return currentNode;

            if (value !== undefined && this.compare.equal(currentNode.data, value)) return currentNode;

            currentNode = currentNode.next!;
        }

        return null
    }

    deleteHead(): LinkedListNode<T> | null {
        if (!this.head) return null;

        const removedNode = this.head;
        this.head = this.head.next;
        this.length--;

        if (this.length === 0) this.tail = null;

        removedNode.next = null;
        return removedNode;
    }

    deleteTail(): LinkedListNode<T> | null {
        if (!this.head) return null;

        const removedNode = this.tail;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            this.length = 0;
            return removedNode;
        }

        let currentNode = this.head;
        while (currentNode.next !== this.tail) {
            currentNode = currentNode.next!;
        }

        this.tail = currentNode;
        this.tail.next = null;
        this.length--;

        return removedNode;
    }

    static fromArray<T>(values: T[]): SinglyLinkedList<T> {
        const list = new SinglyLinkedList<T>();

        for (const value of values) {
            list.append(value);
        }
        return list;
    }

    toArray(): LinkedListNode<T>[] {
        const nodes: LinkedListNode<T>[] = [];
        let currentNode = this.head;

        while (currentNode !== null) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    toString(stringifier?: (value: T) => string): string {
        const elements: string[] = [];
        let currentNode = this.head;

        while (currentNode !== null) {
            elements.push(stringifier ? stringifier(currentNode.data) : String(currentNode.data));
            currentNode = currentNode.next;
        }

        return elements.join(",") || "";
    }
}
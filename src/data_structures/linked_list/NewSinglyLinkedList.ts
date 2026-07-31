import {Comparator} from "../../utils/comparator/Comparator.ts";

/**
 * This node is only used for a singly linked list.
 */
export class NewLinkedListNode<T> {
    data: T;
    next: NewLinkedListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

export class NewSinglyLinkedList<T> {
    head: NewLinkedListNode<T> | null;
    tail: NewLinkedListNode<T> | null;
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
    append(data: T): NewSinglyLinkedList<T> {
        const newNode = new NewLinkedListNode(data);

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
        const newNode = new NewLinkedListNode(data);
        newNode.next = this.head;
        this.head = newNode;

        if (!this.tail) this.tail = newNode; // The list has been empty, we need to update the tail as well

        this.length++;
    }

    /**
     * Deletes the first occurrence of the `data` if it exists.
     */
    delete(value: T): NewLinkedListNode<T> | null {
        if (!this.head) return null;

        let deletedNode = null;

        while (this.head && this.compare.equal(this.head.data, value)) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;

        if (currentNode !== null) {
            while (currentNode?.next) {
                if (this.compare.equal(currentNode.next.data, value)) {
                    deletedNode = currentNode.next;
                    currentNode.next = currentNode.next.next;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        // Check if tail must be deleted.
        if (this.compare.equal(this.tail?.data, value)) {
            this.tail = currentNode;
        }

        return deletedNode;
    }

    print() {
        const elements: T[] = [];
        let currentNode = this.head;

        while (currentNode !== null) {
            elements.push(currentNode.data);
            currentNode = currentNode.next;
        }

        console.log(elements.join(" -> ") || "Empty List");
    }

    size() {
        return this.length;
    }

    insert(value: T, rawIndex: number): NewSinglyLinkedList<T> {
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

        const newNode = new NewLinkedListNode(value);
        newNode.next = previousNode.next;
        previousNode.next = newNode;
        this.length++;

        return this;
    }

    find(value?: T, callback?: (value: T) => boolean): NewLinkedListNode<T> | null {

        if (!this.head) return null;

        let currentNode = this.head;
        while (currentNode) {
            if (callback && callback(currentNode.data)) return currentNode;

            if (value !== undefined && currentNode.data === value) return currentNode;

            currentNode = currentNode.next!;
        }

        return null
    }

    deleteHead(): NewLinkedListNode<T> | null {
        if (!this.head) return null;

        const removedNode = this.head;
        this.head = this.head.next;
        this.length--;

        if (this.length === 0) this.tail = null;

        removedNode.next = null;
        return removedNode;
    }

    deleteTail(): NewLinkedListNode<T> | null {
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

    static fromArray<T>(values: T[]): NewSinglyLinkedList<T> {
        const list = new NewSinglyLinkedList<T>();

        for (const value of values) {
            list.append(value);
        }
        return list;
    }

    toArray(): NewLinkedListNode<T>[] {
        const nodes: NewLinkedListNode<T>[] = [];
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
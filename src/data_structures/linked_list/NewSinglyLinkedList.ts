/**
 * This node is only used for a singly linked list.
 */
class NewLinkedListNode<T> {
    data: T;
    next: NewLinkedListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

class NewSinglyLinkedList<T> {
    head: NewLinkedListNode<T> | null;
    tail: NewLinkedListNode<T> | null;
    private length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * Add an item to the end of the list.
     */
    append(data: T) {
        const newNode = new NewLinkedListNode(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }

        this.length++;
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
    delete(data: T) {
        if (!this.head) return; // list is empty

        if (this.head.data === data) {
            // delete the head node
            this.head = this.head.next;

            if (!this.head) this.tail = null; // the list has become empty, the tail should be updated accordingly

            this.length--;
            return;
        }

        // Delete a middle or tail node
        let currentNode = this.head;
        while (currentNode.next !== null && currentNode.next.data !== data) {
            currentNode = currentNode.next;
        }

        if (currentNode.next !== null) {
            if (currentNode.next === this.tail) {
                this.tail = currentNode; // We're deleting the tail
            }

            currentNode.next = currentNode.next.next;
            this.length--;
        }
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

        const newNode = new NewLinkedListNode(value);
        if (this.length === 0) {
            // List is currently empty
            this.head = newNode;
            this.tail = newNode;
            this.length++;
            return this;
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

        newNode.next = previousNode.next;
        previousNode.next = newNode;
        this.length++;

        return this;
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
}
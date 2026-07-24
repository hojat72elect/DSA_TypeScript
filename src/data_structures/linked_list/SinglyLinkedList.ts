/**
 * The special kind of node that we're going to only use for a SinglyLinkedList.
 */
class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }

    /**
     * This function is only used for debugging and testing purposes.
     */
    toString(): string {
        if (this.next !== null) {
            return `${this.value} -> ${this.next.toString()}`;
        } else {
            return `${this.value}`;
        }
    }
}

export class SinglyLinkedList<T> {
    private _headNode: Node<T> | null;
    private _tailNode: Node<T> | null;
    private _size: number;

    constructor(data: T[] = []) {
        this._headNode = null;
        this._tailNode = null;
        this._size = 0;

        for (const element of data) {
            this.append(element);
        }
    }

    isEmpty() {
        return this._size === 0;
    }

    /**
     * Add a new node to the beginning (i.e. front) of the list.
     */
    prepend(value: T) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this._headNode = newNode;
            this._tailNode = newNode;
        } else {
            newNode.next = this._headNode;
            this._headNode = newNode;
        }

        this._size++;
    }

    /**
     * Add a new node to the end of the list.
     */
    append(value: T) {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this._headNode = newNode;
            this._tailNode = newNode;
        } else {
            this._tailNode!.next = newNode;
            this._tailNode = newNode;
        }

        this._size++;
    }

    /**
     * Insert a new node at a specific index. nodes of this list are indexed starting from 0.
     */
    insertAt(value: T, index: number) {
        if (index < 0 || index > this._size)
            throw new Error("Index out of bounds");

        if (index === 0) {
            this.prepend(value);
            return;
        }

        if (index === this._size) {
            this.append(value);
            return;
        }

        const newNode = new Node(value);
        let currentNode = this._headNode;
        let previousNode: Node<T> | null = null;
        let currentIndex = 0;

        while (currentIndex !== index) {
            previousNode = currentNode;
            currentNode = currentNode!.next;
            currentIndex++;
        }
        // Right now, we're in the exact index we are supposed to insert the new node
        previousNode!.next = newNode;
        newNode.next = currentNode;
        this._size++;
    }

    /**
     * Removes an element from the beginning of the linked list. It also is called "popping" the linked list.
     */
    removeFromFront(): T | null {
        if (this.isEmpty()) return null;

        const removedValue = this._headNode!.value;

        if (this._size === 1) {
            this._headNode = null;
            this._tailNode = null;
        } else {
            this._headNode = this._headNode!.next;
        }

        this._size--;
        return removedValue;
    }

    /**
     * Removes an element from the end of the linked list (the last element).
     */
    removeFromEnd(): T | null {
        if (this.isEmpty()) return null;

        const removedValue = this._tailNode!.value;

        if (this._size === 1) {
            this._headNode = null;
            this._tailNode = null;
        } else {
            let currentNode = this._headNode;
            while (currentNode!.next !== this._tailNode) {
                currentNode = currentNode!.next;
            }
            // Right now, the currentNode contains the node before the tail node
            currentNode!.next = null;
            this._tailNode = currentNode;
        }

        this._size--;
        return removedValue;
    }

    removeAt(index: number): T | null {
        if (index < 0 || index >= this._size) {
            throw new Error("Index out of bounds");
        }

        if (index === 0) {
            return this.removeFromFront();
        }

        if (index === this._size - 1) {
            return this.removeFromEnd();
        }

        let currentNode = this._headNode;
        let previousNode: Node<T> | null = null;
        let currentIndex = 0;

        while (currentIndex < index) {
            previousNode = currentNode;
            currentNode = currentNode!.next;
            currentIndex++;
        }

        previousNode!.next = currentNode!.next;
        this._size--;
        return currentNode!.value;
    }

    /**
     * Removes the first occurrence of the value.
     */
    remove(value: T): boolean {
        if (this.isEmpty()) {
            return false;
        }

        if (this._headNode!.value === value) {
            this.removeFromFront();
            return true;
        }

        let current = this._headNode;
        let previous: Node<T> | null = null;

        while (current !== null) {
            if (current.value === value) {
                if (current === this._tailNode) {
                    this._tailNode = previous;
                }
                previous!.next = current.next;
                this._size--;
                return true;
            }
            previous = current;
            current = current.next;
        }

        return false;
    }

    contains(value: T): boolean {
        if (this.isEmpty()) {
            // An empty list can't contain any elements
            return false;
        }

        let current = this._headNode;

        while (current !== null) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }

        return false;
    }

    containsAll(elements: T[]): boolean {
        for (const element of elements) {
            if (!this.contains(element)) return false;
        }
        return true;
    }

    /**
     * Find the index of first occurrence of the value.
     */
    indexOf(value: T): number {
        let current = this._headNode;
        let index = 0;

        while (current !== null) {
            if (current.value === value) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1;
    }

    /**
     * Get the value of the element at a specific index (without removing it).
     */
    getAtIndex(index: number): T | null {
        if (index < 0 || index >= this._size) {
            throw new Error("Index out of bounds");
        }

        let currentNode = this._headNode;
        let currentIndex = 0;

        while (currentIndex < index) {
            currentNode = currentNode!.next;
            currentIndex++;
        }

        return currentNode!.value;
    }

    /**
     * Updates the value at a specific index. The size of the list doesn't change.
     */
    setAtIndex(index: number, value: T): void {
        if (index < 0 || index >= this._size) {
            throw new Error("Index out of bounds");
        }

        let currentElement = this._headNode;
        let currentIndex = 0;

        while (currentIndex < index) {
            currentElement = currentElement!.next;
            currentIndex++;
        }

        currentElement!.value = value;
    }

    getSize() {
        return this._size;
    }

    /**
     * Convert this list to an array of items
     */
    toArray(): T[] {
        const result: T[] = [];
        let current = this._headNode;

        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }

        return result;
    }

    /**
     *  Mostly used for debugging and testing purposes.
     */
    toString() {
        if (this.isEmpty()) return "Empty LinkedList";

        let current = this._headNode;
        const values: string[] = [];

        while (current !== null) {
            values.push(String(current.value));
            current = current.next;
        }

        return values.join(" --> ");
    }

    clear(): void {
        this._headNode = null;
        this._tailNode = null;
        this._size = 0;
    }

    /**
     * Reverses the whole list in place.
     */
    reverse() {
        if (this._size <= 1) {
            return;
        }

        let previous: Node<T> | null = null;
        let current = this._headNode;
        let next: Node<T> | null = null;

        this._tailNode = this._headNode;

        while (current !== null) {
            next = current.next;
            current.next = previous;
            previous = current;
            current = next;
        }

        this._headNode = previous;
    }
}
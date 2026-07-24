import {type CallbackFunction, DoublyLinkedListNode} from './DoublyLinkedListNode';
import {Comparator} from '../../utils/comparator/Comparator';

export default class DoublyLinkedList<T> {
    head: DoublyLinkedListNode | null;
    tail: DoublyLinkedListNode | null;
    compare: Comparator<T>;

    constructor(comparatorFunction?: (a: T, b: T) => number) {
        this.head = null;
        this.tail = null;
        this.compare = new Comparator(comparatorFunction);
    }

    prepend(value: T): DoublyLinkedList<T> {
        const newNode = new DoublyLinkedListNode(value, this.head);

        if (this.head) {
            this.head.previous = newNode;
        }
        this.head = newNode;

        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    append(value: T): DoublyLinkedList<T> {
        const newNode = new DoublyLinkedListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }

        this.tail!.next = newNode;
        newNode.previous = this.tail;
        this.tail = newNode;

        return this;
    }

    delete(value: T): DoublyLinkedListNode | null {
        if (!this.head) {
            return null;
        }

        let deletedNode: DoublyLinkedListNode | null = null;
        let currentNode: DoublyLinkedListNode | null = this.head;

        while (currentNode) {
            if (this.compare.equal(currentNode.value as T, value)) {
                deletedNode = currentNode;

                if (deletedNode === this.head) {
                    this.head = deletedNode.next;

                    if (this.head) {
                        this.head.previous = null;
                    }

                    if (deletedNode === this.tail) {
                        this.tail = null;
                    }
                } else if (deletedNode === this.tail) {
                    this.tail = deletedNode.previous;
                    this.tail!.next = null;
                } else {
                    const previousNode = deletedNode.previous;
                    const nextNode = deletedNode.next;

                    previousNode!.next = nextNode;
                    nextNode!.previous = previousNode;
                }
            }

            currentNode = currentNode.next;
        }

        return deletedNode;
    }

    find({value, callback}: { value?: T; callback?: (value: T) => boolean }): DoublyLinkedListNode | null {
        if (!this.head) {
            return null;
        }

        let currentNode: DoublyLinkedListNode | null = this.head;

        while (currentNode) {
            if (callback && callback(currentNode.value as T)) {
                return currentNode;
            }

            if (value !== undefined && this.compare.equal(currentNode.value as T, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    deleteTail(): DoublyLinkedListNode | null {
        if (!this.tail) {
            return null;
        }

        if (this.head === this.tail) {
            const deletedTail = this.tail;
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        const deletedTail = this.tail;

        this.tail = this.tail.previous;
        this.tail!.next = null;

        return deletedTail;
    }

    deleteHead(): DoublyLinkedListNode | null {
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;

        if (this.head.next) {
            this.head = this.head.next;
            this.head!.previous = null;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    toArray(): DoublyLinkedListNode[] {
        const nodes: DoublyLinkedListNode[] = [];

        let currentNode: DoublyLinkedListNode | null = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    fromArray(values: T[]): DoublyLinkedList<T> {
        values.forEach((value) => this.append(value));

        return this;
    }

    toString(callback?: CallbackFunction): string {
        return this.toArray().map((node) => node.toString(callback)).toString();
    }

    reverse(): DoublyLinkedList<T> {
        let currNode: DoublyLinkedListNode | null = this.head;
        let prevNode: DoublyLinkedListNode | null = null;
        let nextNode: DoublyLinkedListNode | null = null;

        while (currNode) {
            nextNode = currNode.next;
            prevNode = currNode.previous;

            currNode.next = prevNode;
            currNode.previous = nextNode;

            prevNode = currNode;
            currNode = nextNode;
        }

        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}

import type {CallbackFunction} from "../doubly-linked-list/DoublyLinkedListNode.ts";

export class LinkedListNode {
    value: any;
    next: any;

    constructor(value: any, next: any = null) {
        this.value = value;
        this.next = next;
    }

    toString(callback?: CallbackFunction) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}
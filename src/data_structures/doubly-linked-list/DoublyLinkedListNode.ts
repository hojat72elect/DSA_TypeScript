export type CallbackFunction = (input?: any) => string;

export class DoublyLinkedListNode {
    value: any;
    next: any;
    previous: any;

    constructor(value: any, next: any = null, previous: any = null) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }

    toString(callback?: CallbackFunction) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}
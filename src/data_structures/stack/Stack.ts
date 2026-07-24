import {LinkedList} from "../../../../TypeScript-algorithms/src/data-structures/linked-list/LinkedList.ts";

export class Stack {

    /**
     * We're going to implement Stack based on LinkedList since these
     * structures are quite similar. Compare push/pop operations of the Stack
     * with prepend/deleteHead operations of LinkedList.
     */
    linkedList = new LinkedList();

    constructor() {
    }

    isEmpty(): boolean {
        // The stack is empty if its linked list doesn't have a head.
        return !this.linkedList.head;
    }

    peek(): any {
        if (this.isEmpty()) {
            // If the linked list is empty then there is nothing to peek from.
            return null;
        }
        // Just read the value from the start of linked list without deleting it.
        return this.linkedList.head?.value;
    }

    push(value: any) {
        // Pushing means to lay the value on top of the stack. Therefore, let's just add
        // the new value at the start of the linked list.
        this.linkedList.prepend(value);
    }

    pop(): any {
        const removedHead = this.linkedList.deleteHead();
        return removedHead ? removedHead.value : null;
    }

    toArray(): any[] {
        return this.linkedList
            .toArray()
            .map((node) => node.value);
    }

    toString(callback?: (value: any) => string) {
        return this.linkedList.toString(callback);
    }
}
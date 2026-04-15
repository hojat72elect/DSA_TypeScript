/**
 * A LIFO data structure. It's easy to implement and reason about.
 */
export class Stack<T> {
    private _dataHolder: T[];

    constructor(data: T[] = []) {
        this._dataHolder = data;
    }

    /**
     * Add a new item to the top of the stack.
     * Returns a reference to the stack, so this operation can be chained.
     */
    push(newValue: T): Stack<T> {
        this._dataHolder.push(newValue);
        return this;
    }

    peek() {
        if (this.isEmpty()) return undefined;
        return this._dataHolder[this._dataHolder.length - 1];
    }

    pop() {
        if (this.isEmpty()) return undefined;
        return this._dataHolder.pop();
    }

    clear() {
        this._dataHolder = [];
    }

    getSize() {
        return this._dataHolder.length;
    }

    isEmpty() {
        return this._dataHolder.length === 0;
    }

    toString() {
        return this._dataHolder.join(" -> ");
    }
}
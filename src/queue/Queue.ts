/**
 * This is a simple **one-way** queue and a FIFO structure.
 */
export class Queue<T> {

    private _dataHolder: T[];

    constructor(data: T[] = []) {
        this._dataHolder = data;
    }

    isEmpty() {
        return this._dataHolder.length === 0;
    }

    getSize() {
        return this._dataHolder.length;
    }

    /**
     * @returns A reference to this queue, so it's possible to chain this operation.
     */
    enqueue(newValue: T): Queue<T> {
        this._dataHolder.push(newValue);
        return this;
    }

    dequeue() {
        if (this.isEmpty()) return undefined;
        return this._dataHolder.shift();
    }

    /**
     * @return The element in the row with the highest priority. Or undefined, if the queue is empty.
     */
    peekFront() {
        if (this.isEmpty()) return undefined;
        return this._dataHolder[0];
    }

    /**
     * @return The element in the row with the lowest priority, or undefined if the queue is empty.
     */
    peekBack() {
        if (this.isEmpty()) return undefined;
        return this._dataHolder[this._dataHolder.length - 1];
    }

    /**
     * @returns A string representation of the Queue (for debugging and testing purposes).
     */
    toString(): string {
        return this._dataHolder.join(" <-- ");
    }

    clear() {
        this._dataHolder = [];
    }
}
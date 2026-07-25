import {Comparator} from "../../utils/comparator/Comparator.ts";


interface SorterCallbacks<T> {
    compareCallback?: (a: T, b: T) => number; // If provided then all elements comparisons will be done through this callback.
    visitingCallback?: (currentElement: T | null) => void; // If provided it will be called each time the sorting function is visiting the next element.
}

export default abstract class Sort<T> {
    protected callbacks: Required<SorterCallbacks<T>>;
    protected comparator: Comparator<T>;

    constructor(originalCallbacks?: SorterCallbacks<T>) {
        this.callbacks = Sort.initSortingCallbacks(originalCallbacks);
        this.comparator = new Comparator(this.callbacks.compareCallback);
    }

    static initSortingCallbacks<T>(originalCallbacks?: SorterCallbacks<T>): Required<SorterCallbacks<T>> {
        const callbacks = originalCallbacks || {};
        const stubCallback = () => {
        };

        return {
            compareCallback: callbacks.compareCallback ?? undefined,
            visitingCallback: callbacks.visitingCallback ?? stubCallback,
        } as Required<SorterCallbacks<T>>;
    }

    abstract sort(inputArray: T[]): T[]
}

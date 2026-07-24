export class Comparator<T = any> {

    // This can be a custom compare function which may compare custom objects with each other
    public compare: (a: T, b: T) => number;

    constructor(compareFunction?: (a: T, b: T) => number) {
        this.compare = compareFunction || (Comparator.defaultCompareFunction as unknown as (a: T, b: T) => number);
    }

    /**
     * Default comparison function. It just assumes that "a" and "b" are either string or number.
     */
    static defaultCompareFunction(a: string | number, b: string | number): number {
        if (a === b) {
            return 0;
        }

        return a < b ? -1 : 1;
    }

    /**
     * Checks if 2 variables are equal.
     */
    equal(a: T, b: T): boolean {
        return this.compare(a, b) === 0;
    }

    /**
     * Checks if variable "a" is less than "b".
     */
    lessThan(a: T, b: T): boolean {
        return this.compare(a, b) < 0;
    }

    /**
     * Checks if variable "a" is greater than "b".
     */
    greaterThan(a: T, b: T): boolean {
        return this.compare(a, b) > 0;
    }

    /**
     * Checks if the variable "a" is less than or equal to "b".
     */
    lessThanOrEqual(a: T, b: T) {
        return this.lessThan(a, b) || this.equal(a, b);
    }

    /**
     * Checks if the variable "a" is greater than or equal to "b".
     */
    greaterThanOrEqual(a: T, b: T) {
        return this.greaterThan(a, b) || this.equal(a, b);
    }

    /**
     * Reverses the comparison order.
     */
    reverse() {
        const compareOriginal = this.compare;
        this.compare = (a: T, b: T) => compareOriginal(b, a);
    }
}
/**
 * Implementation of the LRU (Least Recently Used) Cache
 * based on the (ordered) Map data-structure.
 *
 * Current implementation allows to have fast O(1) (in average) read and write operations.
 *
 * At any moment in time the LRU Cache holds not more that "capacity" number of items in it.
 */
export class LruCacheOnMap<T> {
    public capacity: number;
    public items: Map<string, T>;

    /**
     * Creates a cache instance of a specific capacity.
     */
    constructor(capacity: number) {
        this.capacity = capacity; // How many items to store in cache at max.
        this.items = new Map<string, T>(); // The ordered hash map of all cached items.
    }

    /**
     * Returns the cached value by its key.
     * Time complexity: O(1) in average.
     */
    public get(key: string): T | undefined {
        if (!this.items.has(key)) return undefined;

        // The non-null assertion operator (!) is safe to use here because we just checked has(key)
        const val = this.items.get(key)!;

        this.items.delete(key);
        this.items.set(key, val);
        return val;
    }

    /**
     * Sets the value to cache by its key.
     * Time complexity: O(1).
     */
    public set(key: string, val: T): void {
        this.items.delete(key);
        this.items.set(key, val);

        if (this.items.size > this.capacity) {
            for (const headKey of this.items.keys()) {
                this.items.delete(headKey);
                break;
            }
        }
    }
}
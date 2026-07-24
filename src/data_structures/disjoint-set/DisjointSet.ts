import {DisjointSetItem} from './DisjointSetItem.ts';

export class DisjointSet<T> {
    private keyCallback?: (value: T) => string | number;
    private items: Record<string | number, DisjointSetItem<T>>;

    constructor(keyCallback?: (value: T) => string | number) {
        this.keyCallback = keyCallback;
        this.items = {};
    }

    public makeSet(itemValue: T) {
        const disjointSetItem = new DisjointSetItem(itemValue, this.keyCallback);
        const key = disjointSetItem.getKey() as string | number;

        if (!this.items[key]) {
            // Add new item only in case if it is not presented yet.
            this.items[key] = disjointSetItem;
        }

        return this;
    }

    /**
     * Find set representation node.
     */
    find(itemValue: T): string | number | T | null {
        const templateDisjointItem = new DisjointSetItem(itemValue, this.keyCallback);
        const key = templateDisjointItem.getKey() as string | number;

        // Try to find item itself;
        const requiredDisjointItem = this.items[key];

        if (!requiredDisjointItem) return null;

        return requiredDisjointItem.getRoot().getKey();
    }

    /**
     * Union by rank.
     */
    union(valueA: T, valueB: T): DisjointSet<T> {
        const rootKeyA = this.find(valueA);
        const rootKeyB = this.find(valueB);

        if (rootKeyA === null || rootKeyB === null) throw new Error('One or two values are not in sets');

        if (rootKeyA === rootKeyB) {
            // In case if both elements are already in the same set then just return its key.
            return this;
        }

        const rootA = this.items[rootKeyA as string | number];
        const rootB = this.items[rootKeyB as string | number];

        if (rootA!.getRank() < rootB!.getRank()) {
            // If rootB's tree is bigger, then make rootB to be a new root.
            rootB?.addChild(rootA!);

            return this;
        }

        // If rootA's tree is bigger, then make rootA to be a new root.
        rootA?.addChild(rootB!);

        return this;
    }

    inSameSet(valueA: T, valueB: T) {
        const rootKeyA = this.find(valueA);
        const rootKeyB = this.find(valueB);

        if (rootKeyA === null || rootKeyB === null) throw new Error('One or two values are not in sets');

        return rootKeyA === rootKeyB;
    }
}

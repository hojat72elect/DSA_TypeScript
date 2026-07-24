export class DisjointSetItem<T> {
    private value: T;
    private keyCallback?: (value: T) => string | number;
    private parent: DisjointSetItem<T> | null;
    private children: Record<string | number, DisjointSetItem<T>>;

    constructor(value: T, keyCallback?: (value: T) => string | number) {
        this.value = value;
        this.keyCallback = keyCallback;
        this.parent = null;
        this.children = {};
    }

    getKey() {
        // Allow user to define custom key generator.
        if (this.keyCallback) return this.keyCallback(this.value);

        // Otherwise use value as a key by default.
        return this.value;
    }

    getRoot(): DisjointSetItem<T> {
        return this.isRoot() ? this : this.parent!.getRoot();
    }

    isRoot() {
        return this.parent === null;
    }

    /**
     * Rank basically means the number of all ancestors.
     */
    getRank() {
        if (this.getChildren().length === 0) return 0;

        let rank = 0;

        this.getChildren().forEach((child) => {
            // Count child itself.
            rank++;

            // Also add all children of current child.
            rank += child.getRank();
        });

        return rank;
    }

    getChildren() {
        return Object.values(this.children);
    }

    setParent(parentItem: DisjointSetItem<T>, forceSettingParentChild = true) {
        this.parent = parentItem;
        if (forceSettingParentChild) parentItem.addChild(this);

        return this;
    }

    addChild(childItem: DisjointSetItem<T>) {
        //Force key to string/number when using as an object dictionary key
        const key = childItem.getKey() as string | number;
        this.children[key] = childItem;
        childItem.setParent(this, false);

        return this;
    }
}

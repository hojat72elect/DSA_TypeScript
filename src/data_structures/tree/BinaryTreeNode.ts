import {Comparator} from '../../../src/utils/comparator/Comparator.ts';
import {HashTable} from '../../../src/data_structures/hash-table/HashTable.ts';

export class BinaryTreeNode<T> {
    left: BinaryTreeNode<T> | null;
    right: BinaryTreeNode<T> | null;
    parent: BinaryTreeNode<T> | null;
    value: T | null;
    meta: HashTable<string>;
    nodeComparator: Comparator<BinaryTreeNode<T>>;

    constructor(value: T | null = null) {
        this.left = null;
        this.right = null;
        this.parent = null;
        this.value = value;

        this.meta = new HashTable<string>();

        this.nodeComparator = new Comparator();
    }

    get leftHeight(): number {
        if (!this.left) {
            return 0;
        }

        return this.left.height + 1;
    }

    get rightHeight(): number {
        if (!this.right) {
            return 0;
        }

        return this.right.height + 1;
    }

    get height(): number {
        return Math.max(this.leftHeight, this.rightHeight);
    }

    get balanceFactor(): number {
        return this.leftHeight - this.rightHeight;
    }

    get uncle(): BinaryTreeNode<T> | undefined {
        if (!this.parent) {
            return undefined;
        }

        if (!this.parent.parent) {
            return undefined;
        }

        if (!this.parent.parent.left || !this.parent.parent.right) {
            return undefined;
        }

        if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
            return this.parent.parent.right;
        }

        return this.parent.parent.left;
    }

    static copyNode<T>(sourceNode: BinaryTreeNode<T>, targetNode: BinaryTreeNode<T>): void {
        targetNode.setValue(sourceNode.value);
        targetNode.setLeft(sourceNode.left);
        targetNode.setRight(sourceNode.right);
    }

    setValue(value: T | null): BinaryTreeNode<T> {
        this.value = value;

        return this;
    }

    setLeft(node: BinaryTreeNode<T> | null): BinaryTreeNode<T> {
        if (this.left) {
            this.left.parent = null;
        }

        this.left = node;

        if (this.left) {
            this.left.parent = this;
        }

        return this;
    }

    setRight(node: BinaryTreeNode<T> | null): BinaryTreeNode<T> {
        if (this.right) {
            this.right.parent = null;
        }

        this.right = node;

        if (node) {
            this.right!.parent = this;
        }

        return this;
    }

    removeChild(nodeToRemove: BinaryTreeNode<T>): boolean {
        if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
            this.left = null;
            return true;
        }

        if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
            this.right = null;
            return true;
        }

        return false;
    }

    replaceChild(nodeToReplace: BinaryTreeNode<T>, replacementNode: BinaryTreeNode<T>): boolean {
        if (!nodeToReplace || !replacementNode) {
            return false;
        }

        if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
            this.left = replacementNode;
            return true;
        }

        if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
            this.right = replacementNode;
            return true;
        }

        return false;
    }

    traverseInOrder(): (T | null)[] {
        let traverse: (T | null)[] = [];

        if (this.left) {
            traverse = traverse.concat(this.left.traverseInOrder());
        }

        traverse.push(this.value);

        if (this.right) {
            traverse = traverse.concat(this.right.traverseInOrder());
        }

        return traverse;
    }

    toString(): string {
        return this.traverseInOrder().toString();
    }
}

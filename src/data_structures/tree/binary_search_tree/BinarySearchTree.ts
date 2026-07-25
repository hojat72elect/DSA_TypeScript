import {BinarySearchTreeNode} from "./BinarySearchTreeNode.ts";
import {BinaryTreeNode} from "../BinaryTreeNode.ts";
import {Comparator} from "../../../utils/comparator/Comparator.ts";

export class BinarySearchTree<T> {
    public root: BinarySearchTreeNode<T>;
    public nodeComparator: Comparator<BinaryTreeNode<T>>;

    constructor(nodeValueCompareFunction?: (a: T, b: T) => number) {
        this.root = new BinarySearchTreeNode<T>(null, nodeValueCompareFunction);

        // Steal node comparator from the root.
        this.nodeComparator = this.root.nodeComparator;
    }

    insert(value: T): BinarySearchTreeNode<T> | void {
        return this.root.insert(value);
    }

    contains(value: T): boolean {
        return this.root.contains(value);
    }

    remove(value: T): boolean {
        return this.root.remove(value);
    }

    toString() {
        return this.root.toString();
    }
}
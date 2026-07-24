import {BinaryTreeNode} from '../BinaryTreeNode.ts';
import {Comparator} from '../../../../../DSA_TypeScript/src/utils/comparator/Comparator.ts';

export class BinarySearchTreeNode<T> extends BinaryTreeNode<T> {

    public compareFunction?: (a: T, b: T) => number;
    public nodeValueComparator: Comparator<T>;

    /**
     * @param value - node value.
     * @param compareFunction - comparator function for node values.
     */
    constructor(value: T | null = null, compareFunction?: (a: T, b: T) => number) {
        super(value);

        // This comparator is used to compare node values with each other.
        this.compareFunction = compareFunction;
        this.nodeValueComparator = new Comparator(compareFunction);
    }

    insert(value: T): BinarySearchTreeNode<T> {
        if (this.value === null) {
            this.value = value;
            return this;
        }

        if (this.nodeValueComparator.lessThan(value, this.value)) {
            // Insert to the left.
            if (this.left) {
                return (this.left as BinarySearchTreeNode<T>).insert(value);
            }

            const newNode = new BinarySearchTreeNode(value, this.compareFunction);
            this.setLeft(newNode);

            return newNode;
        }

        if (this.nodeValueComparator.greaterThan(value, this.value)) {
            // Insert to the right.
            if (this.right) {
                return (this.right as BinarySearchTreeNode<T>).insert(value);
            }

            const newNode = new BinarySearchTreeNode(value, this.compareFunction);
            this.setRight(newNode);

            return newNode;
        }

        return this;
    }

    find(value: T): BinarySearchTreeNode<T> | null {
        // Check the root.
        if (this.nodeValueComparator.equal(this.value!, value)) return this;

        if (this.nodeValueComparator.lessThan(value, this.value!) && this.left) {
            // Check left nodes.
            return (this.left as BinarySearchTreeNode<T>).find(value);
        }

        if (this.nodeValueComparator.greaterThan(value, this.value!) && this.right) {
            // Check right nodes.
            return (this.right as BinarySearchTreeNode<T>).find(value);
        }

        return null;
    }

    contains(value: T): boolean {
        return !!this.find(value);
    }

    remove(value: T): boolean {
        const nodeToRemove = this.find(value);

        if (!nodeToRemove) throw new Error('Item not found in the tree');

        const {parent} = nodeToRemove;

        if (!nodeToRemove.left && !nodeToRemove.right) {
            // Node is a leaf and thus has no children.
            if (parent) {
                // Node has a parent. Just remove the pointer to this node from the parent.
                parent.removeChild(nodeToRemove);
            } else {
                // Node has no parent. Just erase current node value.
                nodeToRemove.setValue(null as any);
            }
        } else if (nodeToRemove.left && nodeToRemove.right) {
            // Node has two children.
            // Find the next biggest value (minimum value in the right branch)
            // and replace current value node with that next biggest value.
            const nextBiggerNode = (nodeToRemove.right as BinarySearchTreeNode<T>).findMin();

            // Accessing nodeComparator from base class if available, else falling back to value comparator
            const comparator = (this as any).nodeComparator || this.nodeValueComparator;

            if (!comparator.equal(nextBiggerNode, nodeToRemove.right)) {
                this.remove(nextBiggerNode.value!);
                nodeToRemove.setValue(nextBiggerNode.value);
            } else {
                // In case next right value is the next bigger one and it doesn't have a left child,
                // then just replace the node that is going to be deleted with the right node.
                nodeToRemove.setValue(nodeToRemove.right.value);
                nodeToRemove.setRight(nodeToRemove.right.right);
            }
        } else {
            // Node has only one child.
            // Make this child to be a direct child of current node's parent.
            const childNode = nodeToRemove.left || nodeToRemove.right;

            if (parent)
                parent.replaceChild(nodeToRemove, childNode!);
            else if (childNode)
                BinaryTreeNode.copyNode(childNode, nodeToRemove);
        }

        // Clear the parent of removed node.
        nodeToRemove.parent = null;

        return true;
    }

    findMin(): BinarySearchTreeNode<T> {
        if (!this.left) {
            return this;
        }

        return (this.left as BinarySearchTreeNode<T>).findMin();
    }
}
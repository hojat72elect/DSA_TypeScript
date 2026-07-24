import {BinaryNode, BinaryTree} from "./BinaryTree.ts";

class BinarySearchTreeNode extends BinaryNode<number> {

    /**
     * In fact, searching through a BST node is so much easier, because the tree is always fully sorted.
     */
    public override search(value: number): BinaryNode<number> | null {
        if (this.value === value) return this;

        if (value < this.value && this.leftChild) {
            return this.leftChild.search(value);
        } else if (value > this.value && this.rightChild) {
            return this.rightChild.search(value);
        }

        return null;
    }
}

export class BinarySearchTree extends BinaryTree<number> {

    constructor(rootValue?: number) {
        super(rootValue);
    }

    public insertValue(value: number) {
        const newNode = new BinarySearchTreeNode(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        this.insertNode(this.root, newNode);
    }

    private insertNode(current: BinarySearchTreeNode, newNode: BinarySearchTreeNode) {
        if (newNode.value < current.value) {
            if (!current.leftChild) {
                current.leftChild = newNode;
            } else {
                this.insertNode(current.leftChild, newNode);
            }
        } else {
            // the new node's value is more than or equal to the current node
            if (!current.rightChild) {
                current.rightChild = newNode;
            } else {
                this.insertNode(current.rightChild, newNode);
            }
        }
    }

    /**
     * Searching in a BST is so much more optimized compared to normal binary trees.
     */
    public override search(value: number): BinaryNode<number> | null {
        let currentNode = this.root;

        while (currentNode) {
            if (value === currentNode.value) return currentNode;
            currentNode = value < currentNode.value ? currentNode.leftChild : currentNode.rightChild;
        }

        return null; // Didn't find the provided value
    }

    /**
     * Again, removing from a BST is more optimized compared to a normal binary tree.
     */
    public override remove(value: number): boolean {
        if (!this.root) return false; // the tree is empty, impossible to remove from it.

        let parent: BinarySearchTreeNode | null = null;
        let current: BinarySearchTreeNode | null = this.root;
        let isLeftChild = false;

        while (current && current.value !== value) {
            parent = current;
            if (value < current.value) {
                current = current.leftChild;
                isLeftChild = true;
            } else {
                current = current.rightChild;
                isLeftChild = false;
            }
        }

        if (!current) return false; // couldn't find value

        const replacement = this.getReplacementNodeForBST(current);

        if (!parent) {
            this.root = replacement;
        } else if (isLeftChild) {
            parent.leftChild = replacement;
        } else {
            parent.rightChild = replacement;
        }

        return true;
    }

    private getReplacementNodeForBST(node: BinarySearchTreeNode): BinarySearchTreeNode | null {
        if (!node.leftChild && !node.rightChild) return null;
        if (!node.leftChild) return node.rightChild;
        if (!node.rightChild) return node.leftChild;

        // Two children: Find In-order Successor (leftmost of right subtree)
        const successor = node.rightChild.findLeftMost();

        if (successor !== node.rightChild) {
            // Re-link successor's parent to successor's right child
            const successorParent = this.findParent(node.rightChild, successor);
            successorParent!.leftChild = successor.rightChild;
            successor.rightChild = node.rightChild;
        }

        successor.leftChild = node.leftChild;
        return successor;
    }
}
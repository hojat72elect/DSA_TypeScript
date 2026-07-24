// Possible colors of red-black tree nodes.
import {BinarySearchTree} from "../binary-search-tree/BinarySearchTree.ts";
import {type BinarySearchTreeNode} from "../binary-search-tree/BinarySearchTreeNode.ts";

const RED_BLACK_TREE_COLORS = {
    red: 'red',
    black: 'black',
} as const;

// Color property name in meta information of the nodes.
const COLOR_PROP_NAME = 'color';

export class RedBlackTree<T> extends BinarySearchTree<T> {

    override insert(value: T): BinarySearchTreeNode<T> | void {
        const insertedNode = super.insert(value);

        if (this.nodeComparator.equal(insertedNode!, this.root)) {
            // Make root to always be black.
            this.makeNodeBlack(insertedNode!);
        } else {
            // Make all newly inserted nodes to be red.
            this.makeNodeRed(insertedNode!);
        }

        // Check all conditions and balance the node.
        this.balance(insertedNode!);

        return insertedNode;
    }

    /**
     * TODO : Balanced tree removal (not implemented).
     */
    override remove(value: T): boolean {
        throw new Error(`Can't remove ${value}. Remove method is not implemented yet`);
    }

    /**
     * Balances the node after insertion.
     */
    balance(node: BinarySearchTreeNode<T>) {
        // If it is a root node then nothing to balance here.
        if (this.nodeComparator.equal(node, this.root)) return;

        // If the parent is black then done. Nothing to balance here.
        if (node.parent && this.isNodeBlack(node.parent as BinarySearchTreeNode<T>)) return;

        const grandParent = node.parent?.parent;

        if (node.uncle && this.isNodeRed(node.uncle as BinarySearchTreeNode<T>)) {
            // If node has red uncle then we need to do RECOLORING.

            // Recolor parent and uncle to black.
            this.makeNodeBlack(node.uncle as BinarySearchTreeNode<T>);
            if (node.parent) this.makeNodeBlack(node.parent as BinarySearchTreeNode<T>);


            if (grandParent && !this.nodeComparator.equal(grandParent, this.root)) {
                // Recolor grand-parent to red if it is not root.
                this.makeNodeRed(grandParent as BinarySearchTreeNode<T>);
            } else {
                // If grand-parent is black root don't do anything.
                // Since root already has two black sibling that we've just recolored.
                return;
            }

            // Now do further checking for recolored grand-parent.
            this.balance(grandParent as BinarySearchTreeNode<T>);
        } else if (!node.uncle || this.isNodeBlack(node.uncle as BinarySearchTreeNode<T>)) {
            // If node uncle is black or absent then we need to do ROTATIONS.

            if (grandParent) {
                // Grand parent that we will receive after rotations.
                let newGrandParent: BinarySearchTreeNode<T> | null = null;

                if (node.parent && this.nodeComparator.equal(grandParent.left!, node.parent)) {
                    // Left case.
                    if (this.nodeComparator.equal(node.parent.left!, node)) {
                        // Left-left case.
                        newGrandParent = this.leftLeftRotation(grandParent as BinarySearchTreeNode<T>);
                    } else {
                        // Left-right case.
                        newGrandParent = this.leftRightRotation(grandParent as BinarySearchTreeNode<T>);
                    }
                } else if (node.parent) {
                    // Right case.
                    if (this.nodeComparator.equal(node.parent.right!, node)) {
                        // Right-right case.
                        newGrandParent = this.rightRightRotation(grandParent as BinarySearchTreeNode<T>);
                    } else {
                        // Right-left case.
                        newGrandParent = this.rightLeftRotation(grandParent as BinarySearchTreeNode<T>);
                    }
                }

                // Set newGrandParent as a root if it doesn't have parent.
                if (newGrandParent && newGrandParent.parent === null) {
                    this.root = newGrandParent;

                    // Recolor root into black.
                    this.makeNodeBlack(this.root);
                }

                if (newGrandParent) {
                    // Check if new grand parent don't violate red-black-tree rules.
                    this.balance(newGrandParent);
                }
            }
        }
    }

    /**
     * Left Left Case (p is left child of g and x is left child of p)
     */
    leftLeftRotation(grandParentNode: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> {
        // Memorize the parent of grand-parent node.
        const grandGrandParent = grandParentNode.parent;

        // Check what type of sibling is our grandParentNode is (left or right).
        let grandParentNodeIsLeft = false;
        if (grandGrandParent)
            grandParentNodeIsLeft = this.nodeComparator.equal(grandGrandParent.left!, grandParentNode);


        // Memorize grandParentNode's left node.
        const parentNode = grandParentNode.left;

        if (!parentNode) return grandParentNode;

        // Memorize parent's right node since we're going to transfer it to
        // grand parent's left subtree.
        const parentRightNode = parentNode.right;

        // Make grandParentNode to be right child of parentNode.
        parentNode.setRight(grandParentNode);

        // Move child's right subtree to grandParentNode's left subtree.
        grandParentNode.setLeft(parentRightNode);

        // Put parentNode node in place of grandParentNode.
        if (grandGrandParent) {
            if (grandParentNodeIsLeft) {
                grandGrandParent.setLeft(parentNode);
            } else {
                grandGrandParent.setRight(parentNode);
            }
        } else {
            // Make parent node a root
            parentNode.parent = null;
        }

        // Swap colors of grandParentNode and parentNode.
        this.swapNodeColors(parentNode as BinarySearchTreeNode<T>, grandParentNode);

        // Return new root node.
        return parentNode as BinarySearchTreeNode<T>;
    }

    /**
     * Left Right Case (p is left child of g and x is right child of p)
     */
    leftRightRotation(grandParentNode: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> {
        // Memorize left and left-right nodes.
        const parentNode = grandParentNode.left;
        if (!parentNode) return grandParentNode;

        const childNode = parentNode.right;
        if (!childNode) return grandParentNode;

        // We need to memorize child left node to prevent losing
        // left child subtree. Later it will be re-assigned to
        // parent's right sub-tree.
        const childLeftNode = childNode.left;

        // Make parentNode to be a left child of childNode node.
        childNode.setLeft(parentNode);

        // Move child's left subtree to parent's right subtree.
        parentNode.setRight(childLeftNode);

        // Put left-right node in place of left node.
        grandParentNode.setLeft(childNode);

        // Now we're ready to do left-left rotation.
        return this.leftLeftRotation(grandParentNode);
    }

    /**
     * Right Right Case (p is right child of g and x is right child of p)
     */
    rightRightRotation(grandParentNode: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> {
        // Memorize the parent of grand-parent node.
        const grandGrandParent = grandParentNode.parent;

        // Check what type of sibling is our grandParentNode is (left or right).
        let grandParentNodeIsLeft = false;
        if (grandGrandParent) {
            grandParentNodeIsLeft = this.nodeComparator.equal(grandGrandParent.left!, grandParentNode);
        }

        // Memorize grandParentNode's right node.
        const parentNode = grandParentNode.right;

        if (!parentNode) {
            return grandParentNode;
        }

        // Memorize parent's left node since we're going to transfer it to
        // grand parent's right subtree.
        const parentLeftNode = parentNode.left;

        // Make grandParentNode to be left child of parentNode.
        parentNode.setLeft(grandParentNode);

        // Transfer all left nodes from parent to right sub-tree of grandparent.
        grandParentNode.setRight(parentLeftNode);

        // Put parentNode node in place of grandParentNode.
        if (grandGrandParent) {
            if (grandParentNodeIsLeft) {
                grandGrandParent.setLeft(parentNode);
            } else {
                grandGrandParent.setRight(parentNode);
            }
        } else {
            // Make parent node a root.
            parentNode.parent = null;
        }

        // Swap colors of granParent and parent nodes.
        this.swapNodeColors(parentNode as BinarySearchTreeNode<T>, grandParentNode);

        // Return new root node.
        return parentNode as BinarySearchTreeNode<T>;
    }

    /**
     * Right Left Case (p is right child of g and x is left child of p)
     */
    rightLeftRotation(grandParentNode: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> {
        // Memorize right and right-left nodes.
        const parentNode = grandParentNode.right;
        if (!parentNode) return grandParentNode;

        const childNode = parentNode.left;
        if (!childNode) return grandParentNode;

        // We need to memorize child right node to prevent losing
        // right child subtree. Later it will be re-assigned to
        // parent's left sub-tree.
        const childRightNode = childNode.right;

        // Make parentNode to be a right child of childNode.
        childNode.setRight(parentNode);

        // Move child's right subtree to parent's left subtree.
        parentNode.setLeft(childRightNode);

        // Put childNode node in place of parentNode.
        grandParentNode.setRight(childNode);

        // Now we're ready to do right-right rotation.
        return this.rightRightRotation(grandParentNode);
    }

    makeNodeRed(node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> {
        node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.red);
        return node;
    }

    makeNodeBlack(node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> {
        node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.black);
        return node;
    }

    isNodeRed(node: BinarySearchTreeNode<T> | null): boolean {
        return node ? node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.red : false;
    }

    isNodeBlack(node: BinarySearchTreeNode<T> | null): boolean {
        return node ? node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.black : false;
    }

    isNodeColored(node: BinarySearchTreeNode<T>): boolean {
        return this.isNodeRed(node) || this.isNodeBlack(node);
    }

    /**
     * Swaps colors between two nodes.
     */
    swapNodeColors(firstNode: BinarySearchTreeNode<T>, secondNode: BinarySearchTreeNode<T>): void {
        const firstColor = firstNode.meta.get(COLOR_PROP_NAME)!;
        const secondColor = secondNode.meta.get(COLOR_PROP_NAME)!;

        firstNode.meta.set(COLOR_PROP_NAME, secondColor);
        secondNode.meta.set(COLOR_PROP_NAME, firstColor);
    }
}
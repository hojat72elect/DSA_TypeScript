/**
 * This node is specifically defined for binary trees.
 */
export class BinaryNode<T> {
    value: T;
    leftChild: BinaryNode<T> | null;
    rightChild: BinaryNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.leftChild = null;
        this.rightChild = null;
    }

    /**
     * @return the left-most child in the left subtree of a binary node.
     */
    public findLeftMost(): BinaryNode<T> {
        if (!this.leftChild) return this;
        return this.leftChild.findLeftMost();
    }

    /**
     * @return the right-most child in the right subtree of a binary node.
     */
    public findRightMost(): BinaryNode<T> {
        if (!this.rightChild) return this;
        return this.rightChild.findRightMost();
    }

    /**
     * Changes the value in the left child of this node.
     */
    public setLeftChild(newValue: T) {
        this.leftChild = new BinaryNode(newValue);
    }

    /**
     * Changes the value in the right child of this node.
     */
    public setRightChild(newValue: T) {
        this.rightChild = new BinaryNode(newValue);
    }

    /**
     * Searches for the given value in this node and its children nodes.
     * This node is for a general binary tree (not a BST), so we have to traverse all nodes.
     */
    public search(value: T): BinaryNode<T> | null {
        if (this.value === value) return this;
        if (!this.rightChild && !this.leftChild) return null;

        const leftResult = this.leftChild?.search(value);
        if (leftResult) return leftResult;

        const rightResult = this.rightChild?.search(value);
        return rightResult ? rightResult : null;
    }
}

export class BinaryTree<T> {

    public root: BinaryNode<T> | null;

    constructor(rootValue?: T) {
        this.root = rootValue ? new BinaryNode(rootValue) : null;
    }

    public getLeftMostNode() {
        if (!this.root) return null;
        return this.root?.findLeftMost();
    }

    public getRightMostNode() {
        if (!this.root) return null;
        return this.root?.findRightMost();
    }

    /**
     * Traverses the tree recursively; in such a way that it first visits the node itself
     * and then visits the left and right nodes recursively.
     * Node -> Left -> Right
     * This function can be used for making an identical copy of the tree (just like how it is).
     */
    public preOrderTraversal(node: BinaryNode<T> | null = this.root, depth: number = 0) {
        if (!node) return "";

        let resultingString = "  ".repeat(depth) + "└──" + node.value + "\n"; // Visit the current node
        resultingString += this.preOrderTraversal(node.leftChild, depth + 1);// Traverse the left subtree
        resultingString += this.preOrderTraversal(node.rightChild, depth + 1);// Traverse the right subtree

        return resultingString;
    }

    /**
     * For any given node, first the left subtree is traversed, then the node itself is visited.
     * Then the right subtree is traversed.
     * Left -> Root -> Right
     * In a BST, this function gets the values in a non-decreasing order.
     */
    public inOrderTraversal(node: BinaryNode<T> | null = this.root, depth: number = 0) {
        if (!node) return "";
        let resultingString = "";
        resultingString += this.inOrderTraversal(node.leftChild, depth + 1); // Traverse the left subtree
        resultingString += "  ".repeat(depth) + "└──" + node.value + "\n"; // Visit the current node
        resultingString += this.inOrderTraversal(node.rightChild, depth + 1); // Traverse the right subtree

        return resultingString;
    }

    /**
     * Left  -> Right -> Node
     */
    public postOrderTraversal(node: BinaryNode<T> | null = this.root, depth: number = 0) {
        if (!node) return "";
        let resultingString = "";
        resultingString += this.postOrderTraversal(node.leftChild, depth + 1); // Traverse the left subtree
        resultingString += this.postOrderTraversal(node.rightChild, depth + 1); // Traverse the right subtree
        resultingString += "  ".repeat(depth) + "└──" + node.value + "\n"; // Visit the current node

        return resultingString;
    }

    /**
     * Searches for a node with the given value in this tree.
     * This is a regular binary tree (not BST), so we need to traverse the entire tree.
     * Returns the found node or null if not found.
     */
    public search(value: T): BinaryNode<T> | null {
        return this.root ? this.root!.search(value) : null;
    }

    /**
     * Searches the entire tree, finds the first node that matches the provided value, removes it and replaces it with some other node.
     *
     * @returns true if the node was found and removed, false otherwise.
     */
    public remove(value: T): boolean {
        if (!this.root) return false; // The tree is empty

        if (this.root.value === value) {
            // We are removing the root node
            this.root = this.getReplacementNode(this.root);
            return true;
        }

        const result = this.findNodeAndParent(this.root, value);
        if (!result) return false; // Couldn't find such a node in the entire tree

        const {parent, node, isLeftChild} = result;

        // Replace the node with another node from our tree
        if (isLeftChild) {
            parent.leftChild = this.getReplacementNode(node);
        } else {
            parent.rightChild = this.getReplacementNode(node);
        }

        return true;
    }

    /**
     * Helper function to find a node and its parent.
     * @returns an object with parent, node, and whether it's a left child.
     */
    private findNodeAndParent(current: BinaryNode<T>, value: T): {
        parent: BinaryNode<T>,
        node: BinaryNode<T>,
        isLeftChild: boolean
    } | null {
        if (current.leftChild && current.leftChild.value === value) {
            // The left child of the current node is wht we are looking for.
            return {parent: current, node: current.leftChild, isLeftChild: true};
        }
        if (current.rightChild && current.rightChild.value === value) {
            // The right child of the current node is wht we are looking for.
            return {parent: current, node: current.rightChild, isLeftChild: false};
        }

        // Search in left subtree
        if (current.leftChild) {
            const result = this.findNodeAndParent(current.leftChild, value);
            if (result) return result;
        }

        // Search in right subtree
        if (current.rightChild) {
            const result = this.findNodeAndParent(current.rightChild, value);
            if (result) return result;
        }

        // Couldn't find anything
        return null;
    }

    /**
     * When we are about to remove a node from the tree, we need to provide a replacement for it so the rest of the tree can continue as a whole thing.
     * This function decides about the replacement node.
     */
    private getReplacementNode(node: BinaryNode<T>): BinaryNode<T> | null {

        if (!node.leftChild && !node.rightChild) {
            // The provided node has no children, we don't need any replacement for it.
            return null;
        }

        if (!node.leftChild) {
            // The provided node has ONLY a right child.
            return node.rightChild;
        }
        if (!node.rightChild) {
            // The provided node has ONLY a left child.
            return node.leftChild;
        }
        // The provided node has 2 children; the leftmost node of the right subtree will be replacement
        const replacement = node.rightChild.findLeftMost();

        // If the replacement is not the immediate right child
        if (replacement !== node.rightChild) {
            // Find the parent of the replacement node
            const replacementParent = this.findParent(node.rightChild, replacement);
            // Remove the replacement from its current position
            replacementParent!.leftChild = replacement.rightChild;
            // Set the right child of replacement
            replacement.rightChild = node.rightChild;
        }

        replacement.leftChild = node.leftChild;
        return replacement;
    }

    /**
     * Goes through a binary tree in a pre-order traversal fashion.
     * You give it the current node and the target node you have, it will return the parent of that target node.
     * If it couldn't find the parent of that target, will return null.
     */
     findParent(current: BinaryNode<T>, target: BinaryNode<T>): BinaryNode<T> | null {
        if (current.leftChild === target || current.rightChild === target) {
            return current;
        }

        if (current.leftChild) {
            // Go to the left sub-tree
            const result = this.findParent(current.leftChild, target);
            if (result) return result;
        }

        if (current.rightChild) {
            // Go to the right sub-tree
            const result = this.findParent(current.rightChild, target);
            if (result) return result;
        }

        // Couldn't find anything, just return null
        return null;
    }
}
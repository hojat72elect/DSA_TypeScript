/**
 * @internal
 * This class was exported only for testing purposes.
 *
 * This node is specifically defined for binary trees.
 * I have made it private, so it should be used only inside this file.
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

        const leftResult = this.leftChild!.search(value);
        if (leftResult) return leftResult;

        return this.rightChild!.search(value);
    }

}

export class BinaryTree<T> {

    public root: BinaryNode<T> | null;

    constructor(rootValue?: T) {
        this.root = rootValue ? new BinaryNode(rootValue) : null;
    }

    public getLeftMostNode() {
        if (!this.root) return null;
        return this.root!.findLeftMost();
    }

    public getRightMostNode(){
        if (!this.root) return null;
        return this.root!.findRightMost();
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
        return this.root!.search(value);
    }
}
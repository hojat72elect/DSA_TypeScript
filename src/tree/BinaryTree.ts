/**
 * This node is specifically defined for binary trees.
 */
class BinaryNode<T> {
    value: T;
    leftChild: BinaryNode<T> | null;
    rightChild: BinaryNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.leftChild = null;
        this.rightChild = null;
    }

    public findLeftMost(): BinaryNode<T> {
        if (!this.leftChild) return this;
        return this.leftChild.findLeftMost();
    }
}

export class BinaryTree<T> {

    public root: BinaryNode<T> | null;

    constructor(rootValue?: T) {
        this.root = rootValue ? new BinaryNode(rootValue) : null;
    }

    /**
     * Traverses the tree recursively; in such a way that it first visits the node itself
     * and then visits the left and right nodes recursively.
     * Node -> Left -> Right
     * This function can be used for making an identical copy of the tree (just like how it is).
     */
    public preOrderTraversal(node: BinaryNode<T> | null = this.root, depth: number = 0) {
        if (!node) return "";

        let resultingString = " ".repeat(depth) + "└──" + node.value + "\n"; // Visit the current node
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
        resultingString += " ".repeat(depth) + "└──" + node.value + "\n"; // Visit the current node
        resultingString += this.inOrderTraversal(node.rightChild, depth + 1); // Traverse the right subtree

        return resultingString;
    }

    /**
     *
     * Left  -> Right -> Node
     */
    public postOrderTraversal(node: BinaryNode<T> | null = this.root, depth: number = 0) {
        if (!node) return "";
        let resultingString = "";
        resultingString += this.postOrderTraversal(node.leftChild, depth + 1); // Traverse the left subtree
        resultingString += this.postOrderTraversal(node.rightChild, depth + 1); // Traverse the right subtree
        resultingString += " ".repeat(depth) + " " + node.value + "\n"; // Visit the current node

        return resultingString;
    }


    /**
     * Sets the left child of a node, returns the parent node.
     */
    static insertLeft<E>(parentNode: BinaryNode<E>, newValue: E): BinaryNode<E> {
        parentNode.leftChild = new BinaryNode(newValue);
        return parentNode;
    }

    static insertRight<E>(parentNode: BinaryNode<E>, newValue: E): BinaryNode<E> {
        parentNode.rightChild = new BinaryNode(newValue);
        return parentNode;
    }
}
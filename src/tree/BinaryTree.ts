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
}

export class BinaryTree<T> {

    root: BinaryNode<T> | null;

    constructor(rootValue?: T) {
        this.root = rootValue ? new BinaryNode(rootValue) : null;
    }

    /**
     * Traverses the tree recursively.
     * In binary trees, this can also be called "pre-order" traversal.
     */
    public traverse(node: BinaryNode<T> | null = this.root, depth: number = 0) {
        if (!node) return "";

        let resultingString = " ".repeat(depth) + "└──" + node.value + "\n";
        resultingString += this.traverse(node.leftChild, depth + 1);
        resultingString += this.traverse(node.rightChild, depth + 1);

        return resultingString;
    }

    /**
     * Sets the left child of a node, returns the parent node.
     */
    static insertLeft<E>(parentNode: BinaryNode<E>, newValue: E): BinaryNode<E> {
        parentNode.leftChild = new BinaryNode(newValue);
        return parentNode;
    }

    static  insertRight<E>(parentNode:BinaryNode<E>, newValue:E):BinaryNode<E>{
        parentNode.rightChild = new BinaryNode(newValue);
        return parentNode;
    }
}
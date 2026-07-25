import {BinaryTreeNode} from "../../../data_structures/tree/BinaryTreeNode.ts";

interface TraversalCallbacks {
    allowTraversal?: (node: BinaryTreeNode<any>, child: BinaryTreeNode<any>) => boolean;
    enterNode?: (node: BinaryTreeNode<any>) => void;
    leaveNode?: (node: BinaryTreeNode<any>) => void;
}

// Represents callbacks where all properties are guaranteed to be defined
interface RequiredTraversalCallbacks {
    allowTraversal: (node: BinaryTreeNode<any>, child: BinaryTreeNode<any>) => boolean;
    enterNode: (node: BinaryTreeNode<any>) => void;
    leaveNode: (node: BinaryTreeNode<any>) => void;
}

/**
 * Extend missing traversal callbacks with default callbacks.
 */
function initCallbacks(callbacks: TraversalCallbacks = {}): RequiredTraversalCallbacks {
    const stubCallback = (): void => {
    };
    const defaultAllowTraversalCallback = (): boolean => true;

    return {
        allowTraversal: callbacks.allowTraversal || defaultAllowTraversalCallback,
        enterNode: callbacks.enterNode || stubCallback,
        leaveNode: callbacks.leaveNode || stubCallback,
    };
}

/**
 * Recursive depth_first_search traversal for binary trees.
 */
function depthFirstSearchRecursive(
    node: BinaryTreeNode<any>,
    callbacks: RequiredTraversalCallbacks
): void {
    // Call the "enterNode" callback to notify that the node is going to be entered.
    callbacks.enterNode(node);

    // Traverse left branch only if traversal of the left node is allowed.
    if (node.left && callbacks.allowTraversal(node, node.left)) {
        depthFirstSearchRecursive(node.left, callbacks);
    }

    // Traverse right branch only if traversal of the right node is allowed.
    if (node.right && callbacks.allowTraversal(node, node.right)) {
        depthFirstSearchRecursive(node.right, callbacks);
    }

    // Call the "leaveNode" callback to notify that traversal of the current node and its children is finished.
    callbacks.leaveNode(node);
}

/**
 * Perform depth_first_search traversal of the rootNode.
 */
export function depthFirstSearch(
    rootNode: BinaryTreeNode<any>,
    callbacks?: TraversalCallbacks
): void {
    const processedCallbacks = initCallbacks(callbacks);
    depthFirstSearchRecursive(rootNode, processedCallbacks);
}
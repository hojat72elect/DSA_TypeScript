import {BinaryTreeNode} from "../../../data_structures/tree/BinaryTreeNode.ts";
import {Queue} from "../../../data_structures/queue/Queue.ts";

interface Callbacks {
    allowTraversal?: (node: BinaryTreeNode<any>, child: BinaryTreeNode<any>) => boolean;
    enterNode?: (node: BinaryTreeNode<any>) => void;
    leaveNode?: (node: BinaryTreeNode<any>) => void;
}

// Represents callbacks where all properties are guaranteed to be defined
interface RequiredCallbacks {
    allowTraversal: (node: BinaryTreeNode<any>, child: BinaryTreeNode<any>) => boolean;
    enterNode: (node: BinaryTreeNode<any>) => void;
    leaveNode: (node: BinaryTreeNode<any>) => void;
}

/**
 * Extend missing traversal callbacks with default callbacks.
 */
function initCallbacks(callbacks: Callbacks = {}): RequiredCallbacks {
    const stubCallback = (): void => {
    };
    const defaultAllowTraversal = (): boolean => true;

    return {
        allowTraversal: callbacks.allowTraversal || defaultAllowTraversal,
        enterNode: callbacks.enterNode || stubCallback,
        leaveNode: callbacks.leaveNode || stubCallback,
    };
}

/**
 * Perform breadth_first_search traversal of the rootNode.
 */
export function breadthFirstSearch(
    rootNode: BinaryTreeNode<any>,
    originalCallbacks?: Callbacks
) {
    const callbacks = initCallbacks(originalCallbacks);
    const nodeQueue = new Queue();

    // Do initial queue setup.
    nodeQueue.enqueue(rootNode);

    while (!nodeQueue.isEmpty()) {
        const currentNode = nodeQueue.dequeue();

        if (!currentNode) {
            continue;
        }

        callbacks.enterNode(currentNode);

        // Add all children to the queue for future traversals.

        // Traverse left branch.
        if (currentNode.left && callbacks.allowTraversal(currentNode, currentNode.left)) {
            nodeQueue.enqueue(currentNode.left);
        }

        // Traverse right branch.
        if (currentNode.right && callbacks.allowTraversal(currentNode, currentNode.right)) {
            nodeQueue.enqueue(currentNode.right);
        }

        callbacks.leaveNode(currentNode);
    }
}
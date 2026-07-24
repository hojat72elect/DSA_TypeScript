import {LinkedListNode} from "../../../../../DSA_TypeScript/src/data_structures/linked_list/LinkedListNode.ts";
import {LinkedList} from "../../../../../DSA_TypeScript/src/data_structures/linked_list/LinkedList.ts";

function reverseTraversalRecursive(node: LinkedListNode, callback: (nodeValue: any) => void) {
    if (node) {
        reverseTraversalRecursive(node.next, callback);
        callback(node.value);
    }
}

export function reverseTraversal(linkedList: LinkedList<any>, callback: (nodeValue: any) => void) {
    reverseTraversalRecursive(linkedList.head!, callback);
}

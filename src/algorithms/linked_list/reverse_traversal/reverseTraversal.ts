import {LinkedListNode, SinglyLinkedList} from "../../../data_structures/linked_list/SinglyLinkedList.ts";

function reverseTraversalRecursive(node: LinkedListNode<any>, callback: (nodeValue: any) => void) {
    if (node) {
        reverseTraversalRecursive(node.next!, callback);
        callback(node.data);
    }
}

export function reverseTraversal(linkedList: SinglyLinkedList<any>, callback: (nodeValue: any) => void) {
    reverseTraversalRecursive(linkedList.head!, callback);
}

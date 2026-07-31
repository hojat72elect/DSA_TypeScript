import {NewLinkedListNode, NewSinglyLinkedList} from "../../../data_structures/linked_list/NewSinglyLinkedList.ts";

function reverseTraversalRecursive(node: NewLinkedListNode<any>, callback: (nodeValue: any) => void) {
    if (node) {
        reverseTraversalRecursive(node.next!, callback);
        callback(node.data);
    }
}

export function reverseTraversal(linkedList: NewSinglyLinkedList<any>, callback: (nodeValue: any) => void) {
    reverseTraversalRecursive(linkedList.head!, callback);
}

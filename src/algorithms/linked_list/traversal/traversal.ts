import {NewSinglyLinkedList} from "../../../data_structures/linked_list/NewSinglyLinkedList.ts";

export function traversal(linkedList: NewSinglyLinkedList<any>, callback: (nodeValue: any) => void) {
    let currentNode = linkedList.head;

    while (currentNode) {
        callback(currentNode.data);
        currentNode = currentNode.next;
    }
}

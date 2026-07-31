import {SinglyLinkedList} from "../../../data_structures/linked_list/SinglyLinkedList.ts";

export function traversal(linkedList: SinglyLinkedList<any>, callback: (nodeValue: any) => void) {
    let currentNode = linkedList.head;

    while (currentNode) {
        callback(currentNode.data);
        currentNode = currentNode.next;
    }
}

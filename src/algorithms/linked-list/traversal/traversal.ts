import type {LinkedList} from "../../../../../DSA_TypeScript/src/data_structures/linkedlist/LinkedList.ts";

export function traversal(linkedList: LinkedList<any>, callback: (nodeValue: any) => void) {
    let currentNode = linkedList.head;

    while (currentNode) {
        callback(currentNode.value);
        currentNode = currentNode.next;
    }
}

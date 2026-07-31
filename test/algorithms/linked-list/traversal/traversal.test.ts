import {traversal} from "../../../../src/algorithms/linked_list/traversal/traversal.ts";
import {describe, expect, it} from "bun:test";
import {SinglyLinkedList} from "../../../../src/data_structures/linked_list/SinglyLinkedList.ts";

describe('traversal', () => {
    it('should traverse linked list', () => {
        const linkedList = new SinglyLinkedList();

        linkedList
            .append(1)
            .append(2)
            .append(3);

        const traversedNodeValues: any[] = [];
        const traversalCallback = (nodeValue: any) => {
            traversedNodeValues.push(nodeValue);
        };

        traversal(linkedList, traversalCallback);

        expect(traversedNodeValues).toEqual([1, 2, 3]);
    });
});

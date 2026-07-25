import {reverseTraversal} from "../../../../src/algorithms/linked_list/reverse_traversal/reverseTraversal.ts";
import {LinkedList} from "../../../../../DSA_TypeScript/src/data_structures/linked_list/LinkedList.js";
import {describe, expect, it} from "bun:test";

describe('reverseTraversal', () => {
    it('should traverse linked list in reverse order', () => {
        const linkedList = new LinkedList();

        linkedList
            .append(1)
            .append(2)
            .append(3);

        const traversedNodeValues: any[] = [];
        const traversalCallback = (nodeValue: any) => {
            traversedNodeValues.push(nodeValue);
        };

        reverseTraversal(linkedList, traversalCallback);
        expect(traversedNodeValues).toEqual([3, 2, 1]);
    });
});

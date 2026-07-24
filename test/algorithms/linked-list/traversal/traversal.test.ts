import {LinkedList} from "../../../../../DSA_TypeScript/src/data_structures/linked_list/LinkedList.js";
import {traversal} from "../../../../src/algorithms/linked-list/traversal/traversal.ts";
import {describe, expect, it} from "bun:test";

describe('traversal', () => {
    it('should traverse linked list', () => {
        const linkedList = new LinkedList();

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

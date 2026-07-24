import {LinkedListNode} from "../../../src/data_structures/linked_list/LinkedListNode.ts";
import {describe, expect, it} from "bun:test";

describe('LinkedListNode', () => {

    it('should create list node with value', () => {
        const sut = new LinkedListNode(1);

        expect(sut.value).toBe(1);
        expect(sut.next).toBeNull();
    });

    it('should create list node with object as a value', () => {
        const sut = new LinkedListNode({value: 1, key: 'test'});

        expect(sut.value.value).toBe(1);
        expect(sut.value.key).toBe('test');
        expect(sut.next).toBeNull();
    });

    it('should link nodes together', () => {
        const node2 = new LinkedListNode(2);
        const node1 = new LinkedListNode(1, node2 as any);

        expect(node1.next).toBeDefined();
        expect(node2.next).toBeNull();
        expect(node1.value).toBe(1);
        expect(node1.next.value).toBe(2);
    });

    it('should convert node to string', () => {
        const sut = new LinkedListNode(1);

        expect(sut.toString()).toBe('1');

        sut.value = 'string value';
        expect(sut.toString()).toBe('string value');
    });

    it('should convert node to string with custom stringifier', () => {
        const sut = new LinkedListNode({value: 1, key: 'test'});
        const toStringCallback = (value: any) => `value: ${value.value}, key: ${value.key}`;

        expect(sut.toString(toStringCallback)).toBe('value: 1, key: test');
    });
});

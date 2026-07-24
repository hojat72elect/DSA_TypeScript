import {DoublyLinkedListNode} from "../../../../DSA_TypeScript/src/data_structures/doubly_linked_list/DoublyLinkedListNode.ts";
import {describe, expect, it} from "bun:test";

describe('DoublyLinkedListNode', () => {

    it('should create list node with value', () => {
        const sut = new DoublyLinkedListNode(1);

        expect(sut.value).toBe(1);
        expect(sut.next).toBeNull();
        expect(sut.previous).toBeNull();
    });

    it('should create list node with object as a value', () => {
        const sut = new DoublyLinkedListNode({value: 1, key: 'test'});

        expect(sut.value.value).toBe(1);
        expect(sut.value.key).toBe('test');
        expect(sut.next).toBeNull();
        expect(sut.previous).toBeNull();
    });

    it('should link nodes together', () => {
        const node2 = new DoublyLinkedListNode(2);
        const node1 = new DoublyLinkedListNode(1, node2 as any);
        const node3 = new DoublyLinkedListNode(10, node1 as any, node2 as any);

        expect(node1.next).toBeDefined();
        expect(node1.previous).toBeNull();
        expect(node2.next).toBeNull();
        expect(node2.previous).toBeNull();
        expect(node3.next).toBeDefined();
        expect(node3.previous).toBeDefined();
        expect(node1.value).toBe(1);
        expect(node1.next.value).toBe(2);
        expect(node3.next.value).toBe(1);
        expect(node3.previous.value).toBe(2);
    });

    it('should convert node to string', () => {
        const sut = new DoublyLinkedListNode(1);

        expect(sut.toString()).toBe('1');

        sut.value = 'string value';
        expect(sut.toString()).toBe('string value');
    });

    it('should convert node to string with custom stringifier', () => {
        const sut = new DoublyLinkedListNode({value: 1, key: 'test'});
        const toStringCallback = (value: any) => `value: ${value.value}, key: ${value.key}`;

        expect(sut.toString(toStringCallback)).toBe('value: 1, key: test');
    });
});

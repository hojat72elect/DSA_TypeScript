import {describe, expect, it} from "bun:test";
import {SinglyLinkedList} from "../../../src/data_structures/linked_list/SinglyLinkedList.ts";

describe('SinglyLinkedList', () => {
    it('should create empty linked list', () => {
        const sut = new SinglyLinkedList();
        expect(sut.head).toBeNull();
        expect(sut.tail).toBeNull();
        expect(sut.toString()).toBe('');
        expect(sut.size()).toBe(0);
    });

    it('should append node to linked list', () => {
        const sut = new SinglyLinkedList();

        expect(sut.head).toBeNull();
        expect(sut.tail).toBeNull();

        sut.append(1);
        sut.append(2);

        expect(sut.head!.data).toBe(1);
        expect(sut.head!.next!.data).toBe(2);
        expect(sut.tail!.data).toBe(2);
        expect(sut.toString()).toBe('1,2');
        expect(sut.size()).toBe(2);
    });

    it('should prepend node to linked list', () => {
        const sut = new SinglyLinkedList();

        sut.prepend(2);
        expect(sut.head!.data).toBe(2);
        expect(sut.tail!.data).toBe(2);

        sut.append(1);
        sut.prepend(3);

        expect(sut.head!.data).toBe(3);
        expect(sut.head!.next!.data).toBe(2);
        expect(sut.head!.next!.next!.data).toBe(1);
        expect(sut.tail!.data).toBe(1);
        expect(sut.toString()).toBe('3,2,1');
        expect(sut.size()).toBe(3);
    });

    it('should create linked list from array', () => {
        const sut = SinglyLinkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

        expect(sut.toString()).toBe('1,1,2,3,3,3,4,5');
        expect(sut.size()).toBe(8);
    });

    it('should convert linked list to array', () => {
        const sut = new SinglyLinkedList();
        sut.append(1).append(2).append(3);

        const nodes = sut.toArray();
        expect(nodes.length).toBe(3);
        expect(nodes[0]!.data).toBe(1);
        expect(nodes[1]!.data).toBe(2);
        expect(nodes[2]!.data).toBe(3);
    });

    it('should delete node by value from linked list', () => {
        const sut = new SinglyLinkedList();

        expect(sut.delete(5)).toBeNull();

        sut.append(1);
        sut.append(1);
        sut.append(2);
        sut.append(3);
        sut.append(3);
        sut.append(3);
        sut.append(4);
        sut.append(5);

        expect(sut.head!.data).toBe(1);
        expect(sut.tail!.data).toBe(5);

        const deletedNode = sut.delete(3);
        expect(deletedNode!.data).toBe(3);
        expect(sut.toString()).toBe('1,1,2,4,5');
        expect(sut.size()).toBe(5);

        sut.delete(3);
        expect(sut.toString()).toBe('1,1,2,4,5');

        sut.delete(1);
        expect(sut.toString()).toBe('2,4,5');

        expect(sut.head!.data).toBe(2);
        expect(sut.tail!.data).toBe(5);

        sut.delete(5);
        expect(sut.toString()).toBe('2,4');

        expect(sut.head!.data).toBe(2);
        expect(sut.tail!.data).toBe(4);

        sut.delete(4);
        expect(sut.toString()).toBe('2');

        expect(sut.head!.data).toBe(2);
        expect(sut.tail!.data).toBe(2);

        sut.delete(2);
        expect(sut.toString()).toBe('');
        expect(sut.head).toBeNull();
        expect(sut.tail).toBeNull();
    });

    it('should delete linked list tail', () => {
        const sut = new SinglyLinkedList();

        expect(sut.deleteTail()).toBeNull();

        sut.append(1);
        sut.append(2);
        sut.append(3);

        expect(sut.head!.data).toBe(1);
        expect(sut.tail!.data).toBe(3);

        const deletedNode1 = sut.deleteTail();

        expect(deletedNode1!.data).toBe(3);
        expect(sut.toString()).toBe('1,2');
        expect(sut.head!.data).toBe(1);
        expect(sut.tail!.data).toBe(2);
        expect(sut.size()).toBe(2);

        const deletedNode2 = sut.deleteTail();

        expect(deletedNode2!.data).toBe(2);
        expect(sut.toString()).toBe('1');
        expect(sut.head!.data).toBe(1);
        expect(sut.tail!.data).toBe(1);
        expect(sut.size()).toBe(1);

        const deletedNode3 = sut.deleteTail();

        expect(deletedNode3!.data).toBe(1);
        expect(sut.toString()).toBe('');
        expect(sut.head).toBeNull();
        expect(sut.tail).toBeNull();
        expect(sut.size()).toBe(0);
    });

    it('should delete linked list head', () => {
        const sut = new SinglyLinkedList();

        expect(sut.deleteHead()).toBeNull();

        sut.append(1);
        sut.append(2);

        expect(sut.head!.data).toBe(1);
        expect(sut.tail!.data).toBe(2);

        const deletedNode1 = sut.deleteHead();

        expect(deletedNode1!.data).toBe(1);
        expect(deletedNode1!.next).toBeNull();
        expect(sut.toString()).toBe('2');
        expect(sut.head!.data).toBe(2);
        expect(sut.tail!.data).toBe(2);
        expect(sut.size()).toBe(1);

        const deletedNode2 = sut.deleteHead();

        expect(deletedNode2!.data).toBe(2);
        expect(sut.toString()).toBe('');
        expect(sut.head).toBeNull();
        expect(sut.tail).toBeNull();
        expect(sut.size()).toBe(0);
    });

    it('should be possible to store objects in the list and to print them out', () => {
        const sut = new SinglyLinkedList();

        const nodeValue1 = {value: 1, key: 'key1'};
        const nodeValue2 = {value: 2, key: 'key2'};

        sut.append(nodeValue1).prepend(nodeValue2);

        const nodeStringifier = (value: any) => `${value.key}:${value.value}`;

        expect(sut.toString(nodeStringifier)).toBe('key2:2,key1:1');
    });

    it('should find node by value', () => {
        const sut = new SinglyLinkedList();

        expect(sut.find(5)).toBeNull();

        sut.append(1);
        expect(sut.find(1)).toBeDefined();

        sut.append(2).append(3);

        const node = sut.find(2);

        expect(node!.data).toBe(2);
        expect(sut.find(5)).toBeNull();
    });

    it('should find node by means of custom compare function', () => {
        const comparatorFunction = (a: any, b: any) => {
            if (a.customValue === b.customValue) {
                return 0;
            }

            return a.customValue < b.customValue ? -1 : 1;
        };

        const sut = new SinglyLinkedList(comparatorFunction);

        sut
            .append({value: 1, customValue: 'test1'})
            .append({value: 2, customValue: 'test2'})
            .append({value: 3, customValue: 'test3'});

        const node = sut.find({value: 2, customValue: 'test2'});

        expect(node).toBeDefined();
        expect(node!.data.value).toBe(2);
        expect(node!.data.customValue).toBe('test2');
        expect(sut.find(2)).toBeNull();
    });

    it('should insert node at specific index', () => {
        const sut = new SinglyLinkedList();

        sut.append(1).append(2).append(3);

        expect(sut.toString()).toBe('1,2,3');

        sut.insert(4, 0);
        expect(sut.toString()).toBe('4,1,2,3');
        expect(sut.head!.data).toBe(4);

        sut.insert(5, 2);
        expect(sut.toString()).toBe('4,1,5,2,3');

        sut.insert(6, 5);
        expect(sut.toString()).toBe('4,1,5,2,3,6');
        expect(sut.tail!.data).toBe(6);
        expect(sut.size()).toBe(6);
    });

    it('should throw error when inserting at invalid index', () => {
        const sut = new SinglyLinkedList();
        sut.append(1).append(2);

        expect(() => sut.insert(3, -1)).toThrow();
        expect(() => sut.insert(3, 10)).toThrow();
    });

    it('should return correct size', () => {
        const sut = new SinglyLinkedList();

        expect(sut.size()).toBe(0);

        sut.append(1);
        expect(sut.size()).toBe(1);

        sut.append(2).append(3);
        expect(sut.size()).toBe(3);

        sut.delete(2);
        expect(sut.size()).toBe(2);

        sut.deleteHead();
        expect(sut.size()).toBe(1);

        sut.deleteTail();
        expect(sut.size()).toBe(0);
    });

    it('should handle deleting all nodes with same value from head', () => {
        const sut = new SinglyLinkedList();

        sut.append(1).append(1).append(1).append(2);

        sut.delete(1);
        expect(sut.toString()).toBe('2');
        expect(sut.head!.data).toBe(2);
        expect(sut.tail!.data).toBe(2);
    });

    it('should handle deleting all nodes with same value from tail', () => {
        const sut = new SinglyLinkedList();

        sut.append(1).append(2).append(2).append(2);

        sut.delete(2);
        expect(sut.toString()).toBe('1');
        expect(sut.head!.data).toBe(1);
        expect(sut.tail!.data).toBe(1);
    });
});

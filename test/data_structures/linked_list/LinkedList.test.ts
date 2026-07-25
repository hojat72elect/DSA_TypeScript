import {LinkedList} from "../../../src/data_structures/linked_list/LinkedList.ts";
import {describe, expect, it} from "bun:test";

describe('LinkedList', () => {
    it('should create empty linked list', () => {
        const sut = new LinkedList();
        expect(sut.toString()).toBe('');
    });

    it('should append node to linked list', () => {
        const sut = new LinkedList();

        expect(sut.head).toBeNull();
        expect(sut.tail).toBeNull();

        sut.append(1);
        sut.append(2);

        expect(sut.toString()).toBe('1,2');
        expect(sut.tail?.next).toBeNull();
    });

    it('should prepend node to linked list', () => {
        const sut = new LinkedList();

        sut.prepend(2);
        expect(sut.head?.toString()).toBe('2');
        expect(sut.tail?.toString()).toBe('2');

        sut.append(1);
        sut.prepend(3);

        expect(sut.toString()).toBe('3,2,1');
    });

    it('should insert node to linked list', () => {
        const sut = new LinkedList();

        sut.insert(4, 3);
        expect(sut.head?.toString()).toBe('4');
        expect(sut.tail?.toString()).toBe('4');

        sut.insert(3, 2);
        sut.insert(2, 1);
        sut.insert(1, -7);
        sut.insert(10, 9);

        expect(sut.toString()).toBe('1,4,2,3,10');
    });

    it('should delete node by value from linked list', () => {
        const sut = new LinkedList();

        expect(sut.delete(5)).toBeNull();

        sut.append(1);
        sut.append(1);
        sut.append(2);
        sut.append(3);
        sut.append(3);
        sut.append(3);
        sut.append(4);
        sut.append(5);

        expect(sut.head?.toString()).toBe('1');
        expect(sut.tail?.toString()).toBe('5');

        const deletedNode = sut.delete(3);
        expect(deletedNode?.value).toBe(3);
        expect(sut.toString()).toBe('1,1,2,4,5');

        sut.delete(3);
        expect(sut.toString()).toBe('1,1,2,4,5');

        sut.delete(1);
        expect(sut.toString()).toBe('2,4,5');

        expect(sut.head?.toString()).toBe('2');
        expect(sut.tail?.toString()).toBe('5');

        sut.delete(5);
        expect(sut.toString()).toBe('2,4');

        expect(sut.head?.toString()).toBe('2');
        expect(sut.tail?.toString()).toBe('4');

        sut.delete(4);
        expect(sut.toString()).toBe('2');

        expect(sut.head?.toString()).toBe('2');
        expect(sut.tail?.toString()).toBe('2');

        sut.delete(2);
        expect(sut.toString()).toBe('');
    });

    it('should delete linked list tail', () => {
        const sut = new LinkedList();

        sut.append(1);
        sut.append(2);
        sut.append(3);

        expect(sut.head?.toString()).toBe('1');
        expect(sut.tail?.toString()).toBe('3');

        const deletedNode1 = sut.deleteTail();

        expect(deletedNode1?.value).toBe(3);
        expect(sut.toString()).toBe('1,2');
        expect(sut.head?.toString()).toBe('1');
        expect(sut.tail?.toString()).toBe('2');

        const deletedNode2 = sut.deleteTail();

        expect(deletedNode2?.value).toBe(2);
        expect(sut.toString()).toBe('1');
        expect(sut.head?.toString()).toBe('1');
        expect(sut.tail?.toString()).toBe('1');

        const deletedNode3 = sut.deleteTail();

        expect(deletedNode3?.value).toBe(1);
        expect(sut.toString()).toBe('');
        expect(sut.head).toBeNull();
        expect(sut.tail).toBeNull();
    });

    it('should delete linked list head', () => {
        const sut = new LinkedList();

        expect(sut.deleteHead()).toBeNull();

        sut.append(1);
        sut.append(2);

        expect(sut.head?.toString()).toBe('1');
        expect(sut.tail?.toString()).toBe('2');

        const deletedNode1 = sut.deleteHead();

        expect(deletedNode1?.value).toBe(1);
        expect(sut.toString()).toBe('2');
        expect(sut.head?.toString()).toBe('2');
        expect(sut.tail?.toString()).toBe('2');

        const deletedNode2 = sut.deleteHead();

        expect(deletedNode2?.value).toBe(2);
        expect(sut.toString()).toBe('');
        expect(sut.head).toBeNull();
        expect(sut.tail).toBeNull();
    });

    it('should be possible to store objects in the list and to print them out', () => {
        const sut = new LinkedList();

        sut.append({value: 1, key: 'key1'}).prepend({value: 2, key: 'key2'});

        const nodeStringifier = (value: any) => `${value.key}:${value.value}`;

        expect(sut.toString(nodeStringifier)).toBe('key2:2,key1:1');
    });

    it('should find node by value', () => {
        const sut = new LinkedList();

        expect(sut.find({value: 5})).toBeNull();

        sut.append(1);
        expect(sut.find({value: 1})).toBeDefined();

        sut.append(2).append(3);

        const node = sut.find({value: 2});

        expect(node?.value).toBe(2);
        expect(sut.find({value: 5})).toBeNull();
    });

    it('should find node by callback', () => {
        const sut = new LinkedList();

        sut.append({value: 1, key: 'test1'}).append({value: 2, key: 'test2'}).append({value: 3, key: 'test3'});

        const node = sut.find({value: undefined, callback: (value: any) => value.key === 'test2'});

        expect(node).toBeDefined();
        expect(node?.value.value).toBe(2);
        expect(node?.value.key).toBe('test2');
        expect(sut.find({value: undefined, callback: (value: any) => value.key === 'test5'})).toBeNull();
    });

    it('should create linked list from array', () => {
        const sut = new LinkedList();
        sut.fromArray([1, 1, 2, 3, 3, 3, 4, 5]);

        expect(sut.toString()).toBe('1,1,2,3,3,3,4,5');
    });

    it('should find node by means of custom compare function', () => {
        const comparatorFunction = (a: any, b: any) => {
            if (a.customValue === b.customValue) {
                return 0;
            }

            return a.customValue < b.customValue ? -1 : 1;
        };

        const sut = new LinkedList(comparatorFunction);

        sut.append({value: 1, customValue: 'test1'}).append({value: 2, customValue: 'test2'}).append({
            value: 3,
            customValue: 'test3'
        });

        const node = sut.find({
            value: {value: 2, customValue: 'test2'},
        });

        expect(node).toBeDefined();
        expect(node?.value.value).toBe(2);
        expect(node?.value.customValue).toBe('test2');
        expect(sut.find({value: {value: 2, customValue: 'test5'}})).toBeNull();
    });

    it('should find preferring callback over compare function', () => {
        const greaterThan = (value: any, compareTo: any) => (value > compareTo ? 0 : 1);

        const sut = new LinkedList(greaterThan);
        sut.fromArray([1, 2, 3, 4, 5]);

        let node = sut.find({value: 3});
        expect(node?.value).toBe(4);

        node = sut.find({value: undefined, callback: (value: any) => value < 3});
        expect(node?.value).toBe(1);
    });

    it('should convert to array', () => {
        const sut = new LinkedList();
        sut.append(1);
        sut.append(2);
        sut.append(3);
        expect(sut.toArray().join(',')).toBe('1,2,3');
    });

    it('should reverse linked list', () => {
        const sut = new LinkedList();

        // Add test values to linked list.
        sut.append(1).append(2).append(3);

        expect(sut.toString()).toBe('1,2,3');
        expect(sut.head?.value).toBe(1);
        expect(sut.tail?.value).toBe(3);

        // Reverse linked list.
        sut.reverse();
        expect(sut.toString()).toBe('3,2,1');
        expect(sut.head?.value).toBe(3);
        expect(sut.tail?.value).toBe(1);

        // Reverse linked list back to initial state.
        sut.reverse();
        expect(sut.toString()).toBe('1,2,3');
        expect(sut.head?.value).toBe(1);
        expect(sut.tail?.value).toBe(3);
    });
});

import {Stack} from "../../../src/data_structures/stack/Stack.ts";
import {describe, expect, it} from "bun:test";

describe('Stack', () => {
    it('should create empty stack', () => {
        const sut = new Stack();
        expect(sut).not.toBeNull();
        expect(sut.getList()).not.toBeNull();
    });

    it('should peek data from stack', () => {
        const sut = new Stack();

        expect(sut.peek()).toBeNull();

        sut.push(1);
        sut.push(2);

        expect(sut.peek()).toBe(2);
        expect(sut.peek()).toBe(2);
    });

    it('should check if stack is empty', () => {
        const sut = new Stack();

        expect(sut.isEmpty()).toBeTrue();

        sut.push(1);

        expect(sut.isEmpty()).toBeFalse();
    });

    it('should pop data from stack', () => {
        const sut = new Stack();

        sut.push(1);
        sut.push(2);

        expect(sut.pop()).toBe(2);
        expect(sut.pop()).toBe(1);
        expect(sut.pop()).toBeNull();
        expect(sut.isEmpty()).toBeTrue();
    });

    it('should be possible to push/pop objects', () => {
        const sut = new Stack<any>();

        sut.push({value: 'test1', key: 'key1'});
        sut.push({value: 'test2', key: 'key2'});

        expect(sut.pop().value).toBe('test2');
        expect(sut.pop().value).toBe('test1');
    });

    it('should be possible to convert stack to array', () => {
        const sut = new Stack();

        expect(sut.peek()).toBeNull();

        sut.push(1);
        sut.push(2);
        sut.push(3);

        expect(sut.toArray()).toEqual([3, 2, 1]);
    });
});

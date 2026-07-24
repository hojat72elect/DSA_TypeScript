import {Queue} from "../../../src/data_structures/queue/Queue.ts";
import {describe, expect, it} from "bun:test";

describe('Queue', () => {
    it('should create empty queue', () => {
        const sut = new Queue();
        expect(sut).not.toBeNull();
        expect(sut.linkedList).not.toBeNull();
    });

    it('should enqueue data to queue', () => {
        const sut = new Queue();

        sut.enqueue(1);
        sut.enqueue(2);

        expect(sut.toString()).toBe('1,2');
    });

    it('should be possible to enqueue/dequeue objects', () => {
        const sut = new Queue();

        sut.enqueue({value: 'test1', key: 'key1'});
        sut.enqueue({value: 'test2', key: 'key2'});

        const stringifier = (value: any) => `${value.key}:${value.value}`;

        expect(sut.toString(stringifier)).toBe('key1:test1,key2:test2');
        expect(sut.dequeue().value).toBe('test1');
        expect(sut.dequeue().value).toBe('test2');
    });

    it('should peek data from queue', () => {
        const sut = new Queue();

        expect(sut.peek()).toBeNull();

        sut.enqueue(1);
        sut.enqueue(2);

        expect(sut.peek()).toBe(1);
        expect(sut.peek()).toBe(1);
    });

    it('should check if queue is empty', () => {
        const sut = new Queue();

        expect(sut.isEmpty()).toBeTrue();

        sut.enqueue(1);

        expect(sut.isEmpty()).toBeFalse();
    });

    it('should dequeue from queue in FIFO order', () => {
        const sut = new Queue();

        sut.enqueue(1);
        sut.enqueue(2);

        expect(sut.dequeue()).toBe(1);
        expect(sut.dequeue()).toBe(2);
        expect(sut.dequeue()).toBeNull();
        expect(sut.isEmpty()).toBeTrue();
    });
});

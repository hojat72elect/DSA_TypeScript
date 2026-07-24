import {PriorityQueue} from "../../../../DSA_TypeScript/src/data_structures/priority-queue/PriorityQueue.js";
import {describe, expect, it} from "bun:test";

describe('PriorityQueue', () => {
    it('should create default priority queue', () => {
        const sut = new PriorityQueue();

        expect(sut).toBeDefined();
    });

    it('should insert items to the queue and respect priorities', () => {
        const sut = new PriorityQueue();

        sut.addItemWithPriority(10, 1);
        expect(sut.peek()).toBe(10);

        sut.addItemWithPriority(5, 2);
        expect(sut.peek()).toBe(10);

        sut.addItemWithPriority(100, 0);
        expect(sut.peek()).toBe(100);
    });

    it('should be possible to use objects in priority queue', () => {
        const sut = new PriorityQueue();

        const user1 = {name: 'Mike'};
        const user2 = {name: 'Bill'};
        const user3 = {name: 'Jane'};

        sut.addItemWithPriority(user1, 1);
        expect(sut.peek()).toBe(user1);

        sut.addItemWithPriority(user2, 2);
        expect(sut.peek()).toBe(user1);

        sut.addItemWithPriority(user3, 0);
        expect(sut.peek()).toBe(user3);
    });

    it('should poll from queue with respect to priorities', () => {
        const sut = new PriorityQueue();

        sut.addItemWithPriority(10, 1);
        sut.addItemWithPriority(5, 2);
        sut.addItemWithPriority(100, 0);
        sut.addItemWithPriority(200, 0);

        expect(sut.poll()).toBe(100);
        expect(sut.poll()).toBe(200);
        expect(sut.poll()).toBe(10);
        expect(sut.poll()).toBe(5);
    });

    it('should be possible to change priority of head node', () => {
        const sut = new PriorityQueue();

        sut.addItemWithPriority(10, 1);
        sut.addItemWithPriority(5, 2);
        sut.addItemWithPriority(100, 0);
        sut.addItemWithPriority(200, 0);

        expect(sut.peek()).toBe(100);

        sut.changePriority(100, 10);
        sut.changePriority(10, 20);

        expect(sut.poll()).toBe(200);
        expect(sut.poll()).toBe(5);
        expect(sut.poll()).toBe(100);
        expect(sut.poll()).toBe(10);
    });

    it('should be possible to change priority of internal nodes', () => {
        const sut = new PriorityQueue();

        sut.addItemWithPriority(10, 1);
        sut.addItemWithPriority(5, 2);
        sut.addItemWithPriority(100, 0);
        sut.addItemWithPriority(200, 0);

        expect(sut.peek()).toBe(100);

        sut.changePriority(200, 10);
        sut.changePriority(10, 20);

        expect(sut.poll()).toBe(100);
        expect(sut.poll()).toBe(5);
        expect(sut.poll()).toBe(200);
        expect(sut.poll()).toBe(10);
    });

    it('should be possible to change priority along with node addition', () => {
        const sut = new PriorityQueue();

        sut.addItemWithPriority(10, 1);
        sut.addItemWithPriority(5, 2);
        sut.addItemWithPriority(100, 0);
        sut.addItemWithPriority(200, 0);

        sut.changePriority(200, 10);
        sut.changePriority(10, 20);

        sut.addItemWithPriority(15, 15);

        expect(sut.poll()).toBe(100);
        expect(sut.poll()).toBe(5);
        expect(sut.poll()).toBe(200);
        expect(sut.poll()).toBe(15);
        expect(sut.poll()).toBe(10);
    });

    it('should be possible to search in priority queue by value', () => {
        const sut = new PriorityQueue();

        sut.addItemWithPriority(10, 1);
        sut.addItemWithPriority(5, 2);
        sut.addItemWithPriority(100, 0);
        sut.addItemWithPriority(200, 0);
        sut.addItemWithPriority(15, 15);

        expect(sut.hasValue(70)).toBeFalse();
        expect(sut.hasValue(15)).toBeTrue();
    });
});

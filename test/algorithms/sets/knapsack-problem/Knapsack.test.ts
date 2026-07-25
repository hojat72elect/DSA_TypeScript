import {KnapsackItem} from "../../../../src/algorithms/sets/knapsack_problem/KnapsackItem.ts";
import Knapsack from "../../../../src/algorithms/sets/knapsack_problem/Knapsack.ts";
import {describe, expect, it} from "bun:test";

describe('Knapsack', () => {
    it('should solve 0/1 knapsack problem', () => {
        const possibleKnapsackItems = [
            new KnapsackItem(1, 1),
            new KnapsackItem(4, 3),
            new KnapsackItem(5, 4),
            new KnapsackItem(7, 5)
        ];

        const maxKnapsackWeight = 7;
        const knapsack = new Knapsack(possibleKnapsackItems, maxKnapsackWeight);
        knapsack.solveZeroOneKnapsackProblem();

        expect(knapsack.totalValue).toBe(9);
        expect(knapsack.totalWeight).toBe(7);
        expect(knapsack.selectedItems.length).toBe(2);
        expect(knapsack.selectedItems[0]!.toString()).toBe('v5 w4 x 1');
        expect(knapsack.selectedItems[1]!.toString()).toBe('v4 w3 x 1');
    });

    it('should solve 0/1 knapsack problem regardless of items order', () => {
        const possibleKnapsackItems = [
            new KnapsackItem(5, 4),
            new KnapsackItem(1, 1),
            new KnapsackItem(7, 5),
            new KnapsackItem(4, 3)
        ];

        const maxKnapsackWeight = 7;
        const knapsack = new Knapsack(possibleKnapsackItems, maxKnapsackWeight);
        knapsack.solveZeroOneKnapsackProblem();

        expect(knapsack.totalValue).toBe(9);
        expect(knapsack.totalWeight).toBe(7);
        expect(knapsack.selectedItems.length).toBe(2);
        expect(knapsack.selectedItems[0]!.toString()).toBe('v5 w4 x 1');
        expect(knapsack.selectedItems[1]!.toString()).toBe('v4 w3 x 1');
    });

    it('should solve 0/1 knapsack problem with impossible items set', () => {
        const possibleKnapsackItems = [
            new KnapsackItem(5, 40),
            new KnapsackItem(1, 10),
            new KnapsackItem(7, 50),
            new KnapsackItem(4, 30)
        ];

        const maxKnapsackWeight = 7;
        const knapsack = new Knapsack(possibleKnapsackItems, maxKnapsackWeight);
        knapsack.solveZeroOneKnapsackProblem();

        expect(knapsack.totalValue).toBe(0);
        expect(knapsack.totalWeight).toBe(0);
        expect(knapsack.selectedItems.length).toBe(0);
    });

    it('should solve 0/1 knapsack problem with all equal weights', () => {
        const possibleKnapsackItems = [
            new KnapsackItem(5, 1),
            new KnapsackItem(1, 1),
            new KnapsackItem(7, 1),
            new KnapsackItem(4, 1),
            new KnapsackItem(4, 1),
            new KnapsackItem(4, 1)
        ];

        const maxKnapsackWeight = 3;
        const knapsack = new Knapsack(possibleKnapsackItems, maxKnapsackWeight);
        knapsack.solveZeroOneKnapsackProblem();

        expect(knapsack.totalValue).toBe(16);
        expect(knapsack.totalWeight).toBe(3);
        expect(knapsack.selectedItems.length).toBe(3);
        expect(knapsack.selectedItems[0]!.toString()).toBe('v4 w1 x 1');
        expect(knapsack.selectedItems[1]!.toString()).toBe('v5 w1 x 1');
        expect(knapsack.selectedItems[2]!.toString()).toBe('v7 w1 x 1');
    });

    it('should solve unbound knapsack problem', () => {
        const possibleKnapsackItems = [

            new KnapsackItem(84, 7), // v/w ratio is 12
            new KnapsackItem(5, 2), // v/w ratio is 2.5
            new KnapsackItem(12, 3), // v/w ratio is 4
            new KnapsackItem(10, 1), // v/w ratio is 10
            new KnapsackItem(20, 2) // v/w ratio is 10
        ];

        const maxKnapsackWeight = 15;
        const knapsack = new Knapsack(possibleKnapsackItems, maxKnapsackWeight);
        knapsack.solveUnboundedKnapsackProblem();

        expect(knapsack.totalValue).toBe(84 + 20 + 12 + 10 + 5);
        expect(knapsack.totalWeight).toBe(15);
        expect(knapsack.selectedItems.length).toBe(5);
        expect(knapsack.selectedItems[0]!.toString()).toBe('v84 w7 x 1');
        expect(knapsack.selectedItems[1]!.toString()).toBe('v20 w2 x 1');
        expect(knapsack.selectedItems[2]!.toString()).toBe('v10 w1 x 1');
        expect(knapsack.selectedItems[3]!.toString()).toBe('v12 w3 x 1');
        expect(knapsack.selectedItems[4]!.toString()).toBe('v5 w2 x 1');
    });

    it('should solve unbound knapsack problem with items in stock', () => {
        const possibleKnapsackItems = [
            new KnapsackItem(84, 7, 3), // v/w ratio is 12
            new KnapsackItem(5, 2, 2), // v/w ratio is 2.5
            new KnapsackItem(12, 3, 1), // v/w ratio is 4
            new KnapsackItem(10, 1, 6), // v/w ratio is 10
            new KnapsackItem(20, 2, 8) // v/w ratio is 10
        ];

        const maxKnapsackWeight = 17;
        const knapsack = new Knapsack(possibleKnapsackItems, maxKnapsackWeight);
        knapsack.solveUnboundedKnapsackProblem();

        expect(knapsack.totalValue).toBe(84 + 84 + 20 + 10);
        expect(knapsack.totalWeight).toBe(17);
        expect(knapsack.selectedItems.length).toBe(3);
        expect(knapsack.selectedItems[0]!.toString()).toBe('v84 w7 x 2');
        expect(knapsack.selectedItems[1]!.toString()).toBe('v20 w2 x 1');
        expect(knapsack.selectedItems[2]!.toString()).toBe('v10 w1 x 1');
    });

    it('should solve unbound knapsack problem with items in stock and max weight more than sum of all items', () => {
        const possibleKnapsackItems = [
            new KnapsackItem(84, 7, 3), // v/w ratio is 12
            new KnapsackItem(5, 2, 2), // v/w ratio is 2.5
            new KnapsackItem(12, 3, 1), // v/w ratio is 4
            new KnapsackItem(10, 1, 6), // v/w ratio is 10
            new KnapsackItem(20, 2, 8) // v/w ratio is 10
        ];

        const maxKnapsackWeight = 60;

        const knapsack = new Knapsack(possibleKnapsackItems, maxKnapsackWeight);

        knapsack.solveUnboundedKnapsackProblem();

        expect(knapsack.totalValue).toBe((3 * 84) + (2 * 5) + (1 * 12) + (6 * 10) + (8 * 20));
        expect(knapsack.totalWeight).toBe((3 * 7) + (2 * 2) + (1 * 3) + (6 * 1) + (8 * 2));
        expect(knapsack.selectedItems.length).toBe(5);
        expect(knapsack.selectedItems[0]!.toString()).toBe('v84 w7 x 3');
        expect(knapsack.selectedItems[1]!.toString()).toBe('v20 w2 x 8');
        expect(knapsack.selectedItems[2]!.toString()).toBe('v10 w1 x 6');
        expect(knapsack.selectedItems[3]!.toString()).toBe('v12 w3 x 1');
        expect(knapsack.selectedItems[4]!.toString()).toBe('v5 w2 x 2');
    });
});

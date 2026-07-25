import {fisherYates} from "../../../../src/algorithms/sets/fisher_yates/fisherYates.ts";
import {sortedArr} from "../../../../src/algorithms/sorting/SortTester.js";
import {QuickSort} from "../../../../src/algorithms/sorting/quick_sort/QuickSort.ts";
import {describe, expect, it} from "bun:test";

describe('fisherYates', () => {
    it('should shuffle small arrays', () => {
        expect(fisherYates([])).toEqual([]);
        expect(fisherYates([1])).toEqual([1]);
    });

    it('should shuffle array randomly', () => {
        const shuffledArray = fisherYates(sortedArr);
        const sorter = new QuickSort();

        expect(shuffledArray.length).toBe(sortedArr.length);
        expect(shuffledArray).not.toEqual(sortedArr);
        expect(sorter.sort(shuffledArray)).toEqual(sortedArr);
    });
});

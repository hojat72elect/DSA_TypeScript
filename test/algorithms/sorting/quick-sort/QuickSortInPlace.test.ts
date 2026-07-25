import {QuickSortInPlace} from "../../../../src/algorithms/sorting/quick_sort/QuickSortInPlace.ts";
import {
    equalArr,
    notSortedArr,
    reverseArr,
    sortedArr,
    SortTester
} from "../../../../src/algorithms/sorting/SortTester.js";
import {describe, it} from "bun:test";

// Complexity constants.
const SORTED_ARRAY_VISITING_COUNT = 19;
const NOT_SORTED_ARRAY_VISITING_COUNT = 12;
const REVERSE_SORTED_ARRAY_VISITING_COUNT = 19;
const EQUAL_ARRAY_VISITING_COUNT = 19;

describe('QuickSortInPlace', () => {
    it('should sort array', () => {
        SortTester.testSort(QuickSortInPlace);
    });

    it('should sort array with custom comparator', () => {
        SortTester.testSortWithCustomComparator(QuickSortInPlace);
    });

    it('should sort negative numbers', () => {
        SortTester.testNegativeNumbersSort(QuickSortInPlace);
    });

    it('should visit EQUAL array element specified number of times', () => {
        SortTester.testAlgorithmTimeComplexity(
            QuickSortInPlace,
            equalArr,
            EQUAL_ARRAY_VISITING_COUNT,
        );
    });

    it('should visit SORTED array element specified number of times', () => {
        SortTester.testAlgorithmTimeComplexity(
            QuickSortInPlace,
            sortedArr,
            SORTED_ARRAY_VISITING_COUNT,
        );
    });

    it('should visit NOT SORTED array element specified number of times', () => {
        SortTester.testAlgorithmTimeComplexity(
            QuickSortInPlace,
            notSortedArr,
            NOT_SORTED_ARRAY_VISITING_COUNT,
        );
    });

    it('should visit REVERSE SORTED array element specified number of times', () => {
        SortTester.testAlgorithmTimeComplexity(
            QuickSortInPlace,
            reverseArr,
            REVERSE_SORTED_ARRAY_VISITING_COUNT,
        );
    });
});

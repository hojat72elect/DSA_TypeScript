import {BucketSort} from "../../../../src/algorithms/sorting/bucket_sort/BucketSort.ts";
import {equalArr, notSortedArr, reverseArr, sortedArr} from "../../../../src/algorithms/sorting/SortTester.ts";
import {describe, expect, it} from "bun:test";

describe('BucketSort', () => {
    it('should sort the array of numbers with different buckets amounts', () => {
        expect(BucketSort(notSortedArr, 4)).toEqual(sortedArr);
        expect(BucketSort(equalArr, 4)).toEqual(equalArr);
        expect(BucketSort(reverseArr, 4)).toEqual(sortedArr);
        expect(BucketSort(sortedArr, 4)).toEqual(sortedArr);

        expect(BucketSort(notSortedArr, 10)).toEqual(sortedArr);
        expect(BucketSort(equalArr, 10)).toEqual(equalArr);
        expect(BucketSort(reverseArr, 10)).toEqual(sortedArr);
        expect(BucketSort(sortedArr, 10)).toEqual(sortedArr);

        expect(BucketSort(notSortedArr, 50)).toEqual(sortedArr);
        expect(BucketSort(equalArr, 50)).toEqual(equalArr);
        expect(BucketSort(reverseArr, 50)).toEqual(sortedArr);
        expect(BucketSort(sortedArr, 50)).toEqual(sortedArr);
    });

    it('should sort the array of numbers with the default buckets of 1', () => {
        expect(BucketSort(notSortedArr)).toEqual(sortedArr);
        expect(BucketSort(equalArr)).toEqual(equalArr);
        expect(BucketSort(reverseArr)).toEqual(sortedArr);
        expect(BucketSort(sortedArr)).toEqual(sortedArr);
    });
});

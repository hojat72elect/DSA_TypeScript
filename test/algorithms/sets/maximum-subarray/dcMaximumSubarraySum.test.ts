import {dcMaximumSubarraySum} from '../../../../src/algorithms/sets/maximum_subarray/dcMaximumSubarraySum.ts';
import {describe, expect, it} from "bun:test";

describe('dcMaximumSubarraySum', () => {
    it('should find maximum subarray sum using the divide and conquer algorithm', () => {
        expect(dcMaximumSubarraySum([])).toEqual(-Infinity);
        expect(dcMaximumSubarraySum([0, 0])).toEqual(0);
        expect(dcMaximumSubarraySum([0, 0, 1])).toEqual(1);
        expect(dcMaximumSubarraySum([0, 0, 1, 2])).toEqual(3);
        expect(dcMaximumSubarraySum([0, 0, -1, 2])).toEqual(2);
        expect(dcMaximumSubarraySum([-1, -2, -3, -4, -5])).toEqual(-1);
        expect(dcMaximumSubarraySum([1, 2, 3, 2, 3, 4, 5])).toEqual(20);
        expect(dcMaximumSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual(6);
        expect(dcMaximumSubarraySum([-2, -3, 4, -1, -2, 1, 5, -3])).toEqual(7);
        expect(dcMaximumSubarraySum([1, -3, 2, -5, 7, 6, -1, 4, 11, -23])).toEqual(27);
    });
});

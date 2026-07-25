import {isPowerOfTwoBitwise} from "../../../../src/algorithms/math/is_power_of_two/isPowerOfTwoBitwise.ts";
import {describe, expect, it} from "bun:test";

describe('isPowerOfTwoBitwise', () => {
    it('should check if the number is made by multiplying twos', () => {
        expect(isPowerOfTwoBitwise(-1)).toBeFalse();
        expect(isPowerOfTwoBitwise(0)).toBeFalse();
        expect(isPowerOfTwoBitwise(1)).toBeTrue();
        expect(isPowerOfTwoBitwise(2)).toBeTrue();
        expect(isPowerOfTwoBitwise(3)).toBeFalse();
        expect(isPowerOfTwoBitwise(4)).toBeTrue();
        expect(isPowerOfTwoBitwise(5)).toBeFalse();
        expect(isPowerOfTwoBitwise(6)).toBeFalse();
        expect(isPowerOfTwoBitwise(7)).toBeFalse();
        expect(isPowerOfTwoBitwise(8)).toBeTrue();
        expect(isPowerOfTwoBitwise(10)).toBeFalse();
        expect(isPowerOfTwoBitwise(12)).toBeFalse();
        expect(isPowerOfTwoBitwise(16)).toBeTrue();
        expect(isPowerOfTwoBitwise(31)).toBeFalse();
        expect(isPowerOfTwoBitwise(64)).toBeTrue();
        expect(isPowerOfTwoBitwise(1024)).toBeTrue();
        expect(isPowerOfTwoBitwise(1023)).toBeFalse();
    });
});

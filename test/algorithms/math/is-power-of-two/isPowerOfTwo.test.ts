import {describe, expect, it} from "bun:test";
import {isPowerOfTwo} from "../../../../src/algorithms/math/bits/isPowerOfTwo.ts";

describe('isPowerOfTwo', () => {
    it('should check if the number is made by multiplying twos', () => {
        expect(isPowerOfTwo(-1)).toBeFalse();
        expect(isPowerOfTwo(0)).toBeTrue();
        expect(isPowerOfTwo(1)).toBeTrue();
        expect(isPowerOfTwo(2)).toBeTrue();
        expect(isPowerOfTwo(3)).toBeFalse();
        expect(isPowerOfTwo(4)).toBeTrue();
        expect(isPowerOfTwo(5)).toBeFalse();
        expect(isPowerOfTwo(6)).toBeFalse();
        expect(isPowerOfTwo(7)).toBeFalse();
        expect(isPowerOfTwo(8)).toBeTrue();
        expect(isPowerOfTwo(10)).toBeFalse();
        expect(isPowerOfTwo(12)).toBeFalse();
        expect(isPowerOfTwo(16)).toBeTrue();
        expect(isPowerOfTwo(31)).toBeFalse();
        expect(isPowerOfTwo(64)).toBeTrue();
        expect(isPowerOfTwo(1024)).toBeTrue();
        expect(isPowerOfTwo(1023)).toBeFalse();
    });
});

import {factorial} from "../../../../src/algorithms/math/factorial/factorial.ts";
import {describe, expect, it} from "bun:test";

describe('factorial', () => {
    it('should calculate factorial', () => {
        expect(factorial(0)).toBe(1);
        expect(factorial(1)).toBe(1);
        expect(factorial(5)).toBe(120);
        expect(factorial(8)).toBe(40320);
        expect(factorial(10)).toBe(3628800);
    });
});

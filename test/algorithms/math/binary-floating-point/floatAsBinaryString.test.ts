import {
    floatAs32BinaryString,
    floatAs64BinaryString
} from "../../../../src/algorithms/math/binary_floating_point/floatAsBinaryString.ts";
import {testCases32Bits, testCases64Bits} from "../../../../src/algorithms/math/binary_floating_point/testCases.ts";
import {describe, expect, it} from "bun:test";

describe('floatAs32Binary', () => {
    it('should create a binary representation of the floating numbers', () => {
        for (let testCaseIndex = 0; testCaseIndex < testCases32Bits.length; testCaseIndex += 1) {
            const [decimal, binary] = testCases32Bits[testCaseIndex]!;
            expect(floatAs32BinaryString(decimal)).toBe(binary);
        }
    });
});

describe('floatAs64Binary', () => {
    it('should create a binary representation of the floating numbers', () => {
        for (let testCaseIndex = 0; testCaseIndex < testCases64Bits.length; testCaseIndex += 1) {
            const [decimal, binary] = testCases64Bits[testCaseIndex]!;
            expect(floatAs64BinaryString(decimal)).toBe(binary);
        }
    });
});

import {trialDivision} from "../../../../src/algorithms/math/primality_test/trialDivision.ts";
import {describe, expect, it} from "bun:test";

/**
 * @param {function(n: number)} testFunction
 */
function primalityTest(testFunction: any) {
    expect(testFunction(1)).toBeFalse();
    expect(testFunction(2)).toBeTrue();
    expect(testFunction(3)).toBeTrue();
    expect(testFunction(5)).toBeTrue();
    expect(testFunction(11)).toBeTrue();
    expect(testFunction(191)).toBeTrue();
    expect(testFunction(191)).toBeTrue();
    expect(testFunction(199)).toBeTrue();

    expect(testFunction(-1)).toBeFalse();
    expect(testFunction(0)).toBeFalse();
    expect(testFunction(4)).toBeFalse();
    expect(testFunction(6)).toBeFalse();
    expect(testFunction(12)).toBeFalse();
    expect(testFunction(14)).toBeFalse();
    expect(testFunction(25)).toBeFalse();
    expect(testFunction(192)).toBeFalse();
    expect(testFunction(200)).toBeFalse();
    expect(testFunction(400)).toBeFalse();

    // It should also deal with floats.
    expect(testFunction(0.5)).toBeFalse();
    expect(testFunction(1.3)).toBeFalse();
    expect(testFunction(10.5)).toBeFalse();
}

describe('trialDivision', () => {
    it('should detect prime numbers', () => {
        primalityTest(trialDivision);
    });
});

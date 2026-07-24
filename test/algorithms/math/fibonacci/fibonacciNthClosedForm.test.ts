import {fibonacciClosedForm} from '../../../../src/algorithms/math/fibonacci/fibonacciClosedForm.ts';
import {describe, expect, it} from "bun:test";

describe('fibonacciClosedForm', () => {
    it('should throw an error when trying to calculate fibonacci for not allowed positions', () => {
        const calculateFibonacciForNotAllowedPosition = () => {
            fibonacciClosedForm(76);
        };

        expect(calculateFibonacciForNotAllowedPosition).toThrow();
    });

    it('should calculate fibonacci correctly', () => {
        expect(fibonacciClosedForm(1)).toBe(1);
        expect(fibonacciClosedForm(2)).toBe(1);
        expect(fibonacciClosedForm(3)).toBe(2);
        expect(fibonacciClosedForm(4)).toBe(3);
        expect(fibonacciClosedForm(5)).toBe(5);
        expect(fibonacciClosedForm(6)).toBe(8);
        expect(fibonacciClosedForm(7)).toBe(13);
        expect(fibonacciClosedForm(8)).toBe(21);
        expect(fibonacciClosedForm(20)).toBe(6765);
        expect(fibonacciClosedForm(30)).toBe(832040);
        expect(fibonacciClosedForm(50)).toBe(12586269025);
        expect(fibonacciClosedForm(70)).toBe(190392490709135);
    });
});

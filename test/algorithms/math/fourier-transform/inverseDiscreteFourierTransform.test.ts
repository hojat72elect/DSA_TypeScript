import {
    inverseDiscreteFourierTransform
} from '../../../../src/algorithms/math/fourier_transform/inverseDiscreteFourierTransform.ts';
import FourierTester from './FourierTester.ts';
import {describe, it} from "bun:test";

describe('inverseDiscreteFourierTransform', () => {
    it('should calculate output signal out of input frequencies', () => {
        FourierTester.testInverseFourierTransform(inverseDiscreteFourierTransform);
    });
});

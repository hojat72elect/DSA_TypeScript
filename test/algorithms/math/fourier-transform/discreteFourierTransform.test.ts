import FourierTester from "./FourierTester.js";
import discreteFourierTransform from "../../../../src/algorithms/math/fourier_transform/discreteFourierTransform.js";
import {describe, expect, it} from "bun:test";

describe('discreteFourierTransform', () => {
    it('should split signal into frequencies', () => {
        FourierTester.testDirectFourierTransform(discreteFourierTransform);
    });
});

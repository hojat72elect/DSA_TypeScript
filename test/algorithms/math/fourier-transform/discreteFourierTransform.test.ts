import FourierTester from "./FourierTester.ts";
import discreteFourierTransform from "../../../../src/algorithms/math/fourier_transform/discreteFourierTransform.ts";
import {describe, it} from "bun:test";

describe('discreteFourierTransform', () => {
    it('should split signal into frequencies', () => {
        FourierTester.testDirectFourierTransform(discreteFourierTransform);
    });
});

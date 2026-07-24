import {describe, expect, it} from "bun:test";
import {Matrix} from "../../../../src/algorithms/math/matrix/Matrix.ts";
import {euclideanDistance} from "../../../../src/algorithms/math/euclidean-distance/euclideanDistance.ts";

describe('euclideanDistance', () => {
    it('should calculate euclidean distance between vectors', () => {
        expect(euclideanDistance(new Matrix([[1]]), new Matrix([[2]]))).toEqual(1);
        expect(euclideanDistance(new Matrix([[2]]), new Matrix([[1]]))).toEqual(1);
        expect(euclideanDistance(new Matrix([[5, 8]]), new Matrix([[7, 3]]))).toEqual(5.39);
        expect(euclideanDistance(new Matrix([[5], [8]]), new Matrix([[7], [3]]))).toEqual(5.39);
        expect(euclideanDistance(new Matrix([[8, 2, 6]]), new Matrix([[3, 5, 7]]))).toEqual(5.92);
        expect(euclideanDistance(new Matrix([[8], [2], [6]]), new Matrix([[3], [5], [7]]))).toEqual(5.92);
        expect(euclideanDistance(new Matrix([[[8]], [[2]], [[6]]]), new Matrix([[[3]], [[5]], [[7]]]))).toEqual(5.92);
    });

    it('should throw an error in case if two matrices are of different shapes', () => {
        expect(() => euclideanDistance(new Matrix([[1]]), new Matrix([[[2]]]))).toThrow(
            'Matrices have different dimensions',
        );

        expect(() => euclideanDistance(new Matrix([[1]]), new Matrix([[2, 3]]))).toThrow(
            'Matrices have different shapes',
        );
    });
});

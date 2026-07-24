import {kNN} from "../../../../src/algorithms/ml/knn/kNN.ts";
import {describe, expect, it} from "bun:test";

describe('KNN', () => {

    it('should throw an error on not giving classification vector', () => {
        const inconsistent = () => {
            kNN([[1, 1]], [1], [1]);
        };
        expect(inconsistent).toThrow('Matrices have different shapes');
    });

    it('should find the nearest neighbour', () => {
        let dataSet;
        let labels;
        let toClassify;
        let expectedClass;

        dataSet = [[1, 1], [2, 2]];
        labels = [1, 2];
        toClassify = [1, 1];
        expectedClass = 1;
        expect(kNN(dataSet, labels, toClassify)).toBe(expectedClass);

        dataSet = [[1, 1], [6, 2], [3, 3], [4, 5], [9, 2], [2, 4], [8, 7]];
        labels = [1, 2, 1, 2, 1, 2, 1];
        toClassify = [1.25, 1.25];
        expectedClass = 1;
        expect(kNN(dataSet, labels, toClassify)).toBe(expectedClass);

        dataSet = [[1, 1], [6, 2], [3, 3], [4, 5], [9, 2], [2, 4], [8, 7]];
        labels = [1, 2, 1, 2, 1, 2, 1];
        toClassify = [1.25, 1.25];
        expectedClass = 2;
        expect(kNN(dataSet, labels, toClassify, 5)).toBe(expectedClass);
    });

    it('should find the nearest neighbour with equal distances', () => {
        const dataSet = [[0, 0], [1, 1], [0, 2]];
        const labels = [1, 3, 3];
        const toClassify = [0, 1];
        const expectedClass = 3;
        expect(kNN(dataSet, labels, toClassify)).toBe(expectedClass);
    });

    it('should find the nearest neighbour in 3D space', () => {
        const dataSet = [[0, 0, 0], [0, 1, 1], [0, 0, 2]];
        const labels = [1, 3, 3];
        const toClassify = [0, 0, 1];
        const expectedClass = 3;
        expect(kNN(dataSet, labels, toClassify)).toBe(expectedClass);
    });
});

import {euclideanAlgorithm} from '../euclidean_algorithm/euclideanAlgorithm.ts';

export function leastCommonMultiple(a: number, b: number): number {
    return ((a === 0) || (b === 0)) ? 0 : Math.abs(a * b) / euclideanAlgorithm(a, b);
}

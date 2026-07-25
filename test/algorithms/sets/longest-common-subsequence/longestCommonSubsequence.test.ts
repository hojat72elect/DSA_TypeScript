import {
    longestCommonSubsequence
} from "../../../../src/algorithms/sets/longest_common_subsequence/longestCommonSubsequence.ts";
import {describe, expect, it} from "bun:test";

describe('longestCommonSubsequence', () => {
    it('should find longest common subsequence for two strings', () => {
        expect(longestCommonSubsequence([''], [''])).toEqual(['']);

        expect(longestCommonSubsequence([''], ['A', 'B', 'C'])).toEqual(['']);

        expect(longestCommonSubsequence(['A', 'B', 'C'], [''])).toEqual(['']);

        expect(longestCommonSubsequence(
            ['A', 'B', 'C'],
            ['D', 'E', 'F', 'G'],
        )).toEqual(['']);

        expect(longestCommonSubsequence(
            ['A', 'B', 'C', 'D', 'G', 'H'],
            ['A', 'E', 'D', 'F', 'H', 'R'],
        )).toEqual(['A', 'D', 'H']);

        expect(longestCommonSubsequence(
            ['A', 'G', 'G', 'T', 'A', 'B'],
            ['G', 'X', 'T', 'X', 'A', 'Y', 'B'],
        )).toEqual(['G', 'T', 'A', 'B']);

        expect(longestCommonSubsequence(
            ['A', 'B', 'C', 'D', 'A', 'F'],
            ['A', 'C', 'B', 'C', 'F'],
        )).toEqual(['A', 'B', 'C', 'F']);
    });
});

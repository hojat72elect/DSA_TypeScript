import longestCommonSubsequenceRecursive
    from "../../../../src/algorithms/sets/longest_common_subsequence/longestCommonSubsequenceRecursive.ts";
import {describe, expect, it} from "bun:test";

describe('longestCommonSubsequenceRecursive', () => {
    it('should find longest common subsequence between two strings', () => {
        expect(longestCommonSubsequenceRecursive('', '')).toEqual('');
        expect(longestCommonSubsequenceRecursive('ABC', '')).toEqual('');
        expect(longestCommonSubsequenceRecursive('', 'ABC')).toEqual('');
        expect(longestCommonSubsequenceRecursive('ABABC', 'BABCA')).toEqual('BABC');
        expect(longestCommonSubsequenceRecursive('BABCA', 'ABCBA')).toEqual('ABCA');
        expect(longestCommonSubsequenceRecursive('sea', 'eat')).toEqual('ea');
        expect(longestCommonSubsequenceRecursive('algorithms', 'rithm')).toEqual('rithm');
        expect(longestCommonSubsequenceRecursive(
            'Algorithms and data structures implemented in JavaScript',
            'Here you may find Algorithms and data structures that are implemented in JavaScript',
        )).toEqual('Algorithms and data structures implemented in JavaScript');
    });

    it('should handle identical strings', () => {
        expect(longestCommonSubsequenceRecursive('ABC', 'ABC')).toEqual('ABC');
        expect(longestCommonSubsequenceRecursive('hello', 'hello')).toEqual('hello');
    });

    it('should handle strings with no common subsequence', () => {
        expect(longestCommonSubsequenceRecursive('ABC', 'DEF')).toEqual('');
        expect(longestCommonSubsequenceRecursive('xyz', 'abc')).toEqual('');
    });

    it('should handle single character strings', () => {
        expect(longestCommonSubsequenceRecursive('A', 'A')).toEqual('A');
        expect(longestCommonSubsequenceRecursive('A', 'B')).toEqual('');
        expect(longestCommonSubsequenceRecursive('A', '')).toEqual('');
    });
});

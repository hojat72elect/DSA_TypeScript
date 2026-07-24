import {
    longestCommonSubstring
} from "../../../../src/algorithms/string/longest-common-substring/longestCommonSubstring.ts";
import {describe, expect, it} from "bun:test";

describe('longestCommonSubstring', () => {
    it('should find longest common substring between two strings', () => {
        expect(longestCommonSubstring('', '')).toBe('');
        expect(longestCommonSubstring('ABC', '')).toBe('');
        expect(longestCommonSubstring('', 'ABC')).toBe('');
        expect(longestCommonSubstring('ABABC', 'BABCA')).toBe('BABC');
        expect(longestCommonSubstring('BABCA', 'ABCBA')).toBe('ABC');
        expect(longestCommonSubstring('sea', 'eat')).toBe('ea');
        expect(longestCommonSubstring('algorithms', 'rithm')).toBe('rithm');
        expect(longestCommonSubstring(
            'Algorithms and data structures implemented in JavaScript',
            'Here you may find Algorithms and data structures that are implemented in JavaScript',
        )).toBe('Algorithms and data structures ');
    });

    it('should handle unicode correctly', () => {
        expect(longestCommonSubstring('𐌵𐌵**ABC', '𐌵𐌵--ABC')).toBe('ABC');
        expect(longestCommonSubstring('𐌵𐌵**A', '𐌵𐌵--A')).toBe('𐌵𐌵');
        expect(longestCommonSubstring('A买B时', '买B时GD')).toBe('买B时');
        expect(longestCommonSubstring('After test买时 case', 'another_test买时')).toBe('test买时');
    });
});

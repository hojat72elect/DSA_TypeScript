/**
 * Longest Common Subsequence (LCS) (Recursive Approach).
 */
export default function longestCommonSubsequenceRecursive(string1: string, string2: string): string {
    /**
     * returns the LCS (Longest Common Subsequence)
     */
    const lcs = (s1: string, s2: string, memo: Record<string, string> = {}): string => {
        if (!s1 || !s2) return '';

        const key = `${s1}:${s2}`;
        if (memo[key]) return memo[key];

        if (s1[0] === s2[0]) {
            return s1[0] + lcs(s1.substring(1), s2.substring(1), memo);
        }

        const nextLcs1 = lcs(s1.substring(1), s2, memo);
        const nextLcs2 = lcs(s1, s2.substring(1), memo);

        const nextLongest = nextLcs1.length >= nextLcs2.length ? nextLcs1 : nextLcs2;

        memo[key] = nextLongest;

        return nextLongest;
    };

    return lcs(string1, string2);
}

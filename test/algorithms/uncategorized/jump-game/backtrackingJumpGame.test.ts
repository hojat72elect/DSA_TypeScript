import {backtrackingJumpGame} from "../../../../src/algorithms/uncategorized/jump_game/backtrackingJumpGame.ts";
import {describe, expect, it} from "bun:test";

describe('backtrackingJumpGame', () => {
    it('should solve Jump Game problem in backtracking manner', () => {
        expect(backtrackingJumpGame([1, 0])).toBe(true);
        expect(backtrackingJumpGame([100, 0])).toBe(true);
        expect(backtrackingJumpGame([2, 3, 1, 1, 4])).toBe(true);
        expect(backtrackingJumpGame([1, 1, 1, 1, 1])).toBe(true);
        expect(backtrackingJumpGame([1, 1, 1, 10, 1])).toBe(true);
        expect(backtrackingJumpGame([1, 5, 2, 1, 0, 2, 0])).toBe(true);

        expect(backtrackingJumpGame([1, 0, 1])).toBe(false);
        expect(backtrackingJumpGame([3, 2, 1, 0, 4])).toBe(false);
        expect(backtrackingJumpGame([0, 0, 0, 0, 0])).toBe(false);
        expect(backtrackingJumpGame([5, 4, 3, 2, 1, 0, 0])).toBe(false);
    });
});

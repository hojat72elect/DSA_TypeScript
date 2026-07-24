/**
 * DYNAMIC PROGRAMMING TOP-DOWN approach of solving Jump Game.
 *
 * This comes out as an optimization of BACKTRACKING approach.
 *
 * It relies on the observation that once we determine that a certain
 * index is good / bad, this result will never change. This means that
 * we can store the result and not need to recompute it every time.
 *
 * We call a position in the array a "good" one if starting at that
 * position, we can reach the last index. Otherwise, that index
 * is called a "bad" one.
 *
 * @param numbers - array of possible jump length.
 * @param startIndex - index from where we start jumping.
 * @param currentJumps - current jumps path.
 * @param cellsGoodness - holds information about whether cell is "good" or "bad"
 */
export function dpTopDownJumpGame(
    numbers: number[],
    startIndex: number = 0,
    currentJumps: number[] = [],
    cellsGoodness: (boolean | undefined)[] = [],
): boolean {
    // We've jumped directly to last cell. This situation is a solution.
    if (startIndex === numbers.length - 1) return true;

    // Init cell goodness table if it is empty.
    // This is DYNAMIC PROGRAMMING feature.
    const currentCellsGoodness: (boolean | undefined)[] = [...cellsGoodness];
    if (!currentCellsGoodness.length) {
        numbers.forEach(() => currentCellsGoodness.push(undefined));
        // Mark the last cell as "good" one since it is where we ultimately want to get.
        currentCellsGoodness[cellsGoodness.length - 1] = true;
    }

    // Check what the longest jump we could make from current position.
    // We don't need to jump beyond the array.
    const maxJumpLength = Math.min(
        numbers[startIndex]!, // Jump is within array.
        numbers.length - 1 - startIndex, // Jump goes beyond array.
    );

    // Let's start jumping from startIndex and see whether any
    // jump is successful and has reached the end of the array.
    for (let jumpLength = maxJumpLength; jumpLength > 0; jumpLength -= 1) {
        // Try next jump.
        const nextIndex = startIndex + jumpLength;

        // Jump only into "good" or "unknown" cells.
        // This is top-down dynamic programming optimisation of backtracking algorithm.
        if (currentCellsGoodness[nextIndex] !== false) {
            currentJumps.push(nextIndex);

            const isJumpSuccessful = dpTopDownJumpGame(numbers, nextIndex, currentJumps, currentCellsGoodness);

            // Check if current jump was successful.
            if (isJumpSuccessful) return true;

            // BACKTRACKING.
            // If previous jump wasn't successful then retreat and try the next one.
            currentJumps.pop();

            // Mark current cell as "bad" to avoid its deep visiting later.
            currentCellsGoodness[nextIndex] = false;
        }
    }

    return false;
}

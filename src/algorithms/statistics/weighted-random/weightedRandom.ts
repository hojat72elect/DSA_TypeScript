interface WeightedRandomResult<T> {
    item: T;
    index: number;
}

/**
 * Picks a random item based on its weight.
 * Items with higher weights have a higher probability of being selected.
 *
 * @param items - Array of items to pick from
 * @param weights - Array of numerical weights corresponding to each item
 * @returns Object containing the selected item and its index
 */
export function weightedRandom<T>(items: T[], weights: number[]): WeightedRandomResult<T> {
    if (items.length !== weights.length) throw new Error('Items and weights must be of the same size');
    if (!items.length) throw new Error('Items must not be empty');

    // Preparing the cumulative weights array.
    // Example: weights = [1, 4, 3] -> cumulativeWeights = [1, 5, 8]
    const cumulativeWeights: number[] = [];
    for (let i = 0; i < weights.length; i += 1) {
        cumulativeWeights[i] = weights[i]! + (cumulativeWeights[i - 1] || 0);
    }

    // Getting a random number in the range [0...sum(weights)]
    const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1]!;
    const randomNumber = maxCumulativeWeight * Math.random();

    // Pick the item corresponding to the random threshold
    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
        if (cumulativeWeights[itemIndex]! >= randomNumber) {
            return {
                item: items[itemIndex]!,
                index: itemIndex,
            };
        }
    }

    // Fallback for edge cases (e.g., floating point rounding or if total weight is 0)
    return {
        item: items[items.length - 1]!,
        index: items.length - 1,
    };
}
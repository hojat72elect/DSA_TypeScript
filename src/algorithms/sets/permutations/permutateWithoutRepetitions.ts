export default function permutateWithoutRepetitions(permutationOptions: any[]): any[] {
    if (permutationOptions.length === 1) return [permutationOptions];

    // Init permutations array.
    const permutations = [];

    // Get all permutations for permutationOptions excluding the first element.
    const smallerPermutations = permutateWithoutRepetitions(permutationOptions.slice(1));

    // Insert first option into every possible position of every smaller permutation.
    const firstOption = permutationOptions[0];

    for (let permIndex = 0; permIndex < smallerPermutations.length; permIndex++) {
        const smallerPermutation = smallerPermutations[permIndex];

        // Insert first option into every possible position of smallerPermutation.
        for (let positionIndex = 0; positionIndex <= smallerPermutation.length; positionIndex++) {
            const permutationPrefix = smallerPermutation.slice(0, positionIndex);
            const permutationSuffix = smallerPermutation.slice(positionIndex);
            permutations.push(permutationPrefix.concat([firstOption], permutationSuffix));
        }
    }

    return permutations;
}

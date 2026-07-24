/**
 * Generates Cartesian Product of two sets.
 */
export function cartesianProduct(setA: any[], setB: any[] | null): any[] | null {
    // Check if input sets are not empty.
    // Otherwise, return null since we can't generate Cartesian Product out of them.
    if (!setA || !setB || !setA.length || !setB.length) return null;

    // Init product set.
    const product: any[] = [];

    // Now, let's go through all elements of a first and second set and form all possible pairs.
    for (let indexA = 0; indexA < setA.length; indexA += 1) {
        for (let indexB = 0; indexB < setB.length; indexB += 1) {
            // Add current product pair to the product set.
            product.push([setA[indexA], setB[indexB]]);
        }
    }

    // Return Cartesian product set.
    return product;
}

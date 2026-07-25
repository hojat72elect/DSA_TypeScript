/**
 * Fast Powering Algorithm.
 * Recursive implementation to compute power.
 *
 * Complexity: log(n)
 *
 * @param base - Number that will be raised to the power.
 * @param power - The power that number will be raised to.
 */
export function fastPowering(base: number, power: number): number {

    // Let's first take care of easy edge cases.
    if (power === 0) return 1;
    if (power === 1) return base;
    if (base === 1) return 1;
    if (power === -1) return 1 / base;

    // Take care of invalid operations
    if (base === 0 && power === 0) throw new Error("the operation 0^0 is invalid.");

    if (power % 2 === 0) {
        // power is even
        // example : x^8 = x^4 * x^4.
        const multiplier = fastPowering(base, power / 2);
        return multiplier * multiplier;
    }

    // The power is odd
    // example : x^9 = x^4 * x^4 * x.
    const multiplier = fastPowering(base, (power - 1) / 2);
    return multiplier * multiplier * base;
}
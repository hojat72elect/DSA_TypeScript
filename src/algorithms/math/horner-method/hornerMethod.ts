/**
 * Returns the evaluation of a polynomial function at a certain point.
 * Uses Horner's rule.
 *
 * The `coefficients` are for example this : [4, 3, 2] for (4 * x^2 + 3 * x + 2)
 */
export function hornerMethod(coefficients: number[], xVal: number): number {
    return coefficients.reduce(
        (accumulator, currentCoefficient) => {
            return accumulator * xVal + currentCoefficient;
        },
        0,
    );
}

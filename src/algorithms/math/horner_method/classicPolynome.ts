/**
 * Returns the evaluation of a polynomial function at a certain point.
 * Uses straightforward approach with powers.
 *
 *  the `coefficients` are for example [4, 3, 2] for (4 * x^2 + 3 * x + 2)
 */
export function classicPolynome(coefficients: number[], xVal: number): number {
    return coefficients.reverse().reduce(
        (accumulator, currentCoefficient, index) => {
            return accumulator + currentCoefficient * (xVal ** index);
        },
        0,
    );
}

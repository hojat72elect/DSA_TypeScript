/**
 * This function assumes that the input is an integer more than or equal to 0.
 */
export function factorialRecursive(number: number): number {
    return number > 1 ? number * factorialRecursive(number - 1) : 1;
}
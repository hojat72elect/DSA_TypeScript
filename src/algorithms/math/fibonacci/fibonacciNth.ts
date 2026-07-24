/**
 * Returns the Fibonacci number at a specific position using Dynamic Programming approach.
 */
export function fibonacciNth(n: number) {
    let previousValue = 0;
    let currentValue = 1;

    if (n === 1) return 1;

    let iterationsCounter = n - 1;

    while (iterationsCounter) {
        currentValue += previousValue;
        previousValue = currentValue - previousValue;

        iterationsCounter--;
    }

    return currentValue;
}
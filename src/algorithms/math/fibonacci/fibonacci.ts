/**
 * Returns a fibonacci sequence as an array.
 */
export function fibonacci(n: number) {
    const fibSequence = [1];

    let previousValue = 0;
    let currentValue = 1;

    if (n == 1) return fibSequence;

    let iterationsCounter = n - 1;

    while (iterationsCounter) {
        currentValue += previousValue;
        previousValue = currentValue - previousValue;

        fibSequence.push(currentValue);

        --iterationsCounter;
    }

    return fibSequence;
}
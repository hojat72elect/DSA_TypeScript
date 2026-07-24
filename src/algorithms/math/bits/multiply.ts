import {multiplyByTwo} from './multiplyByTwo.ts';
import {divideByTwo} from './divideByTwo.ts';
import {isEven} from './isEven.ts';
import {isPositive} from './isPositive.ts';

/**
 * Multiply two signed numbers using bitwise operations.
 *
 * If a is zero or b is zero or if both a and b are zeros:
 * multiply(a, b) = 0
 *
 * If b is even:
 * multiply(a, b) = multiply(2a, b/2)
 *
 * If b is odd and b is positive:
 * multiply(a, b) = multiply(2a, (b-1)/2) + a
 *
 * If b is odd and b is negative:
 * multiply(a, b) = multiply(2a, (b+1)/2) - a
 *
 * Time complexity: O(log b)
 */
export function multiply(a: number, b: number): number {
    // If a is zero or b is zero or if both a and b are zeros then the production is also zero.
    if (b === 0 || a === 0) return 0;

    // Otherwise we will have four different cases that are described above.
    const multiplyByOddPositive = () => multiply(multiplyByTwo(a), divideByTwo(b - 1)) + a;
    const multiplyByOddNegative = () => multiply(multiplyByTwo(a), divideByTwo(b + 1)) - a;

    const multiplyByEven = () => multiply(multiplyByTwo(a), divideByTwo(b));
    const multiplyByOdd = () => (isPositive(b) ? multiplyByOddPositive() : multiplyByOddNegative());

    return isEven(b) ? multiplyByEven() : multiplyByOdd();
}

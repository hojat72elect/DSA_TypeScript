import {countSetBits} from './countSetBits.ts';

/**
 * Counts the number of bits that need to be changed in order
 * to convert numberA to numberB.
 */
export function bitsDiff(numberA: number, numberB: number): number {
    return countSetBits(numberA ^ numberB);
}

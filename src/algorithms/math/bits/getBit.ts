/**
 * The `bitPosition` is zero based.
 */
export function getBit(number: number, bitPosition: number): number {
    return (number >> bitPosition) & 1;
}

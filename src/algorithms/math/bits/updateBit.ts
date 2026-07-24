/**
 * The `bitPosition` is zero based.
 * The `bitValue` is either 0 or 1.
 */
export default function updateBit(number: number, bitPosition: number, bitValue: number): number {
    // Normalized bit value.
    const bitValueNormalized = bitValue ? 1 : 0;

    // Init clear mask.
    const clearMask = ~(1 << bitPosition);

    // Clear bit value and then set it up to required value.
    return (number & clearMask) | (bitValueNormalized << bitPosition);
}

/**
 * Return the number of bits used in the binary representation of the number.
 */
export function bitLength(number: number): number {
    let bitsCounter = 0;

    while ((1 << bitsCounter) <= number)
        bitsCounter++;

    return bitsCounter;
}

const DEFAULT_BASE = 37;
const DEFAULT_MODULUS = 101;

export class PolynomialHash {
    public base: number;
    public modulus: number;

    /**
     * @param [base] - Base number that is used to create the polynomial.
     * @param [modulus] - Modulus number that keeps the hash from overflowing.
     */
    constructor(base: number = DEFAULT_BASE, modulus: number = DEFAULT_MODULUS) {
        this.base = base;
        this.modulus = modulus;
    }

    /**
     * Function that creates hash representation of the word.
     * Time complexity: O(word.length).
     *
     * @param word - String that needs to be hashed.
     */
    hash(word: string): number {
        const charCodes = Array.from(word).map((char) => this.charToNumber(char));

        let hash = 0;
        for (let charIndex = 0; charIndex < charCodes.length; charIndex += 1) {
            hash *= this.base;
            hash += charCodes[charIndex]!;
            hash %= this.modulus;
        }

        return hash;
    }

    /**
     * Function that creates hash representation of the word
     * based on previous word (shifted by one character left) hash value.
     *
     * Recalculates the hash representation of a word so that it isn't
     * necessary to traverse the whole word again.
     *
     * Time complexity: O(1).
     */
    roll(prevHash: number, prevWord: string, newWord: string): number {
        let hash = prevHash;

        const prevValue = this.charToNumber(prevWord[0]!);
        const newValue = this.charToNumber(newWord[newWord.length - 1]!);

        let prevValueMultiplier = 1;
        for (let i = 1; i < prevWord.length; i += 1) {
            prevValueMultiplier *= this.base;
            prevValueMultiplier %= this.modulus;
        }

        hash += this.modulus;
        hash -= (prevValue * prevValueMultiplier) % this.modulus;

        hash *= this.base;
        hash += newValue;
        hash %= this.modulus;

        return hash;
    }

    /**
     * Converts char to number.
     */
    charToNumber(char: string): number {
        let charCode = char.codePointAt(0)!;

        // Check if character has surrogate pair.
        const surrogate = char.codePointAt(1);
        if (surrogate !== undefined) {
            const surrogateShift = 2 ** 16;
            charCode += surrogate * surrogateShift;
        }

        return charCode;
    }
}

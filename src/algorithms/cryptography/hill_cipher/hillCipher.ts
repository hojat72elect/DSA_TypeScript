import {Matrix} from "../../math/matrix/Matrix.ts";

// The code of an 'A' character (equals to 65).
const alphabetCodeShift = 'A'.codePointAt(0)!;
const englishAlphabetSize = 26;

/**
 * Generates key matrix from given keyString.
 *
 * @param keyString - a string to build a key matrix (must be of matrixSize^2 length).
 */
const generateKeyMatrix = (keyString: string): Matrix => {
    const matrixSize = Math.sqrt(keyString.length);
    if (!Number.isInteger(matrixSize)) {
        throw new Error(
            'Invalid key string length. The square root of the key string must be an integer',
        );
    }
    let keyStringIndex = 0;
    return Matrix.generate(
        [matrixSize, matrixSize],
        // Callback to get a value of each matrix cell.
        // The order the matrix is being filled in is from left to right, from top to bottom.
        () => {
            // A → 0, B → 1, ..., a → 32, b → 33, ...
            const charCodeShifted = (keyString.codePointAt(keyStringIndex)!) % alphabetCodeShift;
            keyStringIndex += 1;
            return charCodeShifted;
        },
    );
};

/**
 * Generates a message vector from a given message.
 */
const generateMessageVector = (message: string): Matrix => {
    return Matrix.generate(
        [message.length, 1],
        // Callback to get a value of each matrix cell.
        // The order the matrix is being filled in is from left to right, from top to bottom.
        (cellIndices) => {
            const rowIndex = cellIndices[0]!;
            return message.codePointAt(rowIndex)! % alphabetCodeShift;
        },
    );
};

/**
 * Encrypts the given message using Hill Cipher.
 */
export function hillCipherEncrypt(message: string, keyString: string): string {
    // The keyString and message can only contain letters.
    const onlyLettersRegExp = /^[a-zA-Z]+$/;
    if (!onlyLettersRegExp.test(message) || !onlyLettersRegExp.test(keyString)) {
        throw new Error('The message and key string can only contain letters');
    }

    const keyMatrix = generateKeyMatrix(keyString);
    const messageVector = generateMessageVector(message);

    // keyString.length must equal to square of message.length
    if (keyMatrix.data.length !== message.length) {
        throw new Error('Invalid key string length. The key length must be a square of message length');
    }

    const cipherVector = keyMatrix.dot(messageVector);
    let cipherString = "";
    for (let row = 0; row < cipherVector.data.length; row += 1) {
        const item = cipherVector.data[row] as unknown as number;
        cipherString += String.fromCharCode((item % englishAlphabetSize) + alphabetCodeShift);
    }

    return cipherString;
}

// TODO: Implement this method.
export const hillCipherDecrypt = () => {
    throw new Error('This method is not implemented yet');
};

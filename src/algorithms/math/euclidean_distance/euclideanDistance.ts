import type {Matrix} from "../matrix/Matrix.ts";

/**
 * Calculates the Euclidean distance between 2 matrices.
 *
 * @throws Error
 */
export function euclideanDistance(a: Matrix, b: Matrix) {

    a.validateSameShape(b);
    let squaresTotal = 0;

    a.walk((indices, aCellValue) => {
        const bCellValue = b.getCellAtIndex(indices);
        squaresTotal += (aCellValue - bCellValue) ** 2;
    });

    return Number(Math.sqrt(squaresTotal).toFixed(2));
}
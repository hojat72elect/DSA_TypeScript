import {pascalTriangle} from '../../math/pascal-triangle/pascalTriangle.ts';

export function uniquePaths(width: number, height: number): number {
    const pascalLine = width + height - 2;
    const pascalLinePosition = Math.min(width, height) - 1;

    return pascalTriangle(pascalLine)[pascalLinePosition]!;
}

/**
 * Class that represents queen position on the chessboard.
 */
export class QueenPosition {
    public rowIndex: number;
    public columnIndex: number;

    constructor(rowIndex: number, columnIndex: number) {
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
    }

    get leftDiagonal(): number {
        // Each position on the same left (\) diagonal has the same difference of
        // rowIndex and columnIndex. This fact may be used to quickly check if two
        // positions (queens) are on the same left diagonal.
        // @see https://youtu.be/xouin83ebxE?t=1m59s
        return this.rowIndex - this.columnIndex;
    }

    get rightDiagonal(): number {
        // Each position on the same right diagonal (/) has the same
        // sum of rowIndex and columnIndex. This fact may be used to quickly
        // check if two positions (queens) are on the same right diagonal.
        // @see https://youtu.be/xouin83ebxE?t=1m59s
        return this.rowIndex + this.columnIndex;
    }

    toString(): string {
        return `${this.rowIndex},${this.columnIndex}`;
    }
}

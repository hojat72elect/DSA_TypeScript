export type Cell = number;
export type MatrixData = Cell[][] | Cell[][][]; // Our matrices are either 2D or 3D
export type Shape = number[];
export type CellIndices = number[];

export class Matrix {
    public data: MatrixData;

    constructor(data: MatrixData) {
        this.data = data;
    }

    /**
     * Generates a new matrix of a specific shape, with specific values.
     */
    public static generate(mShape: Shape, fill: (indices: CellIndices) => Cell): Matrix {
        const generateRecursively = (recShape: Shape, recIndices: CellIndices): any => {
            if (recShape.length === 1) {
                return Array(recShape[0])
                    .fill(null)
                    .map((_, cellIndex) => fill([...recIndices, cellIndex]));
            }
            const m: any[] = [];
            for (let i = 0; i < recShape[0]!; i += 1) {
                m.push(generateRecursively(recShape.slice(1), [...recIndices, i]));
            }
            return m;
        };

        return new Matrix(generateRecursively(mShape, []));
    }

    /**
     * Generates a matrix of zeros of a specific shape.
     */
    public static zeros(mShape: Shape): Matrix {
        return Matrix.generate(mShape, () => 0);
    }

    /**
     * Gets the matrix's shape.
     */
    public shape(): Shape {
        const shapes: Shape = [];
        let dimension: any = this.data;

        while (dimension && Array.isArray(dimension)) {
            shapes.push(dimension.length);
            dimension = (dimension.length && [...dimension][0]) || null;
        }

        return shapes;
    }

    /**
     * Validates that another matrix is of te same shape as this one.
     */
    public validateSameShape(other: Matrix) {
        this.validateType();
        other.validateType();

        const aShape = this.shape();
        const bShape = other.shape();

        if (aShape.length !== bShape.length) throw new Error('Matrices have different dimensions');

        // Clone arrays before popping, to prevent mutating the original shapes
        const aShapeCopy = [...aShape];
        const bShapeCopy = [...bShape];

        while (aShapeCopy.length && bShapeCopy.length) {
            if (aShapeCopy.pop() !== bShapeCopy.pop()) throw new Error('Matrices have different shapes');
        }
    }

    /**
     * Performs matrix multiplication (Dot product).
     */
    public dot(other: Matrix): Matrix {
        this.validate2D();
        other.validate2D();

        const aShape = this.shape();
        const bShape = other.shape();

        //Type casting to 2D arrays safely for index operations
        const a = this.data as Cell[][];
        const b = other.data as Cell[][];

        if (aShape[1] !== bShape[0]) throw new Error('Matrices have incompatible shape for multiplication');

        const outputShape = [aShape[0]!, bShape[1]!];
        const result = Matrix.zeros(outputShape);
        const c = result.data as Cell[][];

        for (let bCol = 0; bCol < b[0]!.length; bCol += 1) {
            for (let aRow = 0; aRow < a.length; aRow += 1) {
                let cellSum = 0;
                for (let aCol = 0; aCol < a[aRow]!.length; aCol += 1) {
                    cellSum += a[aRow]![aCol]! * b[aCol]![bCol]!;
                }
                c[aRow]![bCol] = cellSum;
            }
        }
        return result;
    }

    /**
     * Returns the transposed version of this matrix.
     */
    public t() {
        this.validate2D();
        const mShape = this.shape();
        const result = Matrix.zeros([mShape[1]!, mShape[0]!]);

        const m = this.data as Cell[][];
        const transposed = result.data as Cell[][];

        for (let row = 0; row < m.length; row += 1) {
            for (let col = 0; col < m[0]!.length; col += 1) {
                transposed[col]![row] = m[row]![col]!;
            }
        }
        return result;
    }

    /**
     * Traverses the matrix.
     */
    public walk(visit: (indices: CellIndices, c: Cell) => void) {
        const recWalk = (recM: any, cellIndices: CellIndices): void => {
            // A helper function to check sub-dimension shape
            const getShape = (subM: any): Shape => {
                const shapes: Shape = [];
                let dim = subM;
                while (dim && Array.isArray(dim)) {
                    shapes.push(dim.length);
                    dim = (dim.length && [...dim][0]) || null;
                }
                return shapes;
            };

            const recMShape = getShape(recM);

            if (recMShape.length === 1) {
                for (let i = 0; i < recM.length; i += 1) {
                    visit([...cellIndices, i], recM[i]);
                }
                return; // Prevents executing the block below for 1D arrays
            }

            for (let i = 0; i < recM.length; i += 1) {
                recWalk(recM[i], [...cellIndices, i]);
            }
        };

        recWalk(this.data, []);
    }

    /**
     * Gets the matrix cell value at specific index.
     */
    public getCellAtIndex(cellIndices: CellIndices): Cell {
        let cell: any = this.data[cellIndices[0]!];
        for (let dimIdx = 1; dimIdx < cellIndices.length - 1; dimIdx += 1) {
            cell = cell[cellIndices[dimIdx]!];
        }
        return cell[cellIndices[cellIndices.length - 1]!];
    }

    /**
     * Update the matrix cell at specific index.
     */
    public updateCellAtIndex(cellIndices: CellIndices, cellValue: Cell) {
        let cell: any = this.data[cellIndices[0]!];
        for (let dimIdx = 1; dimIdx < cellIndices.length - 1; dimIdx += 1) {
            cell = cell[cellIndices[dimIdx]!];
        }
        cell[cellIndices[cellIndices.length - 1]!] = cellValue;
    }

    /**
     * Adds 2 matrices element-wise.
     */
    public add(other: Matrix): Matrix {
        this.validateSameShape(other);
        const result = Matrix.zeros(this.shape());

        this.walk((cellIndices, cellValue) => {
            result.updateCellAtIndex(cellIndices, cellValue);
        });

        other.walk((cellIndices, cellValue) => {
            const currentCellValue = result.getCellAtIndex(cellIndices);
            result.updateCellAtIndex(cellIndices, currentCellValue + cellValue);
        });

        return result;
    }

    /**
     * Multiplies two matrices element-wise.
     */
    public mul(other: Matrix): Matrix {
        this.validateSameShape(other);
        const result = Matrix.zeros(this.shape());

        this.walk((cellIndices, cellValue) => {
            result.updateCellAtIndex(cellIndices, cellValue);
        });

        other.walk((cellIndices, cellValue) => {
            const currentCellValue = result.getCellAtIndex(cellIndices);
            result.updateCellAtIndex(cellIndices, currentCellValue * cellValue);
        });

        return result;
    }

    /**
     * Subtract two matrices element-wise.
     */
    public sub(other: Matrix): Matrix {
        this.validateSameShape(other);
        const result = Matrix.zeros(this.shape());

        this.walk((cellIndices, cellValue) => {
            result.updateCellAtIndex(cellIndices, cellValue);
        });

        other.walk((cellIndices, cellValue) => {
            const currentCellValue = result.getCellAtIndex(cellIndices);
            result.updateCellAtIndex(cellIndices, currentCellValue - cellValue);
        });

        return result;
    }

    /**
     * Checks if the matrix has a correct type.
     */
    private validateType() {
        if (!this.data || !Array.isArray(this.data) || !Array.isArray(this.data[0])) throw new Error("Invalid matrix format");
    }

    /**
     * Asserts that the matrix is two-dimensional.
     */
    private validate2D() {
        this.validateType();
        if (this.shape().length !== 2) throw new Error("'Matrix is not of 2D shape'");
    }
}
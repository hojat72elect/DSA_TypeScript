import {describe, expect, it, jest} from "bun:test";
import {Matrix} from "../../../../src/algorithms/math/matrix/Matrix.ts";

describe('NewMatrix', () => {

    it('should throw when trying to add matrices of invalid shapes', () => {
        expect(() => new Matrix([0 as any]).dot(new Matrix([1 as any]))).toThrow('Invalid matrix format');
        expect(() => new Matrix([[0]]).dot(new Matrix([1 as any]))).toThrow('Invalid matrix format');
        expect(() => new Matrix([[[0]]]).dot(new Matrix([[1]]))).toThrow('Matrix is not of 2D shape');
        expect(() => new Matrix([[0]]).dot(new Matrix([[1], [2]]))).toThrow('Matrices have incompatible shape for multiplication');
    });

    it('should calculate matrices dimensions', () => {
        expect(new Matrix([]).shape()).toEqual([0]);
        expect(new Matrix([[]]).shape()).toEqual([1, 0]);
        expect(new Matrix([[0]]).shape()).toEqual([1, 1]);
        expect(new Matrix([[0, 0]]).shape()).toEqual([1, 2]);
        expect(new Matrix([[0, 0], [0, 0]]).shape()).toEqual([2, 2]);
        expect(new Matrix([[0, 0, 0], [0, 0, 0]]).shape()).toEqual([2, 3]);
        expect(new Matrix([[0, 0], [0, 0], [0, 0]]).shape()).toEqual([3, 2]);
        expect(new Matrix([[0, 0, 0], [0, 0, 0], [0, 0, 0]]).shape()).toEqual([3, 3]);
        expect(new Matrix([[0], [0], [0]]).shape()).toEqual([3, 1]);
        expect(new Matrix([
            [[0], [0], [0]],
            [[0], [0], [0]],
            [[0], [0], [0]],
        ]).shape()).toEqual([3, 3, 1]);
        expect(new Matrix([
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        ]).shape()).toEqual([3, 3, 3]);
    });

    it('should generate the matrix of zeros', () => {
        expect(Matrix.zeros([1, 0]).data).toEqual([[]]);
        expect(Matrix.zeros([1, 1]).data).toEqual([[0]]);
        expect(Matrix.zeros([1, 3]).data).toEqual([[0, 0, 0]]);
        expect(Matrix.zeros([3, 3]).data).toEqual([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
        expect(Matrix.zeros([3, 3, 1]).data).toEqual([
            [[0], [0], [0]],
            [[0], [0], [0]],
            [[0], [0], [0]],
        ]);
    });

    it('should generate the matrix with custom values', () => {
        expect(Matrix.generate([1, 0], () => 1).data).toEqual([[]]);
        expect(Matrix.generate([1, 1], () => 1).data).toEqual([[1]]);
        expect(Matrix.generate([1, 3], () => 1).data).toEqual([[1, 1, 1]]);
        expect(Matrix.generate([3, 3], () => 1).data).toEqual([
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ]);
        expect(Matrix.generate([3, 3, 1], () => 1).data).toEqual([
            [[1], [1], [1]],
            [[1], [1], [1]],
            [[1], [1], [1]],
        ]);
    });

    it('should generate a custom matrix based on specific cell indices', () => {
        const indicesCallback = jest.fn((indices: number[]) => {
            return indices[0]! * 10 + indices[1]!;
        });
        const m = Matrix.generate([3, 3], indicesCallback);

        expect(indicesCallback).toHaveBeenCalledTimes(3 * 3);
        expect(indicesCallback.mock.calls[0]![0]).toEqual([0, 0]);
        expect(indicesCallback.mock.calls[1]![0]).toEqual([0, 1]);
        expect(indicesCallback.mock.calls[2]![0]).toEqual([0, 2]);
        expect(indicesCallback.mock.calls[3]![0]).toEqual([1, 0]);
        expect(indicesCallback.mock.calls[4]![0]).toEqual([1, 1]);
        expect(indicesCallback.mock.calls[5]![0]).toEqual([1, 2]);
        expect(indicesCallback.mock.calls[6]![0]).toEqual([2, 0]);
        expect(indicesCallback.mock.calls[7]![0]).toEqual([2, 1]);
        expect(indicesCallback.mock.calls[8]![0]).toEqual([2, 2]);
        expect(m.data).toEqual([
            [0, 1, 2],
            [10, 11, 12],
            [20, 21, 22],
        ]);
    });

    it('should multiply two matrices', () => {
        let c;
        c = new Matrix([
            [1, 2],
            [3, 4],
        ]).dot(new Matrix([
            [5, 6],
            [7, 8],
        ]));
        expect(c.shape()).toEqual([2, 2]);
        expect(c.data).toEqual([
            [19, 22],
            [43, 50],
        ]);

        c = new Matrix([
            [1, 2],
            [3, 4],
        ]).dot(new Matrix([
            [5],
            [6],
        ]));
        expect(c.shape()).toEqual([2, 1]);
        expect(c.data).toEqual([
            [17],
            [39],
        ]);

        c = new Matrix([
            [1, 2, 3],
            [4, 5, 6],
        ]).dot(new Matrix([
            [7, 8],
            [9, 10],
            [11, 12],
        ]));
        expect(c.shape()).toEqual([2, 2]);
        expect(c.data).toEqual([
            [58, 64],
            [139, 154],
        ]);

        c = new Matrix([
            [3, 4, 2],
        ]).dot(new Matrix([
            [13, 9, 7, 5],
            [8, 7, 4, 6],
            [6, 4, 0, 3],
        ]));
        expect(c.shape()).toEqual([1, 4]);
        expect(c.data).toEqual([
            [83, 63, 37, 45],
        ]);
    });

    it('should transpose matrices', () => {
        expect(new Matrix([[1, 2, 3]]).t().data).toEqual([
            [1],
            [2],
            [3],
        ]);

        expect(new Matrix([
            [1],
            [2],
            [3],
        ]).t().data).toEqual([
            [1, 2, 3],
        ]);

        expect(new Matrix([
            [1, 2, 3],
            [4, 5, 6],
        ]).t().data).toEqual([
            [1, 4],
            [2, 5],
            [3, 6],
        ]);

        expect(new Matrix([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]).t().data).toEqual([
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
        ]);
    });

    it('should throw when trying to transpose non 2D matrix', () => {
        expect(() => {
            new Matrix([[[1]]]).t();
        }).toThrow('Matrix is not of 2D shape');
    });

    it('should add two matrices', () => {
        expect(new Matrix([[1]]).add(new Matrix([[2]])).data).toEqual([[3]]);

        expect(new Matrix([[1, 2, 3]]).add(new Matrix([[4, 5, 6]])).data)
            .toEqual([[5, 7, 9]]);

        expect(new Matrix([[1], [2], [3]]).add(new Matrix([[4], [5], [6]])).data)
            .toEqual([[5], [7], [9]]);

        expect(new Matrix([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]).add(new Matrix([
            [10, 11, 12],
            [13, 14, 15],
            [16, 17, 18],
        ])).data)
            .toEqual([
                [11, 13, 15],
                [17, 19, 21],
                [23, 25, 27],
            ]);

        expect(new Matrix([
            [[1], [2], [3]],
            [[4], [5], [6]],
            [[7], [8], [9]],
        ]).add(new Matrix([
            [[10], [11], [12]],
            [[13], [14], [15]],
            [[16], [17], [18]],
        ])).data)
            .toEqual([
                [[11], [13], [15]],
                [[17], [19], [21]],
                [[23], [25], [27]],
            ]);
    });

    it('should throw when trying to add matrices of different shape', () => {
        expect(() => new Matrix([[0]]).add(new Matrix([[[0]]]))).toThrow(
            'Matrices have different dimensions',
        );

        expect(() => new Matrix([[0]]).add(new Matrix([[0, 0]]))).toThrow(
            'Matrices have different shapes',
        );
    });

    it('should do element wise multiplication two matrices', () => {
        expect(new Matrix([[2]]).mul(new Matrix([[3]])).data).toEqual([[6]]);

        expect(new Matrix([[1, 2, 3]]).mul(new Matrix([[4, 5, 6]])).data)
            .toEqual([[4, 10, 18]]);

        expect(new Matrix([[1], [2], [3]]).mul(new Matrix([[4], [5], [6]])).data)
            .toEqual([[4], [10], [18]]);

        expect(new Matrix([
            [1, 2],
            [3, 4],
        ]).mul(new Matrix([
            [5, 6],
            [7, 8],
        ])).data)
            .toEqual([
                [5, 12],
                [21, 32],
            ]);

        expect(new Matrix([
            [[1], [2]],
            [[3], [4]],
        ]).mul(new Matrix([
            [[5], [6]],
            [[7], [8]],
        ])).data)
            .toEqual([
                [[5], [12]],
                [[21], [32]],
            ]);
    });

    it('should throw when trying to multiply matrices element-wise of different shape', () => {
        expect(() => new Matrix([[0]]).mul(new Matrix([[[0]]]))).toThrow(
            'Matrices have different dimensions',
        );

        expect(() => new Matrix([[0]]).mul(new Matrix([[0, 0]]))).toThrow(
            'Matrices have different shapes',
        );
    });

    it('should do element wise subtraction two matrices', () => {
        expect(new Matrix([[3]]).sub(new Matrix([[2]])).data).toEqual([[1]]);

        expect(new Matrix([[10, 12, 14]]).sub(new Matrix([[4, 5, 6]])).data)
            .toEqual([[6, 7, 8]]);

        expect(new Matrix([[[10], [12], [14]]]).sub(new Matrix([[[4], [5], [6]]])).data)
            .toEqual([[[6], [7], [8]]]);

        expect(new Matrix([
            [10, 20],
            [30, 40],
        ]).sub(new Matrix([
            [5, 6],
            [7, 8],
        ])).data)
            .toEqual([
                [5, 14],
                [23, 32],
            ]);

        expect(new Matrix([
            [[10], [20]],
            [[30], [40]],
        ]).sub(new Matrix([
            [[5], [6]],
            [[7], [8]],
        ])).data)
            .toEqual([
                [[5], [14]],
                [[23], [32]],
            ]);
    });

    it('should throw when trying to subtract matrices element-wise of different shape', () => {
        expect(() => new Matrix([[0]]).sub(new Matrix([[[0]]]))).toThrow(
            'Matrices have different dimensions',
        );

        expect(() => new Matrix([[0]]).sub(new Matrix([[0, 0]]))).toThrow(
            'Matrices have different shapes',
        );
    });
});
import {isPowerOfTwo} from "../../../../src/algorithms/math/bits/isPowerOfTwo.ts";

export class SegmentTree {

    public inputArray: number[];
    public operation: (a: number, b: number) => number;
    public operationFallback: number;
    public segmentTree: (number | null)[];

    /**
     * @param inputArray
     * @param operation - binary function (i.e. sum, min).
     * @param operationFallback
     */
    constructor(
        inputArray: number[],
        operation: (a: number, b: number) => number,
        operationFallback: number
    ) {
        this.inputArray = inputArray;
        this.operation = operation;
        this.operationFallback = operationFallback;

        // Init array representation of segment tree.
        this.segmentTree = this.initSegmentTree(this.inputArray);

        this.buildSegmentTree();
    }

    initSegmentTree(inputArray: number[]): (number | null)[] {
        let segmentTreeArrayLength: number;
        const inputArrayLength = inputArray.length;

        if (isPowerOfTwo(inputArrayLength)) {
            // If original array length is a power of two.
            segmentTreeArrayLength = (2 * inputArrayLength) - 1;
        } else {
            // If original array length is not a power of two then we need to find
            // next number that is a power of two and use it to calculate
            // tree array size. This is happens because we need to fill empty children
            // in perfect binary tree with nulls.And those nulls need extra space.
            const currentPower = Math.floor(Math.log2(inputArrayLength));
            const nextPower = currentPower + 1;
            const nextPowerOfTwoNumber = 2 ** nextPower;
            segmentTreeArrayLength = (2 * nextPowerOfTwoNumber) - 1;
        }

        return new Array<(number | null)>(segmentTreeArrayLength).fill(null);
    }

    buildSegmentTree(): void {
        const leftIndex = 0;
        const rightIndex = this.inputArray.length - 1;
        const position = 0;
        this.buildTreeRecursively(leftIndex, rightIndex, position);
    }

    buildTreeRecursively(leftInputIndex: number, rightInputIndex: number, position: number): void {
        // If low input index and high input index are equal that would mean
        // the we have finished splitting and we are already came to the leaf
        // of the segment tree. We need to copy this leaf value from input
        // array to segment tree.
        if (leftInputIndex === rightInputIndex) {
            this.segmentTree[position] = this.inputArray[leftInputIndex]!;
            return;
        }

        // Split input array on two halves and process them recursively.
        const middleIndex = Math.floor((leftInputIndex + rightInputIndex) / 2);
        // Process left half of the input array.
        this.buildTreeRecursively(leftInputIndex, middleIndex, this.getLeftChildIndex(position));
        // Process right half of the input array.
        this.buildTreeRecursively(middleIndex + 1, rightInputIndex, this.getRightChildIndex(position));

        // Once every tree leaf is not empty we're able to build tree bottom up using
        // provided operation function.
        const leftValue = this.segmentTree[this.getLeftChildIndex(position)];
        const rightValue = this.segmentTree[this.getRightChildIndex(position)];

        // Use fallback if children values are null, ensuring type safety for the binary operation
        this.segmentTree[position] = this.operation(
            leftValue ?? this.operationFallback,
            rightValue ?? this.operationFallback,
        );
    }

    /**
     * Do range query on segment tree in context of this.operation function.
     */
    rangeQuery(queryLeftIndex: number, queryRightIndex: number): number {
        const leftIndex = 0;
        const rightIndex = this.inputArray.length - 1;
        const position = 0;

        return this.rangeQueryRecursive(
            queryLeftIndex,
            queryRightIndex,
            leftIndex,
            rightIndex,
            position,
        );
    }

    /**
     * Do range query on segment tree recursively in context of this.operation function.
     */
    rangeQueryRecursive(
        queryLeftIndex: number,
        queryRightIndex: number,
        leftIndex: number,
        rightIndex: number,
        position: number,
    ): number {
        if (queryLeftIndex <= leftIndex && queryRightIndex >= rightIndex) {
            // Total overlap.
            return this.segmentTree[position] ?? this.operationFallback;
        }

        if (queryLeftIndex > rightIndex || queryRightIndex < leftIndex) {
            // No overlap.
            return this.operationFallback;
        }

        // Partial overlap.
        const middleIndex = Math.floor((leftIndex + rightIndex) / 2);

        const leftOperationResult = this.rangeQueryRecursive(
            queryLeftIndex,
            queryRightIndex,
            leftIndex,
            middleIndex,
            this.getLeftChildIndex(position),
        );

        const rightOperationResult = this.rangeQueryRecursive(
            queryLeftIndex,
            queryRightIndex,
            middleIndex + 1,
            rightIndex,
            this.getRightChildIndex(position),
        );

        return this.operation(leftOperationResult, rightOperationResult);
    }

    getLeftChildIndex(parentIndex: number): number {
        return (2 * parentIndex) + 1;
    }

    getRightChildIndex(parentIndex: number): number {
        return (2 * parentIndex) + 2;
    }
}
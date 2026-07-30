import {Stack} from "../../../data_structures/stack/Stack.ts";

type MoveCallback = (disc: number, fromPole: number[], toPole: number[]) => void;

function hanoiTowerRecursive(
    numberOfDiscs: number,
    fromPole: Stack<any>,
    withPole: Stack<any>,
    toPole: Stack<any>,
    moveCallback: MoveCallback,
) {
    if (numberOfDiscs === 1) {
        // Base case with just one disc.
        moveCallback(fromPole.peek(), fromPole.toArray(), toPole.toArray());
        const disc = fromPole.pop();
        toPole.push(disc);
    } else {
        // In case if there are more discs, then move them recursively.

        // Expose the bottom disc on fromPole stack.
        hanoiTowerRecursive(
            numberOfDiscs - 1,
            fromPole,
            toPole,
            withPole,
            moveCallback
        );

        // Move the disc that was exposed to its final destination.
        hanoiTowerRecursive(
            1,
            fromPole,
            withPole,
            toPole,
            moveCallback
        );

        // Move temporary tower from auxiliary pole to its final destination.
        hanoiTowerRecursive(
            numberOfDiscs - 1,
            withPole,
            fromPole,
            toPole,
            moveCallback
        );
    }
}

export function hanoiTower(numberOfDiscs: number, moveCallback: MoveCallback, fromPole: Stack<any> = new Stack(), withPole: Stack<any> = new Stack(), toPole: Stack<any> = new Stack()) {
    // Each of three poles of Tower of Hanoi puzzle is represented as a stack
    // that might contain elements (discs). Each disc is represented as a number.
    // Larger discs have bigger number equivalent.

    // Let's create the discs and put them to the fromPole.
    for (let discSize = numberOfDiscs; discSize > 0; discSize -= 1)
        fromPole.push(discSize);

    hanoiTowerRecursive(numberOfDiscs, fromPole, withPole, toPole, moveCallback);
}

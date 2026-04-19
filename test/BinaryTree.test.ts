import {expect, test} from "bun:test";
import {BinaryNode, BinaryTree} from "../src/tree/BinaryTree.ts";

function createTreeMock() {

    /**
     *                            _  Hojat _
     *                        /                 \
     *                      /                     \
     *                    /                         \
     *                   Jila                       Mansour
     *                 /    \                      /       \
     *               /        \                  /           \
     *           Tooba   Mohammad   Fatemeh      Mahmood
     */
    const mockedTree = new BinaryTree<string>("Hojat");
    mockedTree.root?.setLeftChild("Jila");
    mockedTree.root?.setRightChild("Mansour");
    mockedTree.root?.leftChild?.setLeftChild("Tooba");
    mockedTree.root?.leftChild?.setRightChild("Mohammad");
    mockedTree.root?.rightChild?.setLeftChild("Fatemeh");
    mockedTree.root?.rightChild?.setRightChild("Mahmood");

    return mockedTree;
}

test("General behavior of different traversal strategies in a binary tree with 3 levels", () => {
    const sut = createTreeMock();

    expect(sut.preOrderTraversal()).toEqual("└──Hojat\n  └──Jila\n    └──Tooba\n    └──Mohammad\n  └──Mansour\n    └──Fatemeh\n    └──Mahmood\n");
    expect(sut.inOrderTraversal()).toEqual("    └──Tooba\n  └──Jila\n    └──Mohammad\n└──Hojat\n    └──Fatemeh\n  └──Mansour\n    └──Mahmood\n");
    expect(sut.postOrderTraversal()).toEqual("    └──Tooba\n    └──Mohammad\n  └──Jila\n    └──Fatemeh\n    └──Mahmood\n  └──Mansour\n└──Hojat\n");

});

test("various ways of searching for a value in a normal binary tree", () => {
    const sut = createTreeMock();

    expect(sut.getLeftMostNode()).toEqual(new BinaryNode("Tooba"));
    expect(sut.getRightMostNode()).toEqual(new BinaryNode("Mahmood"));

    const mockedJilaNode = new BinaryNode("Jila")
    mockedJilaNode.setRightChild("Mohammad");
    mockedJilaNode.setLeftChild("Tooba");
    expect(sut.search("Jila")).toEqual(mockedJilaNode);

    expect(sut.search("Peter")).toBeNull();
    expect(sut.search("jila")).toBeNull();
});

test("Removing a leaf node from a tree", () => {
    const sut = createTreeMock();

    const removalResult = sut.remove("Tooba");
    expect(removalResult).toBeTrue();
    expect(sut.preOrderTraversal()).toEqual("└──Hojat\n  └──Jila\n    └──Mohammad\n  └──Mansour\n    └──Fatemeh\n    └──Mahmood\n");
});

test("Removing root from a tree", () => {
    const sut = createTreeMock();

    const removalResult = sut.remove("Hojat");
    expect(removalResult).toBeTrue();
    expect(sut.preOrderTraversal()).toEqual("└──Fatemeh\n  └──Jila\n    └──Tooba\n    └──Mohammad\n  └──Mansour\n    └──Mahmood\n");
});

test("Removing a middle node from tree", () => {
    const sut = createTreeMock();

    const removalResult = sut.remove("Jila");
    expect(removalResult).toBeTrue();
    expect(sut.preOrderTraversal()).toEqual("└──Hojat\n  └──Mohammad\n    └──Tooba\n  └──Mansour\n    └──Fatemeh\n    └──Mahmood\n");
});

test("Failed removing a node from tree", () => {
    const sut = createTreeMock();

    const removalResult = sut.remove("Mike");
    expect(removalResult).toBeFalse();
});
import {expect, test} from "bun:test";
import {BinaryTree} from "../src/tree/BinaryTree.ts";

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
const sut = new BinaryTree<string>("Hojat");
sut.root?.setLeftChild("Jila");
sut.root?.setRightChild("Mansour");
sut.root?.leftChild?.setLeftChild("Tooba");
sut.root?.leftChild?.setRightChild("Mohammad");
sut.root?.rightChild?.setLeftChild("Fatemeh");
sut.root?.rightChild?.setRightChild("Mahmood");


test("General behavior of different traversal strategies in a binary tree with 3 levels", () => {
    expect(sut.preOrderTraversal()).toEqual("└──Hojat\n  └──Jila\n    └──Tooba\n    └──Mohammad\n  └──Mansour\n    └──Fatemeh\n    └──Mahmood\n");
    expect(sut.inOrderTraversal()).toEqual("    └──Tooba\n  └──Jila\n    └──Mohammad\n└──Hojat\n    └──Fatemeh\n  └──Mansour\n    └──Mahmood\n");
    expect(sut.postOrderTraversal()).toEqual("    └──Tooba\n    └──Mohammad\n  └──Jila\n    └──Fatemeh\n    └──Mahmood\n  └──Mansour\n└──Hojat\n");

});

test("searching for a value in a normal binary tree", () => {

});
// Character that we will use for trie tree root.
import {TrieNode} from "./TrieNode.ts";

const HEAD_CHARACTER = '*';

export class Trie {
    public head: TrieNode;

    constructor() {
        this.head = new TrieNode(HEAD_CHARACTER);
    }

    public addWord(word: string): Trie {
        const characters = Array.from(word);
        let currentNode = this.head;

        for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
            const isComplete = charIndex === characters.length - 1;
            currentNode = currentNode.addChild(characters[charIndex]!, isComplete);
        }

        return this;
    }

    public deleteWord(word: string): this {
        const depthFirstDelete = (currentNode: TrieNode, charIndex: number = 0): void => {
            if (charIndex >= word.length) {
                // Return if we're trying to delete the character that is out of word's scope.
                return;
            }

            const character = word[charIndex];
            const nextNode = currentNode.getChild(character!);

            if (nextNode == null) {
                // Return if we're trying to delete a word that has not been added to the Trie.
                return;
            }

            // Go deeper.
            depthFirstDelete(nextNode, charIndex + 1);

            // Since we're going to delete a word let's un-mark its last character isCompleteWord flag.
            if (charIndex === (word.length - 1)) {
                nextNode.isCompleteWord = false;
            }

            // childNode is deleted only if:
            // - childNode has NO children
            // - childNode.isCompleteWord === false
            currentNode.removeChild(character!);
        };

        // Start depth-first deletion from the head node.
        depthFirstDelete(this.head);

        return this;
    }

    public suggestNextCharacters(word: string): string[] | null {
        const lastCharacter = this.getLastCharacterNode(word);

        if (!lastCharacter) {
            return null;
        }

        return lastCharacter.suggestChildren();
    }

    /**
     * Check if complete word exists in Trie.
     */
    public doesWordExist(word: string): boolean {
        const lastCharacter = this.getLastCharacterNode(word);

        return !!lastCharacter && lastCharacter.isCompleteWord;
    }

    public getLastCharacterNode(word: string): TrieNode | null {
        const characters = Array.from(word);
        let currentNode: TrieNode | undefined = this.head;

        for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
            if (!currentNode || !currentNode.hasChild(characters[charIndex]!)) {
                return null;
            }

            currentNode = currentNode.getChild(characters[charIndex]!);
        }

        return currentNode ?? null;
    }
}
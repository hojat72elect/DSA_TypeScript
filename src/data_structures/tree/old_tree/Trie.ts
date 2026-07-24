class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean; // whether this node is the end of a complete word.

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

class Trie {
    private readonly root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    /**
     * Inserts a new string into the trie.
     */
    insert(newWord: string) {
        let currentNode = this.root;

        for (const character of newWord) {
            if (!currentNode.children.has(character)) {
                // This character doesn't exist in the trie
                currentNode.children.set(character, new TrieNode());
            }

            currentNode = currentNode.children.get(character)!; // go to the child node
        }

        currentNode.isEndOfWord = true; // we got to the end of the word
    }

    /**
     * Checks if the provided word exists in our trie.
     */
    search(word: string): boolean {
        let current = this.root;

        for (const character of word) {
            if (!current.children.has(character)) return false;
            current = current.children.get(character)!;
        }

        return current.isEndOfWord;
    }

    /**
     * Returns true if there is word in our trie that starts with the provided prefix.
     */
    startsWith(prefix: string): boolean {
        let current = this.root;

        for (const character of prefix) {
            if (!current.children.get(character)) return false;
            current = current.children.get(character)!;
        }

        return true;
    }
}
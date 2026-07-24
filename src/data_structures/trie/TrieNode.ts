import {HashTable} from "../../../../DSA_TypeScript/src/data_structures/hash-table/HashTable.ts";

export class TrieNode {
    public character: string;
    public isCompleteWord: boolean;
    public children: HashTable<TrieNode>;

    constructor(character: string, isCompleteWord: boolean = false) {
        this.character = character;
        this.isCompleteWord = isCompleteWord;
        this.children = new HashTable<TrieNode>();
    }

    public getChild(character: string): TrieNode | undefined {
        return this.children.get(character);
    }

    public addChild(character: string, isCompleteWord: boolean = false): TrieNode {
        if (!this.children.has(character)) {
            this.children.set(character, new TrieNode(character, isCompleteWord));
        }

        const childNode = this.children.get(character);

        if (!childNode) {
            throw new Error(`Failed to retrieve or create child node for character: ${character}`);
        }

        // In cases similar to adding "car" after "carpet" we need to mark "r" character as complete.
        childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord;

        return childNode;
    }

    public removeChild(character: string): this {
        const childNode = this.getChild(character);

        // Delete childNode only if:
        // - childNode has NO children,
        // - childNode.isCompleteWord === false.
        if (
            childNode &&
            !childNode.isCompleteWord &&
            !childNode.hasChildren()
        ) {
            this.children.delete(character);
        }

        return this;
    }

    public hasChild(character: string): boolean {
        return this.children.has(character);
    }

    public hasChildren(): boolean {
        return this.children.getKeys().length !== 0;
    }

    public suggestChildren(): string[] {
        return [...this.children.getKeys()];
    }

    public toString(): string {
        let childrenAsString = this.suggestChildren().toString();
        childrenAsString = childrenAsString ? `:${childrenAsString}` : '';
        const isCompleteString = this.isCompleteWord ? '*' : '';

        return `${this.character}${isCompleteString}${childrenAsString}`;
    }
}
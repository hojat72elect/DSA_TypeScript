import {Stack} from '../../../../../DSA_TypeScript/src/data_structures/stack/Stack';
import {HashTable} from '../../../../../DSA_TypeScript/src/data_structures/hash_table/HashTable.ts';

const hashTable = new HashTable<string>(3);
hashTable.set('{', '}');
hashTable.set('(', ')');
hashTable.set('[', ']');

/**
 * Check if string has valid parentheses.
 */
export function isValid(parenthesesString: string): boolean {
    if (parenthesesString.length === 0) return false;

    const stack = new Stack();

    for (let i = 0; i < parenthesesString.length; i += 1) {
        const currentCharacter = parenthesesString[i];
        if (hashTable.has(currentCharacter!)) {
            stack.push(hashTable.get(currentCharacter!));
        } else {
            if (stack.isEmpty() || stack.pop() !== currentCharacter) return false;
        }
    }

    return stack.isEmpty();
}

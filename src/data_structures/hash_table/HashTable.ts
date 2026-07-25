import {LinkedList} from "../linked_list/LinkedList.ts";
import {LinkedListNode} from "../linked_list/LinkedListNode.ts";

export interface HashTableValue<T> {
    key: string;
    value: T;
}

/**
 * Hash table size directly affects the number of collisions.
 * The bigger the hash table size the less collisions you'll get.
 * For demonstrating purposes, hash table size is small to show how collisions
 * are being handled.
 */
const defaultHashTableSize = 32;

export class HashTable<T> {
    public buckets: LinkedList<HashTableValue<T>>[];
    public keys: Record<string, number>;

    constructor(hashTableSize: number = defaultHashTableSize) {
        // Create hash table of certain size and fill each bucket with an empty linked list.
        this.buckets = Array(hashTableSize)
            .fill(null)
            .map(() => new LinkedList<HashTableValue<T>>());

        // Just to keep track of all actual keys in a fast way.
        this.keys = {};
    }

    /**
     * Converts key string to hash number.
     */
    hash(key: string): number {
        /*
         * For simplicity reasons we will just use character codes sum of all characters of the key
         * to calculate the hash.
         *
         * But you may also use more sophisticated approaches like polynomial string hash to reduce the
         * number of collisions:
         *
         * hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
         *
         *  where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
         * PRIME is just any prime number like 31.
         */
        const hash = Array.from(key).reduce(
            (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
            0,
        );

        // Reduce hash number so it would fit hash table size.
        return hash % this.buckets.length;
    }

    /**
     * If the key doesn't exist in our table, creates a new record. Otherwise, updates the previous
     * key-value pair
     */
    set(key: string, value: T) {
        const keyHash = this.hash(key);
        this.keys[key] = keyHash;
        const bucketLinkedList = this.buckets[keyHash]!;
        const node = bucketLinkedList.find({callback: (nodeValue) => nodeValue.key === key});

        if (!node) {
            // Insert new node.
            bucketLinkedList.append({key, value});
        } else {
            // Update value of existing node.
            node.value.value = value;
        }
    }

    delete(key: string): LinkedListNode | null {
        const keyHash = this.hash(key);
        delete this.keys[key];
        const bucketLinkedList = this.buckets[keyHash]!;
        const node = bucketLinkedList.find({callback: (nodeValue) => nodeValue.key === key});

        if (node) return bucketLinkedList.delete(node.value);

        return null;
    }

    get(key: string): T | undefined {
        const bucketLinkedList = this.buckets[this.hash(key)]!;
        const node = bucketLinkedList.find({callback: (nodeValue) => nodeValue.key === key});

        return node ? node.value.value : undefined;
    }

    has(key: string): boolean {
        return Object.prototype.hasOwnProperty.call(this.keys, key);
    }

    getKeys(): string[] {
        return Object.keys(this.keys);
    }

    /**
     * List of all the stored values in the hash table.
     */
    getValues(): T[] {
        return this.buckets.reduce<T[]>((values, bucket) => {
            const bucketValues = bucket
                .toArray()
                .map((linkedListNode) => linkedListNode.value.value);
            return values.concat(bucketValues);
        }, []);
    }
}
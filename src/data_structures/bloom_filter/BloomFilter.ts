interface BloomFilterStore {
    getValue(index: number): boolean;

    setValue(index: number): void;
}

export class BloomFilter {
    private size: number;
    private storage: BloomFilterStore;

    /**
     * @param size - the size of the storage.
     */
    constructor(size: number = 100) {
        // Bloom filter size directly affects the likelihood of false positives.
        // The bigger the size the lower the likelihood of false positives.
        this.size = size;
        this.storage = this.createStore(size);
    }

    insert(item: string) {
        const hashValues = this.getHashValues(item);

        // Set each hashValue index to true.
        hashValues.forEach((val: number) => this.storage.setValue(val));
    }

    mayContain(item: string) {
        const hashValues = this.getHashValues(item);

        for (let hashIndex = 0; hashIndex < hashValues.length; hashIndex++) {
            if (!this.storage.getValue(hashValues[hashIndex]!)) {
                // We know that the item was definitely not inserted.
                return false;
            }
        }

        // The item may or may not have been inserted.
        return true;
    }

    /**
     * Creates the data store for our filter.
     * We use this method to generate the store in order to
     * encapsulate the data itself and only provide access
     * to the necessary methods.
     */
    createStore(size: number): BloomFilterStore {
        const storage: boolean[] = [];

        // Initialize all indices to false
        for (let storageCellIndex = 0; storageCellIndex < size; storageCellIndex++) {
            storage.push(false);
        }

        return {
            getValue(index: number): boolean {
                return storage[index]!;
            },
            setValue(index: number) {
                storage[index] = true;
            },
        };
    }

    hash1(item: string) {
        let hash = 0;

        for (let charIndex = 0; charIndex < item.length; charIndex++) {
            const char = item.charCodeAt(charIndex);
            hash = (hash << 5) + hash + char;
            hash &= hash; // Convert to 32bit integer
            hash = Math.abs(hash);
        }

        return hash % this.size;
    }

    hash2(item: string) {
        let hash = 5_381;

        for (let charIndex = 0; charIndex < item.length; charIndex++) {
            const char = item.charCodeAt(charIndex);
            hash = (hash << 5) + hash + char; /* hash * 33 + c */
        }

        return Math.abs(hash % this.size);
    }

    hash3(item: string) {
        let hash = 0;

        for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
            const char = item.charCodeAt(charIndex);
            hash = (hash << 5) - hash;
            hash += char;
            hash &= hash; // Convert to 32bit integer
        }

        return Math.abs(hash % this.size);
    }

    /**
     * Runs all 3 hash functions on the input and returns an array of results.
     */
    getHashValues(item: string) {
        return [
            this.hash1(item),
            this.hash2(item),
            this.hash3(item),
        ];
    }
}

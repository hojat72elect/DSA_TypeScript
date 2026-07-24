/**
 * Simple implementation of the Doubly-Linked List Node
 * that is used in LRU Cache class below.
 */
class LinkedListNode<T> {
    public key: string;
    public val: T | undefined;
    public prev: LinkedListNode<T> | null;
    public next: LinkedListNode<T> | null;

    constructor(
        key: string = '',
        val?: T,
        prev: LinkedListNode<T> | null = null,
        next: LinkedListNode<T> | null = null
    ) {

        this.key = key;
        this.val = val;
        this.prev = prev;
        this.next = next;

    }
}

/**
 * Implementation of the LRU (Least Recently Used) Cache
 * based on the HashMap and Doubly Linked List data-structures.
 *
 * Current implementation allows to have fast O(1) (in average) read and write operations.
 *
 * At any moment in time the LRU Cache holds not more that "capacity" number of items in it.
 */
export class LruCache<T> {
    public capacity: number;
    public nodesMap: Record<string, LinkedListNode<T>>;
    public size: number;
    public head: LinkedListNode<T>;
    public tail: LinkedListNode<T>;

    constructor(capacity: number) {
        this.capacity = capacity; // How many items to store in cache at max.
        this.nodesMap = {}; // The quick links to each linked list node in cache.
        this.size = 0; // The number of items currently stored in the cache.
        this.head = new LinkedListNode<T>(); // The Head (first) linked list node.
        this.tail = new LinkedListNode<T>(); // The Tail (last) linked list node.
    }

    /**
     * Returns the cached value by its key.
     * Time complexity: O(1) in average.
     */
    public get(key: string): T | undefined {
        if (this.nodesMap[key] === undefined) return undefined;
        const node = this.nodesMap[key];
        this.promote(node);
        return node.val;
    }

    /**
     * Sets the value to cache by its key.
     * Time complexity: O(1) in average.
     */
    public set(key: string, val: T): void {
        if (this.nodesMap[key]) {
            const node = this.nodesMap[key];
            node.val = val;
            this.promote(node);
        } else {
            const node = new LinkedListNode<T>(key, val);
            this.append(node);
        }
    }

    /**
     * Promotes the node to the end of the linked list.
     * It means that the node is most frequently used.
     * It also reduces the chance for such node to get evicted from cache.
     */
    public promote(node: LinkedListNode<T>): void {
        this.evict(node);
        this.append(node);
    }

    /**
     * Appends a new node to the end of the cache linked list.
     */
    public append(node: LinkedListNode<T>): void {
        this.nodesMap[node.key] = node;

        if (!this.head.next) {
            // First node to append.
            this.head.next = node;
            this.tail.prev = node;
            node.prev = this.head;
            node.next = this.tail;
        } else {
            // Append to an existing tail.
            const oldTail = this.tail.prev;
            if (oldTail) {
                oldTail.next = node;
                node.prev = oldTail;
            }
            node.next = this.tail;
            this.tail.prev = node;
        }

        this.size += 1;

        if (this.size > this.capacity && this.head.next) {
            this.evict(this.head.next);
        }
    }

    /**
     * Evicts (removes) the node from cache linked list.
     */
    public evict(node: LinkedListNode<T>): void {
        delete this.nodesMap[node.key];
        this.size -= 1;

        const prevNode = node.prev;
        const nextNode = node.next;

        // If one and only node.
        if (prevNode === this.head && nextNode === this.tail) {
            this.head.next = null;
            this.tail.prev = null;
            this.size = 0;
            return;
        }

        // If this is a Head node.
        if (prevNode === this.head && nextNode) {
            nextNode.prev = this.head;
            this.head.next = nextNode;
            return;
        }

        // If this is a Tail node.
        if (nextNode === this.tail && prevNode) {
            prevNode.next = this.tail;
            this.tail.prev = prevNode;
            return;
        }

        // If the node is in the middle.
        if (prevNode && nextNode) {
            prevNode.next = nextNode;
            nextNode.prev = prevNode;
        }
    }

}

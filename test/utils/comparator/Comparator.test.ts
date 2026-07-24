import {Comparator} from "../../../src/utils/comparator/Comparator.ts";
import {describe, expect, it} from "bun:test";

describe('Comparator', () => {
    it('should compare with default comparator function', () => {
        const sut = new Comparator();

        expect(sut.equal(0, 0)).toBeTrue();
        expect(sut.equal(0, 1)).toBeFalse();
        expect(sut.equal('a', 'a')).toBeTrue();
        expect(sut.lessThan(1, 2)).toBeTrue();
        expect(sut.lessThan(-1, 2)).toBeTrue();
        expect(sut.lessThan('a', 'b')).toBeTrue();
        expect(sut.lessThan('a', 'ab')).toBeTrue();
        expect(sut.lessThan(10, 2)).toBeFalse();
        expect(sut.lessThanOrEqual(10, 2)).toBeFalse();
        expect(sut.lessThanOrEqual(1, 1)).toBeTrue();
        expect(sut.lessThanOrEqual(0, 0)).toBeTrue();
        expect(sut.greaterThan(0, 0)).toBeFalse();
        expect(sut.greaterThan(10, 0)).toBeTrue();
        expect(sut.greaterThanOrEqual(10, 0)).toBeTrue();
        expect(sut.greaterThanOrEqual(10, 10)).toBeTrue();
        expect(sut.greaterThanOrEqual(0, 10)).toBeFalse();
    });

    it('should compare with custom comparator function', () => {
        const sut = new Comparator((a: string, b: string) => {
            if (a.length === b.length) {
                return 0;
            }

            return a.length < b.length ? -1 : 1;
        });

        expect(sut.equal('a', 'b')).toBeTrue();
        expect(sut.equal('a', '')).toBeFalse();
        expect(sut.lessThan('b', 'aa')).toBeTrue();
        expect(sut.greaterThanOrEqual('a', 'aa')).toBeFalse();
        expect(sut.greaterThanOrEqual('aa', 'a')).toBeTrue();
        expect(sut.greaterThanOrEqual('a', 'a')).toBeTrue();

        sut.reverse();

        expect(sut.equal('a', 'b')).toBeTrue();
        expect(sut.equal('a', '')).toBeFalse();
        expect(sut.lessThan('b', 'aa')).toBeFalse();
        expect(sut.greaterThanOrEqual('a', 'aa')).toBeTrue();
        expect(sut.greaterThanOrEqual('aa', 'a')).toBeFalse();
        expect(sut.greaterThanOrEqual('a', 'a')).toBeTrue();
    });
});

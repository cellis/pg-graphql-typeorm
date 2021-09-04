"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolveType_1 = __importDefault(require("./resolveType"));
describe('resolveType', () => {
    describe('type: text', () => {
        it('resolves to string', () => {
            expect(resolveType_1.default('text')).toBe('string');
        });
    });
    describe('types', () => {
        it("resolves 'tsvector' to string", () => {
            expect(resolveType_1.default('tsvector')).toBe('string');
        });
        it("resolves 'boolean' to boolean", () => {
            expect(resolveType_1.default('boolean')).toBe('boolean');
        });
        it("resolves 'character-varying' to string", () => {
            expect(resolveType_1.default('character varying')).toBe('string');
        });
        it("resolves 'integer' to number", () => {
            expect(resolveType_1.default('integer')).toBe('number');
        });
        it("resolves 'decimal' to number", () => {
            expect(resolveType_1.default('decimal')).toBe('string');
        });
        it("resolves 'timestamp without time zone' to Date", () => {
            expect(resolveType_1.default('timestamp without time zone')).toBe('Date');
        });
        it("resolves 'timestamp with time zone' to Date", () => {
            expect(resolveType_1.default('timestamp with time zone')).toBe('Date');
        });
        it("resolves 'timestamp' to Date", () => {
            expect(resolveType_1.default('timestamp')).toBe('Date');
        });
        it("resolves 'money' to string", () => {
            expect(resolveType_1.default('money')).toBe('string');
        });
        it("resolves 'real' to number", () => {
            expect(resolveType_1.default('real')).toBe('number');
        });
        it("resolves 'serial' to number", () => {
            expect(resolveType_1.default('serial')).toBe('number');
        });
        it("resolves 'smallserial' to number", () => {
            expect(resolveType_1.default('smallserial')).toBe('number');
        });
        it('resolves anything else to string', () => {
            expect(resolveType_1.default('')).toBe('string');
        });
        it("resolves 'double precision' to number", () => {
            expect(resolveType_1.default('double precision')).toBe('number');
        });
        it("resolves 'text[]' to string[]", () => {
            expect(resolveType_1.default('text', true)).toBe('string[]');
        });
    });
});

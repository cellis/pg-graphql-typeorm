import resolveType, { normalizeDefaultValue } from './resolveType';

describe('normalizeDefaultValue', () => {
  describe("with ''::text", () => {
    it('resolves to empty string', () => {
      expect(normalizeDefaultValue("''::text")).toBe('');
    });
  });

  describe("with default non ''::text value", () => {
    it('resolves to same value', () => {
      expect(normalizeDefaultValue('now()')).toBe('now()');
    });
  });
});
describe('resolveType', () => {
  describe('type: text', () => {
    it('resolves to string', () => {
      expect(resolveType('text')).toBe('string');
    });
  });

  describe('types', () => {
    it("resolves 'tsvector' to string", () => {
      expect(resolveType('tsvector')).toBe('string');
    });

    it("resolves 'boolean' to boolean", () => {
      expect(resolveType('boolean')).toBe('boolean');
    });

    it("resolves 'character-varying' to string", () => {
      expect(resolveType('character varying')).toBe('string');
    });

    it("resolves 'integer' to number", () => {
      expect(resolveType('integer')).toBe('number');
    });

    it("resolves 'decimal' to number", () => {
      expect(resolveType('decimal')).toBe('string');
    });

    it("resolves 'timestamp without time zone' to Date", () => {
      expect(resolveType('timestamp without time zone')).toBe('Date');
    });

    it("resolves 'timestamp with time zone' to Date", () => {
      expect(resolveType('timestamp with time zone')).toBe('Date');
    });

    it("resolves 'timestamp' to Date", () => {
      expect(resolveType('timestamp')).toBe('Date');
    });

    it("resolves 'money' to string", () => {
      expect(resolveType('money')).toBe('string');
    });

    it("resolves 'real' to number", () => {
      expect(resolveType('real')).toBe('number');
    });

    it("resolves 'serial' to number", () => {
      expect(resolveType('serial')).toBe('number');
    });

    it("resolves 'smallserial' to number", () => {
      expect(resolveType('smallserial')).toBe('number');
    });

    it('resolves anything else to string', () => {
      expect(resolveType('')).toBe('string');
    });

    it("resolves 'double precision' to number", () => {
      expect(resolveType('double precision')).toBe('number');
    });

    it("resolves 'text[]' to string[]", () => {
      expect(resolveType('text', true)).toBe('string[]');
    });
  });
});

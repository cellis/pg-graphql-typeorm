"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
describe('PascalCase', () => {
    it('PascalCases', () => {
        expect(utils_1.PascalCase('i_dont_like_snake_case')).toMatchInlineSnapshot('"IDontLikeSnakeCase"');
    });
});
describe('getColumnName', () => {
    it('handles array pluralization', () => {
        expect(utils_1.getColumnName('tag', true)).toMatchInlineSnapshot('"tags"');
    });
    it('camelCases properly', () => {
        expect(utils_1.getColumnName('op_sec', false)).toMatchInlineSnapshot('"opSec"');
    });
    it('camelCases and pluralizes', () => {
        expect(utils_1.getColumnName('over_watch', true)).toMatchInlineSnapshot('"overWatches"');
    });
});

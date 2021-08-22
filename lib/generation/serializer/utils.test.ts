import { getColumnName, PascalCase } from './utils';

describe('PascalCase', () => {
  it('PascalCases', () => {
    expect(PascalCase('i_dont_like_snake_case')).toMatchInlineSnapshot(
      '"IDontLikeSnakeCase"'
    );
  });
});

describe('getColumnName', () => {
  it('handles array pluralization', () => {
    expect(getColumnName('tag', true)).toMatchInlineSnapshot('"tags"');
  });

  it('camelCases properly', () => {
    expect(getColumnName('op_sec', false)).toMatchInlineSnapshot('"opSec"');
  });

  it('camelCases and pluralizes', () => {
    expect(getColumnName('over_watch', true)).toMatchInlineSnapshot(
      '"overWatches"'
    );
  });
});

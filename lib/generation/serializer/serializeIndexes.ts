import { camelCase } from 'lodash';

export default (model: Superluminal.Model) => {
  const indexes = model.indexes;
  const indexesStatement = indexes
    ? Object.keys(indexes)
        .sort()
        .map((idx) => {
          const index = indexes[idx];

          const columnNamesCamel = index.columns
            .map((name) => `'${camelCase(name)}'`)
            .join(',');
          const uniqueObj = index.unique ? '{ unique: true }' : '{}';
          return `@Index('${idx}', [${columnNamesCamel}], ${uniqueObj})`;
        })
        .join('\n')
    : '';
  return indexesStatement;
};

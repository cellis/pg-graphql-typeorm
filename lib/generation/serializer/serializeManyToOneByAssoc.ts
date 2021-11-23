import { camelCase } from 'lodash';
import pluralize from 'pluralize';
import normalizeIdColumn from '../associations/normalizeIdColumn';
import resolveColumnName from '../associations/resolveColumnName';
import { PascalCase } from './utils';

export const serializeManyToOnebyAssoc = (
  model: Superluminal.Model,
  association: Superluminal.ManyToOneRecord,
  models: Superluminal.Models
) => {
  const body: string[][] = [];
  if (association) {
    const associatedModelNames = Object.keys(association).sort();
    const ClassName = PascalCase(model.name);

    associatedModelNames.forEach((name) => {
      const columns = association[name];
      if (columns) {
        columns.forEach((col) => {
          const src = col.pair[0];
          const dest = col.pair[1];
          const destModel = models[name];
          const DestClassName = PascalCase(destModel.name);

          const byMultiple = columns.length > 1;

          const oneToManyName = `${pluralize(camelCase(model.name))}${
            byMultiple ? `By${PascalCase(src)}` : ''
          }`;

          const statementBody = [
            `  () => ${DestClassName}`,
            `  ${camelCase(destModel.name)} => ${camelCase(
              destModel.name
            )}.${oneToManyName}`,
          ];

          const optionsBody = [];
          if (col.onDelete) {
            optionsBody.push(`onDelete: '${col.onDelete}'`);
          }
          if (optionsBody.length) {
            statementBody.push(`  { ${optionsBody.join(', ')} }`);
          }

          const refCol = `referencedColumnName: '${camelCase(dest)}'`;
          let varName = '';

          if (byMultiple) {
            varName += `${camelCase(normalizeIdColumn(src))}By${PascalCase(
              dest
            )}`;
          } else {
            varName = resolveColumnName(model, destModel.name);
          }
          body.push([
            '  @ManyToOne(',
            `  ${statementBody.join(',\n  ')}`,
            '  )',
            `  @JoinColumn([{ name: '${src}', ${refCol} }])`,
            `  ${camelCase(varName)}: ${DestClassName};`,
          ]);
        });
      }
    });
  }

  return body.map((variables) => variables.join('\n')).join('\n\n');
};

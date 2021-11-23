import { camelCase } from 'lodash';
import pluralize from 'pluralize';
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

          const oneToManyName = `${camelCase(pluralize(model.name))}${
            byMultiple ? `By${PascalCase(src)}` : ''
          }`;

          const statementBody = [
            `  () => ${DestClassName}`,
            `  ${destModel.name} => ${destModel.name}.${oneToManyName}`,
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
            varName += `${src}By${PascalCase(dest)}`;
          } else {
            varName = resolveColumnName(destModel);
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

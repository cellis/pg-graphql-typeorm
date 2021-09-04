import { camelCase } from 'lodash';
import { getColumnName, PascalCase } from './utils';

export const serializeOneToOne = (
  associatedModelName: string,
  oneToOne: Superluminal.OneToOne,
  columns: Superluminal.Columns
) => {
  const name: string = associatedModelName;
  const Name = PascalCase(name);
  const columnName = oneToOne.referencedColumn;
  const inverseColumn = columns[columnName];
  const inverse = getColumnName(inverseColumn.name, inverseColumn.array);
  const funcs = `() => ${Name}, (${name}) => ${name}.${inverse}`;
  // prettier-ignore
  return [
    `  @OneToOne(${funcs})`,
    `  ${name}: ${Name};`,
  ].join('\n');
};

export const serializeOneToMany = (
  associatedModelName: string,
  oneToMany: Superluminal.Association
) => {
  const name: string = associatedModelName;
  const Name = PascalCase(name);
  // we pass false because the inverse is not plural
  const inverse = getColumnName(oneToMany.inverse, false);
  const funcs = `() => ${Name}, (${name}) => ${name}.${inverse}`;
  // prettier-ignore
  return [
    `  @OneToMany(${funcs})`,
    `  ${getColumnName(name, true)}: ${Name}[];`,
  ].join('\n');
};

function hasOtherColumnNames(model: Superluminal.Model, name: string) {
  const has = model.columns[name] || (model.oneToOnes && model.oneToOnes[name]);
  // (model.manyToOnes && model.manyToOnes[name]) ||
  // (model.manyToManys && model.manyToManys[name]);

  return has;
}

export const serializeManyToOne = (
  associatedModelName: string,
  manyToOne: Superluminal.ManyToOne,
  model: Superluminal.Model
) => {
  const name: string = associatedModelName;

  const Name = PascalCase(name);

  const optionsBody = [];

  if (manyToOne.onDelete) {
    optionsBody.push(`onDelete: '${manyToOne.onDelete}'`);
  }
  const modelName = camelCase(name);

  const inverseFieldName = manyToOne.inverse;
  const oneToManyName = getColumnName(inverseFieldName, true);

  const statementBody = [
    `  () => ${Name}`,
    `  ${modelName} => ${modelName}.${oneToManyName}`,
  ];

  if (optionsBody.length) {
    statementBody.push(`  { ${optionsBody.join(', ')} }`);
  }
  // prettier-ignore
  const body = [
    '  @ManyToOne(', 
    `  ${statementBody.join(',\n  ')}`, 
    '  )',
  ];

  if (manyToOne.joinColumns) {
    const jc = manyToOne.joinColumns[0];
    const refCol = `referencedColumnName: '${camelCase(
      jc.referencedColumnName
    )}'`;
    body.push(`  @JoinColumn([{ name: '${jc.name}', ${refCol} }])`);
  }

  let resolvedColumnName = modelName;

  let i = 1;

  if (hasOtherColumnNames(model, resolvedColumnName)) {
    while (hasOtherColumnNames(model, resolvedColumnName) && i < 5) {
      const existingDigits = resolvedColumnName.match(/\d+/);

      resolvedColumnName = `${resolvedColumnName.replace(/\d+/, '')}${
        existingDigits ? parseInt(existingDigits[0], 10) + 1 : 2
      }`;

      i++;
    }
  }

  // prettier-ignore
  return [
    `${body.join('\n')}`, 
    `  ${resolvedColumnName}: ${Name};`,
  ].join('\n');
};

export default (model: Superluminal.Model, models: Superluminal.Models) => {
  const result = [];

  if (model.oneToOnes) {
    for (const [associatedName, oneToOne] of Object.entries(model.oneToOnes)) {
      const target = models[associatedName];
      result.push(serializeOneToOne(associatedName, oneToOne, target.columns));
    }
  }

  if (model.oneToManys) {
    for (const [associatedName, oneToMany] of Object.entries(
      model.oneToManys
    )) {
      result.push(serializeOneToMany(associatedName, oneToMany));
    }
  }

  if (model.manyToOnes) {
    for (const [associatedName, manyToOne] of Object.entries(
      model.manyToOnes
    )) {
      result.push(serializeManyToOne(associatedName, manyToOne, model));
    }
  }

  return result.join('\n\n');
};

import { camelCase } from 'lodash';
import pluralize from 'pluralize';
import resolveColumnName from '../associations/resolveColumnName';
import { serializeManyToOnebyAssoc } from './serializeManyToOneByAssoc';
import { getColumnName, PascalCase } from './utils';

export const serializeOneToOne = (
  associatedModelName: string,
  oneToOne: Superluminal.OneToOne,
  columns: Superluminal.Columns,
  associationMapping: Superluminal.AssociationMapping
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

export const serializeOneToManybyAssoc = (
  model: Superluminal.Model,
  association: Superluminal.AssociationRecord
) => {
  const body: string[][] = [];
  if (association) {
    const associatedModelNames = Object.keys(association).sort();

    associatedModelNames.forEach((name) => {
      const columns = association[name];
      const ClassName = PascalCase(name);
      if (columns) {
        columns.forEach((col) => {
          const src = col[0];

          const byMultiple = columns.length > 1;

          const variableName = `${camelCase(pluralize(name))}${
            byMultiple ? `By${PascalCase(src)}` : ''
          }`;
          const srcName = byMultiple ? src : resolveColumnName(model);
          let funcVar = `${name}.${camelCase(srcName)}`;

          if (byMultiple) {
            funcVar += `By${PascalCase(col[1])}`;
          }
          const funcs = `() => ${ClassName}, (${name}) => ${funcVar}`;
          const variable = `${variableName}: ${ClassName}[];`;

          body.push([`  @OneToMany(${funcs})`, `  ${variable}`]);
        });
      }
    });
  }

  return body.map((variables) => variables.join('\n')).join('\n\n');
};

export const serializeOneToMany = (
  associatedModelName: string,
  oneToMany: Superluminal.Association,
  associationMapping: Superluminal.AssociationMapping
) => {
  const association = associationMapping.oneToManys[associatedModelName];
  if (association) {
    const body: string[][] = [];
    const associatedModelNames = Object.keys(association).sort();

    associatedModelNames.forEach((name) => {
      const columns = association[name];
      if (columns) {
        columns.forEach((col) => {
          const src = col[0];
          const ClassName = PascalCase(name);

          const variableName = `${pluralize(name)}By${PascalCase(src)}`;
          const funcs = `() => ${ClassName}, (${name}) => ${name}.${src}`;
          const variable = `${variableName}: ${ClassName}[];`;

          body.push([`  @OneToMany(${funcs})`, `  ${variable}`]);
        });
      }
    });

    return body.map((variables) => variables.join('\n')).join('\n');
  } else {
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
  }
};

export const serializeManyToOne = (
  associatedModelName: string,
  manyToOne: Superluminal.ManyToOne,
  model: Superluminal.Model,
  associationMapping: Superluminal.AssociationMapping
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

  const resolvedColumnName = resolveColumnName(model);

  // prettier-ignore
  return [
    `${body.join('\n')}`, 
    `  ${resolvedColumnName}: ${Name};`,
  ].join('\n');
};

export default (
  model: Superluminal.Model,
  models: Superluminal.Models,
  associationMapping: Superluminal.AssociationMapping
) => {
  const result = [];

  if (model.oneToOnes) {
    for (const [associatedName, oneToOne] of Object.entries(model.oneToOnes)) {
      const target = models[associatedName];
      result.push(
        serializeOneToOne(
          associatedName,
          oneToOne,
          target.columns,
          associationMapping
        )
      );
    }
  }

  const oneToManys = associationMapping.oneToManys[model.name];
  if (oneToManys) {
    result.push(serializeOneToManybyAssoc(model, oneToManys));
  }

  const manyToOnes = associationMapping.manyToOnes[model.name];
  if (manyToOnes) {
    result.push(serializeManyToOnebyAssoc(model, manyToOnes, models));
  }

  return result.join('\n\n');
};

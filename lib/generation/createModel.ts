import { Table } from '@wmfs';
import { findIndexes, RawIndex } from '../introspection/indexesIntrospection';
import resolveType from './resolveType';

const createModel = (
  modelName: string,
  schema: string,
  table: Table,
  models: Superluminal.Models,
  allIndexes: RawIndex[]
) => {
  const model: Superluminal.Model = {
    name: modelName,
    schema,
    columns: {},
    primaryKeys: table.pkColumnNames,
  };

  const tableIndexes = findIndexes(allIndexes, modelName, schema);
  for (const [indexName, index] of Object.entries(tableIndexes)) {
    const slIndex: Superluminal.Index = {
      unique: index.unique,
      columns: index.columns[0],
    };

    if (model.indexes) {
      model.indexes[indexName] = slIndex;
    } else {
      model.indexes = {
        [indexName]: slIndex,
      };
    }
  }

  let slColumn: Superluminal.Column;
  for (const [columnName, column] of Object.entries(table.columns)) {
    slColumn = {
      name: columnName,
      dataType: column.dataType,
      type: resolveType(column.dataType, column.array),
      nullable: column.isNullable === 'YES',
      autoIncrement:
        table.pkColumnNames.includes(columnName) &&
        resolveType(column.dataType, column.array) === 'number',
      array: column.array,
    };

    if (table.pkColumnNames.includes(columnName)) {
      slColumn.primary = true;
    }

    if (column.columnDefault) {
      slColumn.default = column.columnDefault;
    }

    model.columns[columnName] = slColumn;
  }

  models[modelName] = model;
};

export default createModel;

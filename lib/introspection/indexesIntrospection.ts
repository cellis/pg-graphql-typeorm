import { Indexes } from '@wmfs';
import { Client } from 'pg';
import { multipleSchemasIndexesQuery } from './queries';

export const normalizeTableNameForReserved = (tableName: string) => {
  return tableName.replace(/"/g, '');
};

export const getTableFromFullyQualifiedPath = (
  fullyQualifiedTableName: string
) => {
  return normalizeTableNameForReserved(
    fullyQualifiedTableName.split('.').pop() || ''
  );
};

export interface RawIndex {
  table_name: string;
  schema_name: string;
  is_primary: boolean;
  index_keys: string[];
  is_unique: boolean;
  method: string;
  index_name: string;
}

export async function loadIndexes(client: Client, schema: string) {
  let indexData: RawIndex[] = [];

  const indexesQuery = multipleSchemasIndexesQuery(schema.split(','));
  const { rows } = await client.query<RawIndex>(indexesQuery);

  indexData = rows.map((index) => {
    index.table_name = normalizeTableNameForReserved(index.table_name);
    return index;
  });

  return indexData;
}

export function findIndexes(
  rawIndexes: RawIndex[],
  table: string,
  schema: string
) {
  const indexes: Indexes = {};
  return (
    rawIndexes
      .filter((index) => index.table_name === `${schema}.${table}`)
      // .filter((index) => !index.is_primary)
      .reduce((indexes, index) => {
        indexes[index.index_name] = {
          columns: [index.index_keys],
          unique: index.is_unique,
          method: index.method,
        };
        return indexes;
      }, indexes)
  );
}

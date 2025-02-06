import { IntrospectDB } from '../introspection/introspectDb';
import createModel from './createModel';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs/promises';
import { Table } from '@wmfs';
import resolveType from './resolveType';

function generateTableHash(table: Table): string {
  // Order all properties consistently before hashing
  const orderedData = {
    columns: Object.entries(table.columns).sort(
      ([a], [b]) => a.localeCompare(b))
      .map(([name, col]) => {
        const column = table.columns[name];
        return {
          name,
          type: col.dataType,
          allowNull: col.isNullable === 'YES',
          defaultValue: col.columnDefault,
          primaryKey: table.pkColumnNames.includes(name),
          autoIncrement:
          table.pkColumnNames.includes(name) &&
          resolveType(column.dataType, column.array) === 'number',
        };
      }),
    indexes: Object.entries(table.indexes || {}).sort(
      ([a], [b]) => a.localeCompare(b))
      .map(([name, idx]) => ({
        name,
        unique: idx.unique,
        fields: [...idx.columns].sort(),
      })),
  };

  return crypto.createHash('sha256')
    .update(JSON.stringify(orderedData))
    .digest('hex');
}

export default async function createModels(
  models: Record<string, Superluminal.Model>,
  introspection: IntrospectDB,
  config: Superluminal.Config,
  checkHashes = true,
) {
  const { info, indexes } = introspection;
  const hashes: Record<string, string> = {};

  // Load existing hashes if available
  let existingHashes: Record<string, string> = {};
  const hashesPath = path.join(
    process.cwd(),
    config.output || '',
    'entities.json',
  );

  if(checkHashes) {
    try {
      existingHashes = JSON.parse(await fs.readFile(hashesPath, 'utf-8'));
    } catch (error) {
      // File doesn't exist or is invalid, proceed with empty hashes
    }
  }

  if (info.schemas) {
    for (const [schemaName, schema] of Object.entries(info.schemas)) {
      if (schema.tables) {
        for (const [tableName, table] of Object.entries(schema.tables)) {
          if(checkHashes) {
            const hash = generateTableHash(table);
            hashes[tableName] = hash;

            if(existingHashes[tableName] !== hash) {
              createModel(tableName, schemaName, table, models, indexes);
            }
          } else {
            createModel(tableName, schemaName, table, models, indexes);
          }
        }
      }
    }
  }

  return { models, hashes };
}

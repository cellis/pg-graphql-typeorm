import { IntrospectDB } from '../introspection/introspectDb';
import createModel from './createModel';

export default function createModels(
  models: Record<string, Superluminal.Model>,
  introspection: IntrospectDB
) {
  const { info, indexes } = introspection;

  for (const [schemaName, schema] of Object.entries(info.schemas)) {
    for (const [tableName, table] of Object.entries(schema.tables)) {
      createModel(tableName, schemaName, table, models, indexes);
    }
  }

  return models;
}

import { IntrospectDB } from '../introspection/introspectDb';
import createRelationship from './createRelationship';
export default function createRelationships(
  models: Superluminal.Models,
  introspection: IntrospectDB,
  associationMapping: Superluminal.AssociationMapping,
  config: Superluminal.Config = {}
) {
  const { info } = introspection;

  if (info.schemas) {
    
    for (const schema of Object.values(info.schemas)) {
      if (schema.tables) {
        for (const [tableName, table] of Object.entries(schema.tables)) {
          createRelationship(
            tableName, 
            table, 
            models, 
            associationMapping, 
            config
            );
        }
      }
    }
  }

  return models;
}

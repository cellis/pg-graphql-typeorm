import fs from 'fs';
import { resolve } from 'path';
import loadConfig from './config/loadConfig';
import postgresDriver from './drivers/postgresDriver';
import createModels from './generation/createModels';
import createRelationships from './generation/createRelationships';
import serialize from './generation/serializer/serialize';
import serializeIndexFile from './generation/serializer/serializeIndexFile';
import { PascalCase } from './generation/serializer/utils';
import processYargs from './input/processYargs';
import introspectDb from './introspection/introspectDb';

const { writeFile, mkdir } = fs.promises;

async function generate() {
  try {
    const {
      host,
      port,
      schemas: schemasRaw,
      database,
      graphql,
    } = processYargs();
    let { output } = processYargs();
    const config = await loadConfig();
    output = output || resolve(process.cwd(), 'ftl-models');
    const schemas = schemasRaw?.split(',') || ['public'];
    const client = postgresDriver({
      host,
      port,
      database,
    });

    await client.connect();

    const introspection = await introspectDb(client, schemas);
    const models: Superluminal.Models = {};
    const associationMapping: Superluminal.AssociationMapping = {
      oneToManys: {},
      manyToOnes: {},
    };

    createModels(models, introspection);
    createRelationships(models, introspection, associationMapping);

    for (const [modelName, model] of Object.entries(models)) {
      const serialized = serialize(
        model,
        models,
        { graphql: !!graphql },
        associationMapping
      );

      const fileName = PascalCase(modelName);

      try {
        await mkdir(output, { recursive: true });
      } catch (error) {}
      await writeFile(resolve(`${output}`, `${fileName}.ts`), serialized);
    }

    const indexFile = serializeIndexFile(models);

    await writeFile(resolve(`${output}`, 'index.ts'), indexFile);

    await client.end();
  } catch (error) {
    console.error(error);
  }
}

export default generate;

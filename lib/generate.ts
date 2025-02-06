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

async function generate(checkHashes = true) {
  try {
    const yargsConfig = processYargs();
    const fileConfig = await loadConfig();
    const config = { ...fileConfig, ...yargsConfig };  // Prefer yargs values
    
    const {
      host,
      port,
      schemas: schemasRaw,
      database,
      graphql,
      output = resolve(process.cwd(), 'ftl-models'),
    } = config;

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

    const { hashes } = await createModels(models, introspection, config, checkHashes);
    createRelationships(models, introspection, associationMapping,config);

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
    await writeFile(
      resolve(`${output}`, 'entities.json'),
      JSON.stringify(hashes, null, 2)
    );

    await client.end();
  } catch (error) {
    console.error(error);
  }
}

export default generate;

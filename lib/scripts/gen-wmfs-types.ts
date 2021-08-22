import PgInfo from '@wmfs/pg-info';
import { writeFile } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import { nfcall } from 'q';
import {
  InputData,
  jsonInputForTargetLanguage,
  quicktype,
} from 'quicktype-core';

async function quicktypeJSON(
  targetLanguage: string,
  typeName: string,
  jsonString: string
) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.
  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
    inputData,
    lang: targetLanguage,
  });
}

async function run() {
  const client = new pg.Client(
    'postgres://postgres:postgres@localhost:5432/mojibuzz'
  );
  await client.connect();

  const info = await PgInfo({
    client,
    schemas: ['mojibuzz', 'mojibuzz_private'],
  });

  const { lines: WMFSTypes } = await quicktypeJSON(
    'TypeScript',
    'Introspection',
    JSON.stringify(info)
  );

  await nfcall(
    writeFile,
    resolve(__dirname, '../dist/Introspection.ts'),
    WMFSTypes.join('\n'),
    'utf-8'
  );

  await client.end();
}

run();

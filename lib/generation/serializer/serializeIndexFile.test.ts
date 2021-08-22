import { Client } from 'pg';
import introspectDb from '../../introspection/introspectDb';
import connectTestDb from '../../test/connectTestDb';
import createModels from '../createModels';
import createRelationships from '../createRelationships';
import serializeIndexFile from './serializeIndexFile';

describe('serializeIndexFile', () => {
  let client: Client;
  let models: Superluminal.Models;
  beforeAll(async (done) => {
    client = await connectTestDb();
    const introspection = await introspectDb(client, [
      'superluminal',
      'superluminal_private',
    ]);
    models = {};
    createModels(models, introspection);
    createRelationships(models, introspection);

    done();
  });

  afterAll(() => {
    return client.end();
  });
  it('creates a file that exports all of the files', () => {
    expect(serializeIndexFile(models)).toMatchInlineSnapshot(`
      "export { Account } from './Account';
      export { PaymentDetails } from './PaymentDetails';
      export { Photo } from './Photo';
      export { Product } from './Product';
      export { Transaction } from './Transaction';
      export { User } from './User';"
    `);
  });
});

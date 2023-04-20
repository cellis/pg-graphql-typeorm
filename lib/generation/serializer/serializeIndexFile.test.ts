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
    createRelationships(models, introspection, {
      manyToOnes: {},
      oneToManys: {},
    });

    done();
  });

  afterAll(() => {
    return client.end();
  });
  it('creates a file that exports all of the files', () => {
    expect(serializeIndexFile(models)).toMatchInlineSnapshot(`
      "export { Account } from './Account';
      export { Document } from './Document';
      export { Message } from './Message';
      export { PaymentDetails } from './PaymentDetails';
      export { Photo } from './Photo';
      export { Product } from './Product';
      export { Shipment } from './Shipment';
      export { Transaction } from './Transaction';
      export { User } from './User';"
    `);
  });
});

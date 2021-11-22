import { Client } from 'pg';
import introspectDb from '../../introspection/introspectDb';
import connectTestDb from '../../test/connectTestDb';
import createModels from '../createModels';
import createRelationships from '../createRelationships';
import serializeIndexes from './serializeIndexes';

describe('serializeIndexes', () => {
  let client: Client;
  let User: Superluminal.Model;
  beforeAll(async (done) => {
    client = await connectTestDb();
    const introspection = await introspectDb(client, ['superluminal']);
    const models: Superluminal.Models = {};
    createModels(models, introspection);
    createRelationships(models, introspection, {
      manyToOnes: {},
      oneToManys: {},
    });

    User = models.user;
    done();
  });

  afterAll(() => {
    return client.end();
  });

  it('serializes the indexes properly', () => {
    expect(serializeIndexes(User)).toMatchInlineSnapshot(`
      "@Index('user_full_text_idx', ['fullText'], {})
      @Index('user_pkey', ['slug'], { unique: true })"
    `);
  });
});

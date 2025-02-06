import { Client } from 'pg';
import introspectDb from '../introspection/introspectDb';
import connectTestDb from '../test/connectTestDb';
import createModels from './createModels';
import createRelationships from './createRelationships';
import resolveTypeGraphqlType from './resolveTypeGraphqlType';

describe('resolveTypeGraphqlType', () => {
  let client: Client;
  let User: Superluminal.Model;
  beforeAll(async (done) => {
    client = await connectTestDb();
    const introspection = await introspectDb(client, ['superluminal']);
    const models: Superluminal.Models = {};
    await createModels(models, introspection, { output: '.tmp' }, false);
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
  it('handles primary keys', () => {
    expect(resolveTypeGraphqlType(User.columns.slug)).toBe('ID');
  });
});

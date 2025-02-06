import { Client } from 'pg';
import introspectDb from '../../introspection/introspectDb';
import connectTestDb from '../../test/connectTestDb';
import createModels from '../createModels';
import createRelationships from '../createRelationships';
import serializeBody from './serializeBody';
import { PascalCase } from './utils';
/* eslint-disable @typescript-eslint/no-non-null-assertion */

describe('serializeBody', () => {
  let client: Client;
  let User: Superluminal.Model;
  beforeAll(async (done) => {
    client = await connectTestDb();
    const introspection = await introspectDb(client, ['superluminal']);

    const { models } = await createModels({}, 
      introspection, { output: '.tmp' }, false);
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

  it('serializes the body properly', () => {
    // serialize(User)
    const PascalName = PascalCase(User.name);
    expect(serializeBody(User.name, '', User.schema, PascalName, '', ''))
      .toMatchInlineSnapshot(`
      "@Entity('user', { schema: 'superluminal' })
      export class User extends BaseEntity {
      }"
    `);
  });
});

import { Client } from 'pg';
import introspectDb from '../../introspection/introspectDb';
import connectTestDb from '../../test/connectTestDb';
import createModels from '../createModels';
import createRelationships from '../createRelationships';

describe('handleForeignNonPrimaryKey', () => {
  let client: Client;
  let User: Superluminal.Model;
  let Photo: Superluminal.Model;
  let Transaction: Superluminal.Model;
  let Shipment: Superluminal.Model;
  let PaymentDetails: Superluminal.Model;
  let Account: Superluminal.Model;
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

    Shipment = models.shipment;

    User = models.user;
    done();
  });

  afterAll(() => {
    return client.end();
  });
  describe('when the foreign key is not the same name', () => {
    it('resolves the column properly', () => {
      expect(User.oneToManys!.shipment).toMatchInlineSnapshot(`
        Object {
          "inverse": "user",
        }
      `);
    });
  });
});

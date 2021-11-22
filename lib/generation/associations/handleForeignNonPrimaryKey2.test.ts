import { Client } from 'pg';
import introspectDb from '../../introspection/introspectDb';
import connectTestDb from '../../test/connectTestDb';
import createModels from '../createModels';
import createRelationships from '../createRelationships';
import handleForeignNonPrimaryKey2 from './handleForeignNonPrimaryKey2';

describe('handleForeignNonPrimaryKey', () => {
  let client: Client;
  let User: Superluminal.Model;
  let Photo: Superluminal.Model;
  let Transaction: Superluminal.Model;
  let Shipment: Superluminal.Model;
  let PaymentDetails: Superluminal.Model;
  let Account: Superluminal.Model;
  let models: Superluminal.Models;
  let associationMapping: Superluminal.AssociationMapping;
  beforeAll(async (done) => {
    client = await connectTestDb();
    associationMapping = { oneToManys: {}, manyToOnes: {} };
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
      handleForeignNonPrimaryKey2(
        Shipment,
        {
          targetColumns: ['slug'],
          sourceColumns: ['from'],
          targetTable: 'user',
          matchType: '',
          updateAction: 'CASCADE',
          deleteAction: 'CASCADE',
        },
        User,
        associationMapping
      );

      handleForeignNonPrimaryKey2(
        Shipment,
        {
          targetColumns: ['slug'],
          sourceColumns: ['to'],
          targetTable: 'user',
          matchType: '',
          updateAction: 'CASCADE',
          deleteAction: 'CASCADE',
        },
        User,
        associationMapping
      );
      expect(associationMapping).toEqual<Superluminal.AssociationMapping>({
        manyToOnes: {
          shipment: {
            user: [
              { pair: ['from', 'slug'], onDelete: 'CASCADE' },
              { pair: ['to', 'slug'], onDelete: 'CASCADE' },
            ],
          },
        },
        oneToManys: {
          user: {
            shipment: [
              ['from', 'slug'],
              ['to', 'slug'],
            ],
          },
        },
      });
    });
  });
});

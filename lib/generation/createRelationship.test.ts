import { Client } from 'pg';
import introspectDb from '../introspection/introspectDb';
import connectTestDb from '../test/connectTestDb';
import createModels from './createModels';
import createRelationships from './createRelationships';

describe('createRelationship', () => {
  let client: Client;
  let User: Superluminal.Model;
  let Photo: Superluminal.Model;
  let Transaction: Superluminal.Model;
  beforeAll(async (done) => {
    client = await connectTestDb();
    const introspection = await introspectDb(client, ['superluminal']);
    const models: Superluminal.Models = {};
    createModels(models, introspection);
    createRelationships(models, introspection);
    User = models.user;
    Photo = models.photo;
    Transaction = models.transaction;

    done();
  });

  afterAll(() => {
    return client.end();
  });

  describe('when 2 models share the same primary key', () => {
    it('adds a OneToOne column to both models', () => {
      const userExpectedOneToOnes: Superluminal.OneToOnes = {
        account: {
          inverse: 'user_slug2',
          referencedColumn: 'user_slug',
        },
      };
      expect(User.oneToOnes).toEqual(userExpectedOneToOnes);
    });
  });

  const HasForeignNonPrimaryKey =
    'model has a foreign non primary key in a target table';

  describe('model has a foreign non primary key in a target table', () => {
    describe('target table deleted', () => {
      const oneToManyOfUser = (source: string) => {
        const result: Superluminal.ManyToOnes = {
          user: {
            inverse: source,
            onDelete: 'NO ACTION',
            joinColumns: [
              {
                name: 'user_id',
                referencedColumnName: 'slug',
                fieldName: 'user',
              },
            ],
          },
        };

        return result;
      };

      it('ignores the foreign key in the deleted target table', async () => {
        expect(User.oneToManys?.photo).toEqual<Superluminal.Association>({
          inverse: 'user',
        });
      });
    });
  });

  describe(HasForeignNonPrimaryKey, () => {
    const oneToManyOfUser = (source: string) => {
      const result: Superluminal.ManyToOnes = {
        user: {
          inverse: source,
          onDelete: 'NO ACTION',
          joinColumns: [
            {
              name: 'user_id',
              referencedColumnName: 'slug',
              fieldName: 'user',
            },
          ],
        },
      };

      return result;
    };

    it('adds a OneToMany in the target table', async () => {
      expect(User.oneToManys?.photo).toEqual<Superluminal.Association>({
        inverse: 'user',
      });
    });

    it('adds a ManyToOne in the source table', () => {
      expect(Photo.manyToOnes).toEqual(oneToManyOfUser('photo'));
    });

    it('handles multiple oneToManys', () => {
      // eslint-disable-next-line
      expect(Object.keys(User.oneToManys!).sort()).toEqual(
        ['photo', 'transaction'].sort()
      );
    });
  });

  describe('when 2 models have a junction table', () => {
    // it('creates a ManyToMany column for both models', () => {
    // });
  });
});

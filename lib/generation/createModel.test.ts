// need a column serializer that takes column

import { Client } from 'pg';
import introspectDb from '../introspection/introspectDb';
import connectTestDb from '../test/connectTestDb';
import {
  userFullTextIdxName,
  userPrimaryKeyName,
} from '../test/fixtures/MockData';
import createModels from './createModels';

describe('createModel', () => {
  let client: Client;
  let indexes: Record<string, Superluminal.Index>;
  let User: Superluminal.Model;
  let Product: Superluminal.Model;

  beforeAll(async (done) => {
    client = await connectTestDb();

    const introspection = await introspectDb(client, ['superluminal']);
    const models = createModels({}, introspection);

    User = models.user;
    Product = models.product;
    indexes = User.indexes || {};

    done();
  });

  afterAll(() => {
    return client.end();
  });

  describe('table schema', () => {
    it('sets the schema on the model', () => {
      expect(User.schema).toBe('superluminal');
    });
  });

  describe('when a table has indexes', () => {
    it('generates a model with indexes', () => {
      expect(indexes).toMatchSnapshot();
      expect(indexes[userFullTextIdxName]).toEqual<Superluminal.Index>({
        columns: ['full_text'],
        unique: false,
      });
    });

    describe('a unique index', () => {
      it('generates a model with a unique index', () => {
        expect(indexes[userPrimaryKeyName]).toEqual<Superluminal.Index>({
          columns: ['slug'],
          unique: true,
        });
      });
    });
  });

  describe('when a table has columns', () => {
    it('handles default columns', () => {
      expect(User.columns['created_at'].default).toBe('now()');
    });

    it('generates a model with columns', () => {
      expect(User.columns['first_name']).toEqual<Superluminal.Column>({
        name: 'first_name',
        dataType: 'character varying',
        array: false,
        type: 'string',
        nullable: true,
        autoIncrement: false,
      });
    });

    it('handles autoincrementing column types, ok-ish', () => {
      expect(Product.columns['id']).toMatchObject<Partial<Superluminal.Column>>(
        {
          autoIncrement: true,
        }
      );
    });

    it('handles column primitive types properly', () => {
      expect(User.columns['credits'].type).toBe('number');
    });

    it('handles column array types properly', () => {
      expect(User.columns['hobbies'].type).toBe('string[]');
    });
  });
});

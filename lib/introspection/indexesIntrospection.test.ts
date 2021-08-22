import { Index, Indexes } from '@wmfs';
import { Client } from 'pg';
import connectTestDb from '../test/connectTestDb';
import { UserIndexes } from '../test/fixtures/MockData';
import {
  findIndexes,
  getTableFromFullyQualifiedPath,
  loadIndexes,
  normalizeTableNameForReserved,
  RawIndex,
} from './indexesIntrospection';

describe('indexes introspection', () => {
  let client: Client;
  let indexes: RawIndex[];
  beforeAll(async (done) => {
    client = await connectTestDb();
    indexes = await loadIndexes(client, 'superluminal');
    done();
  });

  afterAll(async () => client.end());

  describe('multiple schemas', () => {
    beforeEach(async (done) => {
      indexes = await loadIndexes(client, 'superluminal,superluminal_private');
      done();
    });
    it('finds indexes of all', () => {
      expect(indexes.length).toBeGreaterThan(0);
    });
  });
  describe('all indexes', () => {
    it('loads all indexes', () => {
      expect(indexes).toMatchSnapshot();
    });
  });

  describe('normalizeForPostgres', () => {
    it('returns \'user\' for "user"', () => {
      expect(normalizeTableNameForReserved('"user"')).toBe('user');
    });
  });

  describe('getTableFromFullyQualifiedPath', () => {
    it('returns \'user\' for superluminal."user"', () => {
      expect(getTableFromFullyQualifiedPath('superluminal."user"')).toBe(
        'user'
      );
    });
  });

  describe('find index', () => {
    it('finds the indexes for that model', () => {
      const foundIndexes: Indexes = findIndexes(
        indexes,
        'user',
        'superluminal'
      );

      const expected: Index = {
        columns: [['slug']],
        unique: true,
        method: 'btree',
      };
      expect(foundIndexes['user_pkey']).toEqual(expected);
    });
  });

  describe('user index', () => {
    it('normalizes the user index', async () => {
      expect(
        indexes.filter((index: any) => index.table_name === 'superluminal.user')
      ).toHaveLength(UserIndexes.length);
    });
  });
});

import { Client } from 'pg';
import introspectDb from '../../introspection/introspectDb';
import connectTestDb from '../../test/connectTestDb';
import createModels from '../createModels';
import createRelationships from '../createRelationships';
import handleImports from './handleImports';
/* eslint-disable @typescript-eslint/no-non-null-assertion */

describe('handleImports', () => {
  let client: Client;
  let User: Superluminal.Model;
  let Photo: Superluminal.Model;
  let Message: Superluminal.Model;
  let Product: Superluminal.Model;
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
    Photo = models.photo;
    Product = models.product;
    Message = models.message;
    done();
  });

  afterAll(() => {
    return client.end();
  });

  describe('top level imports', () => {
    // should add top level imports first
    it('does not add self-referential imports', () => {
      const imp0rts = handleImports(Message, true);

      const selfImports = Object.keys(imp0rts)
        .filter((key) => {
          return !imp0rts[key].isModule;
        })
        .sort();

      expect(selfImports).not.toContain('message');
    });

    it('adds top level imports at the top of the import', () => {
      const imp0rts = handleImports(User, true);

      const topLevelImports = Object.keys(imp0rts)
        .filter((key) => {
          return imp0rts[key].isModule;
        })
        .sort();
      const expected = ['type-graphql', 'typeorm'];

      expect(topLevelImports).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('association imports', () => {
    it('adds all OneToMany imports', () => {
      const imp0rts = handleImports(User);

      expect(Object.keys(imp0rts)).toEqual(
        expect.arrayContaining(['transaction', 'photo'])
      );

      expect(imp0rts.photo).toEqual({
        isModule: false,
        partial: ['Photo'],
      });
    });

    it('adds all OneToOne imports', () => {
      const imp0rts = handleImports(User);

      expect(imp0rts.account).toEqual({
        isModule: false,
        partial: ['Account'],
      });
    });

    it('adds JoinColumn to ManyToOne imports', () => {
      const imp0rts = handleImports(Photo);

      expect(imp0rts.typeorm.partial).toEqual(
        expect.arrayContaining(['JoinColumn'])
      );
    });
  });

  describe('model has Indexes', () => {
    it('includes "Index" in type-graphql imports', () => {
      const imp0rts = handleImports(Photo, true);

      expect(imp0rts.typeorm.partial).toEqual(
        expect.arrayContaining(['Index'])
      );
    });
  });

  describe('model has auto-incrementing primary keys', () => {
    it('includes "ID" in type-graphql imports', () => {
      const imp0rts = handleImports(Product, true);

      expect(imp0rts['type-graphql'].partial).toEqual(
        expect.arrayContaining(['ID'])
      );
    });
  });

  describe('model has manyToOnes', () => {
    it('includes "ManyToOne" in typeorm imports', () => {
      const imp0rts = handleImports(Photo);

      expect(imp0rts.typeorm.partial).toEqual(
        expect.arrayContaining(['ManyToOne'])
      );
    });
  });

  describe('model has oneToManys', () => {
    it('includes "OneToMany" in typeorm imports', () => {
      const imp0rts = handleImports(User);

      expect(imp0rts.typeorm.partial).toEqual(
        expect.arrayContaining(['OneToMany'])
      );
    });
  });

  describe('model has oneToOnes', () => {
    it('includes "OneToOne" in typeorm imports', () => {
      const imp0rts = handleImports(User);

      expect(imp0rts.typeorm.partial).toEqual(
        expect.arrayContaining(['OneToOne'])
      );
    });
  });
});

import { cloneDeep } from 'lodash';
import { Client } from 'pg';
import introspectDb from '../../introspection/introspectDb';
import connectTestDb from '../../test/connectTestDb';
import createModels from '../createModels';
import createRelationships from '../createRelationships';
import serializeAssociations, {
  serializeManyToOne,
  serializeOneToMany,
  serializeOneToOne,
} from './serializeAssociations';
/* eslint-disable @typescript-eslint/no-non-null-assertion */

describe('serializeAssociations', () => {
  let client: Client;
  let User: Superluminal.Model;
  let Account: Superluminal.Model;
  let Photo: Superluminal.Model;
  let models: Superluminal.Models;
  beforeAll(async (done) => {
    client = await connectTestDb();
    const introspection = await introspectDb(client, ['superluminal']);
    models = {};
    createModels(models, introspection);
    createRelationships(models, introspection);

    User = models.user;
    Account = models.account;
    Photo = models.photo;
    done();
  });

  afterAll(() => {
    return client.end();
  });

  describe('OneToOne', () => {
    it('serializes OneToOnes', () => {
      expect(
        serializeOneToOne('account', User.oneToOnes!.account, Account.columns)
      ).toMatchInlineSnapshot(`
        "  @OneToOne(() => Account, (account) => account.userSlug)
          account: Account;"
      `);
    });
  });

  describe('ManyToOne', () => {
    describe('when model already has a column with the same name', () => {
      it('increments the column name', () => {
        const ClonePhoto = cloneDeep(Photo);

        ClonePhoto.columns.user = {
          type: 'text',
          dataType: 'text',
          name: 'user',
          nullable: false,
        };

        ClonePhoto.columns.user2 = {
          type: 'text',
          dataType: 'text',
          name: 'user',
          nullable: false,
        };

        const serialized = serializeManyToOne(
          'user',
          ClonePhoto.manyToOnes!.user,
          ClonePhoto
        );

        expect(serialized).toMatchInlineSnapshot(`
        "  @ManyToOne(
            () => User,
            user => user.photos,
            { onDelete: 'NO ACTION' }
          )
          @JoinColumn([{ name: 'user_id', referencedColumnName: 'slug' }])
          user3: User;"
      `);
      });
    });
    it('serializes ManyToOnes', () => {
      expect(serializeManyToOne('user', Photo.manyToOnes!.user, Photo))
        .toMatchInlineSnapshot(`
        "  @ManyToOne(
            () => User,
            user => user.photos,
            { onDelete: 'NO ACTION' }
          )
          @JoinColumn([{ name: 'user_id', referencedColumnName: 'slug' }])
          user: User;"
      `);
    });
  });

  describe('OneToMany', () => {
    it('serializes OneToManys', () => {
      expect(serializeOneToMany('photo', User.oneToManys!.photo))
        .toMatchInlineSnapshot(`
        "  @OneToMany(() => Photo, (photo) => photo.user)
          photos: Photo[];"
      `);
    });
  });

  describe('serializeAssociations', () => {
    it('serializes all associations', () => {
      expect(serializeAssociations(User, models)).toMatchInlineSnapshot(`
        "  @OneToOne(() => Account, (account) => account.userSlug)
          account: Account;

          @OneToMany(() => Transaction, (transaction) => transaction.user)
          transactions: Transaction[];

          @OneToMany(() => Photo, (photo) => photo.user)
          photos: Photo[];"
      `);
    });
  });
});

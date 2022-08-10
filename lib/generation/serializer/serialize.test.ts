/* eslint-disable max-len */

import { Client } from 'pg';
import introspectDb from '../../introspection/introspectDb';
import connectTestDb from '../../test/connectTestDb';
import createModels from '../createModels';
import createRelationships from '../createRelationships';
import serialize from './serialize';

describe('serialize', () => {
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
    const introspection = await introspectDb(client, [
      'superluminal',
      'superluminal_private',
    ]);
    models = {};
    associationMapping = {
      manyToOnes: {},
      oneToManys: {},
    };
    createModels(models, introspection);
    createRelationships(models, introspection, associationMapping);

    PaymentDetails = models.payment_details;
    Account = models.account;
    Shipment = models.shipment;
    Transaction = models.transaction;
    Photo = models.photo;
    User = models.user;
    done();
  });

  afterAll(() => {
    return client.end();
  });

  describe('output', () => {
    describe('graphql false', () => {
      it('serializes properly', () => {
        // // eslint-disable-next-line
        expect(serialize(User, models, { graphql: false }, associationMapping))
          .toMatchInlineSnapshot(`
          "import { BaseEntity, Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
          import { Account } from './Account';
          import { Photo } from './Photo';
          import { Shipment } from './Shipment';
          import { Transaction } from './Transaction';

          @Index('user_full_text_idx', ['fullText'], {})
          @Index('user_pkey', ['slug'], { unique: true })
          @Entity('user', { schema: 'superluminal' })
          export class User extends BaseEntity {
            @Column('boolean', {
              name: 'connected', nullable: true,
            })
            connected: boolean | null;

            @Column('timestamp with time zone', {
              name: 'created_at', nullable: true, default: () => 'now()',
            })
            createdAt: Date | null;

            @Column('integer', {
              name: 'credits', nullable: true, default: () => 0,
            })
            credits: number | null;

            @Column('character varying', {
              name: 'first_name', nullable: true,
            })
            firstName: string | null;

            @Column('character varying', {
              name: 'full_text', nullable: true,
            })
            fullText: string | null;

            @Column('text', {
              name: 'hobbies', nullable: true,
            })
            hobbies: string[] | null;

            @Column('character varying', {
              name: 'last_name', nullable: true,
            })
            lastName: string | null;

            @Column('numeric', {
              name: 'rating', nullable: true, default: () => '0.88',
            })
            rating: string | null;

            @Column('uuid', {
              name: 'slug', primary: true,
            })
            slug: string;

            @Column('timestamp with time zone', {
              name: 'updated_at', nullable: true,
            })
            updatedAt: Date | null;

            @OneToOne(() => Account, (account) => account.userSlug)
            account: Account;

            @OneToMany(() => Photo, (photo) => photo.user)
            photos: Photo[];

            @OneToMany(() => Shipment, (shipment) => shipment.fromBySlug)
            shipmentsByFrom: Shipment[];

            @OneToMany(() => Shipment, (shipment) => shipment.toBySlug)
            shipmentsByTo: Shipment[];

            @OneToMany(() => Transaction, (transaction) => transaction.user)
            transactions: Transaction[];
          }"
        `);

        expect(
          serialize(Transaction, models, { graphql: false }, associationMapping)
        ).toMatchInlineSnapshot(`
          "import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
          import { User } from './User';

          @Index('transaction_pkey', ['slug'], { unique: true })
          @Index('transaction_user_id_idx', ['userId'], {})
          @Entity('transaction', { schema: 'superluminal' })
          export class Transaction extends BaseEntity {
            @Column('timestamp with time zone', {
              name: 'createdAt',
            })
            createdAt: Date;

            @Column('uuid', {
              name: 'slug', primary: true,
            })
            slug: string;

            @Column('character varying', {
              name: 'transactionId', nullable: true,
            })
            transactionId: string | null;

            @Column('timestamp with time zone', {
              name: 'updatedAt',
            })
            updatedAt: Date;

            @Column('uuid', {
              name: 'user_id',
            })
            userId: string;

            @ManyToOne(
              () => User,
              user => user.transactions,
              { onDelete: 'NO ACTION' }
            )
            @JoinColumn([{ name: 'user_id', referencedColumnName: 'slug' }])
            user: User;
          }"
        `);

        expect(
          serialize(
            PaymentDetails,
            models,
            { graphql: false },
            associationMapping
          )
        ).toMatchInlineSnapshot(`
          "import { BaseEntity, Column, Entity, Index } from 'typeorm';

          @Index('payment_details_pkey', ['slug'], { unique: true })
          @Entity('payment_details', { schema: 'superluminal_private' })
          export class PaymentDetails extends BaseEntity {
            @Column('timestamp with time zone', {
              name: 'createdAt',
            })
            createdAt: Date;

            @Column('uuid', {
              name: 'slug', primary: true,
            })
            slug: string;

            @Column('timestamp with time zone', {
              name: 'updatedAt',
            })
            updatedAt: Date;

            @Column('character varying', {
              name: 'url', nullable: true,
            })
            url: string | null;
          }"
        `);

        expect(
          serialize(Account, models, { graphql: false }, associationMapping)
        ).toMatchInlineSnapshot(`
          "import { BaseEntity, Column, Entity, Index, OneToOne } from 'typeorm';
          import { User } from './User';

          @Index('account_pkey', ['userSlug'], { unique: true })
          @Entity('account', { schema: 'superluminal' })
          export class Account extends BaseEntity {
            @Column('timestamp with time zone', {
              name: 'createdAt',
            })
            createdAt: Date;

            @Column('character varying', {
              name: 'email', nullable: true,
            })
            email: string | null;

            @Column('character varying', {
              name: 'phone', nullable: true,
            })
            phone: string | null;

            @Column('timestamp with time zone', {
              name: 'updatedAt',
            })
            updatedAt: Date;

            @Column('uuid', {
              name: 'user_slug', primary: true,
            })
            userSlug: string;

            @OneToOne(() => User, (user) => user.slug)
            user: User;
          }"
        `);

        expect(serialize(Photo, models, { graphql: false }, associationMapping))
          .toMatchInlineSnapshot(`
          "import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
          import { User } from './User';

          @Index('photo_pkey', ['slug'], { unique: true })
          @Index('photo_user_id_idx', ['userId'], {})
          @Entity('photo', { schema: 'superluminal' })
          export class Photo extends BaseEntity {
            @Column('timestamp with time zone', {
              name: 'createdAt',
            })
            createdAt: Date;

            @Column('uuid', {
              name: 'slug', primary: true,
            })
            slug: string;

            @Column('timestamp with time zone', {
              name: 'updatedAt',
            })
            updatedAt: Date;

            @Column('character varying', {
              name: 'url', nullable: true,
            })
            url: string | null;

            @Column('uuid', {
              name: 'user_id',
            })
            userId: string;

            @ManyToOne(
              () => User,
              user => user.photos,
              { onDelete: 'NO ACTION' }
            )
            @JoinColumn([{ name: 'user_id', referencedColumnName: 'slug' }])
            user: User;
          }"
        `);
      });
    });

    describe('graphql true', () => {
      it('serializes properly', () => {
        // // eslint-disable-next-line
        expect(serialize(User, models, { graphql: true }, associationMapping))
          .toMatchInlineSnapshot(`
          "import { Field, ID, ObjectType } from 'type-graphql';
          import { BaseEntity, Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
          import { Account } from './Account';
          import { Photo } from './Photo';
          import { Shipment } from './Shipment';
          import { Transaction } from './Transaction';

          @Index('user_full_text_idx', ['fullText'], {})
          @Index('user_pkey', ['slug'], { unique: true })
          @Entity('user', { schema: 'superluminal' })
          @ObjectType()
          export class User extends BaseEntity {
            @Field(() => Boolean,{ nullable: true })
            @Column('boolean', {
              name: 'connected', nullable: true,
            })
            connected: boolean | null;

            @Field(() => Date,{ nullable: true })
            @Column('timestamp with time zone', {
              name: 'created_at', nullable: true, default: () => 'now()',
            })
            createdAt: Date | null;

            @Field(() => Number,{ nullable: true })
            @Column('integer', {
              name: 'credits', nullable: true, default: () => 0,
            })
            credits: number | null;

            @Field(() => String,{ nullable: true })
            @Column('character varying', {
              name: 'first_name', nullable: true,
            })
            firstName: string | null;

            @Field(() => String,{ nullable: true })
            @Column('character varying', {
              name: 'full_text', nullable: true,
            })
            fullText: string | null;

            @Field(() => [String],{ nullable: true })
            @Column('text', {
              name: 'hobbies', nullable: true,
            })
            hobbies: string[] | null;

            @Field(() => String,{ nullable: true })
            @Column('character varying', {
              name: 'last_name', nullable: true,
            })
            lastName: string | null;

            @Field(() => String,{ nullable: true })
            @Column('numeric', {
              name: 'rating', nullable: true, default: () => '0.88',
            })
            rating: string | null;

            @Field(() => ID)
            @Column('uuid', {
              name: 'slug', primary: true,
            })
            slug: string;

            @Field(() => Date,{ nullable: true })
            @Column('timestamp with time zone', {
              name: 'updated_at', nullable: true,
            })
            updatedAt: Date | null;

            @OneToOne(() => Account, (account) => account.userSlug)
            account: Account;

            @OneToMany(() => Photo, (photo) => photo.user)
            photos: Photo[];

            @OneToMany(() => Shipment, (shipment) => shipment.fromBySlug)
            shipmentsByFrom: Shipment[];

            @OneToMany(() => Shipment, (shipment) => shipment.toBySlug)
            shipmentsByTo: Shipment[];

            @OneToMany(() => Transaction, (transaction) => transaction.user)
            transactions: Transaction[];
          }"
        `);

        expect(
          serialize(Shipment, models, { graphql: true }, associationMapping)
        ).toMatchInlineSnapshot(`
          "import { Field, ID, ObjectType } from 'type-graphql';
          import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
          import { User } from './User';

          @Index('shipment_from_user_slug_fk', ['from'], {})
          @Index('shipment_pkey', ['slug'], { unique: true })
          @Index('shipment_to_user_slug_fk', ['to'], {})
          @Entity('shipment', { schema: 'superluminal' })
          @ObjectType()
          export class Shipment extends BaseEntity {
            @Field(() => Date)
            @Column('timestamp with time zone', {
              name: 'createdAt',
            })
            createdAt: Date;

            @Field(() => String)
            @Column('uuid', {
              name: 'from',
            })
            from: string;

            @Field(() => ID)
            @Column('uuid', {
              name: 'slug', primary: true,
            })
            slug: string;

            @Field(() => String)
            @Column('uuid', {
              name: 'to',
            })
            to: string;

            @Field(() => Date)
            @Column('timestamp with time zone', {
              name: 'updatedAt',
            })
            updatedAt: Date;

            @ManyToOne(
              () => User,
              user => user.shipmentsByFrom,
              { onDelete: 'NO ACTION' }
            )
            @JoinColumn([{ name: 'from', referencedColumnName: 'slug' }])
            fromBySlug: User;

            @ManyToOne(
              () => User,
              user => user.shipmentsByTo,
              { onDelete: 'NO ACTION' }
            )
            @JoinColumn([{ name: 'to', referencedColumnName: 'slug' }])
            toBySlug: User;
          }"
        `);

        expect(
          serialize(Transaction, models, { graphql: true }, associationMapping)
        ).toMatchInlineSnapshot(`
          "import { Field, ID, ObjectType } from 'type-graphql';
          import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
          import { User } from './User';

          @Index('transaction_pkey', ['slug'], { unique: true })
          @Index('transaction_user_id_idx', ['userId'], {})
          @Entity('transaction', { schema: 'superluminal' })
          @ObjectType()
          export class Transaction extends BaseEntity {
            @Field(() => Date)
            @Column('timestamp with time zone', {
              name: 'createdAt',
            })
            createdAt: Date;

            @Field(() => ID)
            @Column('uuid', {
              name: 'slug', primary: true,
            })
            slug: string;

            @Field(() => String,{ nullable: true })
            @Column('character varying', {
              name: 'transactionId', nullable: true,
            })
            transactionId: string | null;

            @Field(() => Date)
            @Column('timestamp with time zone', {
              name: 'updatedAt',
            })
            updatedAt: Date;

            @Field(() => String)
            @Column('uuid', {
              name: 'user_id',
            })
            userId: string;

            @ManyToOne(
              () => User,
              user => user.transactions,
              { onDelete: 'NO ACTION' }
            )
            @JoinColumn([{ name: 'user_id', referencedColumnName: 'slug' }])
            user: User;
          }"
        `);

        expect(
          serialize(
            PaymentDetails,
            models,
            { graphql: true },
            associationMapping
          )
        ).toMatchInlineSnapshot(`
          "import { Field, ID, ObjectType } from 'type-graphql';
          import { BaseEntity, Column, Entity, Index } from 'typeorm';

          @Index('payment_details_pkey', ['slug'], { unique: true })
          @Entity('payment_details', { schema: 'superluminal_private' })
          @ObjectType()
          export class PaymentDetails extends BaseEntity {
            @Field(() => Date)
            @Column('timestamp with time zone', {
              name: 'createdAt',
            })
            createdAt: Date;

            @Field(() => ID)
            @Column('uuid', {
              name: 'slug', primary: true,
            })
            slug: string;

            @Field(() => Date)
            @Column('timestamp with time zone', {
              name: 'updatedAt',
            })
            updatedAt: Date;

            @Field(() => String,{ nullable: true })
            @Column('character varying', {
              name: 'url', nullable: true,
            })
            url: string | null;
          }"
        `);

        expect(
          serialize(Account, models, { graphql: true }, associationMapping)
        ).toMatchInlineSnapshot(`
          "import { Field, ID, ObjectType } from 'type-graphql';
          import { BaseEntity, Column, Entity, Index, OneToOne } from 'typeorm';
          import { User } from './User';

          @Index('account_pkey', ['userSlug'], { unique: true })
          @Entity('account', { schema: 'superluminal' })
          @ObjectType()
          export class Account extends BaseEntity {
            @Field(() => Date)
            @Column('timestamp with time zone', {
              name: 'createdAt',
            })
            createdAt: Date;

            @Field(() => String,{ nullable: true })
            @Column('character varying', {
              name: 'email', nullable: true,
            })
            email: string | null;

            @Field(() => String,{ nullable: true })
            @Column('character varying', {
              name: 'phone', nullable: true,
            })
            phone: string | null;

            @Field(() => Date)
            @Column('timestamp with time zone', {
              name: 'updatedAt',
            })
            updatedAt: Date;

            @Field(() => ID)
            @Column('uuid', {
              name: 'user_slug', primary: true,
            })
            userSlug: string;

            @OneToOne(() => User, (user) => user.slug)
            user: User;
          }"
        `);

        expect(serialize(Photo, models, { graphql: true }, associationMapping))
          .toMatchInlineSnapshot(`
          "import { Field, ID, ObjectType } from 'type-graphql';
          import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
          import { User } from './User';

          @Index('photo_pkey', ['slug'], { unique: true })
          @Index('photo_user_id_idx', ['userId'], {})
          @Entity('photo', { schema: 'superluminal' })
          @ObjectType()
          export class Photo extends BaseEntity {
            @Field(() => Date)
            @Column('timestamp with time zone', {
              name: 'createdAt',
            })
            createdAt: Date;

            @Field(() => ID)
            @Column('uuid', {
              name: 'slug', primary: true,
            })
            slug: string;

            @Field(() => Date)
            @Column('timestamp with time zone', {
              name: 'updatedAt',
            })
            updatedAt: Date;

            @Field(() => String,{ nullable: true })
            @Column('character varying', {
              name: 'url', nullable: true,
            })
            url: string | null;

            @Field(() => String)
            @Column('uuid', {
              name: 'user_id',
            })
            userId: string;

            @ManyToOne(
              () => User,
              user => user.photos,
              { onDelete: 'NO ACTION' }
            )
            @JoinColumn([{ name: 'user_id', referencedColumnName: 'slug' }])
            user: User;
          }"
        `);
      });
    });
  });
});
/* eslint-enable max-len */

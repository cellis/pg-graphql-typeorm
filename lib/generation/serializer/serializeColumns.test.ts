import { Client } from 'pg';
import introspectDb from '../../introspection/introspectDb';
import connectTestDb from '../../test/connectTestDb';
import createModels from '../createModels';
import createRelationships from '../createRelationships';
import serializeColumns from './serializeColumns';

describe('serializeColumns', () => {
  let client: Client;
  let User: Superluminal.Model;
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

    Product = models.product;
    User = models.user;
    done();
  });

  afterAll(() => {
    return client.end();
  });

  describe('with primary autogenerated column', () => {
    it('serializes with generated: true', () => {
      expect(serializeColumns(Product)).toMatchInlineSnapshot(`
        "  @Column('timestamp with time zone', {
            name: 'createdAt',
          })
          createdAt: Date;

          @Column('integer', {
            name: 'id', primary: true, generated: true, default: () => 0,
          })
          id: number;

          @Column('timestamp with time zone', {
            name: 'updatedAt',
          })
          updatedAt: Date;

          @Column('character varying', {
            name: 'url', nullable: true,
          })
          url: string | null;"
      `);
    });
  });

  describe('with graphql', () => {
    describe('with a nullable column', () => {
      it('serializes the @Field to be nullable too', () => {
        expect(serializeColumns(User, { graphql: true }))
          .toMatchInlineSnapshot(`
          "  @Field(() => Boolean,{ nullable: true })
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
            updatedAt: Date | null;"
        `);
      });
    });

    it('serializes with @Field()', () => {
      expect(serializeColumns(User, { graphql: true })).toMatchInlineSnapshot(`
        "  @Field(() => Boolean,{ nullable: true })
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
          updatedAt: Date | null;"
      `);
    });
  });

  it('serializes all columns', () => {
    expect(serializeColumns(User)).toMatchInlineSnapshot(`
      "  @Column('boolean', {
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
        updatedAt: Date | null;"
    `);
  });
});

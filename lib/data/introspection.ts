// eslint-disable-next-line
// @ts-nocheck

import { IntrospectDB } from '../introspection/introspectDb';

export const DefaultIntrospection: IntrospectDB = {
  indexes: [
    {
      schema_name: 'superluminal',
      table_name: 'superluminal.user',
      index_name: 'user_pkey',
      is_unique: true,
      is_primary: true,
      method: 'btree',
      index_keys: [
        'slug',
      ],
    },
    {
      schema_name: 'superluminal',
      table_name: 'superluminal.user',
      index_name: 'user_full_text_idx',
      is_unique: false,
      is_primary: false,
      method: 'btree',
      index_keys: [
        'full_text',
      ],
    },
    {
      schema_name: 'superluminal',
      table_name: 'superluminal.message',
      index_name: 'message_pkey',
      is_unique: true,
      is_primary: true,
      method: 'btree',
      index_keys: [
        'id',
      ],
    },
    {
      schema_name: 'superluminal',
      table_name: 'superluminal.transaction',
      index_name: 'transaction_pkey',
      is_unique: true,
      is_primary: true,
      method: 'btree',
      index_keys: [
        'slug',
      ],
    },
    {
      schema_name: 'superluminal',
      table_name: 'superluminal.transaction',
      index_name: 'transaction_user_id_idx',
      is_unique: false,
      is_primary: false,
      method: 'btree',
      index_keys: [
        'user_id',
      ],
    },
    {
      schema_name: 'superluminal',
      table_name: 'superluminal.document',
      index_name: 'document_pkey',
      is_unique: true,
      is_primary: true,
      method: 'btree',
      index_keys: [
        'id',
      ],
    },
    {
      schema_name: 'superluminal',
      table_name: 'superluminal.shipment',
      index_name: 'shipment_pkey',
      is_unique: true,
      is_primary: true,
      method: 'btree',
      index_keys: [
        'slug',
      ],
    },
    {
      schema_name: 'superluminal',
      table_name: 'superluminal.shipment',
      index_name: 'shipment_from_user_slug_fk',
      is_unique: false,
      is_primary: false,
      method: 'btree',
      index_keys: [
        '"from"',
      ],
    },
    {
      schema_name: 'superluminal',
      table_name: 'superluminal.shipment',
      index_name: 'shipment_to_user_slug_fk',
      is_unique: false,
      is_primary: false,
      method: 'btree',
      index_keys: [
        '"to"',
      ],
    },
    {
      schema_name: 'superluminal',
      table_name: 'superluminal.product',
      index_name: 'product_pkey',
      is_unique: true,
      is_primary: true,
      method: 'btree',
      index_keys: [
        'id',
      ],
    },
    {
      schema_name: 'superluminal',
      table_name: 'superluminal.photo',
      index_name: 'photo_pkey',
      is_unique: true,
      is_primary: true,
      method: 'btree',
      index_keys: [
        'slug',
      ],
    },
    {
      schema_name: 'superluminal',
      table_name: 'superluminal.photo',
      index_name: 'photo_user_id_idx',
      is_unique: false,
      is_primary: false,
      method: 'btree',
      index_keys: [
        'user_id',
      ],
    },
    {
      schema_name: 'superluminal',
      table_name: 'superluminal.account',
      index_name: 'account_pkey',
      is_unique: true,
      is_primary: true,
      method: 'btree',
      index_keys: [
        'user_slug',
      ],
    },
  ],
  info: {
    generated: new Date('2025-02-06T00:52:05.591Z'),
    schemas: {
      superluminal: {
        schemaExistsInDatabase: true,
        comment: null,
        tables: {
          message: {
            comment: null,
            pkColumnNames: [
              'id',
            ],
            columns: {
              id: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'uuid',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              response_to: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'uuid',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              content: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'character varying',
                characterMaximumLength: 255,
                numericScale: null,
                comment: null,
                array: false,
              },
              created_at: {
                columnDefault: 'now()',
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              updated_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
            },
            indexes: {
            },
            triggers: {
            },
            functions: {
            },
            fkConstraints: {
              message_response_to_fkey: {
                targetTable: 'superluminal.message',
                sourceColumns: [
                  'response_to',
                ],
                targetColumns: [
                  'id',
                ],
                updateAction: 'NO ACTION',
                deleteAction: 'NO ACTION',
                matchType: 'SIMPLE',
              },
            },
          },
          user: {
            comment: null,
            pkColumnNames: [
              'slug',
            ],
            columns: {
              slug: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'uuid',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              first_name: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'character varying',
                characterMaximumLength: 255,
                numericScale: null,
                comment: null,
                array: false,
              },
              last_name: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'character varying',
                characterMaximumLength: 255,
                numericScale: null,
                comment: null,
                array: false,
              },
              credits: {
                columnDefault: '0',
                isNullable: 'YES',
                dataType: 'integer',
                characterMaximumLength: null,
                numericScale: 0,
                comment: null,
                array: false,
              },
              hobbies: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'text',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: true,
              },
              created_at: {
                columnDefault: 'now()',
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              connected: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'boolean',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              rating: {
                columnDefault: '0.88',
                isNullable: 'YES',
                dataType: 'numeric',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              full_text: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'character varying',
                characterMaximumLength: 255,
                numericScale: null,
                comment: null,
                array: false,
              },
              updated_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
            },
            indexes: {
            },
            triggers: {
            },
            functions: {
            },
            fkConstraints: {
            },
          },
          transaction: {
            comment: null,
            pkColumnNames: [
              'slug',
            ],
            columns: {
              slug: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'uuid',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              user_id: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'uuid',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              transactionId: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'character varying',
                characterMaximumLength: 255,
                numericScale: null,
                comment: null,
                array: false,
              },
              created_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              updated_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              createdAt: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              updatedAt: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
            },
            indexes: {
              transaction_user_id_idx: {
                columns: [
                  [
                    'user_id',
                  ],
                ],
                unique: false,
                method: 'btree',
              },
            },
            triggers: {
            },
            functions: {
            },
            fkConstraints: {
              transaction_user_id_fkey: {
                targetTable: 'superluminal."user"',
                sourceColumns: [
                  'user_id',
                ],
                targetColumns: [
                  'slug',
                ],
                updateAction: 'NO ACTION',
                deleteAction: 'NO ACTION',
                matchType: 'SIMPLE',
              },
            },
          },
          document: {
            comment: null,
            pkColumnNames: [
              'id',
            ],
            columns: {
              id: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'integer',
                characterMaximumLength: null,
                numericScale: 0,
                comment: null,
                array: false,
              },
              url: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'character varying',
                characterMaximumLength: 255,
                numericScale: null,
                comment: null,
                array: false,
              },
              created_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              updated_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              createdAt: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              updatedAt: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
            },
            indexes: {
            },
            triggers: {
            },
            functions: {
            },
            fkConstraints: {
            },
          },
          shipment: {
            comment: null,
            pkColumnNames: [
              'slug',
            ],
            columns: {
              slug: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'uuid',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              from: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'uuid',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              to: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'uuid',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              created_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              updated_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              createdAt: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              updatedAt: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
            },
            indexes: {
              shipment_from_user_slug_fk: {
                columns: [
                  [
                    '"from"',
                  ],
                ],
                unique: false,
                method: 'btree',
              },
              shipment_to_user_slug_fk: {
                columns: [
                  [
                    '"to"',
                  ],
                ],
                unique: false,
                method: 'btree',
              },
            },
            triggers: {
            },
            functions: {
            },
            fkConstraints: {
              shipment_from_fkey: {
                targetTable: 'superluminal."user"',
                sourceColumns: [
                  'from',
                ],
                targetColumns: [
                  'slug',
                ],
                updateAction: 'NO ACTION',
                deleteAction: 'NO ACTION',
                matchType: 'SIMPLE',
              },
              shipment_to_fkey: {
                targetTable: 'superluminal."user"',
                sourceColumns: [
                  'to',
                ],
                targetColumns: [
                  'slug',
                ],
                updateAction: 'NO ACTION',
                deleteAction: 'NO ACTION',
                matchType: 'SIMPLE',
              },
            },
          },
          product: {
            comment: null,
            pkColumnNames: [
              'id',
            ],
            columns: {
              id: {
                columnDefault: 
                'nextval(\'superluminal.product_id_seq\'::regclass)',
                isNullable: 'NO',
                dataType: 'integer',
                characterMaximumLength: null,
                numericScale: 0,
                comment: null,
                array: false,
              },
              url: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'character varying',
                characterMaximumLength: 255,
                numericScale: null,
                comment: null,
                array: false,
              },
              created_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              updated_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              createdAt: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              updatedAt: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
            },
            indexes: {
            },
            triggers: {
            },
            functions: {
            },
            fkConstraints: {
            },
          },
          photo: {
            comment: null,
            pkColumnNames: [
              'slug',
            ],
            columns: {
              slug: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'uuid',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              user_id: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'uuid',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              url: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'character varying',
                characterMaximumLength: 255,
                numericScale: null,
                comment: null,
                array: false,
              },
              created_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              updated_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              deleted_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              createdAt: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              updatedAt: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
            },
            indexes: {
              photo_user_id_idx: {
                columns: [
                  [
                    'user_id',
                  ],
                ],
                unique: false,
                method: 'btree',
              },
            },
            triggers: {
            },
            functions: {
            },
            fkConstraints: {
              photo_user_id_fkey: {
                targetTable: 'superluminal."user"',
                sourceColumns: [
                  'user_id',
                ],
                targetColumns: [
                  'slug',
                ],
                updateAction: 'NO ACTION',
                deleteAction: 'NO ACTION',
                matchType: 'SIMPLE',
              },
            },
          },
          account: {
            comment: null,
            pkColumnNames: [
              'user_slug',
            ],
            columns: {
              user_slug: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'uuid',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              email: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'character varying',
                characterMaximumLength: 255,
                numericScale: null,
                comment: null,
                array: false,
              },
              phone: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'character varying',
                characterMaximumLength: 255,
                numericScale: null,
                comment: null,
                array: false,
              },
              created_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              updated_at: {
                columnDefault: null,
                isNullable: 'YES',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              createdAt: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
              updatedAt: {
                columnDefault: null,
                isNullable: 'NO',
                dataType: 'timestamp with time zone',
                characterMaximumLength: null,
                numericScale: null,
                comment: null,
                array: false,
              },
            },
            indexes: {
            },
            triggers: {
            },
            functions: {
            },
            fkConstraints: {
              account_user_slug_fkey: {
                targetTable: 'superluminal."user"',
                sourceColumns: [
                  'user_slug',
                ],
                targetColumns: [
                  'slug',
                ],
                updateAction: 'NO ACTION',
                deleteAction: 'NO ACTION',
                matchType: 'SIMPLE',
              },
            },
          },
        },
        views: {
        },
      },
    },
  },
};
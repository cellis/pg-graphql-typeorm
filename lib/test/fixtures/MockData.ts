import { PgToolsConfig } from 'pgtools';
import { Sequelize } from 'sequelize';
import AccountTable from './tables/AccountTable';
import PaymentDetailsTable from './tables/PaymentDetailsTable';
import PhotoTable from './tables/PhotoTable';
import ProductTable from './tables/ProductTable';
import TransactionTable from './tables/TransactionTable';
import UserTable from './tables/UserTable';

export function getPrimaryKeyNameForTable(table: string) {
  return `${table}_pkey`;
}

export function getForeignKeyNameForTables(
  sourceTable: string,
  targetTable: string,
  targetTableKey: string
) {
  return `${sourceTable}_${targetTable}_${targetTableKey}_fk`;
}

export function getIndexNameForTable(table: string, column: string) {
  return `${table}_${column}_idx`;
}

export const userFullTextIdxName = getIndexNameForTable('user', 'full_text');
export const userPrimaryKeyName = getPrimaryKeyNameForTable('user');
export const photoPrimaryKeyName = getPrimaryKeyNameForTable('photo');
export const photoUserIdIdxName = getIndexNameForTable('photo', 'user_id');
export const photoUserSlugFkName = getForeignKeyNameForTables(
  'photo',
  'user',
  'slug'
);

export const paymentDetailsPrimaryKeyName = getPrimaryKeyNameForTable(
  'payment_details'
);
export const paymentDetailsUserIdIdxName = getIndexNameForTable(
  'payment_details',
  'user_id'
);
export const paymentDetailsUserSlugFkName = getForeignKeyNameForTables(
  'payment_details',
  'user',
  'slug'
);

export const transactionPrimaryKeyName = getPrimaryKeyNameForTable(
  'transaction'
);
export const transactionUserIdIdxName = getIndexNameForTable(
  'transaction',
  'user_id'
);

export const UserIndexes = [
  {
    unique: true,
    fields: ['slug'],
    name: userPrimaryKeyName,
  },
  {
    fields: ['full_text'],
    unique: false,
    name: userFullTextIdxName,
  },
];

export async function generateMockTables(
  config: PgToolsConfig,
  database: string,
  schema: string
) {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    logging: false,
    database,
    ...config,
  });

  const User = sequelize.define('User', UserTable, {
    tableName: 'user',
    schema,
    indexes: UserIndexes,
    timestamps: false,
  });

  const Transaction = sequelize.define('Transaction', TransactionTable, {
    schema,
    tableName: 'transaction',
    indexes: [
      {
        fields: ['slug'],
        unique: true,
        name: transactionPrimaryKeyName,
      },
      {
        fields: ['user_id'],
        name: transactionUserIdIdxName,
      },
    ],
  });

  sequelize.define('Product', ProductTable, {
    schema,
    tableName: 'product',
    indexes: [
      {
        fields: ['id'],
        unique: true,
        name: getPrimaryKeyNameForTable('product'),
      },
    ],
  });

  await sequelize.sync();

  const Photo = sequelize.define('Photo', PhotoTable, {
    schema,
    tableName: 'photo',
    indexes: [
      {
        fields: ['slug'],
        unique: true,
        name: photoPrimaryKeyName,
      },
      {
        fields: ['user_id'],
        name: photoUserIdIdxName,
      },
    ],
  });

  sequelize.define('PaymentDetails', PaymentDetailsTable, {
    schema: 'superluminal_private',
    tableName: 'payment_details',
    indexes: [
      {
        fields: ['slug'],
        unique: true,
        name: paymentDetailsPrimaryKeyName,
      },
    ],
  });

  const Account = sequelize.define('Account', AccountTable, {
    tableName: 'account',
    schema,
  });

  Transaction.hasOne(User, {
    sourceKey: 'user_id',
    foreignKey: 'slug',
    foreignKeyConstraint: true,
    onDelete: 'CASCADE',
  });

  Account.hasOne(User, {
    sourceKey: 'user_slug',
    foreignKey: 'slug',
    foreignKeyConstraint: true,
    onDelete: 'CASCADE',
  });

  Photo.hasOne(User, {
    sourceKey: 'user_id',
    foreignKey: 'slug',
    foreignKeyConstraint: true,
    onDelete: 'CASCADE',
  });

  try {
    await sequelize.sync();
  } catch (error) {
    console.log('Could not sync sequelize models', error);
  } finally {
    await sequelize.close();
  }
}

import { PgToolsConfig } from 'pgtools';
import { Sequelize } from 'sequelize';
import AccountTable from './tables/AccountTable';
import DocumentTable from './tables/DocumentTable';
import MessageTable from './tables/MessageTable';
import PaymentDetailsTable from './tables/PaymentDetailsTable';
import PhotoTable from './tables/PhotoTable';
import ProductTable from './tables/ProductTable';
import ShipmentTable from './tables/ShipmentTable';
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
export const messagePrimaryKeyName = getPrimaryKeyNameForTable('message');
export const photoPrimaryKeyName = getPrimaryKeyNameForTable('photo');
export const photoUserIdIdxName = getIndexNameForTable('photo', 'user_id');
export const photoUserSlugFkName = getForeignKeyNameForTables(
  'photo',
  'user',
  'slug'
);

export const shipmentPrimaryKeyName = getPrimaryKeyNameForTable('shipment');
export const shipmentFromUserIdFkName = getForeignKeyNameForTables(
  'shipment_from',
  'user',
  'slug'
);
export const shipmentToUserIdFkName = getForeignKeyNameForTables(
  'shipment_to',
  'user',
  'slug'
);
export const shipmenToUserIdIdxName = getIndexNameForTable('shipment', 'to');

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

export const documentPrimaryKeyName = getPrimaryKeyNameForTable(
  'document'
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

export const MessageIndexes = [
  {
    unique: true,
    fields: ['id'],
    name: messagePrimaryKeyName,
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

  const Message = sequelize.define('Message', MessageTable, {
    tableName: 'message',
    schema,
    indexes: MessageIndexes,
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

  sequelize.define('Document', DocumentTable, {
    schema,
    tableName: 'document',
    indexes: [
      {
        fields: ['id'],
        unique: true,
        name: documentPrimaryKeyName,
      },
    ],
  });

  const Shipment = sequelize.define('Shipment', ShipmentTable, {
    schema,
    tableName: 'shipment',
    indexes: [
      {
        fields: ['slug'],
        unique: true,
        name: shipmentPrimaryKeyName,
      },
      {
        fields: ['from'],
        name: shipmentFromUserIdFkName,
      },
      {
        fields: ['to'],
        name: shipmentToUserIdFkName,
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

  Message.hasMany(Message, {
    sourceKey: 'id',
    foreignKey: 'response_to',
    foreignKeyConstraint: true,
    onDelete: 'CASCADE',
  });

  Transaction.hasOne(User, {
    sourceKey: 'user_id',
    foreignKey: 'slug',
    foreignKeyConstraint: true,
    onDelete: 'CASCADE',
  });

  Shipment.hasOne(User, {
    sourceKey: 'from',
    foreignKey: 'slug',
    foreignKeyConstraint: true,
    onDelete: 'CASCADE',
  });

  Shipment.hasOne(User, {
    sourceKey: 'to',
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

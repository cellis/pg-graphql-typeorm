"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMockTables = exports.MessageIndexes = exports.UserIndexes = exports.transactionUserIdIdxName = exports.transactionPrimaryKeyName = exports.paymentDetailsUserSlugFkName = exports.paymentDetailsUserIdIdxName = exports.paymentDetailsPrimaryKeyName = exports.photoUserSlugFkName = exports.photoUserIdIdxName = exports.photoPrimaryKeyName = exports.messagePrimaryKeyName = exports.userPrimaryKeyName = exports.userFullTextIdxName = exports.getIndexNameForTable = exports.getForeignKeyNameForTables = exports.getPrimaryKeyNameForTable = void 0;
const sequelize_1 = require("sequelize");
const AccountTable_1 = __importDefault(require("./tables/AccountTable"));
const MessageTable_1 = __importDefault(require("./tables/MessageTable"));
const PaymentDetailsTable_1 = __importDefault(require("./tables/PaymentDetailsTable"));
const PhotoTable_1 = __importDefault(require("./tables/PhotoTable"));
const ProductTable_1 = __importDefault(require("./tables/ProductTable"));
const TransactionTable_1 = __importDefault(require("./tables/TransactionTable"));
const UserTable_1 = __importDefault(require("./tables/UserTable"));
function getPrimaryKeyNameForTable(table) {
    return `${table}_pkey`;
}
exports.getPrimaryKeyNameForTable = getPrimaryKeyNameForTable;
function getForeignKeyNameForTables(sourceTable, targetTable, targetTableKey) {
    return `${sourceTable}_${targetTable}_${targetTableKey}_fk`;
}
exports.getForeignKeyNameForTables = getForeignKeyNameForTables;
function getIndexNameForTable(table, column) {
    return `${table}_${column}_idx`;
}
exports.getIndexNameForTable = getIndexNameForTable;
exports.userFullTextIdxName = getIndexNameForTable('user', 'full_text');
exports.userPrimaryKeyName = getPrimaryKeyNameForTable('user');
exports.messagePrimaryKeyName = getPrimaryKeyNameForTable('message');
exports.photoPrimaryKeyName = getPrimaryKeyNameForTable('photo');
exports.photoUserIdIdxName = getIndexNameForTable('photo', 'user_id');
exports.photoUserSlugFkName = getForeignKeyNameForTables('photo', 'user', 'slug');
exports.paymentDetailsPrimaryKeyName = getPrimaryKeyNameForTable('payment_details');
exports.paymentDetailsUserIdIdxName = getIndexNameForTable('payment_details', 'user_id');
exports.paymentDetailsUserSlugFkName = getForeignKeyNameForTables('payment_details', 'user', 'slug');
exports.transactionPrimaryKeyName = getPrimaryKeyNameForTable('transaction');
exports.transactionUserIdIdxName = getIndexNameForTable('transaction', 'user_id');
exports.UserIndexes = [
    {
        unique: true,
        fields: ['slug'],
        name: exports.userPrimaryKeyName,
    },
    {
        fields: ['full_text'],
        unique: false,
        name: exports.userFullTextIdxName,
    },
];
exports.MessageIndexes = [
    {
        unique: true,
        fields: ['id'],
        name: exports.messagePrimaryKeyName,
    },
];
function generateMockTables(config, database, schema) {
    return __awaiter(this, void 0, void 0, function* () {
        const sequelize = new sequelize_1.Sequelize(Object.assign({ dialect: 'postgres', logging: false, database }, config));
        const User = sequelize.define('User', UserTable_1.default, {
            tableName: 'user',
            schema,
            indexes: exports.UserIndexes,
            timestamps: false,
        });
        const Message = sequelize.define('Message', MessageTable_1.default, {
            tableName: 'message',
            schema,
            indexes: exports.MessageIndexes,
            timestamps: false,
        });
        const Transaction = sequelize.define('Transaction', TransactionTable_1.default, {
            schema,
            tableName: 'transaction',
            indexes: [
                {
                    fields: ['slug'],
                    unique: true,
                    name: exports.transactionPrimaryKeyName,
                },
                {
                    fields: ['user_id'],
                    name: exports.transactionUserIdIdxName,
                },
            ],
        });
        sequelize.define('Product', ProductTable_1.default, {
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
        yield sequelize.sync();
        const Photo = sequelize.define('Photo', PhotoTable_1.default, {
            schema,
            tableName: 'photo',
            indexes: [
                {
                    fields: ['slug'],
                    unique: true,
                    name: exports.photoPrimaryKeyName,
                },
                {
                    fields: ['user_id'],
                    name: exports.photoUserIdIdxName,
                },
            ],
        });
        sequelize.define('PaymentDetails', PaymentDetailsTable_1.default, {
            schema: 'superluminal_private',
            tableName: 'payment_details',
            indexes: [
                {
                    fields: ['slug'],
                    unique: true,
                    name: exports.paymentDetailsPrimaryKeyName,
                },
            ],
        });
        const Account = sequelize.define('Account', AccountTable_1.default, {
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
            yield sequelize.sync();
        }
        catch (error) {
            console.log('Could not sync sequelize models', error);
        }
        finally {
            yield sequelize.close();
        }
    });
}
exports.generateMockTables = generateMockTables;
//# sourceMappingURL=MockData.js.map
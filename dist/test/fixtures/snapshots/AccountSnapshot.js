"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountSnapshot = {
    name: 'account',
    schema: 'superluminal',
    columns: {
        user_slug: {
            name: 'user_slug',
            dataType: 'uuid',
            type: 'string',
            nullable: false,
            autoIncrement: false,
        },
        email: {
            name: 'email',
            dataType: 'character varying',
            type: 'string',
            nullable: true,
            autoIncrement: false,
        },
        phone: {
            name: 'phone',
            dataType: 'character varying',
            type: 'string',
            nullable: true,
            autoIncrement: false,
        },
        created_at: {
            name: 'created_at',
            dataType: 'timestamp with time zone',
            type: 'Date',
            nullable: true,
            autoIncrement: false,
        },
        updated_at: {
            name: 'updated_at',
            dataType: 'timestamp with time zone',
            type: 'Date',
            nullable: true,
            autoIncrement: false,
        },
        createdAt: {
            name: 'createdAt',
            dataType: 'timestamp with time zone',
            type: 'Date',
            nullable: false,
            autoIncrement: false,
        },
        updatedAt: {
            name: 'updatedAt',
            dataType: 'timestamp with time zone',
            type: 'Date',
            nullable: false,
            autoIncrement: false,
        },
    },
    primaryKeys: ['user_slug'],
    indexes: {
        account_pkey: {
            unique: true,
            columns: ['user_slug'],
        },
    },
};
exports.default = AccountSnapshot;
//# sourceMappingURL=AccountSnapshot.js.map
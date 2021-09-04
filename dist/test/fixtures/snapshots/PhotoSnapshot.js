"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhotoSnapshot = {
    name: 'photo',
    schema: 'superluminal',
    columns: {
        slug: {
            name: 'slug',
            dataType: 'uuid',
            type: 'string',
            nullable: false,
            autoIncrement: false,
        },
        user_id: {
            name: 'user_id',
            dataType: 'uuid',
            type: 'string',
            nullable: false,
            autoIncrement: false,
        },
        url: {
            name: 'url',
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
    primaryKeys: ['slug'],
    indexes: {
        photo_pkey: {
            unique: true,
            columns: ['slug'],
        },
        photo_user_id_idx: {
            unique: false,
            columns: ['user_id'],
        },
    },
};
exports.default = PhotoSnapshot;
//# sourceMappingURL=PhotoSnapshot.js.map
import { PgToolsConfig } from 'pgtools';
export declare function getPrimaryKeyNameForTable(table: string): string;
export declare function getForeignKeyNameForTables(sourceTable: string, targetTable: string, targetTableKey: string): string;
export declare function getIndexNameForTable(table: string, column: string): string;
export declare const userFullTextIdxName: string;
export declare const userPrimaryKeyName: string;
export declare const photoPrimaryKeyName: string;
export declare const photoUserIdIdxName: string;
export declare const photoUserSlugFkName: string;
export declare const paymentDetailsPrimaryKeyName: string;
export declare const paymentDetailsUserIdIdxName: string;
export declare const paymentDetailsUserSlugFkName: string;
export declare const transactionPrimaryKeyName: string;
export declare const transactionUserIdIdxName: string;
export declare const UserIndexes: {
    unique: boolean;
    fields: string[];
    name: string;
}[];
export declare function generateMockTables(config: PgToolsConfig, database: string, schema: string): Promise<void>;
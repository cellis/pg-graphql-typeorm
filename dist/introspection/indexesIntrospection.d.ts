import { Indexes } from '@wmfs';
import { Client } from 'pg';
export declare const normalizeForUser: (str: string) => string;
export declare const getTableFromFullyQualifiedPath: (fullyQualifiedTableName: string) => string;
export interface RawIndex {
    table_name: string;
    schema_name: string;
    is_primary: boolean;
    index_keys: string[];
    is_unique: boolean;
    method: string;
    index_name: string;
}
export declare function loadIndexes(client: Client, schema: string): Promise<RawIndex[]>;
export declare function findIndexes(rawIndexes: RawIndex[], table: string, schema: string): Indexes;

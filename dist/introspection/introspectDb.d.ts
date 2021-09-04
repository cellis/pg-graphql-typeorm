import { Introspection } from '@wmfs';
import { Client } from 'pg';
import { RawIndex } from './indexesIntrospection';
export interface IntrospectDB {
    indexes: RawIndex[];
    info: Introspection;
}
declare const _default: (client: Client, schemas: string[]) => Promise<IntrospectDB>;
export default _default;

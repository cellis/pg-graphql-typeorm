import { Introspection } from '@wmfs';
import PgInfo from '@wmfs/pg-info';
import { Client } from 'pg';
import { loadIndexes, RawIndex } from './indexesIntrospection';

export interface IntrospectDB {
  indexes: RawIndex[];
  info: Introspection;
}

export default async (
  client: Client,
  schemas: string[]
): Promise<IntrospectDB> => {
  const info = await PgInfo({
    client,
    schemas,
  });

  const indexes = await loadIndexes(client, schemas.join(','));

  return {
    indexes,
    info,
  };
};

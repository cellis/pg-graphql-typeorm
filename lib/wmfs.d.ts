declare module '@wmfs/pg-info' {
  import * as WMFS from '@wmfs';
  import { Client } from 'pg';

  function Parse(args: {
    client: Client;
    schemas: string[];
  }): Promise<WMFS.Introspection>;

  export = Parse;
}

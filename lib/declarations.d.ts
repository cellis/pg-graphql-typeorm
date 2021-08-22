import { Client } from 'pg';
declare module '@wmfs/pg-diff-sync';
// declare module './test/fixtures/files/javascriptConfig';
declare global {
  /* eslint-disable no-var */
  var client: Client;
  var pgClient: Client;
  var __jest_watching__: boolean;
  /* eslint-enable no-var */
}

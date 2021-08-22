import postgresDriver from '../drivers/postgresDriver';

export default async function () {
  const client = postgresDriver({
    host: 'localhost',
    port: 5432,
    database: 'superluminal-test',
  });

  await client.connect();

  return client;
}

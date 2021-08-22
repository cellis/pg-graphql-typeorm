import pg from 'pg';
import postgres from './postgresDriver';
describe('postgres', () => {
  it('returns a pg Client', () => {
    expect(
      postgres({
        host: 'localhost',
        port: 5432,
        database: 'superluminal-test',
      })
    ).toBeInstanceOf(pg.Client);
  });
});

import generate from './generate';
jest.mock('./config/loadConfig');

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  promises: {
    writeFile: jest.fn(),
    mkDir: jest.fn(),
  },
}));

describe('generate', () => {
  let spiedConsole: jest.SpyInstance;
  const entitiesDirectory = './dist/superluminal-test-entities';
  ('generates a model file for each table in the output directory');
  let oldArgv: string[];

  beforeAll(() => {
    spiedConsole = jest.spyOn(console, 'error').mockImplementation();
  });

  describe('bad input', () => {
    it('prints errors and exits', async () => {
      // prettier-ignore
      process.argv.push(
        '-o', entitiesDirectory,
        '-d', 'some_db_that_doesnt_exist',
        '-s', 'bad_schema'
      );

      await generate();

      process.argv = oldArgv;

      expect(spiedConsole).toHaveBeenCalled();
    });
  });
});

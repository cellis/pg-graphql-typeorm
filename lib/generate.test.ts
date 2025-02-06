import fs from 'fs';
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
  const entitiesDirectory = './dist/superluminal-test-entities';
  const database = 'superluminal-test';
  const schema = 'superluminal';
  const modelGenerationAssertion =
    'generates a model file for each table in the output directory';

  describe('with one schema', () => {
    beforeEach(() => {
      process.argv.push('-o', entitiesDirectory);
      process.argv.push('-d', database);
      process.argv.push('-s', schema);
    });

    it(modelGenerationAssertion, async () => {
      await generate(false);
      expect(fs.promises.writeFile).toHaveBeenCalled();
    });
  });

  describe('with multiple schemas', () => {
    beforeEach(() => {
      process.argv.push('-o', entitiesDirectory);
      process.argv.push('-d', database);
      process.argv.push('-s', `${schema},superluminal_private`);
    });

    it(modelGenerationAssertion, async () => {
      await generate(false);
      expect(fs.promises.writeFile).toBeCalled();
    });
  });

  describe('with no schemas', () => {
    beforeEach(() => {
      process.argv.push('-o', entitiesDirectory);
      process.argv.push('-d', database);
    });

    it(modelGenerationAssertion, async () => {
      await generate(false);
      expect(fs.promises.writeFile).toBeCalled();
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

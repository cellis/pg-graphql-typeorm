// eslint-disable-next-line
// @ts-ignore
import { resolve } from 'path';
import mockFtlts from '../test/fixtures/files/typescriptConfig';
import loadConfig from './loadConfig';

describe('loadConfig', () => {
  // loads the config from ftljs
  describe('ts config', () => {
    beforeEach(() => {
      jest.mock(
        resolve(process.cwd(), '.ftlrc.ts'),
        () => ({ default: mockFtlts }),
        {
          virtual: true,
        }
      );
    });
    it('loads the Typescript config from .ftlrc.ts', async () => {
      const actualFtlTsRc = await mockFtlts();
      const loadedFtlTsRc = await loadConfig();
      expect(loadedFtlTsRc).toEqual(actualFtlTsRc);
    });
    afterAll(() => {
      jest.unmock(resolve(process.cwd(), '.ftlrc.ts'));
    });
  });
});

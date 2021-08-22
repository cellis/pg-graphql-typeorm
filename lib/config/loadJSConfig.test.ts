import { resolve } from 'path';
import loadConfig from './loadConfig';
// eslint-disable-next-line
const mockFtljs = require('../test/fixtures/files/javascriptConfig');

describe('loadConfig', () => {
  // loads the config from ftljs
  describe('js config', () => {
    beforeEach(() => {
      jest.mock(resolve(process.cwd(), '.ftlrc.ts'), () => undefined);
      jest.mock(resolve(process.cwd(), '.ftlrc.js'), () => mockFtljs, {
        virtual: true,
      });
    });
    it('loads the Javascript config from .ftlrc.js', async () => {
      const actualFtlJsRc = mockFtljs();
      const loadedFtlJSRc = await loadConfig();
      expect(loadedFtlJSRc).toEqual(actualFtlJsRc);
    });
    afterAll(() => {
      jest.unmock(resolve(process.cwd(), '.ftlrc.ts'));
      jest.unmock(resolve(process.cwd(), '.ftlrc.js'));
    });
  });
});

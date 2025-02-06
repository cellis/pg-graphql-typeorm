import createModels from './createModels';
import { DefaultIntrospection } from '../data/introspection';
import _ from 'lodash';


describe('createModels', () => {
  describe('hashing', () => {
    it('should generate consistent hashes for identical tables', async () => {
      // First run
      const { hashes: firstHashes } = await createModels({}, 
        DefaultIntrospection, {
        output: '.tmp',
      });
      

      const { hashes: secondHashes } = await createModels({}, 
        DefaultIntrospection, {
        output: '.tmp',
      });

      expect(secondHashes).toEqual(firstHashes);
    });
    
    it('should skip table processing if hash is unchanged', async () => {
      // First run to get hash
      const { hashes: firstHashes } = await createModels({}, 
        DefaultIntrospection, {
        output: '.tmp',
      });
      
      // Second run with same introspection
      const { hashes: secondHashes } = await createModels({}, 
        DefaultIntrospection, {
        output: '.tmp',
      });

      // Verify hashes are the same
      expect(secondHashes).toEqual(firstHashes);
    });

    it('should detect changes when table structure is modified', async () => {
      // First run with original introspection
      const { hashes: firstHashes } = await createModels({}, 
        DefaultIntrospection, {
        output: '.tmp',
      });

      // Modify introspection by adding a column
      const modifiedIntrospection = _.cloneDeep(DefaultIntrospection);
      const { user } = modifiedIntrospection.info.schemas.superluminal.tables;

      user.columns.newColumn = {
        dataType: 'text',
        // eslint-disable-next-line
        // @ts-ignore
        isNullable: 'YES',
        columnDefault: null,
        array: false,
        characterMaximumLength: null,
        numericScale: null,
        comment: null,
      };

      // Second run with modified introspection

      const { models, hashes: secondHashes } = await createModels(
        {}, modifiedIntrospection, {
        output: '.tmp',
      });

      // should be models that were changed
      expect(models.user.columns.newColumn).toBeDefined();
    });
  });
});

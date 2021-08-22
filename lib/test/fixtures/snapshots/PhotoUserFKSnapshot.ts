import { Fk } from '@wmfs';

const PhotoUserFKSnapshot: Fk = {
  targetTable: 'superluminal."user"',
  sourceColumns: ['user_id'],
  targetColumns: ['slug'],
  updateAction: 'NO ACTION',
  deleteAction: 'NO ACTION',
  matchType: 'SIMPLE',
};

export default PhotoUserFKSnapshot;

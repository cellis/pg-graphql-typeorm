import { Table } from '@wmfs';
// eslint-disable-next-line
import { getTableFromFullyQualifiedPath } from '../introspection/indexesIntrospection';
// eslint-disable-next-line
import handleForeignNonPrimaryKey from './associations/handleForeignNonPrimaryKey';
import handleForeignNonPrimaryKey2 from './associations/handleForeignNonPrimaryKey2';
import handleSharedPrimaryKey from './associations/handleSharedPrimaryKey';

const createRelationship = (
  modelName: string,
  table: Table,
  models: Record<string, Superluminal.Model>,
  associationMapping: Superluminal.AssociationMapping
) => {
  const model: Superluminal.Model = models[modelName];

  for (const key of Object.keys(table.fkConstraints)) {
    const fk = table.fkConstraints[key];
    const normalizedTargetTable = getTableFromFullyQualifiedPath(
      fk.targetTable
    );
    const foreignModel = models[normalizedTargetTable];

    handleSharedPrimaryKey(model, fk, foreignModel);

    handleForeignNonPrimaryKey(model, fk, foreignModel);

    handleForeignNonPrimaryKey2(model, fk, foreignModel, associationMapping);
  }
};

export default createRelationship;

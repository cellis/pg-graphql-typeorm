import { Fk } from '@wmfs';
/**
 * When `model` has a foreign key in `foreignModel`,
 * should add a `OneToMany` in `foreignModel`.
 *
 * @param source
 * @param fk
 * @param target
 */
const handleForeignNonPrimaryKey2 = (
  source: Superluminal.Model,
  fk: Fk,
  target: Superluminal.Model,
  associationMapping: Superluminal.AssociationMapping
) => {
  for (let i = 0; i < fk.sourceColumns.length; i++) {
    const sourceColumn = fk.sourceColumns[i];
    const targetColumn = fk.targetColumns[i];

    // is the source a primary key?
    const sourceIsPrimary = source?.primaryKeys
      ? source.primaryKeys.indexOf(sourceColumn) !== -1
      : false;
    const targetIsPrimary = target?.primaryKeys
      ? target.primaryKeys.indexOf(targetColumn) !== -1
      : false;

    if (sourceIsPrimary && targetIsPrimary) {
      // if these are both primaries we already handle this
      break;
    }

    const existingOneToManys = associationMapping.oneToManys[target.name] || {};
    const existingManyToOnes = associationMapping.manyToOnes[source.name] || {};

    const existingOTMKeys = existingOneToManys[source.name] || [];
    const existingMTOKeys = existingManyToOnes[target.name] || [];

    associationMapping.oneToManys = {
      ...associationMapping.oneToManys,
      [target.name]: {
        ...existingOneToManys,
        [source.name]: [...existingOTMKeys, [sourceColumn, targetColumn]],
      },
    };

    const mtoMeta: Superluminal.ManyToOneMeta = {
      pair: [sourceColumn, targetColumn],
    };

    if (fk.deleteAction) {
      mtoMeta.onDelete = fk.deleteAction;
    }

    associationMapping.manyToOnes = {
      ...associationMapping.manyToOnes,
      [source.name]: {
        ...existingManyToOnes,
        [target.name]: [...existingMTOKeys, mtoMeta],
      },
    };
  }

  return associationMapping;
};

export default handleForeignNonPrimaryKey2;

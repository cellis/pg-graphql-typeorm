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
    const sourceIsPrimary = source.primaryKeys?.indexOf(sourceColumn) !== -1;
    const targetIsPrimary = target.primaryKeys?.indexOf(targetColumn) !== -1;

    if (sourceIsPrimary && targetIsPrimary) {
      // if these are both primaries we already handle this
      break;
    }

    const existingOneToManys = associationMapping.oneToManys[source.name];

    if (existingOneToManys) {
      existingOneToManys[target.name];
    }

    associationMapping.oneToManys = {
      [source.name]: {},
    };

    // associationMapping.manyToOnes = {
    //   [target.name]: [
    //     ...associationMapping.manyToOnes[target.name],
    //     source.name,
    //   ],
    // };
  }

  return associationMapping;
};

export default handleForeignNonPrimaryKey2;

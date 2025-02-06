import { Fk } from '@wmfs';
/**
 * When `model` has a foreign key in `foreignModel`,
 * should add a `OneToMany` in `foreignModel`.
 *
 * @param source
 * @param fk
 * @param target
 */
const handleForeignNonPrimaryKey = (
  source: Superluminal.Model,
  fk: Fk,
  target: Superluminal.Model
) => {
  for (let i = 0; i < fk.sourceColumns.length; i++) {
    const sourceColumn = fk.sourceColumns[i];
    const targetColumn = fk.targetColumns[i];

    // is the source a primary key?
    let sourceIsPrimary = false;
    let targetIsPrimary = false;

    try {
      sourceIsPrimary = source.primaryKeys?.indexOf(sourceColumn) !== -1;
      targetIsPrimary = target.primaryKeys?.indexOf(targetColumn) !== -1;
    } catch (error) {
      continue;
    }

    if (sourceIsPrimary && targetIsPrimary) {
      // if these are both primaries we already handle this
      break;
    }

    target.oneToManys = {
      ...target.oneToManys,
      [source.name]: {
        inverse: target.name,
      },
    };

    source.manyToOnes = {
      ...source.manyToOnes,
      [target.name]: {
        inverse: source.name,
        joinColumns: [
          {
            fieldName: target.name,
            name: sourceColumn,
            referencedColumnName: targetColumn,
          },
        ],
        onDelete: fk.deleteAction,
      },
    };
  }
};

export default handleForeignNonPrimaryKey;

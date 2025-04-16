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
  source: Superluminal.Model | undefined,
  fk: Fk,
  target: Superluminal.Model | undefined
) => {
  for (let i = 0; i < fk.sourceColumns.length; i++) {
    const sourceColumn = fk.sourceColumns[i];
    const targetColumn = fk.targetColumns[i];

    // is the source a primary key?
    let sourceIsPrimary = false;
    let targetIsPrimary = false;

    if (source?.primaryKeys && target?.primaryKeys) {
      sourceIsPrimary = source.primaryKeys.indexOf(sourceColumn) !== -1;
      targetIsPrimary = target.primaryKeys.indexOf(targetColumn) !== -1;
    }

    if (sourceIsPrimary && targetIsPrimary) {
      // if these are both primaries we already handle this
      break;
    }

    if (!target) {
      // console.error(
      //   `${source?.name} has a fk in a target of ${fk.targetColumns}`
      // );
      continue;
    }

    if (!source) {
      // console.error(
      //   `${target.name} has a fk in a source of ${fk.sourceColumns}`
      // );
      continue;
    }

    if (!target.oneToManys) target.oneToManys = {};
    if (!source.manyToOnes) source.manyToOnes = {};

    target.oneToManys = {
      ...(target.oneToManys || {}),
      [source.name]: {
        inverse: target.name,
      },
    };

    source.manyToOnes = {
      ...(source.manyToOnes || {}),
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

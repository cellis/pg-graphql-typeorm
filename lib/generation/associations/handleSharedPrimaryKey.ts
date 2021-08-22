import { Fk } from '@wmfs';

export const incrementJoinColumnIfNeeded = (
  name: string,
  existingFields: Record<string, boolean>
) => {
  const incrementBy = 1;
  const increment = 2;
  const endNum = /\d+$/g;
  let key = name;
  // we haven't found a key
  while (existingFields[key]) {
    const numbersFound = key.match(endNum);
    if (numbersFound) {
      let num = parseInt(numbersFound[0], 10);

      if (!isNaN(num)) {
        num += incrementBy;
      }

      key = key.replace(endNum, `${num}`);
    } else {
      // no numbers found already,
      // just append incrementBy
      key += `${increment}`;
    }
  }

  return key;
};

/**
 * When `source` and `target` share primary keys,
 * Should add OneToOnes in both.
 *
 * @param source
 * @param fk
 * @param target
 */
const handleSharedPrimaryKey = (
  source: Superluminal.Model,
  fk: Fk,
  target: Superluminal.Model
) => {
  // how to know if the foreign keys are shared even if
  // they have different names.

  const intersectingPrimaries: Record<string, string> = {};

  if (!target) {
    console.error(`${source.name} has a fk in a target of ${fk.targetColumns}`);
    console.error(`${fk.targetColumns} do not exist`);
    return;
  }

  if (target.primaryKeys && fk.targetColumns) {
    for (let i = 0; i < fk.sourceColumns.length; i++) {
      const sourceColumn = fk.sourceColumns[i];
      const targetColumn = fk.targetColumns[i];

      // is the source a primary key?
      const sourceIsPrimary = source.primaryKeys?.indexOf(sourceColumn) !== -1;
      const targetIsPrimary = target.primaryKeys?.indexOf(targetColumn) !== -1;

      if (sourceIsPrimary && targetIsPrimary) {
        intersectingPrimaries[sourceColumn] = targetColumn;
      }
    }
  }

  Object.entries(intersectingPrimaries).forEach(([sourceKey, targetKey]) => {
    // found 2 models with the same primary key
    // create the one to ones
    const allKeys = Object.keys(source.columns)
      .concat(Object.keys(source.joinColumns || []))
      .reduce<Record<string, boolean>>((acc, cur) => {
        acc[cur] = true;

        return acc;
      }, {});
    const fieldName = incrementJoinColumnIfNeeded(sourceKey, allKeys);
    target.oneToOnes = {
      ...target.oneToOnes,
      [source.name]: {
        inverse: fieldName,
        referencedColumn: sourceKey,
      },
    };

    const joinColumn: Superluminal.JoinColumnOption = {
      fieldName,
      referencedColumnName: sourceKey,
      name: fieldName,
    };

    source.oneToOnes = {
      ...source.oneToOnes,
      [target.name]: {
        inverse: targetKey,
        referencedColumn: targetKey,
        joinColumns: joinColumn,
      },
    };

    source.joinColumns = {
      ...source.joinColumns,
      [fieldName]: joinColumn,
    };
  });
};

export default handleSharedPrimaryKey;

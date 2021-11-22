import { camelCase } from 'lodash';
import hasOtherColumnNames from './hasOtherColumnNames';

const resolveColumnName = (model: Superluminal.Model) => {
  let resolvedColumnName = camelCase(model.name);

  let i = 1;

  if (hasOtherColumnNames(model, resolvedColumnName)) {
    while (hasOtherColumnNames(model, resolvedColumnName) && i < 5) {
      const existingDigits = resolvedColumnName.match(/\d+/);

      resolvedColumnName = `${resolvedColumnName.replace(/\d+/, '')}${
        existingDigits ? parseInt(existingDigits[0], 10) + 1 : 2
      }`;

      i++;
    }
  }

  return resolvedColumnName;
};

export default resolveColumnName;

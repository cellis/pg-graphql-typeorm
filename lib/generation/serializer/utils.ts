import { camelCase, startCase } from 'lodash';
import { plural } from 'pluralize';
export const PascalCase = (str = '') =>
  startCase(camelCase(str)).replace(/ /g, '');

export const getColumnName = (name: string, array: boolean | undefined) => {
  if (array) {
    return camelCase(plural(name));
  }

  return camelCase(name);
};

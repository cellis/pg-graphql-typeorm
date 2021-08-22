import resolveType from './resolveType';

export default (column: Superluminal.Column) => {
  if (column.primary) {
    return 'ID';
  }

  let result = '';
  const resolvedType = resolveType(column.dataType, column.array);

  switch (resolvedType) {
    case 'string':
    case 'string[]':
      result = 'String';
      break;
    case 'number':
    case 'number[]':
      result = 'Number';
      break;
    case 'boolean':
    case 'boolean[]':
      result = 'Boolean';
      break;

    case 'Date':
    case 'Date[]':
      result = 'Date';
      break;
    default:
      result = '';
      break;
  }

  if (column.array) {
    result = `[${result}]`;
  }

  return result;
};

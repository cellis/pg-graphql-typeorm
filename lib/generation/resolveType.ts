type ResolvedType =
  | 'string'
  | 'string[]'
  | 'number'
  | 'number[]'
  | 'Date'
  | 'uuid'
  | 'Date[]'
  | 'boolean'
  | 'boolean[]';

export function normalizeDefaultValue(value: string) {
  if (value.includes('::')) {
    return '';
  }

  return value;
}

const validTypes = {
  boolean: true,
  decimal: true,
  numeric: true,
  text: true,
  uuid: true,
  integer: true,
  real: true,
  'double precision': true,
  smallserial: true,
  serial: true,
  'character varying': true,
  'timestamp without time zone': true,
  'timestamp with time zone': true,
  timestamp: true,
  Date: true,
};

type ValidColumnType = keyof typeof validTypes;

export function resolveColumnType(type: string) {
  if (validTypes[type as ValidColumnType]) {
    return type;
  }

  return 'text';
}

function resolveType(type: string, isArray?: boolean): ResolvedType {
  let resolved: string;
  switch (type) {
    case 'boolean':
      resolved = 'boolean';
      break;
    case 'decimal':
    case 'numeric':
    case 'text':
      resolved = 'string';
      break;
    case 'integer':
    case 'bigint':
    case 'real':
    case 'double precision':
    case 'smallserial':
    case 'serial':
      resolved = 'number';
      break;
    case 'timestamp without time zone':
    case 'timestamp with time zone':
    case 'timestamp':
      resolved = 'Date';
      break;
    default:
      resolved = 'string';
  }

  if (isArray) {
    resolved += '[]';
  }

  return resolved as ResolvedType;
}

export default resolveType;

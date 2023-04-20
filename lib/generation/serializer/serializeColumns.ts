import resolveType, {
  normalizeDefaultValue,
  resolveColumnType,
} from '../resolveType';
import resolveTypeGraphqlType from '../resolveTypeGraphqlType';
import { getColumnName } from './utils';
const serializeColumn = (
  column: Superluminal.Column,
  existingColumns: Record<string, boolean>,
  options?: Superluminal.SerializeOptions
) => {
  const normalizedColumnName = getColumnName(column.name, column.array);

  if (existingColumns[normalizedColumnName]) {
    return '';
  }

  existingColumns[normalizedColumnName] = true;

  const columnBody = [`name: '${column.name}'`];
  if (column.primary) {
    columnBody.push('primary: true');

    if (column.autoIncrement) {
      columnBody.push('generated: true');
    }
  }

  if (column.nullable) {
    columnBody.push('nullable: true');
  }

  if (column.default) {
    const defaultType = resolveType(column.dataType, column.array);
    const normalizedValue = normalizeDefaultValue(column.default);

    let defaultVal = '';
    if (defaultType === 'number') {
      const defaultIsNumber = !isNaN(parseInt(normalizedValue, 10));
      defaultVal = defaultIsNumber ? normalizedValue : '0';
    } else {
      defaultVal = `'${normalizedValue}'`;
    }

    columnBody.push(`default: () => ${defaultVal}`);
  }

  const nullType = column.nullable ? ' | null' : '';
  // prettier-ignore
  const resolvedGraphqlType = resolveTypeGraphqlType(column);
  const graphqlReturn = resolvedGraphqlType.length
    ? `() => ${resolvedGraphqlType}`
    : '';

  let serialized: string[];

  if (column.primary && resolveType(column.dataType) === 'number') {
    serialized = [
      options?.graphql ? `  @Field(${graphqlReturn}${
        column.nullable ? ',{ nullable: true }' : ''
      })` : '',
      '  @PrimaryGeneratedColumn()',
      `  ${normalizedColumnName}: ${resolveType(
        column.dataType,
        column.array
      )}${nullType};`,
    ];
    
  } else {
    serialized = [
      options?.graphql ? `  @Field(${graphqlReturn}${
        column.nullable ? ',{ nullable: true }' : ''
      })` : '',
      `  @Column('${resolveColumnType(column.dataType)}', {`,
      `    ${columnBody.join(', ')},`,
      '  })',
      `  ${normalizedColumnName}: ${resolveType(
        column.dataType,
        column.array
      )}${nullType};`,
    ];
  }
  

  return serialized.filter((s) => s.trim().length).join('\n');
};

const serializeColumns = (
  model: Superluminal.Model,
  options?: Superluminal.SerializeOptions
) => {
  const existingColumns = {};
  return Object.keys(model.columns)
    .sort()
    .map((columnName) => {
      return serializeColumn(
        model.columns[columnName],
        existingColumns,
        options
      );
    })
    .filter((serialized) => serialized.length)
    .join('\n\n');
};

export default serializeColumns;

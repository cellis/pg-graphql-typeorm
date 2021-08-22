export default (
  name?: string,
  indexes?: string,
  schema?: string,
  PascalName?: string,
  columns?: string,
  associations?: string,
  options?: Superluminal.SerializeOptions
) => {
  // prettier-ignore
  const result = [
    `${indexes}`,
    `@Entity('${name}', { schema: '${schema}' })`,
    options?.graphql ? '@ObjectType()' : '',
    `export class ${PascalName} extends BaseEntity {`,
      `${columns}${associations ? '\n' : ''}`,
      `${associations}`,
    '}',
  ].filter(s => s.trim().length).join('\n');

  return result;
};

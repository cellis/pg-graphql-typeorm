import { PascalCase } from './utils';

export interface Import {
  partial?: string[];
  isModule?: boolean;
}
export type Imports = Record<string, Import>;
export interface SerializedModel {
  imports?: Imports;
  schema?: string;
  graphql?: boolean;
  columns?: Record<string, Superluminal.Column>;
  name?: string;
  primaryKeys?: string[];
  indexes?: Superluminal.Indexes;
}

const handleImports = (
  model: Superluminal.Model,
  graphql?: boolean
): Imports => {
  // serialized
  const imp0rts: Imports = {};

  const typeormImports = ['BaseEntity', 'Column', 'Entity'];

  if (model.manyToOnes) {
    typeormImports.push('ManyToOne', 'JoinColumn');

    for (const manyToOneImport of Object.keys(model.manyToOnes)) {
      imp0rts[manyToOneImport] = {
        isModule: false,
        partial: [PascalCase(manyToOneImport)],
      };
    }
  }

  if (model.oneToManys) {
    typeormImports.push('OneToMany');

    for (const oneToManyImport of Object.keys(model.oneToManys)) {
      imp0rts[oneToManyImport] = {
        isModule: false,
        partial: [PascalCase(oneToManyImport)],
      };
    }
  }

  if (model.oneToOnes) {
    typeormImports.push('OneToOne');

    for (const oneToOneImport of Object.keys(model.oneToOnes)) {
      imp0rts[oneToOneImport] = {
        isModule: false,
        partial: [PascalCase(oneToOneImport)],
      };
    }
  }

  const typeGraphqlImports = ['ObjectType', 'Field'];
  if (model.primaryKeys) {
    typeGraphqlImports.push('ID');
    // model.primaryKeys.forEach((pk) => {
    //   const column = model.columns[pk];

    //   if (column.autoIncrement
    // && resolveType(column.dataType) === 'number') {
    //     // TODO investigate PrimaryGeneratedColumn
    //     // vs column ({ generated: true, primary: true })
    //     // typeormImports.push('PrimaryGeneratedColumn');
    //   }
    // });
  }

  if (model.indexes) {
    typeormImports.push('Index');
  }

  if (graphql) {
    imp0rts['type-graphql'] = {
      isModule: true,
      partial: typeGraphqlImports,
    };
  }

  imp0rts.typeorm = {
    isModule: true,
    partial: typeormImports,
  };

  return imp0rts;
};

export default handleImports;

declare namespace Superluminal {
  interface Association {
    /**
     * field on the inverse model to refer to the calling Model
     */
    inverse: string;
  }
  interface JoinColumnOption {
    name: string;
    referencedColumnName: string;
    fieldName: string;
  }
  interface ManyToOne extends Association {
    joinColumns?: JoinColumnOption[];
    onDelete?: string;
  }

  interface OneToOne extends Association {
    joinColumns?: JoinColumnOption;
    referencedColumn: string;
  }

  interface SerializeOptions {
    graphql?: boolean;
  }

  type ManyToOneMeta = {
    pair: string[];
    onDelete?: string;
  };
  type AssociationRecord = Record<string, string[][] | undefined> | undefined;
  type ManyToOneRecord =
    | Record<string, ManyToOneMeta[] | undefined>
    | undefined;
  interface AssociationMapping {
    oneToManys: Record<string, AssociationRecord>;
    manyToOnes: Record<string, ManyToOneRecord>;
  }

  // helpers
  type ManyToOnes = Record<string, ManyToOne>;
  type OneToManys = Record<string, Association>;
  type OneToOnes = Record<string, OneToOne>;
  interface Column {
    type: string;
    array?: boolean;
    dataType: string;
    primary?: boolean;
    name: string;
    default?: string | null;
    nullable: boolean;
    autoIncrement?: boolean;
  }

  type Columns = Record<string, Column>;

  interface Index {
    columns: Array<string>;
    unique?: boolean;
  }

  interface Args {
    database?: string;
    host?: string;
    port?: number;
    schemas?: string;
    graphql?: boolean;
    output?: string;
  }

  interface Config {
    graphqlModels?: {
      exclude: Record<string, Record<string, boolean> | boolean>;
      excludeSchemas: Record<string, Record<string, boolean> | boolean>;
    };

    excludeRelationships?: Record<string, Record<string, boolean>>;
  }

  type Indexes = Record<string, Index>;
  type JoinColumns = Record<string, JoinColumnOption>;
  interface Model {
    name: string;
    schema: string;

    oneToOnes?: OneToOnes;
    oneToManys?: OneToManys;
    manyToOnes?: ManyToOnes;
    manyToManys?: Record<string, Association>;
    columns: Columns;
    primaryKeys?: string[];
    indexes?: Indexes;
    joinColumns?: JoinColumns;
  }

  interface Models {
    [name: string]: Model;
  }
}

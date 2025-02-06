declare module '@wmfs' {
  interface Introspection {
    generated: Date;
    schemas: Schemas;
  }

  type Schemas = Record<string, Schema>;
  type Tables = Record<string, Table>;
  interface Schema {
    schemaExistsInDatabase: boolean;
    comment: null;
    tables: Tables;
    views: Record<string, Table>;
  }

  type Columns = Record<string, ColumnMeta>;

  interface Trigger {
    eventManipulation: string;
    actionCondition: null;
    actionStatement: string;
    actionOrientation: string;
    actionTiming: string;
  }
  interface Table {
    comment: null;
    pkColumnNames: string[];
    columns: Columns;
    indexes: Indexes;
    triggers: Record<string, Trigger>;
    functions: Functions;
    fkConstraints: FkConstraints;
  }

  interface ColumnMeta {
    columnDefault: null | string;
    isNullable: IsNullable;
    dataType: string;
    characterMaximumLength: number | null;
    numericScale: number | null;
    comment: null;
    array: boolean;
  }

  enum IsNullable {
    No = 'NO',
    Yes = 'YES',
  }

  interface Fk {
    targetTable: string;
    sourceColumns: string[];
    targetColumns: string[];
    updateAction: string;
    deleteAction: string;
    matchType: string;
  }
  type FkConstraints = Record<string, Fk>;

  interface Function {
    dataType: DataType;
  }

  type Functions = Record<string, (...args: any) => any>;

  enum DataType {
    Boolean = 'boolean',
    UserDefined = 'USER-DEFINED',
  }

  type Indexes = Record<string, Index>;

  interface Index {
    columns: Array<string[]>;
    unique: boolean;
    method: string;
  }
}

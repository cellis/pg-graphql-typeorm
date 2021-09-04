export interface Import {
    partial?: string[];
    isModule?: boolean;
}
export declare type Imports = Record<string, Import>;
export interface SerializedModel {
    imports?: Imports;
    schema?: string;
    graphql?: boolean;
    columns?: Record<string, Superluminal.Column>;
    name?: string;
    primaryKeys?: string[];
    indexes?: Superluminal.Indexes;
}
declare const handleImports: (model: Superluminal.Model, graphql?: boolean | undefined) => Imports;
export default handleImports;

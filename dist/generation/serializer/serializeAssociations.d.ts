export declare const serializeOneToOne: (associatedModelName: string, oneToOne: Superluminal.OneToOne, columns: Superluminal.Columns) => string;
export declare const serializeOneToMany: (associatedModelName: string, oneToMany: Superluminal.Association) => string;
export declare const serializeManyToOne: (associatedModelName: string, manyToOne: Superluminal.ManyToOne) => string;
declare const _default: (model: Superluminal.Model, models: Superluminal.Models) => string;
export default _default;

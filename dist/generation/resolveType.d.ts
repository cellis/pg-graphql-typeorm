declare type ResolvedType = 'string' | 'string[]' | 'number' | 'number[]' | 'Date' | 'Date[]' | 'boolean' | 'boolean[]';
declare function resolveType(type: string, isArray?: boolean): ResolvedType;
export default resolveType;

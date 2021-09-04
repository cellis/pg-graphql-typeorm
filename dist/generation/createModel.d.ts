import { Table } from '@wmfs';
import { RawIndex } from '../introspection/indexesIntrospection';
declare const createModel: (modelName: string, schema: string, table: Table, models: Superluminal.Models, allIndexes: RawIndex[]) => void;
export default createModel;

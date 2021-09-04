import { Fk } from '@wmfs';
export declare const incrementJoinColumnIfNeeded: (name: string, existingFields: Record<string, boolean>) => string;
/**
 * When `source` and `target` share primary keys,
 * Should add OneToOnes in both.
 *
 * @param source
 * @param fk
 * @param target
 */
declare const handleSharedPrimaryKey: (source: Superluminal.Model, fk: Fk, target: Superluminal.Model) => void;
export default handleSharedPrimaryKey;

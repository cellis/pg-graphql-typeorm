import { Fk } from '@wmfs';
/**
 * When `model` has a foreign key in `foreignModel`,
 * should add a `OneToMany` in `foreignModel`.
 *
 * @param source
 * @param fk
 * @param target
 */
declare const handleForeignNonPrimaryKey: (source: Superluminal.Model, fk: Fk, target: Superluminal.Model) => void;
export default handleForeignNonPrimaryKey;

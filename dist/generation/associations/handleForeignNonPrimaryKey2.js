"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * When `model` has a foreign key in `foreignModel`,
 * should add a `OneToMany` in `foreignModel`.
 *
 * @param source
 * @param fk
 * @param target
 */
const handleForeignNonPrimaryKey2 = (source, fk, target, associationMapping) => {
    if (!target || !source) {
        if (!target && source) {
            console.error(`${source === null || source === void 0 ? void 0 : source.name} has a fk in a target of ${fk.targetColumns}`);
        }
        if (!source && target) {
            console.error(`${target.name} has a fk in a source of ${fk.sourceColumns}`);
        }
        return;
    }
    for (let i = 0; i < fk.sourceColumns.length; i++) {
        const sourceColumn = fk.sourceColumns[i];
        const targetColumn = fk.targetColumns[i];
        // is the source a primary key?
        const sourceIsPrimary = (source === null || source === void 0 ? void 0 : source.primaryKeys)
            ? source.primaryKeys.indexOf(sourceColumn) !== -1
            : false;
        const targetIsPrimary = (target === null || target === void 0 ? void 0 : target.primaryKeys)
            ? target.primaryKeys.indexOf(targetColumn) !== -1
            : false;
        if (sourceIsPrimary && targetIsPrimary) {
            // if these are both primaries we already handle this
            break;
        }
        const existingOneToManys = associationMapping.oneToManys[target.name] || {};
        const existingManyToOnes = associationMapping.manyToOnes[source.name] || {};
        const existingOTMKeys = existingOneToManys[source.name] || [];
        const existingMTOKeys = existingManyToOnes[target.name] || [];
        associationMapping.oneToManys = Object.assign(Object.assign({}, associationMapping.oneToManys), { [target.name]: Object.assign(Object.assign({}, existingOneToManys), { [source.name]: [...existingOTMKeys, [sourceColumn, targetColumn]] }) });
        const mtoMeta = {
            pair: [sourceColumn, targetColumn],
        };
        if (fk.deleteAction) {
            mtoMeta.onDelete = fk.deleteAction;
        }
        associationMapping.manyToOnes = Object.assign(Object.assign({}, associationMapping.manyToOnes), { [source.name]: Object.assign(Object.assign({}, existingManyToOnes), { [target.name]: [...existingMTOKeys, mtoMeta] }) });
    }
    return associationMapping;
};
exports.default = handleForeignNonPrimaryKey2;
//# sourceMappingURL=handleForeignNonPrimaryKey2.js.map
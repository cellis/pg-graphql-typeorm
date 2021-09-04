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
const handleForeignNonPrimaryKey = (source, fk, target) => {
    var _a, _b;
    for (let i = 0; i < fk.sourceColumns.length; i++) {
        const sourceColumn = fk.sourceColumns[i];
        const targetColumn = fk.targetColumns[i];
        // is the source a primary key?
        const sourceIsPrimary = ((_a = source.primaryKeys) === null || _a === void 0 ? void 0 : _a.indexOf(sourceColumn)) !== -1;
        const targetIsPrimary = ((_b = target.primaryKeys) === null || _b === void 0 ? void 0 : _b.indexOf(targetColumn)) !== -1;
        if (sourceIsPrimary && targetIsPrimary) {
            // if these are both primaries we already handle this
            break;
        }
        target.oneToManys = Object.assign(Object.assign({}, target.oneToManys), { [source.name]: {
                inverse: target.name,
            } });
        source.manyToOnes = Object.assign(Object.assign({}, source.manyToOnes), { [target.name]: {
                inverse: source.name,
                joinColumns: [
                    {
                        fieldName: target.name,
                        name: sourceColumn,
                        referencedColumnName: targetColumn,
                    },
                ],
                onDelete: fk.deleteAction,
            } });
    }
};
exports.default = handleForeignNonPrimaryKey;
//# sourceMappingURL=handleForeignNonPrimaryKey.js.map
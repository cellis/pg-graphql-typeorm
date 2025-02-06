"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementJoinColumnIfNeeded = void 0;
const incrementJoinColumnIfNeeded = (name, existingFields) => {
    const incrementBy = 1;
    const increment = 2;
    const endNum = /\d+$/g;
    let key = name;
    // we haven't found a key
    while (existingFields[key]) {
        const numbersFound = key.match(endNum);
        if (numbersFound) {
            let num = parseInt(numbersFound[0], 10);
            if (!isNaN(num)) {
                num += incrementBy;
            }
            key = key.replace(endNum, `${num}`);
        }
        else {
            // no numbers found already,
            // just append incrementBy
            key += `${increment}`;
        }
    }
    return key;
};
exports.incrementJoinColumnIfNeeded = incrementJoinColumnIfNeeded;
/**
 * When `source` and `target` share primary keys,
 * Should add OneToOnes in both.
 *
 * @param source
 * @param fk
 * @param target
 */
const handleSharedPrimaryKey = (source, fk, target) => {
    // how to know if the foreign keys are shared even if
    // they have different names.
    var _a, _b;
    const intersectingPrimaries = {};
    if (!target) {
        try {
            console.error(`${source.name} 
        has a fk in a target of ${fk.targetColumns}`);
            console.error(`${fk.targetColumns} do not exist`);
        }
        catch (error) { }
        return;
    }
    if (target.primaryKeys && fk.targetColumns) {
        for (let i = 0; i < fk.sourceColumns.length; i++) {
            const sourceColumn = fk.sourceColumns[i];
            const targetColumn = fk.targetColumns[i];
            // is the source a primary key?
            const sourceIsPrimary = ((_a = source.primaryKeys) === null || _a === void 0 ? void 0 : _a.indexOf(sourceColumn)) !== -1;
            const targetIsPrimary = ((_b = target.primaryKeys) === null || _b === void 0 ? void 0 : _b.indexOf(targetColumn)) !== -1;
            if (sourceIsPrimary && targetIsPrimary) {
                intersectingPrimaries[sourceColumn] = targetColumn;
            }
        }
    }
    Object.entries(intersectingPrimaries).forEach(([sourceKey, targetKey]) => {
        // found 2 models with the same primary key
        // create the one to ones
        const allKeys = Object.keys(source.columns)
            .concat(Object.keys(source.joinColumns || []))
            .reduce((acc, cur) => {
            acc[cur] = true;
            return acc;
        }, {});
        const fieldName = exports.incrementJoinColumnIfNeeded(sourceKey, allKeys);
        target.oneToOnes = Object.assign(Object.assign({}, target.oneToOnes), { [source.name]: {
                inverse: fieldName,
                referencedColumn: sourceKey,
            } });
        const joinColumn = {
            fieldName,
            referencedColumnName: sourceKey,
            name: fieldName,
        };
        source.oneToOnes = Object.assign(Object.assign({}, source.oneToOnes), { [target.name]: {
                inverse: targetKey,
                referencedColumn: targetKey,
                joinColumns: joinColumn,
            } });
        source.joinColumns = Object.assign(Object.assign({}, source.joinColumns), { [fieldName]: joinColumn });
    });
};
exports.default = handleSharedPrimaryKey;
//# sourceMappingURL=handleSharedPrimaryKey.js.map
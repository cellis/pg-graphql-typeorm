"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.default = (model) => {
    const indexes = model.indexes;
    const indexesStatement = indexes
        ? Object.keys(indexes)
            .sort()
            .map((idx) => {
            const index = indexes[idx];
            const columnNamesCamel = index.columns
                .map((name) => `'${lodash_1.camelCase(name)}'`)
                .join(',');
            const uniqueObj = index.unique ? '{ unique: true }' : '{}';
            return `@Index('${idx}', [${columnNamesCamel}], ${uniqueObj})`;
        })
            .join('\n')
        : '';
    return indexesStatement;
};
//# sourceMappingURL=serializeIndexes.js.map
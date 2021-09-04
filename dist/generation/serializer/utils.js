"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColumnName = exports.PascalCase = void 0;
const lodash_1 = require("lodash");
const pluralize_1 = require("pluralize");
const PascalCase = (str = '') => lodash_1.startCase(lodash_1.camelCase(str)).replace(/ /g, '');
exports.PascalCase = PascalCase;
const getColumnName = (name, array) => {
    if (array) {
        return lodash_1.camelCase(pluralize_1.plural(name));
    }
    return lodash_1.camelCase(name);
};
exports.getColumnName = getColumnName;
//# sourceMappingURL=utils.js.map
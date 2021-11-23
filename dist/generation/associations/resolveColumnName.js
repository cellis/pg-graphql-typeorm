"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const hasOtherColumnNames_1 = __importDefault(require("./hasOtherColumnNames"));
const resolveColumnName = (model) => {
    let resolvedColumnName = lodash_1.camelCase(model.name);
    let i = 1;
    if (hasOtherColumnNames_1.default(model, resolvedColumnName)) {
        while (hasOtherColumnNames_1.default(model, resolvedColumnName) && i < 5) {
            const existingDigits = resolvedColumnName.match(/\d+/);
            resolvedColumnName = `${resolvedColumnName.replace(/\d+/, '')}${existingDigits ? parseInt(existingDigits[0], 10) + 1 : 2}`;
            i++;
        }
    }
    return resolvedColumnName;
};
exports.default = resolveColumnName;
//# sourceMappingURL=resolveColumnName.js.map
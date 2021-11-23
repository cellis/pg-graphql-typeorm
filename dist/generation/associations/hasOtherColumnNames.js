"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hasOtherColumnNames(model, name) {
    const has = model.columns[name] || (model.oneToOnes && model.oneToOnes[name]);
    return has;
}
exports.default = hasOtherColumnNames;
//# sourceMappingURL=hasOtherColumnNames.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleImports_1 = __importDefault(require("./handleImports"));
const utils_1 = require("./utils");
const getPartial = (imp, importName) => {
    let partial = ' ';
    if (imp.partial) {
        partial = `{ ${imp.partial.sort().join(', ')} }`;
    }
    else {
        partial = utils_1.PascalCase(importName);
    }
    return partial;
};
exports.default = (model, options) => {
    const imp0rts = handleImports_1.default(model, options === null || options === void 0 ? void 0 : options.graphql);
    const sortedImports = Object.keys(imp0rts).sort();
    const topLevelImports = sortedImports
        .filter((i) => imp0rts[i].isModule)
        .map((importName) => {
        const imp = imp0rts[importName];
        return `import ${getPartial(imp, importName)} from '${importName}';`;
    });
    const associationImports = sortedImports
        .filter((i) => !imp0rts[i].isModule)
        .map((importName) => {
        const imp = imp0rts[importName];
        return `import ${getPartial(imp, importName)} from './${utils_1.PascalCase(importName)}';`;
    });
    return `${topLevelImports.concat(associationImports).join('\n')}\n`;
};
//# sourceMappingURL=serializeImports.js.map
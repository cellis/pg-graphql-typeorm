"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.default = (models) => {
    return Object.keys(models)
        .sort()
        .map((modelName) => {
        const Name = utils_1.PascalCase(modelName);
        return `export { ${Name} } from './${Name}';`;
    })
        .join('\n');
};
//# sourceMappingURL=serializeIndexFile.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serializeAssociations_1 = __importDefault(require("./serializeAssociations"));
const serializeBody_1 = __importDefault(require("./serializeBody"));
const serializeColumns_1 = __importDefault(require("./serializeColumns"));
const serializeImports_1 = __importDefault(require("./serializeImports"));
const serializeIndexes_1 = __importDefault(require("./serializeIndexes"));
const utils_1 = require("./utils");
exports.default = (model, models, options, associationMapping) => {
    // sort all imports first.
    const importStatement = serializeImports_1.default(model, options);
    const columnsStatement = serializeColumns_1.default(model, options);
    const indexesStatement = serializeIndexes_1.default(model);
    const associationsStatement = serializeAssociations_1.default(model, models, associationMapping);
    const bodyStatement = serializeBody_1.default(model.name, indexesStatement, model.schema, utils_1.PascalCase(model.name), columnsStatement, associationsStatement, options);
    const finalStatement = [importStatement, bodyStatement].join('\n');
    return finalStatement;
};
//# sourceMappingURL=serialize.js.map
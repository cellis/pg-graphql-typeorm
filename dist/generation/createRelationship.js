"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line
const indexesIntrospection_1 = require("../introspection/indexesIntrospection");
// eslint-disable-next-line
const handleForeignNonPrimaryKey_1 = __importDefault(require("./associations/handleForeignNonPrimaryKey"));
const handleForeignNonPrimaryKey2_1 = __importDefault(require("./associations/handleForeignNonPrimaryKey2"));
const handleSharedPrimaryKey_1 = __importDefault(require("./associations/handleSharedPrimaryKey"));
const createRelationship = (modelName, table, models, associationMapping) => {
    const model = models[modelName];
    for (const key of Object.keys(table.fkConstraints)) {
        const fk = table.fkConstraints[key];
        const normalizedTargetTable = indexesIntrospection_1.getTableFromFullyQualifiedPath(fk.targetTable);
        const foreignModel = models[normalizedTargetTable];
        handleSharedPrimaryKey_1.default(model, fk, foreignModel);
        handleForeignNonPrimaryKey_1.default(model, fk, foreignModel);
        handleForeignNonPrimaryKey2_1.default(model, fk, foreignModel, associationMapping);
    }
};
exports.default = createRelationship;
//# sourceMappingURL=createRelationship.js.map
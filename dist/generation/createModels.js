"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createModel_1 = __importDefault(require("./createModel"));
function createModels(models, introspection) {
    const { info, indexes } = introspection;
    if (info.schemas) {
        for (const [schemaName, schema] of Object.entries(info.schemas)) {
            if (schema.tables) {
                for (const [tableName, table] of Object.entries(schema.tables)) {
                    createModel_1.default(tableName, schemaName, table, models, indexes);
                }
            }
        }
    }
    return models;
}
exports.default = createModels;
//# sourceMappingURL=createModels.js.map
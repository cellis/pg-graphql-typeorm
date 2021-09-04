"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createRelationship_1 = __importDefault(require("./createRelationship"));
function createRelationships(models, introspection) {
    const { info } = introspection;
    for (const schema of Object.values(info.schemas)) {
        for (const [tableName, table] of Object.entries(schema.tables)) {
            createRelationship_1.default(tableName, table, models);
        }
    }
    return models;
}
exports.default = createRelationships;
//# sourceMappingURL=createRelationships.js.map
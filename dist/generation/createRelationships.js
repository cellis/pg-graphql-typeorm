"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createRelationship_1 = __importDefault(require("./createRelationship"));
function createRelationships(models, introspection, associationMapping, config = {}) {
    const { info } = introspection;
    if (info.schemas) {
        for (const schema of Object.values(info.schemas)) {
            if (schema.tables) {
                for (const [tableName, table] of Object.entries(schema.tables)) {
                    createRelationship_1.default(tableName, table, models, associationMapping, config);
                }
            }
        }
    }
    return models;
}
exports.default = createRelationships;
//# sourceMappingURL=createRelationships.js.map
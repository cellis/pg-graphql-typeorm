"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createModel_1 = __importDefault(require("./createModel"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const resolveType_1 = __importDefault(require("./resolveType"));
function generateTableHash(table) {
    // Order all properties consistently before hashing
    const orderedData = {
        columns: Object.entries(table.columns).sort(([a], [b]) => a.localeCompare(b))
            .map(([name, col]) => {
            const column = table.columns[name];
            return {
                name,
                type: col.dataType,
                allowNull: col.isNullable === 'YES',
                defaultValue: col.columnDefault,
                primaryKey: table.pkColumnNames.includes(name),
                autoIncrement: table.pkColumnNames.includes(name) &&
                    resolveType_1.default(column.dataType, column.array) === 'number',
            };
        }),
        indexes: Object.entries(table.indexes || {}).sort(([a], [b]) => a.localeCompare(b))
            .map(([name, idx]) => ({
            name,
            unique: idx.unique,
            fields: [...idx.columns].sort(),
        })),
    };
    return crypto_1.default.createHash('sha256')
        .update(JSON.stringify(orderedData))
        .digest('hex');
}
function createModels(models, introspection, config, checkHashes = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const { info, indexes } = introspection;
        const hashes = {};
        // Load existing hashes if available
        let existingHashes = {};
        const hashesPath = path_1.default.join(process.cwd(), config.output || '', 'entities.json');
        if (checkHashes) {
            try {
                existingHashes = JSON.parse(yield promises_1.default.readFile(hashesPath, 'utf-8'));
            }
            catch (error) {
                // File doesn't exist or is invalid, proceed with empty hashes
            }
        }
        if (info.schemas) {
            for (const [schemaName, schema] of Object.entries(info.schemas)) {
                if (schema.tables) {
                    for (const [tableName, table] of Object.entries(schema.tables)) {
                        if (checkHashes) {
                            const hash = generateTableHash(table);
                            hashes[tableName] = hash;
                            if (existingHashes[tableName] !== hash) {
                                createModel_1.default(tableName, schemaName, table, models, indexes);
                            }
                        }
                        else {
                            createModel_1.default(tableName, schemaName, table, models, indexes);
                        }
                    }
                }
            }
        }
        return { models, hashes };
    });
}
exports.default = createModels;
//# sourceMappingURL=createModels.js.map
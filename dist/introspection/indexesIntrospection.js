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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findIndexes = exports.loadIndexes = exports.getTableFromFullyQualifiedPath = exports.normalizeTableNameForReserved = void 0;
const queries_1 = require("./queries");
const normalizeTableNameForReserved = (tableName) => {
    return tableName.replace(/"/g, '');
};
exports.normalizeTableNameForReserved = normalizeTableNameForReserved;
const getTableFromFullyQualifiedPath = (fullyQualifiedTableName) => {
    return exports.normalizeTableNameForReserved(fullyQualifiedTableName.split('.').pop() || '');
};
exports.getTableFromFullyQualifiedPath = getTableFromFullyQualifiedPath;
function loadIndexes(client, schema) {
    return __awaiter(this, void 0, void 0, function* () {
        let indexData = [];
        const indexesQuery = queries_1.multipleSchemasIndexesQuery(schema.split(','));
        const { rows } = yield client.query(indexesQuery);
        indexData = rows.map((index) => {
            index.table_name = exports.normalizeTableNameForReserved(index.table_name);
            return index;
        });
        return indexData;
    });
}
exports.loadIndexes = loadIndexes;
function findIndexes(rawIndexes, table, schema) {
    const indexes = {};
    return (rawIndexes
        .filter((index) => index.table_name === `${schema}.${table}`)
        // .filter((index) => !index.is_primary)
        .reduce((indexes, index) => {
        indexes[index.index_name] = {
            columns: [index.index_keys],
            unique: index.is_unique,
            method: index.method,
        };
        return indexes;
    }, indexes));
}
exports.findIndexes = findIndexes;
//# sourceMappingURL=indexesIntrospection.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexesIntrospection_1 = require("../introspection/indexesIntrospection");
const resolveType_1 = __importDefault(require("./resolveType"));
const createModel = (modelName, schema, table, models, allIndexes) => {
    const model = {
        name: modelName,
        schema,
        columns: {},
        primaryKeys: table.pkColumnNames,
    };
    const tableIndexes = indexesIntrospection_1.findIndexes(allIndexes, modelName, schema);
    for (const [indexName, index] of Object.entries(tableIndexes)) {
        const slIndex = {
            unique: index.unique,
            columns: index.columns[0],
        };
        if (model.indexes) {
            model.indexes[indexName] = slIndex;
        }
        else {
            model.indexes = {
                [indexName]: slIndex,
            };
        }
    }
    let slColumn;
    for (const [columnName, column] of Object.entries(table.columns)) {
        slColumn = {
            name: columnName,
            dataType: column.dataType,
            type: resolveType_1.default(column.dataType, column.array),
            nullable: column.isNullable === 'YES',
            autoIncrement: table.pkColumnNames.includes(columnName) &&
                resolveType_1.default(column.dataType, column.array) === 'number',
            array: column.array,
        };
        if (table.pkColumnNames.includes(columnName)) {
            slColumn.primary = true;
        }
        if (column.columnDefault) {
            slColumn.default = column.columnDefault;
        }
        model.columns[columnName] = slColumn;
    }
    models[modelName] = model;
};
exports.default = createModel;
//# sourceMappingURL=createModel.js.map
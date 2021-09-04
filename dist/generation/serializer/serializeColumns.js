"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolveType_1 = __importStar(require("../resolveType"));
const resolveTypeGraphqlType_1 = __importDefault(require("../resolveTypeGraphqlType"));
const utils_1 = require("./utils");
const serializeColumn = (column, existingColumns, options) => {
    const normalizedColumnName = utils_1.getColumnName(column.name, column.array);
    if (existingColumns[normalizedColumnName]) {
        return '';
    }
    existingColumns[normalizedColumnName] = true;
    const columnBody = [`name: '${column.name}'`];
    if (column.primary) {
        columnBody.push('primary: true');
        if (column.autoIncrement) {
            columnBody.push('generated: true');
        }
    }
    if (column.nullable) {
        columnBody.push('nullable: true');
    }
    if (column.default) {
        const defaultType = resolveType_1.default(column.dataType, column.array);
        const normalizedValue = resolveType_1.normalizeDefaultValue(column.default);
        let defaultVal = '';
        if (defaultType === 'number') {
            const defaultIsNumber = !isNaN(parseInt(normalizedValue, 10));
            defaultVal = defaultIsNumber ? normalizedValue : '0';
        }
        else {
            defaultVal = `'${normalizedValue}'`;
        }
        columnBody.push(`default: () => ${defaultVal}`);
    }
    const nullType = column.nullable ? ' | null' : '';
    // prettier-ignore
    const resolvedGraphqlType = resolveTypeGraphqlType_1.default(column);
    const graphqlReturn = resolvedGraphqlType.length
        ? `() => ${resolvedGraphqlType}`
        : '';
    const serialized = [
        (options === null || options === void 0 ? void 0 : options.graphql) ? `  @Field(${graphqlReturn})` : '',
        `  @Column('${resolveType_1.resolveColumnType(column.dataType)}', {`,
        `    ${columnBody.join(', ')},`,
        '  })',
        `  ${normalizedColumnName}: ${resolveType_1.default(column.dataType, column.array)}${nullType};`,
    ]
        .filter((s) => s.trim().length)
        .join('\n');
    return serialized;
};
const serializeColumns = (model, options) => {
    const existingColumns = {};
    return Object.keys(model.columns)
        .sort()
        .map((columnName) => {
        return serializeColumn(model.columns[columnName], existingColumns, options);
    })
        .filter((serialized) => serialized.length)
        .join('\n\n');
};
exports.default = serializeColumns;
//# sourceMappingURL=serializeColumns.js.map
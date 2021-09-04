"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolveType_1 = __importDefault(require("./resolveType"));
exports.default = (column) => {
    if (column.primary) {
        return 'ID';
    }
    let result = '';
    const resolvedType = resolveType_1.default(column.dataType, column.array);
    switch (resolvedType) {
        case 'string':
        case 'string[]':
            result = 'String';
            break;
        case 'number':
        case 'number[]':
            result = 'Number';
            break;
        case 'boolean':
        case 'boolean[]':
            result = 'Boolean';
            break;
        case 'Date':
        case 'Date[]':
            result = 'Date';
            break;
        default:
            result = '';
            break;
    }
    if (column.array) {
        result = `[${result}]`;
    }
    return result;
};
//# sourceMappingURL=resolveTypeGraphqlType.js.map
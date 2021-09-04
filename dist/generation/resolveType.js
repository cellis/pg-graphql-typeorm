"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveColumnType = exports.normalizeDefaultValue = void 0;
function normalizeDefaultValue(value) {
    if (value.includes('::')) {
        return '';
    }
    return value;
}
exports.normalizeDefaultValue = normalizeDefaultValue;
const validTypes = {
    boolean: true,
    decimal: true,
    numeric: true,
    text: true,
    uuid: true,
    integer: true,
    real: true,
    'double precision': true,
    smallserial: true,
    serial: true,
    'character varying': true,
    'timestamp without time zone': true,
    'timestamp with time zone': true,
    timestamp: true,
    Date: true,
};
function resolveColumnType(type) {
    if (validTypes[type]) {
        return type;
    }
    return 'text';
}
exports.resolveColumnType = resolveColumnType;
function resolveType(type, isArray) {
    let resolved;
    switch (type) {
        case 'boolean':
            resolved = 'boolean';
            break;
        case 'decimal':
        case 'numeric':
        case 'text':
            resolved = 'string';
            break;
        case 'integer':
        case 'real':
        case 'double precision':
        case 'smallserial':
        case 'serial':
            resolved = 'number';
            break;
        case 'timestamp without time zone':
        case 'timestamp with time zone':
        case 'timestamp':
            resolved = 'Date';
            break;
        default:
            resolved = 'string';
    }
    if (isArray) {
        resolved += '[]';
    }
    return resolved;
}
exports.default = resolveType;
//# sourceMappingURL=resolveType.js.map
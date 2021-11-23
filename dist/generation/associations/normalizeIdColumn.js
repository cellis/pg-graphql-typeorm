"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function normalizeIdColumn(src) {
    let newSrc = src;
    if (src.endsWith('_id') || src.endsWith('_slug')) {
        newSrc = src.split('_').slice(0, -1).join('_');
    }
    return newSrc;
}
exports.default = normalizeIdColumn;
//# sourceMappingURL=normalizeIdColumn.js.map
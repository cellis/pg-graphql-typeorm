"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ProductTable = {
    url: {
        type: sequelize_1.STRING,
    },
    created_at: {
        type: sequelize_1.DATE,
        defaultValue: sequelize_1.NOW,
    },
    updated_at: {
        type: sequelize_1.DATE,
        defaultValue: sequelize_1.NOW,
    },
};
exports.default = ProductTable;
//# sourceMappingURL=ProductTable.js.map
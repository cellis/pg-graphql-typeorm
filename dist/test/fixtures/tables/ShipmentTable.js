"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ShipmentTable = {
    slug: {
        type: sequelize_1.UUID,
        allowNull: false,
        primaryKey: true,
    },
    from: {
        allowNull: false,
        primaryKey: false,
        references: {
            key: 'slug',
            model: 'user',
        },
        type: sequelize_1.UUID,
    },
    to: {
        allowNull: false,
        primaryKey: false,
        references: {
            key: 'slug',
            model: 'user',
        },
        type: sequelize_1.UUID,
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
exports.default = ShipmentTable;
//# sourceMappingURL=ShipmentTable.js.map
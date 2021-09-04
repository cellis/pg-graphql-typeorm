"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const AccountTable = {
    user_slug: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.UUID,
        references: {
            key: 'slug',
            model: 'user',
        },
    },
    email: {
        type: sequelize_1.STRING,
    },
    phone: {
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
exports.default = AccountTable;
//# sourceMappingURL=AccountTable.js.map
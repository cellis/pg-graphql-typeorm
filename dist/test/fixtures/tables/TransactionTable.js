"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const TransactionTable = {
    slug: {
        type: sequelize_1.UUID,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        allowNull: false,
        primaryKey: false,
        references: {
            key: 'slug',
            model: 'user',
        },
        type: sequelize_1.UUID,
    },
    transactionId: {
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
exports.default = TransactionTable;
//# sourceMappingURL=TransactionTable.js.map
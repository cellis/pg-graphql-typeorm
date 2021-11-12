"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.UUID,
    },
    response_to: {
        type: sequelize_1.UUID,
        references: {
            key: 'id',
            model: 'message',
        },
    },
    content: {
        type: sequelize_1.STRING,
    },
    created_at: {
        type: sequelize_1.DATE,
        defaultValue: sequelize_1.Sequelize.fn('now'),
    },
    updated_at: {
        type: sequelize_1.DATE,
        defaultValue: sequelize_1.NOW,
    },
};
//# sourceMappingURL=MessageTable.js.map
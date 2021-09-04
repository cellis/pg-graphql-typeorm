"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    slug: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.UUID,
    },
    first_name: {
        type: sequelize_1.STRING,
    },
    last_name: {
        type: sequelize_1.STRING,
    },
    credits: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    hobbies: {
        type: sequelize_1.ARRAY(sequelize_1.TEXT),
    },
    created_at: {
        type: sequelize_1.DATE,
        defaultValue: sequelize_1.Sequelize.fn('now'),
    },
    connected: {
        type: sequelize_1.BOOLEAN,
        default: false,
    },
    rating: {
        type: sequelize_1.DECIMAL,
        defaultValue: 0.88,
    },
    full_text: {
        type: sequelize_1.STRING,
    },
    updated_at: {
        type: sequelize_1.DATE,
        defaultValue: sequelize_1.NOW,
    },
};
//# sourceMappingURL=UserTable.js.map
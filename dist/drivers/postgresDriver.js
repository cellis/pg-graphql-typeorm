"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = (config) => {
    return new pg_1.Client(config);
};
//# sourceMappingURL=postgresDriver.js.map
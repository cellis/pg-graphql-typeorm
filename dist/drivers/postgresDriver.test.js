"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const postgresDriver_1 = __importDefault(require("./postgresDriver"));
describe('postgres', () => {
    it('returns a pg Client', () => {
        expect(postgresDriver_1.default({
            host: 'localhost',
            port: 5432,
            database: 'superluminal-test',
        })).toBeInstanceOf(pg_1.default.Client);
    });
});

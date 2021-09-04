"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const pg_1 = require("pg");
const pgtools_1 = __importDefault(require("pgtools"));
const q_1 = require("q");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const database = 'superluminal-test';
        console.log('Dropping database', database);
        const schema = 'superluminal';
        const schema2 = 'superluminal_private';
        const config = {
            host: 'localhost',
            port: 5432,
        };
        const client = new pg_1.Client(Object.assign(Object.assign({}, config), { database }));
        try {
            yield client.connect();
            yield client.query(`SELECT pg_terminate_backend(pg_stat_activity.pid)
        FROM pg_stat_activity
        WHERE pg_stat_activity.datname=$1
        AND pid <> pg_backend_pid();`, [database]);
            yield client.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE`);
            yield client.query(`DROP SCHEMA IF EXISTS ${schema2} CASCADE`);
            yield client.end();
        }
        catch (error) {
            console.log('Error closing connections or dropping schema', schema);
        }
        finally {
            yield client.end();
        }
        try {
            yield q_1.nfcall(pgtools_1.default.dropdb, config, database);
            console.log('Database', database, 'dropped');
        }
        catch (error) {
            console.log('Could not drop database', `${database}. Maybe it doesn't exist?`);
        }
    });
}
exports.run = run;
if (require.main === module) {
    run();
}
//# sourceMappingURL=dropDatabase.js.map
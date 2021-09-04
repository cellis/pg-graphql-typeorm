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
const signal_exit_1 = __importDefault(require("signal-exit"));
const MockData_1 = require("../test/fixtures/MockData");
const dropDatabase_1 = require("./dropDatabase");
function run(watch) {
    return __awaiter(this, void 0, void 0, function* () {
        const database = 'superluminal-test';
        const schema = 'superluminal';
        const schema2 = 'superluminal_private';
        const config = {
            host: 'localhost',
            port: 5432,
        };
        // first check if we already have the db while in watch mode:
        const pgClient = new pg_1.Client(Object.assign(Object.assign({}, config), { database: 'postgres' }));
        yield pgClient.connect();
        const { rows: [checkResult], } = yield pgClient.query(`SELECT EXISTS(
      SELECT datname FROM 
      pg_catalog.pg_database 
      WHERE lower(datname) = lower('${database}')
    );`);
        yield pgClient.end();
        if (checkResult.exists) {
            console.log('Database', database, 'was already created');
            return;
        }
        console.log('Creating database', database);
        try {
            yield q_1.nfcall(pgtools_1.default.createdb, config, database);
            console.log('Database', database, 'created');
        }
        catch (error) {
            console.log('Already have a database named', database);
        }
        try {
            const client = new pg_1.Client(Object.assign(Object.assign({}, config), { database }));
            yield client.connect();
            yield client.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
            yield client.query(`CREATE SCHEMA IF NOT EXISTS ${schema2}`);
            yield client.end();
            console.log('schema', schema, 'created');
            console.log('schema', schema2, 'created');
        }
        catch (error) {
            console.log('Could not create a schema named', schema);
        }
        yield MockData_1.generateMockTables({
            host: 'localhost',
            port: 5432,
        }, database, schema);
        if (watch) {
            signal_exit_1.default((code, signal) => __awaiter(this, void 0, void 0, function* () {
                // watching
                console.log('My watch has ended, drop the dab');
                yield dropDatabase_1.run();
            }));
        }
    });
}
exports.run = run;
if (require.main === module) {
    run(false);
}
//# sourceMappingURL=createDatabase.js.map
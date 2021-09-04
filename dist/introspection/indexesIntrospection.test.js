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
const connectTestDb_1 = __importDefault(require("../test/connectTestDb"));
const MockData_1 = require("../test/fixtures/MockData");
const indexesIntrospection_1 = require("./indexesIntrospection");
describe('indexes introspection', () => {
    let client;
    let indexes;
    beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
        client = yield connectTestDb_1.default();
        indexes = yield indexesIntrospection_1.loadIndexes(client, 'superluminal');
        done();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () { return client.end(); }));
    describe('multiple schemas', () => {
        beforeEach((done) => __awaiter(void 0, void 0, void 0, function* () {
            indexes = yield indexesIntrospection_1.loadIndexes(client, 'superluminal,superluminal_private');
            done();
        }));
        it('finds indexes of all', () => {
            expect(indexes.length).toBeGreaterThan(0);
        });
    });
    describe('all indexes', () => {
        it('loads all indexes', () => {
            expect(indexes).toMatchSnapshot();
        });
    });
    describe('normalizeForUser', () => {
        it('returns \'user\' for "user"', () => {
            expect(indexesIntrospection_1.normalizeForUser('"user"')).toBe('user');
        });
    });
    describe('getTableFromFullyQualifiedPath', () => {
        it('returns \'user\' for superluminal."user"', () => {
            expect(indexesIntrospection_1.getTableFromFullyQualifiedPath('superluminal."user"')).toBe('user');
        });
    });
    describe('find index', () => {
        it('finds the indexes for that model', () => {
            const foundIndexes = indexesIntrospection_1.findIndexes(indexes, 'user', 'superluminal');
            const expected = {
                columns: [['slug']],
                unique: true,
                method: 'btree',
            };
            expect(foundIndexes['user_pkey']).toEqual(expected);
        });
    });
    describe('user index', () => {
        it('normalizes the user index', () => __awaiter(void 0, void 0, void 0, function* () {
            expect(indexes.filter((index) => index.table_name === 'superluminal.user')).toHaveLength(MockData_1.UserIndexes.length);
        }));
    });
});

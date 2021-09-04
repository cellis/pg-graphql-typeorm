"use strict";
// need a column serializer that takes column
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
const introspectDb_1 = __importDefault(require("../introspection/introspectDb"));
const connectTestDb_1 = __importDefault(require("../test/connectTestDb"));
const MockData_1 = require("../test/fixtures/MockData");
const createModels_1 = __importDefault(require("./createModels"));
describe('createModel', () => {
    let client;
    let indexes;
    let User;
    let Product;
    beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
        client = yield connectTestDb_1.default();
        const introspection = yield introspectDb_1.default(client, ['superluminal']);
        const models = createModels_1.default({}, introspection);
        User = models.user;
        Product = models.product;
        indexes = User.indexes || {};
        done();
    }));
    afterAll(() => {
        return client.end();
    });
    describe('table schema', () => {
        it('sets the schema on the model', () => {
            expect(User.schema).toBe('superluminal');
        });
    });
    describe('when a table has indexes', () => {
        it('generates a model with indexes', () => {
            expect(indexes).toMatchSnapshot();
            expect(indexes[MockData_1.userFullTextIdxName]).toEqual({
                columns: ['full_text'],
                unique: false,
            });
        });
        describe('a unique index', () => {
            it('generates a model with a unique index', () => {
                expect(indexes[MockData_1.userPrimaryKeyName]).toEqual({
                    columns: ['slug'],
                    unique: true,
                });
            });
        });
    });
    describe('when a table has columns', () => {
        it('handles default columns', () => {
            expect(User.columns['created_at'].default).toBe('now()');
        });
        it('generates a model with columns', () => {
            expect(User.columns['first_name']).toEqual({
                name: 'first_name',
                dataType: 'character varying',
                array: false,
                type: 'string',
                nullable: true,
                autoIncrement: false,
            });
        });
        it('handles autoincrementing column types, ok-ish', () => {
            expect(Product.columns['id']).toMatchObject({
                autoIncrement: true,
            });
        });
        it('handles column primitive types properly', () => {
            expect(User.columns['credits'].type).toBe('number');
        });
        it('handles column array types properly', () => {
            expect(User.columns['hobbies'].type).toBe('string[]');
        });
    });
});

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
const introspectDb_1 = __importDefault(require("../../introspection/introspectDb"));
const connectTestDb_1 = __importDefault(require("../../test/connectTestDb"));
const createModels_1 = __importDefault(require("../createModels"));
const createRelationships_1 = __importDefault(require("../createRelationships"));
const handleImports_1 = __importDefault(require("./handleImports"));
/* eslint-disable @typescript-eslint/no-non-null-assertion */
describe('handleImports', () => {
    let client;
    let User;
    let Photo;
    let Product;
    beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
        client = yield connectTestDb_1.default();
        const introspection = yield introspectDb_1.default(client, ['superluminal']);
        const models = {};
        createModels_1.default(models, introspection);
        createRelationships_1.default(models, introspection);
        User = models.user;
        Photo = models.photo;
        Product = models.product;
        done();
    }));
    afterAll(() => {
        return client.end();
    });
    describe('top level imports', () => {
        // should add top level imports first
        it('adds top level imports at the top of the import', () => {
            const imp0rts = handleImports_1.default(User, true);
            const topLevelImports = Object.keys(imp0rts)
                .filter((key) => {
                return imp0rts[key].isModule;
            })
                .sort();
            const expected = ['type-graphql', 'typeorm'];
            expect(topLevelImports).toEqual(expect.arrayContaining(expected));
        });
    });
    describe('association imports', () => {
        it('adds all OneToMany imports', () => {
            const imp0rts = handleImports_1.default(User);
            expect(Object.keys(imp0rts)).toEqual(expect.arrayContaining(['transaction', 'photo']));
            expect(imp0rts.photo).toEqual({
                isModule: false,
                partial: ['Photo'],
            });
        });
        it('adds all OneToOne imports', () => {
            const imp0rts = handleImports_1.default(User);
            expect(imp0rts.account).toEqual({
                isModule: false,
                partial: ['Account'],
            });
        });
        it('adds JoinColumn to ManyToOne imports', () => {
            const imp0rts = handleImports_1.default(Photo);
            expect(imp0rts.typeorm.partial).toEqual(expect.arrayContaining(['JoinColumn']));
        });
    });
    describe('model has Indexes', () => {
        it('includes "Index" in type-graphql imports', () => {
            const imp0rts = handleImports_1.default(Photo, true);
            expect(imp0rts.typeorm.partial).toEqual(expect.arrayContaining(['Index']));
        });
    });
    describe('model has auto-incrementing primary keys', () => {
        it('includes "ID" in type-graphql imports', () => {
            const imp0rts = handleImports_1.default(Product, true);
            expect(imp0rts['type-graphql'].partial).toEqual(expect.arrayContaining(['ID']));
        });
    });
    describe('model has manyToOnes', () => {
        it('includes "ManyToOne" in typeorm imports', () => {
            const imp0rts = handleImports_1.default(Photo);
            expect(imp0rts.typeorm.partial).toEqual(expect.arrayContaining(['ManyToOne']));
        });
    });
    describe('model has oneToManys', () => {
        it('includes "OneToMany" in typeorm imports', () => {
            const imp0rts = handleImports_1.default(User);
            expect(imp0rts.typeorm.partial).toEqual(expect.arrayContaining(['OneToMany']));
        });
    });
    describe('model has oneToOnes', () => {
        it('includes "OneToOne" in typeorm imports', () => {
            const imp0rts = handleImports_1.default(User);
            expect(imp0rts.typeorm.partial).toEqual(expect.arrayContaining(['OneToOne']));
        });
    });
});

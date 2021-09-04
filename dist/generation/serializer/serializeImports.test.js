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
const serializeImports_1 = __importDefault(require("./serializeImports"));
describe('serializeImports', () => {
    let client;
    let User;
    beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
        client = yield connectTestDb_1.default();
        const introspection = yield introspectDb_1.default(client, ['superluminal']);
        const models = {};
        createModels_1.default(models, introspection);
        createRelationships_1.default(models, introspection);
        User = models.user;
        done();
    }));
    afterAll(() => {
        return client.end();
    });
    it('serializes the imports properly', () => {
        expect(serializeImports_1.default(User)).toMatchInlineSnapshot(`
      "import { BaseEntity, Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
      import { Account } from './Account';
      import { Photo } from './Photo';
      import { Transaction } from './Transaction';
      "
    `);
    });
    it('serializes the graphql imports properly', () => {
        expect(serializeImports_1.default(User, { graphql: true })).toMatchSnapshot();
    });
});

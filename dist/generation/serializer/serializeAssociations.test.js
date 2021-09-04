"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const serializeAssociations_1 = __importStar(require("./serializeAssociations"));
/* eslint-disable @typescript-eslint/no-non-null-assertion */
describe('serializeAssociations', () => {
    let client;
    let User;
    let Account;
    let Photo;
    let models;
    beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
        client = yield connectTestDb_1.default();
        const introspection = yield introspectDb_1.default(client, ['superluminal']);
        models = {};
        createModels_1.default(models, introspection);
        createRelationships_1.default(models, introspection);
        User = models.user;
        Account = models.account;
        Photo = models.photo;
        done();
    }));
    afterAll(() => {
        return client.end();
    });
    describe('OneToOne', () => {
        it('serializes OneToOnes', () => {
            expect(serializeAssociations_1.serializeOneToOne('account', User.oneToOnes.account, Account.columns)).toMatchInlineSnapshot(`
        "  @OneToOne(() => Account, (account) => account.userSlug)
          account: Account;"
      `);
        });
    });
    describe('ManyToOne', () => {
        it('serializes ManyToOnes', () => {
            expect(serializeAssociations_1.serializeManyToOne('user', Photo.manyToOnes.user))
                .toMatchInlineSnapshot(`
        "  @ManyToOne(
            () => User,
            user => user.photos,
            { onDelete: 'NO ACTION' }
          )
          @JoinColumn([{ name: 'user_id', referencedColumnName: 'slug' }])
          user: User;"
      `);
        });
    });
    describe('OneToMany', () => {
        it('serializes OneToManys', () => {
            expect(serializeAssociations_1.serializeOneToMany('photo', User.oneToManys.photo))
                .toMatchInlineSnapshot(`
        "  @OneToMany(() => Photo, (photo) => photo.user)
          photos: Photo[];"
      `);
        });
    });
    describe('serializeAssociations', () => {
        it('serializes all associations', () => {
            expect(serializeAssociations_1.default(User, models)).toMatchInlineSnapshot(`
        "  @OneToOne(() => Account, (account) => account.userSlug)
          account: Account;

          @OneToMany(() => Transaction, (transaction) => transaction.user)
          transactions: Transaction[];

          @OneToMany(() => Photo, (photo) => photo.user)
          photos: Photo[];"
      `);
        });
    });
});

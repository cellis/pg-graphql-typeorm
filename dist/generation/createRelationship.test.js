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
const introspectDb_1 = __importDefault(require("../introspection/introspectDb"));
const connectTestDb_1 = __importDefault(require("../test/connectTestDb"));
const createModels_1 = __importDefault(require("./createModels"));
const createRelationships_1 = __importDefault(require("./createRelationships"));
describe('createRelationship', () => {
    let client;
    let User;
    let Photo;
    let Transaction;
    beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
        client = yield connectTestDb_1.default();
        const introspection = yield introspectDb_1.default(client, ['superluminal']);
        const models = {};
        createModels_1.default(models, introspection);
        createRelationships_1.default(models, introspection);
        User = models.user;
        Photo = models.photo;
        Transaction = models.transaction;
        done();
    }));
    afterAll(() => {
        return client.end();
    });
    describe('when 2 models share the same primary key', () => {
        it('adds a OneToOne column to both models', () => {
            const userExpectedOneToOnes = {
                account: {
                    inverse: 'user_slug2',
                    referencedColumn: 'user_slug',
                },
            };
            expect(User.oneToOnes).toEqual(userExpectedOneToOnes);
        });
    });
    const HasForeignNonPrimaryKey = 'model has a foreign non primary key in a target table';
    describe(HasForeignNonPrimaryKey, () => {
        const oneToManyOfUser = (source) => {
            const result = {
                user: {
                    inverse: source,
                    onDelete: 'NO ACTION',
                    joinColumns: [
                        {
                            name: 'user_id',
                            referencedColumnName: 'slug',
                            fieldName: 'user',
                        },
                    ],
                },
            };
            return result;
        };
        it('adds a OneToMany in the target table', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            expect((_a = User.oneToManys) === null || _a === void 0 ? void 0 : _a.photo).toEqual({
                inverse: 'user',
            });
        }));
        it('adds a ManyToOne in the source table', () => {
            expect(Photo.manyToOnes).toEqual(oneToManyOfUser('photo'));
        });
        it('handles multiple oneToManys', () => {
            // eslint-disable-next-line
            expect(Object.keys(User.oneToManys).sort()).toEqual(['photo', 'transaction'].sort());
        });
    });
    describe('when 2 models have a junction table', () => {
        // it('creates a ManyToMany column for both models', () => {
        // });
    });
});

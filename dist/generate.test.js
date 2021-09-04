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
const fs_1 = __importDefault(require("fs"));
const generate_1 = __importDefault(require("./generate"));
jest.mock('./config/loadConfig');
jest.mock('fs', () => ({
    readFileSync: jest.fn(),
    promises: {
        writeFile: jest.fn(),
        mkDir: jest.fn(),
    },
}));
describe('generate', () => {
    const entitiesDirectory = './dist/superluminal-test-entities';
    const database = 'superluminal-test';
    const schema = 'superluminal';
    const modelGenerationAssertion = 'generates a model file for each table in the output directory';
    describe('with one schema', () => {
        beforeEach(() => {
            process.argv.push('-o', entitiesDirectory);
            process.argv.push('-d', database);
            process.argv.push('-s', schema);
        });
        it(modelGenerationAssertion, () => __awaiter(void 0, void 0, void 0, function* () {
            yield generate_1.default();
            expect(fs_1.default.promises.writeFile).toHaveBeenCalled();
        }));
    });
    describe('with multiple schemas', () => {
        beforeEach(() => {
            process.argv.push('-o', entitiesDirectory);
            process.argv.push('-d', database);
            process.argv.push('-s', `${schema},superluminal_private`);
        });
        it(modelGenerationAssertion, () => __awaiter(void 0, void 0, void 0, function* () {
            yield generate_1.default();
            expect(fs_1.default.promises.writeFile).toBeCalled();
        }));
    });
    describe('with no schemas', () => {
        beforeEach(() => {
            process.argv.push('-o', entitiesDirectory);
            process.argv.push('-d', database);
        });
        it(modelGenerationAssertion, () => __awaiter(void 0, void 0, void 0, function* () {
            yield generate_1.default();
            expect(fs_1.default.promises.writeFile).toBeCalled();
        }));
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
});

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
// eslint-disable-next-line
// @ts-ignore
const path_1 = require("path");
const typescriptConfig_1 = __importDefault(require("../test/fixtures/files/typescriptConfig"));
const loadConfig_1 = __importDefault(require("./loadConfig"));
describe('loadConfig', () => {
    // loads the config from ftljs
    describe('ts config', () => {
        beforeEach(() => {
            jest.mock(path_1.resolve(process.cwd(), '.ftlrc.ts'), () => ({ default: typescriptConfig_1.default }), {
                virtual: true,
            });
        });
        it('loads the Typescript config from .ftlrc.ts', () => __awaiter(void 0, void 0, void 0, function* () {
            const actualFtlTsRc = yield typescriptConfig_1.default();
            const loadedFtlTsRc = yield loadConfig_1.default();
            expect(loadedFtlTsRc).toEqual(actualFtlTsRc);
        }));
        afterAll(() => {
            jest.unmock(path_1.resolve(process.cwd(), '.ftlrc.ts'));
        });
    });
});

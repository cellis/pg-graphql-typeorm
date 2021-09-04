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
const path_1 = require("path");
const loadConfig_1 = __importDefault(require("./loadConfig"));
// eslint-disable-next-line
const mockFtljs = require('../test/fixtures/files/javascriptConfig');
describe('loadConfig', () => {
    // loads the config from ftljs
    describe('js config', () => {
        beforeEach(() => {
            jest.mock(path_1.resolve(process.cwd(), '.ftlrc.ts'), () => undefined);
            jest.mock(path_1.resolve(process.cwd(), '.ftlrc.js'), () => mockFtljs, {
                virtual: true,
            });
        });
        it('loads the Javascript config from .ftlrc.js', () => __awaiter(void 0, void 0, void 0, function* () {
            const actualFtlJsRc = mockFtljs();
            const loadedFtlJSRc = yield loadConfig_1.default();
            expect(loadedFtlJSRc).toEqual(actualFtlJsRc);
        }));
        afterAll(() => {
            jest.unmock(path_1.resolve(process.cwd(), '.ftlrc.ts'));
            jest.unmock(path_1.resolve(process.cwd(), '.ftlrc.js'));
        });
    });
});

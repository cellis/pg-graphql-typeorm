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
    let spiedConsole;
    const entitiesDirectory = './dist/superluminal-test-entities';
    ('generates a model file for each table in the output directory');
    let oldArgv;
    beforeAll(() => {
        spiedConsole = jest.spyOn(console, 'error').mockImplementation();
    });
    describe('bad input', () => {
        it('prints errors and exits', () => __awaiter(void 0, void 0, void 0, function* () {
            // prettier-ignore
            process.argv.push('-o', entitiesDirectory, '-d', 'some_db_that_doesnt_exist', '-s', 'bad_schema');
            yield generate_1.default();
            process.argv = oldArgv;
            expect(spiedConsole).toHaveBeenCalled();
        }));
    });
});

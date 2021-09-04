"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generate_1 = __importDefault(require("./generate"));
jest.mock('./generate', () => ({ __esModule: true, default: jest.fn() }));
describe('cli', () => {
    it('calls generate', () => {
        require('./cli');
        expect(generate_1.default).toBeCalled();
    });
});

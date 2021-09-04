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
const pg_info_1 = __importDefault(require("@wmfs/pg-info"));
const fs_1 = require("fs");
const path_1 = require("path");
const pg_1 = __importDefault(require("pg"));
const q_1 = require("q");
const quicktype_core_1 = require("quicktype-core");
function quicktypeJSON(targetLanguage, typeName, jsonString) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonInput = quicktype_core_1.jsonInputForTargetLanguage(targetLanguage);
        // We could add multiple samples for the same desired
        // type, or many sources for other types. Here we're
        // just making one type from one piece of sample JSON.
        yield jsonInput.addSource({
            name: typeName,
            samples: [jsonString],
        });
        const inputData = new quicktype_core_1.InputData();
        inputData.addInput(jsonInput);
        return yield quicktype_core_1.quicktype({
            inputData,
            lang: targetLanguage,
        });
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.default.Client('postgres://postgres:postgres@localhost:5432/mojibuzz');
        yield client.connect();
        const info = yield pg_info_1.default({
            client,
            schemas: ['mojibuzz', 'mojibuzz_private'],
        });
        const { lines: WMFSTypes } = yield quicktypeJSON('TypeScript', 'Introspection', JSON.stringify(info));
        yield q_1.nfcall(fs_1.writeFile, path_1.resolve(__dirname, '../dist/Introspection.ts'), WMFSTypes.join('\n'), 'utf-8');
        yield client.end();
    });
}
run();
//# sourceMappingURL=gen-wmfs-types.js.map
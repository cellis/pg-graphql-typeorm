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
const path_1 = require("path");
const loadConfig_1 = __importDefault(require("./config/loadConfig"));
const postgresDriver_1 = __importDefault(require("./drivers/postgresDriver"));
const createModels_1 = __importDefault(require("./generation/createModels"));
const createRelationships_1 = __importDefault(require("./generation/createRelationships"));
const serialize_1 = __importDefault(require("./generation/serializer/serialize"));
const serializeIndexFile_1 = __importDefault(require("./generation/serializer/serializeIndexFile"));
const utils_1 = require("./generation/serializer/utils");
const processYargs_1 = __importDefault(require("./input/processYargs"));
const introspectDb_1 = __importDefault(require("./introspection/introspectDb"));
const { writeFile, mkdir } = fs_1.default.promises;
function generate() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { host, port, schemas: schemasRaw, database, graphql, } = processYargs_1.default();
            let { output } = processYargs_1.default();
            const config = yield loadConfig_1.default();
            output = output || path_1.resolve(process.cwd(), 'ftl-models');
            const schemas = (schemasRaw === null || schemasRaw === void 0 ? void 0 : schemasRaw.split(',')) || ['public'];
            const client = postgresDriver_1.default({
                host,
                port,
                database,
            });
            yield client.connect();
            const introspection = yield introspectDb_1.default(client, schemas);
            const models = {};
            createModels_1.default(models, introspection);
            createRelationships_1.default(models, introspection);
            for (const [modelName, model] of Object.entries(models)) {
                const serialized = serialize_1.default(model, models, { graphql: !!graphql });
                const fileName = utils_1.PascalCase(modelName);
                try {
                    yield mkdir(output, { recursive: true });
                }
                catch (error) { }
                yield writeFile(path_1.resolve(`${output}`, `${fileName}.ts`), serialized);
            }
            const indexFile = serializeIndexFile_1.default(models);
            yield writeFile(path_1.resolve(`${output}`, 'index.ts'), indexFile);
            yield client.end();
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.default = generate;
//# sourceMappingURL=generate.js.map
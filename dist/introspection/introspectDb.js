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
const indexesIntrospection_1 = require("./indexesIntrospection");
exports.default = (client, schemas) => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield pg_info_1.default({
        client,
        schemas,
    });
    const indexes = yield indexesIntrospection_1.loadIndexes(client, schemas.join(','));
    return {
        indexes,
        info,
    };
});
//# sourceMappingURL=introspectDb.js.map
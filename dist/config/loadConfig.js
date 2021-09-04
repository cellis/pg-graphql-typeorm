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
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
// When we transpile to js,
// the require('./.ftlrc.ts') command would fail
// without this import
require("typescript-require");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    let configFunction = undefined;
    let config = {};
    const cwd = process.cwd();
    try {
        // eslint-disable-next-line
        configFunction = require(path_1.resolve(cwd, '.ftlrc.ts')).default;
        if (configFunction) {
            return yield configFunction();
        }
    }
    catch (error) { }
    if (!configFunction) {
        try {
            configFunction = require(path_1.resolve(cwd, '.ftlrc.js'));
        }
        catch (err) { }
    }
    if (configFunction) {
        config = yield configFunction();
    }
    return config;
});
//# sourceMappingURL=loadConfig.js.map
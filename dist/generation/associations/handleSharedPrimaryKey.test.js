"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountSnapshot_1 = __importDefault(require("../../test/fixtures/snapshots/AccountSnapshot"));
// eslint-disable-next-line
const AccountUserFKSnapshot_1 = __importDefault(require("../../test/fixtures/snapshots/AccountUserFKSnapshot"));
const UserSnapshot_1 = __importDefault(require("../../test/fixtures/snapshots/UserSnapshot"));
const handleSharedPrimaryKey_1 = __importStar(require("./handleSharedPrimaryKey"));
describe('handleSharedPrimaryKey', () => {
    describe('OneToOne', () => {
        it('aliases names to prevent column conflicts', () => {
            var _a, _b, _c;
            const account = Object.assign({}, AccountSnapshot_1.default);
            const user = Object.assign({}, UserSnapshot_1.default);
            const fk = Object.assign({}, AccountUserFKSnapshot_1.default);
            // TODO could replace with models here
            handleSharedPrimaryKey_1.default(account, fk, user);
            expect((_b = (_a = account.oneToOnes) === null || _a === void 0 ? void 0 : _a.user.joinColumns) === null || _b === void 0 ? void 0 : _b.fieldName).toBe('user_slug2');
            expect((_c = user.oneToOnes) === null || _c === void 0 ? void 0 : _c.account.inverse).toBe('user_slug2');
        });
    });
});
describe('incrementJoinColumnIfNeeded', () => {
    describe('on conflict', () => {
        it('increments the join column', () => {
            expect(handleSharedPrimaryKey_1.incrementJoinColumnIfNeeded('yo', {
                yo: true,
            })).toBe('yo2');
        });
        it('handles already numbered columns', () => {
            expect(handleSharedPrimaryKey_1.incrementJoinColumnIfNeeded('yo21', {
                yo21: true,
            })).toBe('yo22');
        });
        it('returns same key if none', () => {
            expect(handleSharedPrimaryKey_1.incrementJoinColumnIfNeeded('yo21', {})).toBe('yo21');
        });
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spyConsole = void 0;
function spyConsole() {
    const spy = {};
    beforeEach(() => {
        spy.console = jest.spyOn(console, 'error').mockImplementation(() => { });
    });
    afterEach(() => {
        var _a;
        (_a = spy.console) === null || _a === void 0 ? void 0 : _a.mockClear();
    });
    afterAll(() => {
        var _a;
        (_a = spy.console) === null || _a === void 0 ? void 0 : _a.mockRestore();
    });
    return spy;
}
exports.spyConsole = spyConsole;
//# sourceMappingURL=helpers.js.map
/// <reference types="jest" />
export interface SpiedConsole {
    console?: jest.SpyInstance;
}
export declare function spyConsole(): SpiedConsole;

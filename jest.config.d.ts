declare const ignorePatterns: string[];
export declare const preset: string;
export declare const testEnvironment: string;
export declare const testMatch: string[];
export declare const transform: {
    '^.+\\.(ts|tsx)$': string;
};
export declare const collectCoverage: boolean;
export declare const globalSetup: string;
export declare const globalTeardown: string;
export { ignorePatterns as coveragePathIgnorePatterns, ignorePatterns as testPathIgnorePatterns };

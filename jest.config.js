const ignorePatterns = [
  '/node_modules/',
  '<rootDir>/lib/test/fixtures',
  '<rootDir>/dist/',
  '<rootDir>/lib/scripts',
  '<rootDir>/.ftlrc.js',
  '<rootDir>/.ftlrc.ts',
];

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverage: true,
  coveragePathIgnorePatterns: ignorePatterns,
  testPathIgnorePatterns: ignorePatterns,
  globalSetup: './jest/globalSetup.ts',
  globalTeardown: './jest/globalTeardown.ts',
};

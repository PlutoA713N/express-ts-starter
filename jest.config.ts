/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/src/tests/**/*.test.ts"],
    transform: {
        "^.+\.tsx?$": ["ts-jest",{}],
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/controllers/**/*.ts'],
    coverageReporters: ["text", "lcov"],
    coverageThreshold: {
        global: {
            statements: 80,
            branches: 70,
            functions: 80,
            lines: 80
        }
    }
    // globalSetup: "./src/tests/config/testSetup.ts",
    // globalTeardown: "./src/tests/config/testTeardown.ts",
    // setupFilesAfterEnv: [],
};
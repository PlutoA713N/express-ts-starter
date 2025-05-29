/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/src/tests/**/*.test.ts"],
    transform: {
        "^.+\.tsx?$": ["ts-jest",{}],
    },
    collectCoverage: true,
    collectCoverageFrom: [
        'src/models/**/*.ts', // this is the only file that needs to be tested
        // add the folders or files that need to be tested or uncommet the line below
        // 'src/**/*.ts', // all ts files in src
        // '!src/**/*.test.ts', // exclude test files
        // '!src/index.ts', // optionally exclude entry points
    ],
    // coverageReporters: ["text", "lcov"], // use it if you want to see the coverage report in the files
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
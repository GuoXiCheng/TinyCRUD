module.exports = {
    testTimeout: 120000,
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverageFrom: [
        "src/**/*.ts", // 包括 src 目录下所有的 TypeScript 文件
        "!src/**/*.d.ts", // 排除 TypeScript 声明文件
        "!src/__tests__/**/*.ts"
    ],
    testMatch: ["<rootDir>/src/__tests__/**/*.test.ts"],
    testPathIgnorePatterns: [
        "src/__tests__/fake-authenticate-gitee.test.ts",
        "src/__tests__/wx-request.test.ts"
    ]
};

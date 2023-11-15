module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverageFrom: [
        "src/**/*.ts", // 包括 src 目录下所有的 TypeScript 文件
        "!src/**/*.d.ts", // 排除 TypeScript 声明文件
        "!src/__test__/**/*.ts"
    ],
};

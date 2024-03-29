import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/bundle.cjs.js", // CommonJS 输出文件
                format: "cjs",
            },
            {
                file: "dist/bundle.esm.js", // ES Module 输出文件
                format: "esm",
            },
        ],
        plugins: [
            typescript({ include: ["./src/**/*.ts"] }),
            babel({
                babelHelpers: "bundled",
                extensions: [".ts", ".tsx"],
                presets: ["@babel/preset-env", "@babel/preset-typescript"],
            }),
            nodeResolve(),
            commonjs(),
            json(),
        ],
    },
    /* 单独生成声明文件 */
    {
        input: "dist/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "es" }],
        plugins: [dts()],
    },
];

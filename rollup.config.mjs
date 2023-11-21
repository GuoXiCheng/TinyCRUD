import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/tiny-crud.cjs.js', // CommonJS 输出文件
            format: 'cjs',
        },
        {
            file: 'dist/tiny-crud.esm.js', // ES Module 输出文件
            format: 'esm',
        },
    ],
    plugins: [
        babel({
            babelHelpers: 'bundled',
            extensions: ['.ts', '.tsx'],
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
        }),
        nodeResolve(),
        commonjs(),
		json()
    ]
};

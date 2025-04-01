// Config file for running Rollup in "normal" mode (non-watch)
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: "dist/noaa.js",
            format: 'umd',
            name: 'NOAA',
            sourcemap: true
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**', // only transpile our source code
            babelHelpers: 'bundled'
        }),
        json(),
        typescript()
    ]
};

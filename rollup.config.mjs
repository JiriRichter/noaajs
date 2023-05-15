// Config file for running Rollup in "normal" mode (non-watch)
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default {
    input: 'src/index.js',
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
            exclude: 'node_modules/**' // only transpile our source code
        }),
        json()
    ]
};

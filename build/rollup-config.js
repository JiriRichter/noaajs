// Config file for running Rollup in "normal" mode (non-watch)

import rollupGitVersion from 'rollup-plugin-git-version';
import json from 'rollup-plugin-json';
import gitRev from 'git-rev-sync';
import pkg from '../package.json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

let { version } = pkg;
let release;

// Skip the git branch+rev in the banner when doing a release build
if (process.env.NODE_ENV === 'release') {
    release = true;
} else {
    release = false;
    const branch = gitRev.branch();
    const rev = gitRev.short();
    version += '+' + branch + '.' + rev;
}

const banner = `/* @preserve
 * NOAA ${version}, a JS library for https://www.weather.gov/documentation/services-web-api.
 * (c) 2019-2020 Jiri Richter
 */
`;

const outro = `var oldNOAA = window.NOAA;
exports.noConflict = function() {
	window.NOAA = oldNOAA;
	return this;
}

// Always export us to window global (see #2364)
window.NOAA = exports;`;

export default {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'umd',
            name: 'NOAA',
            banner: banner,
            outro: outro,
            sourcemap: true
        }
    ],
    plugins: [
        release ? json() : rollupGitVersion(),
        resolve(),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        }),
        commonjs(),
        json()
    ]
};

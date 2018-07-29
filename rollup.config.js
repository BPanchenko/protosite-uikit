import autoprefixer from 'autoprefixer';
import fs from 'fs';

import less from 'rollup-plugin-less';
import commonjs from 'rollup-plugin-commonjs'
import cssnano from 'cssnano';
import nodeGlobals from 'rollup-plugin-node-globals';
import nodeResolve from 'rollup-plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'postcss';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import uglify from 'rollup-plugin-uglify';

if (fs.existsSync('./dist/protosite-uikit.js.map')) fs.unlinkSync('./dist/protosite-uikit.js.map');

let plugins = [
    less({
        insert: false,
        output: './dist/protosite-uikit.css',
        processor: css => postcss([autoprefixer, cssnano]).process(css, { from: undefined }).then(result => result.css)
    }),
    nodeGlobals(),
    nodeResolve({
        jsnext: true,
        main: true,
        browser: true
    }),
	commonjs(),
    process.env.NODE_ENV === 'prod' && replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    process.env.NODE_ENV === 'prod' && uglify(),
    process.env.NODE_ENV !== 'prod' && process.env.PORT !== undefined && livereload(),
    process.env.PORT !== undefined && serve({
        contentBase: './',
        port: process.env.PORT,
        open: true
    })
];

export default {
    input: './src/js/main.js',
    output: {
        file: './dist/protosite-uikit.js',
        format: 'iife',
        sourcemap: process.env.NODE_ENV !== 'prod'
    },
    plugins: plugins
};
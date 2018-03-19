import fs from 'fs';
import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue';
import less from 'rollup-plugin-less';
import serve from 'rollup-plugin-serve';
import alias from 'rollup-plugin-alias';
import uglify from 'rollup-plugin-uglify';
import cssnano from 'cssnano';
import postcss from 'postcss';
import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload';
import autoprefixer from 'autoprefixer';

if (fs.existsSync('./dist/protosite-uikit.js.map')) fs.unlinkSync('./dist/protosite-uikit.js.map');

let plugins = [
    alias({ vue$: 'vue/dist/vue.common.js' }),
    vue({ autoStyles: false, styleToImports: true }),
    less({
        insert: false,
        output: './dist/protosite-uikit.css',
        processor: css => postcss([autoprefixer, cssnano]).process(css, { from: undefined }).then(result => result.css)
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
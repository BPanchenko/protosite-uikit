const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const clean = require('gulp-clean');
const cssnano = require('cssnano');
const log = require('fancy-log');
const rename = require("gulp-rename");
const webpack = require('webpack-stream');

// CLEAN

gulp.task('clean', function () {
    return gulp.src('../assets/uikit*.css')
        .pipe(clean({force: true}))
        .pipe(gulp.dest('../assets'));
});

// CSS

let postcss_plugins = [
    autoprefixer(),
    postcssImport(),
    postcssPresetEnv({ stage: 0 }),
    cssnano()
];

gulp.task('css-theme-article', function () {
    return gulp.src('../src/css/themes/article.css')
        .pipe(postcss(postcss_plugins, { parser: false }))
        .pipe(rename('uikit-theme-article.css'))
        .pipe(gulp.dest('../assets'));
});

gulp.task('css-uikit', function () {
    return gulp.src('../src/css/protosite-uikit.css')
        .pipe(postcss(postcss_plugins, { parser: false }))
        .pipe(rename('uikit.css'))
        .pipe(gulp.dest('../assets'));
});

// JS

gulp.task('build-js', function () {
    return gulp.src('../src/js/uikit.js')
        .pipe(webpack({
            output: {
                filename: 'uikit.js',
            },
            mode: 'production',
            devtool: 'source-map'
        }))
        .pipe(gulp.dest('../assets'));
});

// WATCH

gulp.task('watch-js', function () {
    gulp.watch([
        '../src/js/*.js',
        '../src/js/*/*.js'
    ]).on('change', function(path, stats) {
        log(`File ${path} was changed`);
        gulp.parallel('build-js')();
    });
});

// FINISH

gulp.task('build-css', gulp.series('clean', gulp.parallel('css-theme-article', 'css-uikit')));
gulp.task('default', gulp.parallel('build-css', 'build-js'));

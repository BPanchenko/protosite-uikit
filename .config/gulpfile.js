const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const clean = require('gulp-clean');
const cssnano = require('cssnano');
const rename = require("gulp-rename");

// CLEAN

gulp.task('clean', function () {
    return gulp.src('../assets/uikit*.css')
        .pipe(clean({force: true}))
        .pipe(gulp.dest('../assets'));
});

// CSS

let postcss_plugins = [
    autoprefixer({ browsers: ['> 5%'] }),
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

// FINISH

gulp.task('build-css', gulp.series('clean', gulp.parallel('css-theme-article', 'css-uikit')));

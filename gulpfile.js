const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

gulp.task('build-css', function () {
    let plugins = [
        autoprefixer({ browsers: ['last 1 version'] }),
        cssnano(),
        postcssPresetEnv({ stage: 0 }),
        postcssImport()
    ];
    return gulp.src('./src/css/protosite-uikit.css')
        .pipe(postcss(plugins, { parser: false }))
        .pipe(gulp.dest('./dist'));
});
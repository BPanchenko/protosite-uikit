const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sugarss = require('sugarss');

gulp.task('build-css', function () {
    let plugins = [
        autoprefixer({ browsers: ['last 1 version'] }),
        cssnano(),
        postcssPresetEnv({ stage: 0 })
    ];
    return gulp.src('./src/css/protosite-uikit.css')
        .pipe(postcss(plugins, { parser: sugarss }))
        .pipe(gulp.dest('./dist'));
});
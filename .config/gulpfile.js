const postcss = require('gulp-postcss');
const postcssrc = require('postcss-load-config');
const gulp = require('gulp');
const clean = require('gulp-clean');
const log = require('fancy-log');
const rename = require("gulp-rename");
const webpack = require('webpack-stream');

// CLEAN

gulp.task('clean', function () {
    return gulp.src([
            '../assets/critical*.css',
            '../assets/uikit*.css'
        ])
        .pipe(clean({force: true}));
});

// CSS

gulp.task('css-critical', function () {
    return postcssrc().then(config =>
        gulp.src('../src/css/critical.css')
            .pipe(postcss(config.plugins, config.options))
            .pipe(gulp.dest('../assets'))
    );
});

gulp.task('css-theme-article', function () {
    return postcssrc().then(config =>
        gulp.src('../src/css/themes/article.css')
            .pipe(postcss(config.plugins, config.options))
            .pipe(rename('uikit-theme-article.css'))
            .pipe(gulp.dest('../assets'))
    );
});

gulp.task('css-uikit', function () {
    return postcssrc().then(config =>
        gulp.src('../src/css/main.css')
            .pipe(postcss(config.plugins, config.options))
            .pipe(rename('uikit.css'))
            .pipe(gulp.dest('../assets'))
    );
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

gulp.task('build-css',
    gulp.series('clean',
        gulp.parallel(
            'css-critical',
            'css-theme-article',
            'css-uikit'
        )
    )
);

gulp.task('default', gulp.parallel('build-css', 'build-js'));

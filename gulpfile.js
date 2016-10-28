var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    csslint = require('gulp-csslint'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
	less = require('gulp-less'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

function cssLintReporter(file) {
    gutil.log(gutil.colors.cyan(file.csslint.errorCount)+' errors in '+gutil.colors.magenta(file.path));

    file.csslint.results.forEach(function(result) {
        gutil.log(result.error.message+' on line '+result.error.line);
    });
}

gulp.task('build-css', function () {
    gulp.src('./css/core.less')
        .pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(rename("ui-core.css"))
        .pipe(gulp.dest('./dist/'))
        .pipe(csslint({
            'adjoining-classes': false,
            'fallback-colors': false,
            'font-sizes': false,
            'important': false,
            'unqualified-attributes': false
        }))
        .pipe(csslint.reporter(cssLintReporter))
        .pipe(cleanCSS({
            'compatibility': '*'
        }))
        .pipe(rename("ui-core.min.css"))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build-js-libs', function () {
    gulp.src([
        './js/modules/primitives-mixin.js',
        './node_modules/underscore/underscore.js',
        './node_modules/underscore.string/dist/underscore.string.js',
        './js/modules/underscore-mixin.js',
        './node_modules/jquery/dist/jquery.js',
        './node_modules/backbone/backbone.js',
        './js/modules/backbone-addon.js',
        './node_modules/moment/min/moment-with-locales.js'
    ])
        .pipe(concat('ui-libs.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .pipe(rename('ui-libs.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build-js-ui-core', function () {
    gulp.src([
        './js/ui/UI.js',
        './js/ui/core/backdrop.js',
        './js/ui/core/container.js',
        './js/ui/core/dom.js'
    ])
        .pipe(concat('ui-core.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename('ui-core.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['build-css', 'build-js-libs', 'build-js-ui-core']);
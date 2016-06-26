var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
    csslint = require('gulp-csslint'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
	less = require('gulp-less'),
    rename = require('gulp-rename');

function cssLintReporter(file) {
    gutil.log(gutil.colors.cyan(file.csslint.errorCount)+' errors in '+gutil.colors.magenta(file.path));

    file.csslint.results.forEach(function(result) {
        gutil.log(result.error.message+' on line '+result.error.line);
    });
}

gulp.task('css', function () {
    gulp.src('./css/core.less')
        .pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csslint({
            'adjoining-classes': false,
            'fallback-colors': false,
            'font-sizes': false,
            'important': false,
            'unqualified-attributes': false
        }))
        .pipe(csslint.reporter(cssLintReporter))
        .pipe(gulp.dest('./css/'))
        .pipe(cleanCSS({
            'compatibility': '*'
        }))
        .pipe(rename("core.min.css"))
        .pipe(gulp.dest('./css/'));
});


var gulp = require('gulp');

gulp.task('minify-css', function() {
    return gulp.src('styles/*.css')
        ;
});


gulp.task('build', ['css']);
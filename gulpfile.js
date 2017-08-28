var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
    csslint = require('gulp-csslint'),
    cleanCSS = require('gulp-clean-css'),
    gutil = require('gulp-util'),
	less = require('gulp-less'),
    rename = require('gulp-rename');

function cssLintReporter(file) {
    gutil.log(gutil.colors.cyan(file.csslint.errorCount)+' errors in '+gutil.colors.magenta(file.path));

    file.csslint.results.forEach(function(result) {
        gutil.log(result.error.message+' on line '+result.error.line);
    });
}

gulp.task('build-css', function () {
    gulp.src('./css/ui.less')
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

gulp.task('build', ['build-css']);
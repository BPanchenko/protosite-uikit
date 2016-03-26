var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-cssmin'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
	less = require('gulp-less'),
    rename = require('gulp-rename');

gulp.task('css', function () {
    gulp.src('./css/core.less')
        .pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename("core.min.css"))
        .pipe(gulp.dest('./css/'));
});


var gulp = require('gulp');

gulp.task('minify-css', function() {
    return gulp.src('styles/*.css')
        ;
});


gulp.task('build', ['css']);
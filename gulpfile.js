var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
	less = require('gulp-less');

gulp.task('css', function () {
    gulp.src('./css/main.less')
        .pipe(less())
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('./css/main.min.css'));
});

gulp.task('build', ['css']);
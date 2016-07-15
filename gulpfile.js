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
        .pipe(rename("ui.css"))
        .pipe(gulp.dest('./assets/'))
        .pipe(cleanCSS({
            'compatibility': '*'
        }))
        .pipe(rename("ui.min.css"))
        .pipe(gulp.dest('./assets/'));
});


var webpack = require('webpack'),
    webpackConfig = require('./webpack.config'),
    WebpackDevServer = require('webpack-dev-server');

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(webpackConfig), {
        contentBase: __dirname,
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        noInfo: false,
        quiet: false,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'X-Requested-With'
		},
		stats: {
			colors: false
		}
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});


gulp.task('build', ['css']);
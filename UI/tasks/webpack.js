const { ASSETS_DIR, JS_FILES } = require('./config');
const gulp = require('gulp');
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('../../webpack.config.js')


gulp.task('webpack', () => {
	let config = Object.create(webpackConfig(false))
	return gulp.src(JS_FILES)
		.pipe(webpackStream(config, webpack))
		.pipe(gulp.dest(`${ASSETS_DIR}/js`))
});

gulp.task('webpack:build', () => {
	let config = Object.create(webpackConfig(true))
	return gulp.src(JS_FILES)
		.pipe(webpackStream(config, webpack))
		.pipe(gulp.dest(`${ASSETS_DIR}/js`))
});

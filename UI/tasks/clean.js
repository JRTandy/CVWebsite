const { ASSETS_DIR } = require('./config');
const gulp = require('gulp');
const del = require('del');

gulp.task('clean', () => {
	return del([ ASSETS_DIR ]);
});

// TODO: SVG use and sprite
const gulp = require('gulp');
const argv = require('yargs').argv;
const { ASSETS_DIR, SASS_FILES, JS_FILES, IMG_FILES, SVG_FILES } = require('./UI/tasks/config.js');

require('./UI/tasks/fractal');
require('./UI/tasks/css');
require('./UI/tasks/webpack');
require('./UI/tasks/images');
require('./UI/tasks/clean');

gulp.task('watch', () => {
	gulp.watch(SASS_FILES, ['css']);
	gulp.watch(JS_FILES, ['webpack']);
	gulp.watch(IMG_FILES, ['imagemin']);
	gulp.watch(SVG_FILES, ['svgmin']);
});

// Make sure clean is fully executed before we do anything else
gulp.task('default', ['clean'], () => {
	gulp.start('css', 'webpack', 'watch', 'imagemin', 'svgmin', 'fractal:start');
});

let buildTasks = [
	'clean',
	'css:build',
	'webpack:build',
	'imagemin',
	'svgmin'
];


gulp.task('build', ['clean'], function() { // Don't use an arrow function so the correct scope is retained for .apply()
	gulp.start.apply(this, buildTasks);
});


// with yargs we can catch arguments passed in and handle them.
// E.G
// if(argv.includePatterns) {
// 	buildTasks.push('fractal:build');
// }

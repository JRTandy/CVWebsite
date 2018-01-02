const postcssPlugins = [
    require('autoprefixer')({
        browsers: ['last 2 versions', 'not IE <= 10', 'not bb <= 7']
    })
]
const { ASSETS_DIR, SASS_FILES } = require('./config');
const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');

gulp.task('css', () => {
	return gulp.src(SASS_FILES)
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(postcssPlugins))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(`${ASSETS_DIR}/css`));
});

gulp.task('css:build', () => {
	return gulp.src(SASS_FILES)
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(postcssPlugins))
		.pipe(csso())
		.pipe(gulp.dest(`${ASSETS_DIR}/css`));
});

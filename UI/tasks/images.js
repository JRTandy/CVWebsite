const { ASSETS_DIR, IMG_FILES, SVG_FILES } = require('./config');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');
const newer = require('gulp-newer');
const imgdest = `${ASSETS_DIR}/img`;

gulp.task('imagemin', () => {
	return gulp.src(IMG_FILES)
		.pipe(newer(imgdest))
		.pipe(imagemin([
			imagemin.jpegtran(),
      imagemin.gifsicle(),
			imagemin.optipng()
		]))
		.pipe(gulp.dest(imgdest));
});

gulp.task('svgmin', () => {
		return gulp.src(SVG_FILES)
				.pipe(newer(imgdest))
				.pipe(svgmin({
						plugins: [{
								cleanupIDs: false
						}]
				}))
				.pipe(gulp.dest(imgdest))
});

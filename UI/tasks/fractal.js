const { ASSETS_DIR } = require('./config');
const gulp = require('gulp');
const fractal = require('@frctl/fractal').create();
const hbs = require('@frctl/handlebars')({
	helpers: {
		// https://stackoverflow.com/a/16315366
		compare(v1, operator, v2, options) {
			switch (operator) {
				case '==':
					return (v1 == v2) ? options.fn(this) : options.inverse(this);
				case '===':
					return (v1 === v2) ? options.fn(this) : options.inverse(this);
				case '!=':
					return (v1 != v2) ? options.fn(this) : options.inverse(this);
				case '!==':
					return (v1 !== v2) ? options.fn(this) : options.inverse(this);
				case '<':
					return (v1 < v2) ? options.fn(this) : options.inverse(this);
				case '<=':
					return (v1 <= v2) ? options.fn(this) : options.inverse(this);
				case '>':
					return (v1 > v2) ? options.fn(this) : options.inverse(this);
				case '>=':
					return (v1 >= v2) ? options.fn(this) : options.inverse(this);
				case '&&':
					return (v1 && v2) ? options.fn(this) : options.inverse(this);
				case '||':
					return (v1 || v2) ? options.fn(this) : options.inverse(this);
				default:
					return options.inverse(this);
			}
		},
		plus(l, r, options) {
			return parseFloat(l) + parseFloat(r)
		}
	}
})

// Theme
gulp.task('copy-theme-css', () => {
		return gulp.src('./UI/patterns/theme/patterns.css')
		.pipe(gulp.dest(`${ASSETS_DIR}/css`))
})
const mandelbrot = require('@frctl/mandelbrot')
const theme = mandelbrot({
		'skin': 'lime',
		'styles': ['default', `${process.cwd()}/CMS/assets/css/patterns.css`]
})
theme.addStatic(`${process.cwd()}/CMS/assets/css/patterns.css`);
fractal.web.theme(theme)


fractal.set('project.title', 'Ridgeway Boilerplate');
fractal.web.set('builder.dest', `${process.cwd()}/CMS/patterns`);
fractal.docs.set('path', `${process.cwd()}/UI/patterns/docs`);
fractal.components.set('path', `${process.cwd()}/UI/patterns/components`);

fractal.components.engine(hbs)

const logger = fractal.cli.console;

gulp.task('fractal:start', ['copy-theme-css'], () => {
	fractal.web.set('static.path', `${process.cwd()}/CMS`);

	const server = fractal.web.server({
		sync: true
	});

	server.on('error', err => logger.error(err.message));

	return server.start().then(() => {
		logger.success(`Pattern library server running at ${server.url}`);
	});
});

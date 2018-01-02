const _ = require('lodash');
const webpack = require('webpack');
const { ASSETS_DIR, JS_DIR } = require('./UI/tasks/config');

module.exports = (build) => {
	let extraConfig = {};

	// Optimised build
	if(build) {
		extraConfig = {
			plugins: [
				new webpack.DefinePlugin({
					'process.env.NODE_ENV': JSON.stringify('production')
				}),
				new webpack.optimize.UglifyJsPlugin({
					beautify: false,
					comments: false
				})
			]
		};
	// Dev build
	} else {
		extraConfig = {
			devtool: 'eval' // Include sourcemaps
		};
	}

	return _.extend({}, {
		// TODO: Separate entry point for pages outside of the course
		entry: `${JS_DIR}/index.js`,
		output: {
			path:`${ASSETS_DIR}/js/`,
			publicPath: '/assets/js/',
			filename: `[name].js`,
			chunkFilename: '[name].js'
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
			                    babelrc: false,
			                    presets: ['env']
			                }
				},
				{
					test: /\.hbs$/,
					loader: 'handlebars-loader'
				}
			]
		},
		plugins: [
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
	}, extraConfig);
};

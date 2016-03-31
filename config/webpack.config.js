var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

var BUILD_DIR = path.resolve(__dirname, '../build');
var APP_DIR = path.resolve(__dirname, '../src');

var globals = require('./globals');

var webpackConfig = {
	// devtool: 'cheap-module-source-map',
	entry: [
		APP_DIR + '/client/index.js'
	],

	output: {
		publicPath: "/build",
		path: BUILD_DIR,
		filename: 'bundle.js'
	},

	module: {
		loaders: [{
			test: /\.jsx?/,
			exclude: /node_modules/,
			loaders: ['react-hot', 'babel']
		},{
			test: /\.js?/,
			exclude: /node_modules/,
			loaders: ['react-hot', 'babel']
		},{
			test: /\.(scss|css)$/,
			exclude: /node_modules/,
			loaders: ['style', 'css', 'postcss', 'sass']
		},{
			test: /\.(svg|woff([\?]?.*)|ttf([\?]?.*)|eot([\?]?.*)|svg([\?]?.*))$/i,
			loader: 'url-loader?limit=10000'
		},{
			test: /\.(png|jpg)$/,
			loader: 'url?limit=8192'
    }]
	},
	postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],

	plugins: [
		new webpack.DefinePlugin(globals)
	]
};

if (globals.__PROD__) {
	webpackConfig.plugins.push(
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				unused: true,
				dead_code: true,
				warnings: false
			}
		})
	);
}

module.exports = webpackConfig;

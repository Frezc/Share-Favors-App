var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, '../build');
var APP_DIR = path.resolve(__dirname, '../src');

var globals = require('./globals');

const AUTOPREFIXER_BROWSERS = [
	'Android 2.3',
	'Android >= 4',
	'Chrome >= 35',
	'Firefox >= 31',
	'Explorer >= 9',
	'iOS >= 7',
	'Opera >= 12',
	'Safari >= 7.1'
];

var webpackConfig = {
	// devtool: 'cheap-module-source-map',
	// devtool: 'source-map',
	entry: [
		'webpack-hot-middleware/client',
		APP_DIR + '/client/index.js'
	],

	output: {
		publicPath: "/build",
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: [
			'', '.js', '.jsx', '.scss', '.json'
		]
	},
	module: {
		loaders: [{
			test: /\.jsx?/,
			exclude: /node_modules/,
			include: APP_DIR,
			loaders: ['react-hot', 'babel']
		},{
			test: /\.js?/,
			exclude: /node_modules/,
			include: APP_DIR,
			loaders: ['react-hot', 'babel']
		},{
			test: /\.(scss|css)$/,
			exclude: /node_modules/,
			loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass']),
			// loaders: ['style', 'css', 'postcss', 'sass']
		},{
			test: /\.(svg|woff([\?]?.*)|ttf([\?]?.*)|eot([\?]?.*)|svg([\?]?.*))$/i,
			loader: 'url-loader?limit=10000'
		},{
			test: /\.(png|jpg)$/,
			loader: 'url?limit=8192'
    }]
	},
	postcss: [ autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }) ],

	plugins: [
		new webpack.DefinePlugin(globals),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('style.css')
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

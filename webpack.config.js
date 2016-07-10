module.exports = {
	entry: './index.js',
	output: {
		path: 'build',
		filename: 'bundle.js',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/,
			query: {
				cacheDirectory: true,
				presets: ['es2015', 'react'],
				plugins: ['transform-runtime'],
			},
		}],
	},
};

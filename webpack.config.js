module.exports = {
	entry: './index.js',
	output: {
		path: 'build',
		publicPath: '/build/',
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
				development: {
					presets: [''],
				},
				plugins: ['transform-runtime'],
			},
		}],
	},
};

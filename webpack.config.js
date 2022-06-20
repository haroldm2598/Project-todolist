const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		index: './src/index.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		static: './dist'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Development'
		})
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	optimization: {
		runtimeChunk: 'single'
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(svg|eot|woff|woff2|ttf)$/,
				type: 'asset/resource',
				generator: {
					filename: 'compiled/fonts/[hash][ext][query]'
				}
			}
		]
	}
};

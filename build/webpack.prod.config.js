var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

var config = {
	entry: {
		index: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'vue-weui-ueditor.min.js',
		publicPath: './',
		library: 'vue-weui-ueditor',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	externals: {
		vue: {
			root: 'Vue',
			commonjs: 'vue',
			commonjs2: 'vue',
			amd: 'vue'
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				enforce: 'pre',
				include: [resolve('src')],
				options: {
					formatter: require('eslint-friendly-formatter')
				}
			}, {
				test: /\.vue$/,
				exclude: /node_modules/,
				loader: 'vue-loader',
				options: {
					loaders: {
						'stylus': 'vue-style-loader!css-loader!stylus-loader'
					}
				}
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}, {
				test: /\.css$/,
				loaders: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
					  loader: 'css-loader'
					}, {
					  loader: 'postcss-loader',
					  options: {
					    plugins: function () {
					      return [
					        require('autoprefixer')({
					          browsers: ['last 3 versions']
					        })
					      ]
					    }
					  }
					}]
				})
			}, {
				test: /\.stylus$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract({
				  fallback: 'style-loader',
				  use: [{
				    loader: 'css-loader'
				  }, {
				    loader: 'postcss-loader',
				    options: {
				      plugins: function () {
				        return [
				          require('autoprefixer')({
				            browsers: ['last 3 versions']
				          })
				        ];
				      }
				    }
				  }, {
				    loader: 'stylus-loader'
				  }]
				})
			}
		]
	},
	resolve: {
		extensions: ['.js', '.css', '.stylus', '.vue'],
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'vue-weui-ueditor.min.css'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]
};

module.exports = config;

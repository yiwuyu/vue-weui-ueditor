var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var vueLoaderConfig = require('./vue-loader.conf')


function resolve(dir) {
	return path.join(__dirname, dir);
}

var cssLoader = {
	loader: 'css-loader',
	options: {
		minimize: true,
		sourceMap: true
	}
};

function generateLoaders (loader, loaderOptions) {
  var loaders = [cssLoader]
  if (loader) {
    loaders.push({
      loader: loader + '-loader',
      options: Object.assign({}, loaderOptions, {
        sourceMap: !0
      })
    })
  }

  return ExtractTextPlugin.extract({
    use: loaders,
    fallback: 'vue-style-loader'
  })
}

module.exports = {
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
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src')
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|vue)$/,
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
				options: vueLoaderConfig
			}, {
				test: /\.js$/,
				loader: 'babel-loader'
			}, {
				test: /\.css$/,
				use: generateLoaders()
			}, {
				test: /\.stylus$/,
				use: generateLoaders('stylus')
			}
		]
	}
};


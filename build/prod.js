var webpackConfig = require('./webpack.prod.config');

var ora = require('ora');
var webpack = require('webpack');
var spinner = ora('build prod for npm');
var chalk = require('chalk');
spinner.start()

webpack(webpackConfig, function(err, stats) {
	spinner.stop();
	if (err) throw err
	process.stdout.write(stats.toString({
		colors: !0,
		modules: !1,
		children: !1,
		chunks: !1,
		chunkModules: !1
	}) + '\n\n')
	
	console.log(chalk.cyan('  Build complete.\n'))
	console.log(chalk.yellow(
	  '  Tip: built files are meant to be served over an HTTP server.\n' +
	  '  Opening index.html over file:// won\'t work.\n'
	))
});
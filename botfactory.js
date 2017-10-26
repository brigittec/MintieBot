var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var readdir = require('readdir-enhanced');

function getFileNames(dir) { 
	return readdir.sync(dir, { deep: true }) 
	.map(item => `.${path.posix.sep}${path.posix.join(dir, path.posix.format(path.parse(item)))}`) //normalize paths 
	.filter(item => !fs.statSync(item).isDirectory() && /.js$/.test(item)) //filter out directories 
	.map(file => ({ name: path.basename(file, '.js'), path: file })) 
} 

function loadDialogs(bot) {
	return getFileNames('./dialogs')
		.map(file => Object.assign(file, { fx: require(file.path) }))
	 	.forEach(dialog => dialog.fx(dialog.name, bot)); 
}

module.exports = {
	loadDialogs: loadDialogs
};
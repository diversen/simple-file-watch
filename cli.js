#!/usr/bin/env node

var opts = [];
opts.boolean = ['help', 'silence', 'h'];
opts.string = ['path', 'extension', 'command'];

var argv = require('minimist')(process.argv.slice(2), opts);
var fs = require('fs');
var path = require('path');
var get = require('get-value');
var fileExtension = require('file-extension');
var exec = require('child_process').exec;
var watch = require('node-watch');

// Help
var help = get(argv, 'help');
if (help) {
    var dirname = path.dirname(__filename);
    var help = fs.readFileSync(dirname + '/help.txt', {encoding: 'utf8'});
    console.log(help);
    process.exit(0);
}

var path = get(argv, 'path');
if (!path) {
    path = '.';
}
var extension = get(argv, 'extension');
if (extension){
    extension = extension.split(",");
}

//console.log(extension);
//process.exit(0);


function consoleLog (txt) {
    if (get(argv, 'silence')) {
        return;
    }
    console.log(txt);
}

function execute(cmd) {
    exec(cmd, function (error, stdout, stderr) {
        if (error) {
            // Always log error
            console.log(error);
        }
        
        if (stderr) {
            // Always log error
            console.log(stderr);
        }
        
        consoleLog(stdout);
    });
}

var command = get(argv, 'command');
watch(path, function (filename) {
    
    if (filename) {
        var ext = fileExtension(filename);
        if (extension && (extension.indexOf(ext) !== -1)) {
            console.log("Extension:" + extension);
            consoleLog("File changed: " + filename);
            if (command){ 
                consoleLog("Executing: " + command);
                execute(command);
            }
        } else {
            consoleLog("File changed: " + filename);
            if (command && (get(argv, 'extension') === '*')){ 
                consoleLog("Executing: " + command);
                execute(command);
            }
        }        
    }
});

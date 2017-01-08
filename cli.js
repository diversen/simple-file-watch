#!/usr/bin/env node

var opts = [];
opts.boolean = ['help', 'silence', 'h'];
opts.string = ['path', 'extension', 'command'];

var m = require('minimist-mini')(opts);

var fs = require('fs');
var path = require('path');
var fileExtension = require('file-extension');
var exec = require('child_process').exec;
var watch = require('node-watch');

if (m.get('help') || m.get('h')) {
    m.helpMessage();
    process.exit(0);
}

var path = m.get('path');
if (!path) {
    path = '.';
}

var extension = m.get('extension');
if (extension){
    extension = extension.split(",");
} else {
    extension = '*';
}

// Log messages
function consoleLog (txt) {
    if (m.get('silence')) {
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

var command = m.get('command');
watch(path, function (filename) {

    if (filename) {
        var ext = fileExtension(filename);
        if (extension && (extension.indexOf(ext) !== -1)) {
            consoleLog("File changed: " + filename);
            if (command){ 
                consoleLog("Executing: " + command);
                execute(command);
            }
        } else {
            consoleLog("File changed: " + filename);
            if (command && (extension === '*')){ 
                consoleLog("Executing: " + command);
                execute(command);
            }
        }        
    }
});

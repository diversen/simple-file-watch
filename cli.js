#!/usr/bin/env node

var opts = [];
opts.boolean = ['help', 'silence', 'h'];
opts.string = ['path', 'extension', 'command'];

var m = require('minimist-mini')(opts);
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
if (extension) {
    extension = extension.split(",");
} else {
    extension = '*';
}

var delay = m.get('delay');
if (!delay) {
    delay = 200;
}

var recursive = m.get('recursive');
if (recursive) {
    recursive = true;
} else {
    recursive = false;
}

// Log messages
function consoleLog(txt) {
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
var lastExecution = new Date().getTime();

watch(path, { delay: delay, recursive: recursive, persistent: true }, async function (evt, filename) {

    // Check if last execution was less than 'delay' ago + some offset (10% of delay)
    // This is to avoid multiple executions when multiple files are changed at the same time
    var now = new Date().getTime();
    if (now - lastExecution < delay + parseInt(delay / 10)) {
        return;
    }

    var ext = fileExtension(filename);
    if (extension && (extension.indexOf(ext) !== -1)) {
        consoleLog("File changed: " + filename);
        if (command) {
            consoleLog("Executing: " + command);
            execute(command);
        }
    } else {
        consoleLog("File changed: " + filename);
        if (command && (extension === '*')) {
            consoleLog("Executing: " + command);
            execute(command);
        }
    }

    lastExecution = new Date().getTime();

});

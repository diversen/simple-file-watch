Simple-file-watch

Install: 

    npm install -g simple-file-watch

Simple nodejs cli command that will watch for changes in a directory or directories, recursively or not,
and execute a command on changes. The delay set by `--delay` will prevent any
execution of the command until the delay has passed. This is useful if the command
being executed alters another file in the directory being watched. Otherwise there will be
an infinite loop of file changes and executions.

Usage example:

    simple-file-watch --delay=2000 --extension='js' --path='.' --path='test' --command='ls -l' --recursive --silence

Flags:

    --delay=2000 // delay in milliseconds before executing command on file change
    --extension='js' // only execute command on files with this extension. Default is all files
    --path='.' // path to watch for changes. Multiple paths are allowed. Default is current directory
    --command='ls -l' // command to execute on file change  
    --recursive // watch subdirectories
    --silence // no output to stdout

If you run the command without any params, it will watch any file changes in 
current directory, and output the file changed to stdout. 

Note: There is max on number of files you can watch. See: 

http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc

License MIT

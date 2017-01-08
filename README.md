Simple-file-watch

Install: 

    npm install -g simple-file-watch

Simple nodejs cli command that will watch for changes rescursively in a directory,
and execute a command (optional) on changes. 

Usage example: 

    simple-file-watch --extension='js,php' --path='.' --command='ls -l' --silence

If you run the command without any params, it will watch any file changes in 
current directory, and output some info to stdout. If you specify `command`
then the the given command will be executed on file changes. If you specify `extension`
then the `command` will only be executed on changes to files with the given
extension.


License MIT

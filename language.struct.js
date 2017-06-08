var path = require('path');
var struct_languages = {
  "C": {
    "style": "clike",
    "mime": "text/x-csrc",
    "compile": function(folder, basename) {
      return 'cd ' + folder + ' && cl ' + basename + '.c';
    },
    "run": function(folder, basename) {
      return 'start cmd.exe /K ' + folder + '\\' + basename + '.exe';
    },
    "outension": "exe",
    "extension": ".c"
  },
  "C#": {
    "style": "clike",
    "mime": "text/x-csharp",
    "compile": function(folder, basename) {
      return 'cd ' + folder + ' && csc ' + basename + '.cs';
    },
    "run": function(folder, basename) {
      return 'start cmd.exe /K ' + folder + '\\' + basename + '.exe';
    },
    "extension": ".cs"
  },
  "C++": {
    "style": "clike",
    "mime": "text/x-c++src",
    "compile": function(folder, basename) {
      return 'cd ' + folder + ' && cl ' + basename + '.cpp';
    },
    "run": function(folder, basename) {
      return 'start cmd.exe /K ' + folder + '\\' + basename + '.exe';
    },
    "extension": ".cpp"
  },
  "Go": {
    "style": "go",
    "mime": "text/x-go",
    "compile": "",
    "run": "go run",
    "extension": ".go"
  },
  "Java": {
    "style": "clike",
    "mime": "text/x-java",
    "compile": "javac",
    "run": "java",
    "extension": ".java"
  },
  "Node.js": {
    "style": "javascript",
    "mime": "text/javascript",
    "compile": "",
    "run": "node"
  },
  "PHP": {
    "style": "php",
    "mime": "text/x-php",
    "compile": "",
    "run": "php"
  },
  "Python": {
    "style": "python",
    "mime": "text/x-python",
    "compile": "",
    "run": "python"
  },
  "Python 3": {
    "style": "python",
    "mime": "text/x-python",
    "compile": "",
    "run": "python3"
  }
};

module.exports = struct_languages;

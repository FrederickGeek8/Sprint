var struct_languages = {
  "C": {
    "style": "clike",
    "mime": "text/x-csrc",
    "compile": function(folder, basename) {
      return 'cd "' + folder + '" && cl "' + basename + '.c"';
    },
    "run": function(folder, basename) {
      return 'start cmd.exe /K "' + folder + '\\' + basename + '.exe"';
    },
    "outension": "exe",
    "extension": ".c",
    "envhack": true
  },
  "C#": {
    "style": "clike",
    "mime": "text/x-csharp",
    "compile": function(folder, basename) {
      return 'cd "' + folder + '" && csc "' + basename + '.cs"';
    },
    "run": function(folder, basename) {
      return 'start cmd.exe /K "' + folder + '\\' + basename + '.exe"';
    },
    "extension": ".cs",
    "envhack": true
  },
  "C++": {
    "style": "clike",
    "mime": "text/x-c++src",
    "compile": function(folder, basename) {
      return 'cd "' + folder + '" && cl "' + basename + '.c"';
    },
    "run": function(folder, basename) {
      return 'start cmd.exe /K "' + folder + '\\' + basename + '.exe"';
    },
    "extension": ".cpp",
    "envhack": true
  },
  "Go": {
    "style": "go",
    "mime": "text/x-go",
    "compile": "",
    "run": "go run",
    "extension": ".go",
    "envhack": false
  },
  "Java": {
    "style": "clike",
    "mime": "text/x-java",
    "compile": "javac",
    "run": "java",
    "extension": ".java",
    "envhack": false
  },
  "Node.js": {
    "style": "javascript",
    "mime": "text/javascript",
    "compile": "",
    "run": "node",
    "envhack": false
  },
  "PHP": {
    "style": "php",
    "mime": "text/x-php",
    "compile": "",
    "run": "php",
    "envhack": false
  },
  "Python": {
    "style": "python",
    "mime": "text/x-python",
    "compile": "",
    "run": "python",
    "envhack": false
  },
  "Python 3": {
    "style": "python",
    "mime": "text/x-python",
    "compile": "",
    "run": "python3",
    "envhack": false
  }
};

module.exports = struct_languages;

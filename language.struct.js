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
    "compile": function(folder, basename) {
      return '';
    },
    "run": function(folder, basename) {
      return 'start cmd.exe /K go run "' + folder + '\\' + basename + '.go"';
    },
    "extension": ".go",
    "envhack": false
  },
  "Java": {
    "style": "clike",
    "mime": "text/x-java",
    "compile": function(folder, basename) {
      return 'cd "' + folder + '" && javac "' + basename + '.java"';
    },
    "run": function(folder, basename) {
      return 'start cmd.exe /K java -cp "' + folder + '" ' + basename;
    },
    "extension": ".java",
    "envhack": false
  },
  "Node.js": {
    "style": "javascript",
    "mime": "text/javascript",
    "compile": function(folder, basename) {
      return '';
    },
    "run": function(folder, basename) {
      return 'start cmd.exe /K node "' + folder + '\\' + basename + '.js"';
    },
    "envhack": false
  },
  "PHP": {
    "style": "php",
    "mime": "text/x-php",
    "compile": function(folder, basename) {
      return '';
    },
    "run": function(folder, basename) {
      return 'start cmd.exe /K php "' + folder + '\\' + basename + '.php"';
    },
    "envhack": false
  },
  "Python": {
    "style": "python",
    "mime": "text/x-python",
    "compile": function(folder, basename) {
      return '';
    },
    "run": function(folder, basename) {
      return 'start cmd.exe /K python "' + folder + '\\' + basename + '.py"';
    },
    "envhack": false
  },
  "Python 3": {
    "style": "python",
    "mime": "text/x-python",
    "compile": function(folder, basename) {
      return '';
    },
    "run": function(folder, basename) {
      return 'start cmd.exe /K python3 "' + folder + '\\' + basename + '.py"';
    },
    "envhack": false
  }
};

module.exports = struct_languages;

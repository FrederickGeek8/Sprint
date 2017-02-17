// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var fs = require('fs');

var value = "";
var struct_languages = {
  "C": ["clike", "text/x-csrc", "cl", ""],
  "C#": ["clike", "text/x-csharp", "csc", ""],
  "C++": ["clike", "text/x-c++src", "cl", ""],
  "Go": ["go", "text/x-go", "", "go run"],
  "Java": ["clike", "text/x-java", "javac", "java"],
  "Node.js": ["javascript", "text/javascript", "", "node"],
  "PHP": ["php", "text/x-php", "", "php"],
  "Python": ["python", "text/x-python", "", "python"],
  "Python 3": ["python", "text/x-python", "", "python3"]
};

var editor = CodeMirror(document.body.getElementsByTagName("article")[0], {
  value: value,
  lineNumbers: true,
  lineWrapping: true,
  mode: "text/x-csrc",
  keyMap: "sublime",
  autoCloseBrackets: true,
  matchBrackets: true,
  showCursorWhenSelecting: true,
  theme: "base16-dark"
});

jQuery.loadScript = function(url, callback) {
  jQuery.ajax({
    url: url,
    dataType: 'script',
    success: callback,
    async: true
  });
};

var loadedLanguages = [];
var loadLanguage = function(language) {
  if (loadedLanguages.indexOf(language) < 0) {
    var path = 'bower_components/codemirror/mode/' + struct_languages[language][0] + '/' + struct_languages[language][0] + '.js';
    $.loadScript(path, function() {
      editor.setOption("mode", struct_languages[language][1]);
      loadedLanguages.push(language);
    });
  } else {
    editor.setOption("mode", struct_languages[language][1]);
  }
};

for (var key in struct_languages) {
  if (struct_languages.hasOwnProperty(key)) {
    var ele = $("<option></option>").text(key);
    $("#language").append(ele);
  }
}

var template = "";
var loadTemplate = function(language, callback) {
  var filename = struct_languages[language][1].replace("text/", "");
  fs.readFile(__dirname + '/templates/' + filename + '.template', function(err, data) {
    if (err) {
      throw err;
    }
    template = data.toString();
    callback.call(this);
  });
};

$("#language").change(function() {
  var name = $("#language").find("option:selected").text();
  loadLanguage(name);
  if(editor.getValue() == template) {
    loadTemplate(name, function(){
      editor.setValue(template);
    });
  }
});

loadLanguage("C");
loadTemplate("C", function(){
  editor.setValue(template);
});

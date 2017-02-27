// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var fs = require('fs'),
  struct_languages = require('./language.struct.js');

var value = "";

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
    var path = 'bower_components/codemirror/mode/' + struct_languages[language].style + '/' + struct_languages[language].style + '.js';
    $.loadScript(path, function() {
      editor.setOption("mode", struct_languages[language].mime);
      loadedLanguages.push(language);
    });
  } else {
    editor.setOption("mode", struct_languages[language].mime);
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
  var filename = struct_languages[language].mime.replace("text/", "");
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
  if (editor.getValue() == template) {
    loadTemplate(name, function() {
      editor.setValue(template);
    });
  }
});

$("#btnstart").click(function() {

});

loadLanguage("C");
loadTemplate("C", function() {
  editor.setValue(template);
});

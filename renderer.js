// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var fs = require('fs'),
  struct_languages = require('./language.struct.js'),
  File = require('./File.class.js'),
  {
    ipcRenderer,
    remote
  } = require('electron'),
  {
    dialog
  } = require('electron').remote,
  Preferences = require('./Preferences.class.js'),
  Console = require('./Console.class.js');
remote.require('./menu.js');

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
  theme: "tomorrow-night-eighties"
});

$('.workspace').paneless();

var currentConsole = new Console($('.console'));
var currentFile = new File(currentConsole);
var currentPreferences = new Preferences(editor, currentConsole);


ipcRenderer.on('save!', function(event, args) {
  if (currentFile.temp) {
    var currentLanguage = currentFile.language;
    dialog.showSaveDialog({
      filters: [{
        'name': currentLanguage + ' Files',
        extensions: [struct_languages[currentLanguage].extension.substr(1)]
      }]
    }, function(response, checkboxChecked) {
      console.log(response);
      currentFile.changePath(response);
      currentFile.save(editor.getValue(), function() {

      });
    });
  } else {
    currentFile.save(editor.getValue(), function() {

    });
  }
});

ipcRenderer.on('open!', function(event, args) {
  dialog.showOpenDialog(function(response, checkboxChecked) {
    response = response[0];
    currentFile.changePath(response);
    fs.readFile(response, function(err, data) {
      if (err) {
        throw err;
      }
      tmp = data.toString();
      editor.setValue(tmp);
    });
  });
});

ipcRenderer.on('openPreferences', function(event, args) {
  currentPreferences.show();
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

  currentFile.changeLanguage(language);
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
  // console.log(JSON.stringify(editor.getValue()), JSON.stringify(template.replace(/\r/g,'')));
  if (editor.getValue() == template.replace(/\r/g, '')) {
    loadTemplate(name, function() {
      editor.setValue(template);
    });
  }
});

$("#btnstart").click(function() {
  currentFile.save(editor.getValue(), function() {
    currentFile.compile(function() {
      currentFile.run();
    });
  });
});

$("#btnstop").click(function() {
  currentFile.stop();
});

loadLanguage("C");
loadTemplate("C", function() {
  editor.setValue(template);
});

// Setup console background color
$(function() {
  currentConsole.reload();
});

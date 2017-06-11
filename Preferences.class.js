const settings = require('electron-settings'),
  fs = require('fs'),
  path = require('path');

function Preferences(editor) {
  this.editor = editor;
  if (!settings.has('theme')) {
    this.theme = "tomorrow-night-eighties";
    settings.set('theme', 'tomorrow-night-eighties');
  } else {
    this.theme = settings.get('theme');
  }

  $('title').append('<link rel="stylesheet" href="bower_components/codemirror/theme/' + this.theme + '.css">');
  this.editor.setOption("theme", this.theme);
}

Preferences.prototype.show = function() {
  var base = this;
  var themes = {};
  console.log(this.theme);
  fs.readdir("./bower_components/codemirror/theme/", function(err, items) {
    for (var i = 0; i < items.length; i++) {
      var basename = path.basename(items[i], '.css');
      var components = basename.split('-');
      for (var j = 0; j < components.length; j++) {
        components[j] = components[j].charAt(0).toUpperCase() + components[j].slice(1);
      }
      var properName = components.join(" ");
      themes[basename] = properName;
    }

    var options = "<select id='theme'>";
    for (var key in themes) {
      var selected = "";
      if (key == this.theme) {
        selected = "selected";
      }
      options += "<option value='" + key + "'" + selected + ">" + themes[key] + "</option>";
    }
    options += "</select>";

    var dialog = "<div id='preferences'><h1>Preferences</h1><p><label for='theme'>Syntax Theme: </label>" + options + "</p><button id='exitpref'>Exit</button></div>";

    $('body').append(dialog);
    $('#theme').change(function(){
      base.set('theme', $('#theme').val());
    });

    $('#exitpref').click(function() {
      $('#preferences').remove();
    });
  });
};

Preferences.prototype.get = function(variable) {

};

Preferences.prototype.set = function(variable, value) {
  switch (variable) {
    case "theme":
      this.theme = value;
      settings.set('theme', value);
      break;
    default:

  }
};

module.exports = Preferences;

var fs = require('fs'),
  path = require('path');

var theme="ambiance";

var themes = {};
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



  var options = "<select>";
  for (var key in themes) {
    var selected = "";
    if (key == theme) {
      selected = "selected";
    }
    options += "<option value='" + key + "'"+ selected +">" + themes[key] + "</option>";
  }
  options += "</select>";

  console.log(options);
});



/*
var child_process = require('child_process');

child_process.exec('where go', function(error, stdout, stderr){
  if(stderr == "INFO: Could not find files for the given pattern(s).\r\n") {
    console.log("command not found");
  }
});
*/

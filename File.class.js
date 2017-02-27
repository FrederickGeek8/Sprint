var temp = require('temp').track(),
  fs = require('fs'),
  struct_languages = require('./language.struct.js');

function File(options) {
  if (typeof options.language == "undefined") {
    this.language = "C";
  } else if (typeof options.path == "undefined") {
    temp.open({
      suffix: struct_languages[this.language].extension
    }, function(err, info) {
      if (err) throw err;
      this.path = info.path;
      fs.close(info.fd, function(err) {
        if (err) throw err;
        // Do something with the file
      });
    });
  } else {
    this.language = options.language;
    this.path = options.path;
  }
}

File.prototype.changePath = function() {

};

File.prototype.save = function (text, callback) {
  fs.writeFile(this.path, text, function(){
    callback.call(this);
  });
};

File.prototype.compile = function(callback) {
// cmd /c ""C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\Tools\VsDevCmd.bat""
  if (struct_languages[this.language].compile !== "") {
    
  }
};

File.prototype.run = function() {

};

module.exports = File;

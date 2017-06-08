var temp = require('temp').track(),
  fs = require('fs'),
  struct_languages = require('./language.struct.js'),
  child_process = require('child_process'),
  path = require('path');

function File(options) {
  base = this;
  if (typeof options == "undefined" || typeof options.language == "undefined") {
    this.language = "C";
  } else {
    this.language = options.language;
  }

  if (typeof options == "undefined" || typeof options.path == "undefined") {

    temp.open({
      suffix: struct_languages[base.language].extension
    }, function(err, info) {
      console.log(info);
      if (err) throw err;
      base.path = info.path;
      base.basename = path.basename(base.path, struct_languages[base.language].extension);
      base.folder = path.dirname(base.path);
      fs.close(info.fd, function(err) {
        if (err) throw err;
        // Do something with the file
      });
    });
  } else {
    this.path = options.path;
    this.basename = path.splittext(this.path);
    console.log(this.basename);
    this.folder = path.dirname(this.path);
  }

  this.child_options = {env: {}};

  child_process.exec('"%VS140COMNTOOLS%\\VsDevCmd.bat" && SET', function(error, stdout, stderr){
    var lines = stdout.split('\n');
    for (var i = 0; i < lines.length - 1; i++) {
      var pair = lines[i].split('=');
      base.child_options.env[pair[0]] = pair[1].toString().trim();
    }
    console.log('env setup');
  });
}

File.prototype.changePath = function() {

};

File.prototype.save = function(text, callback) {
  console.log(this.path);
  fs.writeFile(this.path, text, function() {
    callback.call(this);
  });
};

File.prototype.compile = function(callback) {
  // cmd /c ""C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\Tools\VsDevCmd.bat""

  var command = struct_languages[this.language].compile(this.folder, this.basename);

  child_process.exec(command, this.child_options, function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      callback();
      if (error !== null) {
          console.log('exec error: ' + error);
      }
  });
};

File.prototype.run = function() {
  var command = struct_languages[this.language].run(this.folder, this.basename);

  child_process.exec(command, function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
          console.log('exec error: ' + error);
      }
  });
};

module.exports = File;

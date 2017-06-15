var temp = require('temp').track(),
  fs = require('fs'),
  struct_languages = require('./language.struct.js'),
  child_process = require('child_process'),
  path = require('path');

function File(currentConsole, options) {
  this.console = currentConsole;
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
    this.temp = true;
  } else {
    this.path = options.path;
    this.basename = path.splittext(this.path);
    console.log(this.basename);
    this.folder = path.dirname(this.path);
    this.temp = false;
  }

  this.child_options = {};
  if(struct_languages[base.language].envhack){
    $("#loading").show();
    $("#btnstart").prop("disabled", true);
    child_process.exec('"%VS140COMNTOOLS%\\VsDevCmd.bat" && SET', function(error, stdout, stderr){
      base.child_options = {env: {}};
      var lines = stdout.split('\n');
      for (var i = 0; i < lines.length - 1; i++) {
        var pair = lines[i].split('=');
        base.child_options.env[pair[0]] = pair[1].toString().trim();
      }
      $("#btnstart").prop("disabled", false);
      $("#loading").hide();
    });
  }
}

File.prototype.changePath = function(newPath) {
  this.path = newPath;
  this.temp = false;
  base.basename = path.basename(this.path, struct_languages[this.language].extension);
  this.folder = path.dirname(this.path);
};

File.prototype.save = function(text, callback) {
  console.log(this.path);
  fs.writeFile(this.path, text, function() {
    callback.call(this);
  });
};

File.prototype.changeLanguage = function(language) {
  this.language = language;
};

File.prototype.compile = function(callback) {
  var base = this;
  var command = struct_languages[this.language].compile(this.folder, this.basename);
  console.log(command);
  this.console.clear();

  child_process.exec(command, this.child_options, function (error, stdout, stderr) {
    base.console.postMsg(stdout);
    base.console.postError(stderr);
    callback.call(this);
    if (error !== null) {
      base.console.postError('exec error ' + error);
    }
  });
};

File.prototype.run = function() {
  var base = this;
  if (this.language == "Java") {
    // Get class name
    var getClass = 'java -jar tools\\parsejava-all-1.0.jar ' + this.folder + '\\' + this.basename + '.java';
    child_process.exec(getClass, this.child_options, function(error, stdout, stderr) {
      var command = struct_languages[base.language].run(base.folder, stdout);
      console.log(command);
      child_process.exec(command, base.child_options, function(error2, stdout2, stderr2) {
        base.console.postMsg(stdout2);
        base.console.postError(stderr2);
        if (error !== null) {
          base.console.postError('exec error ' + error2);
        }
      });
    });
  } else {
    var command = struct_languages[this.language].run(this.folder, this.basename);
    child_process.exec(command, this.child_options, function(error, stdout, stderr) {
      base.console.postMsg(stdout);
      base.console.postError(stderr);
      callback.call(this);
      if (error !== null) {
        base.console.postError('exec error ' + error);
      }
    });
  }
};

module.exports = File;

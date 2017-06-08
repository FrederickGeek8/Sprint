var child_process = require('child_process');

var options = {env: {}};

child_process.exec('"%VS140COMNTOOLS%\\VsDevCmd.bat" && SET', function(error, stdout, stderr){
  var lines = stdout.split('\n');
  for (var i = 0; i < lines.length - 1; i++) {
    var pair = lines[i].split('=');
    options.env[pair[0]] = pair[1].toString().trim();
  }

  console.log(options);

  stepTwo();
});

var stepTwo = function() {
  child_process.exec('cl', options, function(error, stdout, stderr) {
    console.log(error, stdout, stderr);
  });
};

var shell = require('shelljs');

shell.exec('"' + shell.env['VS140COMNTOOLS'] + '\\VsDevCmd.bat"',function(code, stdout, stderr) {
  console.log(code, stderr, stdout);
  shell.exec('cl', function(code, stdout, stderr) {
    console.log(code, stderr, stdout);
  });
});

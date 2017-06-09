var child_process = require('child_process');

child_process.exec('where go', function(error, stdout, stderr){
  if(stderr == "INFO: Could not find files for the given pattern(s).\r\n") {
    console.log("command not found");
  }
});

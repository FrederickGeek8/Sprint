// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var value = "";
var editor = CodeMirror(document.body.getElementsByTagName("article")[0], {
  value: value,
  lineNumbers: true,
  lineWrapping: true,
  mode: "htmlmixed",
  keyMap: "sublime",
  autoCloseBrackets: true,
  matchBrackets: true,
  showCursorWhenSelecting: true,
  theme: "monokai"
});

var struct_languages = {
  "C": ["clike", "cl", ""],
  "C#": ["clike", "csc", ""],
  "C++": ["clike", "cl", ""],
  "Go": ["go", "", "go run"],
  "Java": ["clike", "javac", "java"],
  "Node.js": ["javascript", "", "node"],
  "PHP": ["php", "", "php"],
  "Python": ["python", "", "python"],
  "Python 3": ["python", "", "python3"]
};

for (var key in struct_languages) {
  if (struct_languages.hasOwnProperty(key)) {
    var ele = $("<option></option>").text(key);
    console.log(ele.get(0));
    $("#language").append(ele);
  }
}

console.log($("#language").find("option:selected").text());

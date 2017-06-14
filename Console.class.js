function Console(element) {
  this.element = element; // jQuery element
}

Console.prototype.postMsg = function(message) {
  this.element.append($('<p><span class="console_standard"></span></p>').text(message));
};

Console.prototype.postError = function(message) {
  this.element.append($('<p><span class="console_error"></span></p>').text(message));
};

Console.prototype.clear = function() {
  this.element.empty();
};

Console.prototype.reload = function() {
  this.element.css("background-color", $('.CodeMirror').css("background-color"));
  $('.CodeMirror').append("<span class='cm-error' id='console-test'></span>");
  var errorColor = $('#console-test').css("color");
  var errorBackground = $('#console-test').css("background-color");
  var standardColor = $('.CodeMirror').css("color");

  var cssText = '.console_error { color: ' + errorColor + '; background: ' + errorBackground + '; }';
  cssText += '.console_standard { color: ' + standardColor + ';}';

  // https://stackoverflow.com/questions/15493965/define-global-css-classes-using-javascript-or-jquery
  var style=document.createElement('style');
  style.type='text/css';
  if(style.styleSheet){
    style.styleSheet.cssText = cssText;
  }else{
    style.appendChild(document.createTextNode(cssText));
  }
  document.getElementsByTagName('head')[0].appendChild(style);
};

module.exports = Console;

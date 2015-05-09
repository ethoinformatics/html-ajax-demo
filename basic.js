/*
  This is a basic JavaScript program to
  demonstrate simple user interaction
*/

var buttonCount = 0;    // a variable to count the button presses

/*
  this function is run when the HTML page loads.
  In basic.html, you'll see a script tag in the body
  that loads this script.
  See the bottom of this script, where it's called.
*/
function setup() {
  // get the elements:
  var myButton = document.getElementById('pressMe');
  var myField = document.getElementById('entry');

  // add event listeners to listen for user interaction:
  myButton.addEventListener('click', buttonPress, false);
    myField.addEventListener('textInput', echo, false);
}

// this is the event listener for the button clicks:
function buttonPress() {
  // get the element called 'message':
  var messageDiv = document.getElementById('message');
  // change the text of the message div:
  messageDiv.innerHTML = "You pressed me " + buttonCount + " times";
  // increment the button counter:
  buttonCount++;
}

// this si the event listener for the text field:
function echo() {
  // get the field in which there was text input:
  var whichField = event.target;
  // get the element called 'message':
  var messageDiv = document.getElementById('message');
  // change the text of the message div:
  messageDiv.innerHTML = event.target.value;
}

// run the setup function when this script is loaded:
setup();

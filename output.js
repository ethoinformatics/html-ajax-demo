var observation = {};

function setup() {
  var saveButton = document.getElementById('save');
  saveButton.addEventListener('click', getData, false);
  setInterval(setTime, 1000);
}

function setTime() {
  var now = new Date;
  document.getElementById('eventDate').value = now;
}

function getData() {
  var dataFields = document.getElementById('fields');
  var resultField = document.getElementById('result');

  var fields = dataFields.getElementsByTagName('input');
  var thisField, f;
  for (f = 0; f < fields.length; f++) {
    thisField = fields[f];
    property = thisField.id;
    observation[property] = thisField.value;
  }

  resultField.innerHTML = JSON.stringify(observation);
}


setup();

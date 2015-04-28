var record = {};

function setup() {
  // set a clock to update the Date/Time field every second:
  setInterval(clock, 1000);

  // set event listeners for the buttons.
  // First get the whole button div:
  var buttonDiv = document.getElementById('buttonDiv');
  // then get all the buttons in a list:
  var buttons = buttonDiv.getElementsByTagName('*');
  // the iterate over the list and add event listeners:
  for (var b=0; b< buttons.length; b++) {
    buttons[b].addEventListener('click', contactServer, false);
  }
}

// this function updates the date/time field  once a second:
function clock() {
  var dateField = document.getElementById('date');
  dateField.value = new Date();
}

// this function contacts the server:
function contactServer() {
  // get the method from the button clicked:
  var method = event.target.innerHTML;

  // get the record _id and name from the UI fields:
  record._id = document.getElementById('uuid').value;
  record._rev = document.getElementById('rev').value;
  record.name = document.getElementById('username').value;

  // set up the basic HTTP parameters:
  var params = {
    url: 'http://demo.ethoinformatics.org:5984/mike_demo/',
    type: method,
    success: callback,
    contentType: 'application/json',
    dataType: 'json',
  }
  // convert the data to a string for sending:
  data = JSON.stringify(record);

  // GET wants /document/recordID and no request body:
  if (method === 'GET') {
    params.url += record._id;
  }

  // POST wants /document/ and a request body with record ID and record Rev:
  if (method === 'POST') {
    params.data = data;
  }

  // PUT wants /document/recordID and a request body with just the data
  // (ID optional in the body):
  if (method === 'PUT') {
    params.url += record._id;
    params.data = data;
  }

  // DELETE wants /document/recordID?recordRev and no request body:
  if (method === 'DELETE') {
    params.url += record._id;
    params.url += "?rev=" + record._rev;
  }

  // make the HTTP call:
  $.ajax(params);
  console.dir(data);
}

// this function gets the request response:
function callback(data) {
  // save the response as the local record:
  record = data;
  // if there's a name, put it in the name field;
  if (record.name) {
    document.getElementById('username').value = record.name;
  }
  // if there's rev or a _rev, put it in the rev field:
  if (record.rev) {
    document.getElementById('rev').value = record.rev;
  }
  if (record._rev) {
    document.getElementById('rev').value = record._rev;
  }

  console.dir(record);
}


function setup() {
  // set a clock to update the Date/Time field every second:
  setInterval(clock, 1000);

  // set event listeners for the buttons.
  // First get the whole button div:
  var buttons = document.getElementsByClassName('verbs');
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
  var record = {};

  // get the record _id and name from the UI field:
  var id = document.getElementById('uuid').value;
  var rev = document.getElementById('rev').value;
  var username = document.getElementById('username').value;

  // if you get valid values from the fields, put them in the record variable:
  if (id) record._id = id;
  if (rev) record._rev = rev;
  if (username) record.name = username;

  // set up the basic HTTP parameters:
  var params = {
    url: document.getElementById('database').value, // get the database name
    type: method,       // the HTTP method is from the button HTML
    success: success,   // the success callback function is called 'success'
    error: failure,     // the error callback function is called 'failure'
    contentType: 'application/json',
    dataType: 'json',
  }
  // convert the data to a string for sending:
  data = JSON.stringify(record);

  if (method === 'Generate uuid') {
    //  get a unique ID from the database:
    params.url = 'http://demo.ethoinformatics.org:5984/_uuids';
    params.type = 'GET';
  }

  if (method === 'Record list') {
    //  get the list of all record IDs from the database:
    params.url += '/_all_docs';
    params.type = 'GET';
  }

  // GET wants /document/recordID and no request body:
  if (method === 'GET') {
    params.url += '/' + record._id;
  }

  // POST wants /document/ and a request body with record ID and record Rev:
  if (method === 'POST') {
    params.data = data;
  }

  // PUT wants /document/recordID and a request body with just the data
  // (ID optional in the body):
  if (method === 'PUT') {
    params.url += '/' + record._id;
    params.data = data;
  }

  // DELETE wants /document/recordID?recordRev and no request body:
  if (method === 'DELETE') {
    params.url += '/' + record._id;
    params.url += "?rev=" + record._rev;
  }

  // make the HTTP call:
  $.ajax(params);
}

// this function gets run if the HTTP query returns an error:
function failure(error) {
  document.getElementById('result').value = JSON.stringify(error);
}

// this function gets the request response:
function success(data) {
  // put the returned data in the result field:
  document.getElementById('result').value = JSON.stringify(data);

  // if the data contains an item called uuids,
  // then it's a uuid from the database. Put it in the uuid field:
  if (data.uuids) {
    document.getElementById('uuid').value = data.uuids[0];
  }
  // if there's a name, put it in the name field:
  if (data.name) {
    document.getElementById('username').value = data.name;
  }
  // if there's rev or a _rev, put it in the rev field:
  if (data.rev) {
    document.getElementById('rev').value = data.rev;
  }
  if (data._rev) {
    document.getElementById('rev').value = data._rev;
  }
}

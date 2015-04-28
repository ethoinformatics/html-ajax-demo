var record = {};

function setup() {
  console.log('starting');
  setInterval(clock, 1000);

  var buttonDiv = document.getElementById('buttonDiv');
  var buttons = buttonDiv.getElementsByTagName('*');

  for (var b=0; b< buttons.length; b++) {
    buttons[b].addEventListener('click', contactServer, false);
  }
}

function clock() {
  var dateField = document.getElementById('date');
  dateField.value = new Date();
}

function contactServer() {
  var method = event.target.innerHTML;      // get the method from the button clicked
  record._id = document.getElementById('uuid').value;
  var me = document.getElementById('username').value;
  record.name = me;

var url = 'http://demo.ethoinformatics.org:5984/mike_demo/' + record._id

    data = JSON.stringify(record);

    if (method === 'GET') {
      $.ajax({
        url: url,
        type: method,
        success: callback
      });
    }

    if (method === 'POST') {
      //url += "?rev=" + record._rev;
      delete record._rev;
      delete record._id;
    
      data = JSON.stringify(record);
      $.ajax({
        url: url,
        type: method,
        contentType: 'application/json',
        dataType: 'json',
        data: data,
        success: callback
      });
    }

  if (method === 'DELETE') {
    url += "?rev=" + record._rev;
    $.ajax({
      url: url,
      type: method,
      success: callback
    });
  }

  if (method === 'PUT') {
    $.ajax({
      url: url,
      type: method,
      contentType: 'application/json',
      dataType: 'json',
      data: data,
      success: callback
    });
  }

  console.log(data);

}

function callback(data) {
  record = JSON.parse(data);


    document.getElementById('username').value = record.name;


  console.dir(record);
}

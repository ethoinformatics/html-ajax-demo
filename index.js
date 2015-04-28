
// variables for the UI elements:
var previousButton, nextButton, recordsButton;

// the URL from which you're going to get data:
var url = 'http://localhost:5984/diary/d2900ad0479be87cc96c8a9139000827';

var dbDocument = null;    // the current diary document from the DB
var recordCount = 0;      // record count of the current diary
var currentRecord = 0;    // record you're currently looking at

function setup() {
  // get all the UI buttons:
  previousButton = document.getElementById('previous');
  nextButton = document.getElementById('next');
  recordsButton = document.getElementById('getRecords');
  // set event listeners for the buttons:
  recordsButton.addEventListener('click', getRecords, false);
  previousButton.addEventListener('click', prevRecord, false);
  nextButton.addEventListener('click', nextRecord, false);
}

function getRecords() {
  // get the records from the dbDocument using jquery ($)
  // When you do, run saveRecords():
  $.get(url, saveRecords, 'json');
}

function saveRecords(data) {
  dbDocument = data;        // save the results locally
  recordCount = dbDocument.entries.length;
  currentRecord = 0;        // reset current record
  display(currentRecord);   // show the first record
}

// event handlers for forward and back buttons:
function prevRecord() {
  if (currentRecord >= 0) { // if the record index number is valid
    currentRecord--;        // decrement currentRecord
    display(currentRecord); // display it
  }
}

function nextRecord() {
  if (currentRecord < recordCount) { // if the record index number is valid
    currentRecord++;                 // increment currentRecord
    display(currentRecord);          // display it
  }
}


function display(recordNum) {
  // get the entry element:
  var thisRecord = document.getElementById('entry');
  // and get its child elements:
  var children = thisRecord.getElementsByTagName('*');
  // you'll use these variables later:
  var c, thisChild, datum, thisEntry;
  //Fill the fields by iterating over the children of the entry element:
  for (c = 0; c < children.length; c++) {
    thisEntry = dbDocument.entries[recordNum];  // get the current DB entry
    thisChild = children[c];                  // get the current child
    datum = thisChild.id;                     // the id is the db datum name
    thisChild.value = thisEntry[datum];       // fill in the data from the db
  }

}

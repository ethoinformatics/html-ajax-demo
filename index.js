
// variables for the UI elements:
var previousButton, nextButton, recordsButton;

var url;               // the URL from which you're going to get data
var records = [];      // record ids of the current database
var currentRecord = 0; // record you're currently looking at
var lastLayer = null;   // the last layer added to the map

// this function is called when the HTML is loaded.
// it sets the behaviors for all the UI elements:
function setup() {
  // get all the UI buttons:
  previousButton = document.getElementById('previous');
  nextButton = document.getElementById('next');
  recordsButton = document.getElementById('getRecords');

  // set event listeners for the buttons:
  recordsButton.addEventListener('click', getRecordList, false);
  previousButton.addEventListener('click', prevRecord, false);
  nextButton.addEventListener('click', nextRecord, false);
}

// this function is called to request an the document list from the database:
function getRecordList() {
  // get the URL:
  url = document.getElementById('db').value;

  // get the records from the database using jquery ($)
  // When you do, run saveRecordList():
  $.get(url + '_all_docs', saveRecordList, 'json');
}

// this function takes the reply from the request
// for the document list and saves the relevant IDs in a list:
function saveRecordList(data) {
  var recordCount = data.rows.length; // number of records

  for (var i=0; i<recordCount; i++) { // iterate over the records
    var thisId = data.rows[i].id;     // get the ID of each record
    if (thisId.match(/AV/)) {         // if it contains "AV",
    records.push(thisId);             // add it to the records array
  }
}

if (map) {                            // If there is a map div
  map.removeLayer(lastLayer);         // clear the map for the new database
  lastLayer = null;                   // clear the lastLayer variable
}
currentRecord = 0;                    // reset current record index
getRecord(currentRecord);             // show the first record
}

// event handlers for previous and next buttons:
function prevRecord() {
  if (currentRecord >= 0) {   // if the record index number is valid
    currentRecord--;          // decrement currentRecord
    getRecord(currentRecord); // get the current record from the DB
  }
}

function nextRecord() {
  if (currentRecord < records.length) { // if the record index number is valid
    currentRecord++;                    // increment currentRecord
    getRecord(currentRecord);           // get the current record from the DB
  }
}

// this function requests an indovidual record from the
function getRecord(recordNum) {
  // get the URL:
  url = document.getElementById('db').value;

  var thisEntry = records[recordNum];       // get the ID of the entry you want
  $.get(url + thisEntry, display, 'json');  // make the HTTP call for the record
}

// this function displays the result of the request
// for an individual record:
function display(data) {
  var entry = document.getElementById('fields');    // get the fields div
  var fields = entry.getElementsByTagName('*');     // and get its child elements
  var thisChild, property, thisEntry;

  // if there's a data.footprint property, assume it's geoJSON and
  // add it to the map:
  // make sure the map and the Leaflet object exist:
  if (typeof L !== 'undefined' && typeof map !== 'undefined') {
    console.log(lastLayer);
    // if there's a layer from a previous record, remove it:
    if (lastLayer !== null) {
      map.removeLayer(lastLayer);
    }

    if (data.footprint) {
      // add the footprint to the map:
      lastLayer = L.geoJson(data.footprint);
      map.addLayer(lastLayer);
    }
  }
  // Fill the fields by iterating over the children of the fields div:
  for (var f = 0; f < fields.length; f++) {
    thisField = fields[f];               // get the current field
    property = thisField.id;             // the field id is the property you want
    if (data[property]) {                // if it has a value,
      thisField.value = data[property];  // fill in the data from the db
    }
  }
}

setup(); // once the page is loaded, set all the behaviors up

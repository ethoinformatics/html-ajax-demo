
// variables for the UI elements:
var previousButton, nextButton, recordsButton;

// the URL from which you're going to get data:
var url = 'http://demo.ethoinformatics.org:5984/pp_contacts';

var database = null;    // the current diary document from the DB
var records = [];      // record ids of the current database
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
  // get the records from the database using jquery ($)
  // When you do, run saveRecords():
  $.get(url + '/_all_docs/', saveRecords, 'json');
}

function saveRecords(data) {
  var recordCount = data.rows.length;
  for (var i=0; i<recordCount; i++) {
    var thisId = data.rows[i].id;
    if (thisId.match(/AV/)) {
      records.push(thisId);
    }
  }
  currentRecord = 0;        // reset current record
  getRecord(currentRecord);   // show the first record
}

// event handlers for forward and back buttons:
function prevRecord() {
  if (currentRecord >= 0) { // if the record index number is valid
    currentRecord--;        // decrement currentRecord
    getRecord(currentRecord);
  }
}

function nextRecord() {
  if (currentRecord < records.length) { // if the record index number is valid
    currentRecord++;                 // increment currentRecord
    getRecord(currentRecord);
  }
}

function getRecord(recordNum) {
  var thisEntry = records[recordNum];  // get the current DB entry
  $.get(url + '/' + thisEntry, display, 'json');
}

function display(data) {
//   //console.log(data.footprint);
//    var geojsonFeature = data.footprint;
//
// // TODO: Fix tony's GeoJSON to get it to work.
// if (typeof geojsonFeature === 'object' ) {
//   console.log(geojsonFeature);
//   L.geoJson(geojsonFeature).addTo(map);
// }

  // get the entry element:
  var thisRecord = document.getElementById('entry');
  // and get its child elements:
  var children = thisRecord.getElementsByTagName('*');
  // you'll use these variables later:
  var c, thisChild, datum, thisEntry;
  //Fill the fields by iterating over the children of the entry element:
  for (c = 0; c < children.length; c++) {
    thisChild = children[c];                  // get the current child
    datum = thisChild.id;                     // the id is the db datum name
    thisChild.value = data[datum];       // fill in the data from the db
  }

}

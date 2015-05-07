var map = L.map('map').setView([-0.642000, -76.14500], 13);

L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
maxZoom: 18,
id: 'examples.map-i875mjb7'
}).addTo(map);


var popup = L.popup();

function onMapClick(coords) {
    popup
        .setLatLng(coords.latlng)
        .setContent("You clicked the map at " + Math.round(coords.latlng.lat * 10000)/10000 + ", " + Math.round(coords.latlng.lng*10000)/10000)
        .openOn(map);
}

map.on('click', onMapClick);

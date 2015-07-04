var startLat = -34.397;
var startLong = 150.644;
var startZoom = 8;

function loadMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: startZoom,
        center: { lat: startLat, lng: startLong }
    });
}

google.maps.event.addDomListener(window, 'load', loadMap);

function rad(x) {
    return x * Math.PI / 180;
}

function getDistance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.coords.latitude - p1.coords.latitude);
    var dLong = rad(p2.coords.longitude - p1.coords.longitude);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.coords.latitude)) * Math.cos(rad(p2.coords.latitude)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
}
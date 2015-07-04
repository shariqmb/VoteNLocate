var startLat = 24.8600;
var startLong = 67.0100;
var startZoom = 16;
var invokeDistance = 5;
var WatchID;
var bgGeo;
var mapObject;
var currentLocMarker = null;
var userLatLng;
var circle;
var PreviousLoc = null;


function startTracking() {
    var userLatLng = new google.maps.LatLng(startLat, startLong);
    var myOptions = {
        zoom: startZoom,
        center: userLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
    var options = { frequency: 3000, enableHighAccuracy: true, maximumAge: 60000, timeout: 10000 };
    WatchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
}

function onSuccess(loc) {
    userLatLng = new google.maps.LatLng(loc.coords.latitude, loc.coords.longitude);
    if (currentLocMarker == null) {
        currentLocMarker = new google.maps.Marker({
            map: mapObject,
            position: userLatLng
        });
        circle = new google.maps.Circle({
            center: userLatLng,
            radius: loc.coords.accuracy,
            map: mapObject,
            fillColor: '#0000FF',
            fillOpacity: 0.1,
            strokeColor: '#0000FF',
            strokeOpacity: 1.0
        });
        mapObject.setCenter(userLatLng);
    } else {
        mapObject.setCenter(userLatLng);
        currentLocMarker.setPosition(userLatLng);
        circle.setCenter(userLatLng);
        circle.setRadius(loc.coords.accuracy);
    }
}
function onError(e) {
    var syncdate = new Date();
    parent.document.getElementById('syncStatus').innerHTML = 'Location error at ' + syncdate.getHours() + ":" + syncdate.getMinutes();
}

function clearwatchID() {
    if (WatchID != null) {
        navigator.geolocation.clearWatch(WatchID);
        WatchID = null;
    }
}
google.maps.event.addDomListener(window, 'load', startTracking);

function SendDatatoServer(loc) {
    if (PreviousLoc == null) {
        PreviousLoc = loc;
        SendLatLng(loc)
    } else {
        if (getDistance(loc, PreviousLoc) > invokeDistance) {
            SendLatLng(loc);
            PreviousLoc = loc;
        }
    }
}
function SendLatLng(loc) {
    var latitude = parseFloat(loc.coords.latitude);
    var longitude = parseFloat(loc.coords.longitude);
    var accuracy = parseInt(loc.coords.accuracy);    
}

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
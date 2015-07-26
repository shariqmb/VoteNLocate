var startZoom = 15;
var map;

function initialize() {
    var mapOptions = {
        zoom: startZoom
    };
    map = new google.maps.Map(document.getElementById('historicMap'), mapOptions);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            addMarker(map, pos);
            google.maps.event.trigger(map, "resize");
        }, function () {
            handleNoGeolocation(true);
        });
    } else {
        handleNoGeolocation(false);
    }
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };
    map.setCenter(options.position);
}

function addMarker(map, latlong) {
    var markerOptions = {
        position: latlong,
        map: map,
        clickable: false
    };
    var marker = new google.maps.Marker(markerOptions);
    map.setCenter(latlong);
}

google.maps.event.addDomListener(window, 'load', initialize);
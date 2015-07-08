var startZoom = 8;
var map;

setTimeout(function () {
    // $.mobile.loading("show", { text: "", textVisible: false, theme: "z", html: "" });
    $.mobile.changePage("#MapPage");
}, 3000);

function initialize() {
    $("#map").height($(window).height() - 65);
    var mapOptions = {
        zoom: startZoom
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            addMarker(map, pos, '', '');
            map.setCenter(pos);
        }, function () {
            handleNoGeolocation(true);
        },{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
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

function addMarker(map, latlong, title, content) {
    var markerOptions = {
        position: latlong,
        map: map,
        title: title,
        clickable: true
    };
    var marker = new google.maps.Marker(markerOptions);
}

function back() {
    $.mobile.back();
}

google.maps.event.addDomListener(window, 'load', initialize);
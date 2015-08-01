var startZoom = 15;
var map, customerPos, qualityValue, densityValue, colorPicker;
function initialize() {
    $("#map").height($(window).height() - 65);
    var mapOptions = {
        zoom: startZoom
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            customerPos = position;
            pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            addMarker(map, pos);
            google.maps.event.trigger(map, "resize");
        }, function () {
            handleNoGeolocation(true);
        }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
    } else {
        handleNoGeolocation(false);
    }
}

function markCustomerVotes(result) {
    for (i = 0; i < result.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(result[i].Latitude, result[i].Longitude),
            map: map
        });
    }
}

function LoadPopUp() {
    SetSlider();
    getText(5, setDialogText);
}

function setDialogText(result) {
    $("#spanPopUpHead").text(result.DisplayText);
}

function SetSlider() {
    var slideVal = parseInt($("#sliderDensity").val());
    densityValue = slideVal;
    $("#sliderDensityValue").val(slideVal);
    qualityValue = 1;
    $("#sliderDensityValue").css("width", slideVal + 30);
    $("#sliderDensityValue").css("height", slideVal + 30);
    $("#sliderDensityValue").css("background-color", "#2E008B");
    $("#sliderDensityValue").css("border", "1px solid #2E008B");
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

function getRealContentHeight() {
    var header = $.mobile.activePage.find("div[data-role='header']:visible");
    var footer = $.mobile.activePage.find("div[data-role='footer']:visible");
    var content = $.mobile.activePage.find("div[data-role='content']:visible:visible");
    var viewport_height = $(window).height();

    var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
    if ((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
        content_height -= (content.outerHeight() - content.height());
    }
    return content_height;
}
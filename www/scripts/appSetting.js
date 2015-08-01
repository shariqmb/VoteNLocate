$(document).on("deviceready", function () {
    document.addEventListener("backbutton", function (e) {
        if ($.mobile.activePage.is('#MapPage')) {
            navigator.app.exitApp();
        }
        else {
            navigator.app.backHistory()
        }
    }, false);
    checkConnection();
});

$(document).bind("mobileinit", function () {
    $.mobile.allowCrossDomainPages = true;
});

$(document).on('pagebeforeshow', 'div[data-role="dialog"]', function (e, ui) {
    ui.prevPage.addClass("ui-dialog-background ");
});

$(document).on('pagehide', 'div[data-role="dialog"]', function (e, ui) {
    $(".ui-dialog-background ").removeClass("ui-dialog-background ");
});

$(document).on('pagebeforecreate', '[data-role="page"]', function () {
    $('html, body').css({
        'overflow': 'hidden',
        'height': '100%'
    });
    setTimeout(function () {
        $.mobile.loading('show');
    }, 1);
});

$(document).on('pageshow', '[data-role="page"]', function () {
    setTimeout(function () {
        $.mobile.loading('hide');
    }, 300);
});

function back() {
    $.mobile.back();
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';
    if (states[networkState] == 'No network connection')
        alert('Please turn on device internet');
}

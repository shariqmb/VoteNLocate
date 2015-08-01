$(document).on("deviceready", function () {
    document.addEventListener("backbutton", function (e) {
        if ($.mobile.activePage.is('#MapPage')) {
            navigator.app.exitApp();
        }
    }, false);
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
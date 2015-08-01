/// <reference path="ajax.js" />
/// <reference path="helpingMethods.js" />
var map, customerPos, qualityValue, densityValue, colorPicker, votingTime, elapsedTime, hasVote;

$(document).delegate("#SplashScreen", "pageinit", function () {
    $("#LogoSplash").width($(window).width() - 30);
    $("#PublicitySplash").width($(window).width() - 30);
    setTimeout(hideSplash, 2000);
    function hideSplash() {
        $.mobile.changePage("#MapPage");
    }
});

$(document).delegate("#MapPage", "pageinit", function () {
    votingTime = localStorage.getItem('voteTime');
    //$('#content').height(getRealContentHeight());
    initialize();
    getAllCustomerVotes(markCustomerVotes);
    if (typeof votingTime != "undefined" && !hasVote) {
        elapsedTime = votingTime - Date.now() / 60000;
        if (parseInt(elapsedTime) >= 20) {

        }
    }
});

$(document).delegate("#VotePopUp", "pageinit", function () {
    LoadPopUp();
    $("#sliderDensity").on("change", function () {
        var slideVal = parseInt($("#sliderDensity").val());
        densityValue = slideVal;
        $("#sliderDensityValue").val(slideVal);
        $("#sliderDensityValue").css("width", slideVal + 30);
        $("#sliderDensityValue").css("height", slideVal + 30);
    });
    $(".round").on("vclick", function () {
        colorPicker = $(this).css("background-color");
        qualityValue = $(this).val();
        $("#sliderDensityValue").css("background-color", colorPicker);
        $("#sliderDensityValue").css("border", "1px solid " + colorPicker);
    });
    $(document).on("vclick", "#btnAlertRight", function () {
        var vote = { Latitude: customerPos.coords.latitude, Longitude: customerPos.coords.longitude, DensityValue: densityValue, QualityValue: qualityValue };
        setUserVote(vote);
        localStorage.setItem('voteTime', Date.now());
    });
});

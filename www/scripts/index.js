﻿/// <reference path="ajax.js" />
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

    var isDragging = false;

    $("#sliderDensity").mousedown(function () {
        isDragging = true;
    })

    .mousemove(function () {
        if (isDragging)
        {
              //debugger;
        var slideVal = parseInt($("#sliderDensity").val());
        densityValue = slideVal;
        $("#sliderDensityValue").val(slideVal);
        $("#sliderDensityValue").css("width", slideVal + 30);
        $("#sliderDensityValue").css("height", slideVal + 30);
        }
    })

    $("#sliderDensity").mouseup(function() {
        isDragging = false;
    });

    //$("#sliderDensity").on("change", function () {
    //    debugger;
    //    var slideVal = parseInt($("#sliderDensity").val());
    //    densityValue = slideVal;
    //    $("#sliderDensityValue").val(slideVal);
    //    $("#sliderDensityValue").css("width", slideVal + 30);
    //    $("#sliderDensityValue").css("height", slideVal + 30);
    //});
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




$(document).ready(function () {

    var istriDragging = false;
    var starty = 0;
    var triangleOpacity = 1;

    $("#slidertriangle").mousedown(function (event) {
        starty = event.pageY;
        istriDragging = true;
    })

    .mousemove(function (event) {
        if (istriDragging) {
            var distance = starty - event.pageY;
            distance = distance * 4;
          
            if (distance > 1) {
                triangleOpacity = triangleOpacity-0.02;
                $("#slidertriangle").css("border-bottom-width", 100 + distance);
                $("#slidertriangle").css("border-left-width", 100 + distance);
                if (triangleOpacity > 0.1)
                $("#slidertriangle").css("opacity", triangleOpacity);
            }
            else {
                $("#slidertriangle").css("border-bottom-width", 100);
                $("#slidertriangle").css("border-left-width", 100);
                $("#slidertriangle").css("opacity", 1);

            }
        }
    })

    $("#slidertriangle").mouseup(function () {
        triangleOpacity = 1;
       $("#slidertriangle").css("border-bottom-width", 100);
       $("#slidertriangle").css("border-left-width", 100);
       $("#slidertriangle").css("opacity", 1);

        istriDragging = false;
    });


    $("#slidertriangle").mouseout(function () {
        triangleOpacity = 1;
        $("#slidertriangle").css("border-bottom-width", 100);
        $("#slidertriangle").css("border-left-width", 100);
        $("#slidertriangle").css("opacity", 1);

        istriDragging = false;
    });

    $("#slidertriangle").mouseleave(function () {
        triangleOpacity = 1;
        $("#slidertriangle").css("border-bottom-width", 100);
        $("#slidertriangle").css("border-left-width", 100);
        $("#slidertriangle").css("opacity", 1);

        istriDragging = false;
    });


})
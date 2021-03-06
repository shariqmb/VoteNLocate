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

    $("#sliderDensity").on("vmousedown",function () {
        isDragging = true;
    })

    .on("vmousemove",function () {
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

    $("#sliderDensity").on("vmouseup",function() {
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

$(function(){
   
});

$(document).ready(function () {
    var istriDragging = false;
    var startx = 0;
    var starty = 0;
    var triangleOpacity = 1;
    var size = 100;
    var sizeX = 120;
    var sizeY = 120;
    var msg = " ";

    $("#slidertriangle").on("vmousedown", function (event) { msg = msg + "T vmousedown - "; $("#txt").val(msg)});
    $("#slidertriangle").on("vmouseup", function (event) { msg = msg + "T vmouseup - "; $("#txt").val(msg) });
    $("#slidertriangle").on("vclick", function (event) { msg = msg + "T vclick - "; $("#txt").val(msg) });
    $("#slidertriangle").on("vmouseleave", function (event) { msg = msg + "T mouseleave - "; $("#txt").val(msg) });
    $("#slidertriangle").on("vmouseout", function (event) { msg = msg + "T vmouseout - "; $("#txt").val(msg) });
    $("#slidertriangle").on("touchend", function (event) { msg = msg + "T touchend- "; $("#txt").val(msg) });

    $(document).on("vmousedown", function (event) { msg = msg + "D vmousedown - "; $("#txt").val(msg) });
    $(document).on("vmouseup", function (event) { msg = msg + "D vmouseup- "; $("#txt").val(msg) });
    $(document).on("vclick", function (event) { msg = msg + "D vclick - "; $("#txt").val(msg) });
    $(document).on("vmouseleave", function (event) { msg = msg + "D vmouseleave - "; $("#txt").val(msg) });
    $(document).on("vmouseout", function (event) { msg = msg + "D vmouseout - "; $("#txt").val(msg) });
    $(document).on("touchstart", function (event) { msg = msg + "D touchstart - "; $("#txt").val(msg) });
    $(document).on("touchmove", function (event) { msg = msg + "D touchmove - "; $("#txt").val(msg) });
    $(document).on("touchcancel", function (event) { msg = msg + "D touchcancel - "; $("#txt").val(msg) });
    $(document).on("touchend", function (event) { msg = msg + "D touchend - "; $("#txt").val(msg) });


    $("#slidertriangle").on("touchstart", function (event)
    {
        startx = event.originalEvent.touches[0].pageX;
        starty = event.originalEvent.touches[0].pageY;

        msg = msg + "T touchstart(" + event.originalEvent.touches[0].pageX + "," + event.originalEvent.touches[0].pageY + ") - ";
        $("#txt").val(msg);

    });
    $("#slidertriangle").on("touchmove", function (event)
    {
        msg = msg + "T touchmove (" + event.originalEvent.touches[0].pageX + "," + event.originalEvent.touches[0].pageY + ") - ";
        $("#txt").val(msg);

        var distanceY = starty - event.originalEvent.touches[0].pageY;
        var distanceX = startx - event.originalEvent.touches[0].pageX;
        //distance = distance * 10;

        size = size + 200;
        if (distanceX > 1 || distanceY > 1)
            triangleOpacity = triangleOpacity - 0.02;
        if (distanceX > 1)
            $("#slidertriangle").css("border-left-width", size);
        if (distanceY > 1)
            $("#slidertriangle").css("border-bottom-width", size);
        if (triangleOpacity > 0.1)
            $("#slidertriangle").css("opacity", triangleOpacity);
    });
    $("#slidertriangle").on("touchcancel", function (event) {
        msg = msg + "T touchcancel - "; $("#txt").val(msg);
        for (i = 1; i < 100; i++) {
            op = op - 0.02;
            sizeX = sizeX + 10;
            sizeY = sizeY + 10;
            setTimeout('$("#slidertriangle").css("border-left-width", ' + sizeX + ');', 10 * i - i);
            setTimeout('$("#slidertriangle").css("border-bottom-width", ' + sizeY + ');', 10 * i - i);
            setTimeout('$("#slidertriangle").css("opacity", ' + op + ');', 10 * i - i);
        }
    });


    /*
    $("#slidertriangle").on("vmousedown",function (event) {
        startx = event.pageX;
        starty = event.pageY;
        istriDragging = true;
    });


    $("#slidertriangle").on("touchcancel",function (event) {
        for (i = 1; i < 100; i++) {
            op = op - 0.02;
            sizeX = sizeX + 10;
            sizeY = sizeY + 10;
            setTimeout('$("#slidertriangle").css("border-left-width", ' + sizeX + ');', 10 * i - i);
            setTimeout('$("#slidertriangle").css("border-bottom-width", ' + sizeY + ');', 10 * i - i);
            setTimeout('$("#slidertriangle").css("opacity", ' + op + ');', 10 * i - i);
        }
        $("#slidertriangle").css("border-bottom-width", 100);
        $("#slidertriangle").css("border-left-width", 100);
        $("#slidertriangle").css("opacity", 1);
    });

    $(document).on("vmousemove",function (event) {
        if (istriDragging) {
            var distanceY = starty - event.pageY;
            var distanceX = startx - event.pageX;
            //distance = distance * 10;
          
            size = size + 200;
            if (distanceX > 1 || distanceY>1)
                triangleOpacity = triangleOpacity-0.02;
            if(distanceX > 1)
                $("#slidertriangle").css("border-left-width", size);
            if(distanceY > 1)
                $("#slidertriangle").css("border-bottom-width", size);
            if (triangleOpacity > 0.1)
                $("#slidertriangle").css("opacity", triangleOpacity);
        }
        else {
            $("#slidertriangle").css("border-bottom-width", 100);
            $("#slidertriangle").css("border-left-width", 100);
            $("#slidertriangle").css("opacity", 1);

        }
    });

    $(document).on("vmouseup", function () {
        triangleOpacity = 1;
       $("#slidertriangle").css("border-bottom-width", 100);
       $("#slidertriangle").css("border-left-width", 100);
       $("#slidertriangle").css("opacity", 1);
        istriDragging = false;
    });

    $("#slidertriangle").on("vmouseup", function (event) {
        for (i = 1; i < 100; i++) {
            op = op - 0.01;
            sizeX = sizeX + 10;
            sizeY = sizeY + 10;
            setTimeout('$("#slidertriangle").css("border-left-width", ' + sizeX + ');', 5 * i - i);
            setTimeout('$("#slidertriangle").css("border-bottom-width", ' + sizeY + ');', 5 * i - i);
            setTimeout('$("#slidertriangle").css("opacity", ' + op + ');', 5 * i - i);
        }
        $("#slidertriangle").css("border-bottom-width", 100);
        $("#slidertriangle").css("border-left-width", 100);
        $("#slidertriangle").css("opacity", 1);

    });

    $("#slidertriangle").on("vmouseout",function () {
        
        triangleOpacity = 1;
        $("#slidertriangle").css("border-bottom-width", 100);
        $("#slidertriangle").css("border-left-width", 100);
        $("#slidertriangle").css("opacity", 1);

        istriDragging = false;
    });
    */
    //$("#slidertriangle").on("vmouseleave",function () {
    //    triangleOpacity = 1;
    //    $("#slidertriangle").css("border-bottom-width", 100);
    //    $("#slidertriangle").css("border-left-width", 100);
    //    $("#slidertriangle").css("opacity", 1);

    //    istriDragging = false;
    //});
    

})


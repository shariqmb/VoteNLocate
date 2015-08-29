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




$(document).ready(function () {
    $.vmouse.moveDistanceThreshold=1;
    var istriDragging = false;
    var starty = 0;
    var triangleOpacity = 1;

    $("#slidertriangle").on("swipe", function (event) {
        for(i=1; i<20;i++)
        {
            $("#slidertriangle").css("border-bottom-width", 100 + (i*100));
            $("#slidertriangle").css("border-left-width", 100 + (i * 100));
            $("#slidertriangle").css("opacity", triangleOpacity);
            triangleOpacity = triangleOpacity - 0.02;
            setTimeout(function () { }, 5000);
        }
        triangleOpacity = 1;
        $("#slidertriangle").css("border-bottom-width", 100 );
        $("#slidertriangle").css("border-left-width", 100 );
        $("#slidertriangle").css("opacity", triangleOpacity);
    })
    /*
    $("#slidertriangle").on("vmousedown",function (event) {
        starty = event.pageY;
        istriDragging = true;
    })

    .on("vmousemove",function (event) {
        if (istriDragging) {
            var distance = starty - event.pageY;
            distance = distance * 10;
          
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

    $("#slidertriangle").on("vmouseup",function () {
        triangleOpacity = 1;
       $("#slidertriangle").css("border-bottom-width", 100);
       $("#slidertriangle").css("border-left-width", 100);
       $("#slidertriangle").css("opacity", 1);

        istriDragging = false;
    });


    $("#slidertriangle").on("vmouseout",function () {
        triangleOpacity = 1;
        $("#slidertriangle").css("border-bottom-width", 100);
        $("#slidertriangle").css("border-left-width", 100);
        $("#slidertriangle").css("opacity", 1);

        istriDragging = false;
    });

    //$("#slidertriangle").on("vmouseleave",function () {
    //    triangleOpacity = 1;
    //    $("#slidertriangle").css("border-bottom-width", 100);
    //    $("#slidertriangle").css("border-left-width", 100);
    //    $("#slidertriangle").css("opacity", 1);

    //    istriDragging = false;
    //});
    */

})


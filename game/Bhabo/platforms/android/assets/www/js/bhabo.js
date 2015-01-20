﻿//var room = {
define(['require', 'GameHub', 'CustomFunctions'],
function (require, signal, custom) {

    // Application Constructor
    var initialize = function () {

        if (custom.CheckConnection()) {



            var width = window.innerWidth;
            var height = window.innerHeight;

            

            $('body').css('height', height);
            $('.container').css('height', height);

            $('#outer-dropzone').css('height', 4 * (height / 10));

            $('#outer-dropzone').css('width', width);

            var size = width + "px " + 4 * (height / 10) + "px";
            $('#outer-dropzone').css('background-size', size);


            $('#Message').css('height', (height / 5));
            $('#Message').css('width', width);
            bindEvents();
        } else {
            alert("Please check your network connection !");
            window.location = "index.html";
        }
    };
    var bindEvents = function () {


        if (!window.Cordova) {
            $(document).ready(function () {

                readyFunction();

            });
        }
        document.addEventListener('deviceready', onDeviceReady, false);

        document.addEventListener("backbutton", function () {

            window.location = "index.html";
        }, false);

        document.addEventListener("pause", pauseapp, false);

        document.addEventListener("resume", resumeapp, false);

        menuDiv = document.querySelector("#menu");

        document.addEventListener("menubutton", doMenu, false);

    };
    var pauseapp = function () {
        window.background = true;
    }
    var resumeapp = function () {
        window.background = false;
    };
    var onDeviceReady = function () {                             // called when Cordova is ready
        if (window.Cordova && navigator.splashscreen) {


            readyFunction();
        }
    };
    var menuOpen = false;
    var menuDiv = "";

    function doMenu() {
        console.log("The menu was clicked...");
        if (menuOpen) {
            console.log("close the menu");
            menuDiv.style.display = "none";
            menuOpen = false;
        } else {
            console.log("open the menu");
            menuDiv.style.display = "block";
            menuOpen = true;
        }

    }
    var readyFunction = function () {

        $("[data-toggle]").click(function () {
            var toggle_el = $(this).data("toggle");
            $(toggle_el).toggleClass("open-sidebar");
            event.stopPropagation();
        });
        $('#sidebar').click(function (event) {
            event.stopPropagation();
        });
        $('.container').click(function (event) {

            //if (!$(event.target).closest('#sidebar').length) {

            //}
            $(".container").removeClass("open-sidebar");
            return false;
        });



        //$("body").click(function () {
        //    $(".container").removeClass("open-sidebar");
        //    return false;
        //});

        //$(".swipe-area").swipe({
        //    swipeStatus: function (event, phase, direction, distance, duration, fingers) {
        //        if (phase == "move" && direction == "right") {
        //            $(".container").addClass("open-sidebar");
        //            return false;
        //        }
        //        if (phase == "move" && direction == "left") {
        //            $(".container").removeClass("open-sidebar");
        //            return false;
        //        }
        //    }
        //});

        signal.startConnection();

        window.background = false;

        //window.MessageScroller= $("#Message").scroller({
        //    lockBounce: false
        //});



        $('.ui-loader-default').remove();

        //$('#start').click(function () {
        //    $('#outer-dropzone').addClass("dropzone");

        //});
        //$('#pause').click(function () {
        //    $('#outer-dropzone').removeClass("dropzone");

        //});
    }






    initialize();
});



//var room = {
define(['require','GameHub'],
function (require,signal) {

    // Application Constructor
    var initialize = function () {

        var height = $(window).height();
       
        $('body').css('height', height);
        $('#cards').css('height', height / 5);
        bindEvents();
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

    };
    var pauseapp = function () {
        window.background = true;
    }
    var resumeapp = function () {
        window.background = false;
    };
    var onDeviceReady = function () {                             // called when Cordova is ready
        if (window.Cordova) { 

            readyFunction();
        }
    };
    var readyFunction = function () {

        $('.ui-loader-default').remove();

        signal.startConnection();

        window.background = false;
        
        //$('#start').click(function () {
        //    $('#outer-dropzone').addClass("dropzone");

        //});
        //$('#pause').click(function () {
        //    $('#outer-dropzone').removeClass("dropzone");

        //});
    }






    initialize();
});



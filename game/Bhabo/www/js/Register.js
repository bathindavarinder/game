//var room = {
define(['require'],
function (require) {

    // Application Constructor
    var initialize = function () {

     
        bindEvents();
    };
    var bindEvents = function () {

        if (!window.Cordova) {
            $(document).ready(function () {
               
                readyFunction();

            });
        }
        document.addEventListener('deviceready', onDeviceReady, false);
         

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
        if (window.Cordova && navigator.splashscreen) {


            readyFunction();
        }
    };
    var readyFunction = function () {


        if (localStorage.getItem("Name") != undefined && localStorage.getItem("Name") != "") {

            if (window.Cordova && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            $('#Register').css('display', 'none');
            $('#Game').css('display', 'block');



        } else {
            if (window.Cordova && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            $('#Register').css('display', 'block');
            $('#Game').css('display', 'none');
        }

        $('#Submit').click(function () {
            if ($("#name").val() != "") {
                localStorage.setItem("Name", $("#name").val());
                $("#name").val("")
                $('#Register').css('display', 'none');
                $('#Game').css('display', 'block');
            }

        });
        $('#gameBtn').click(function () {

            window.location = "bhabo.html";

        });

    }






    initialize();
});



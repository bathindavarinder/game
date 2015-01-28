//var room = {
define(['require','CustomFunctions','GameHub'],
function (require,custom,gameHub) {

    // Application Constructor
    var initialize = function () {
        custom.show('loading', false);

        custom.show('afui', true);

        if (!localStorage.getItem("uniqueId")) {
            var uniqueId = guid();
            localStorage.setItem("uniqueId", uniqueId);
        }

     
        bindEvents();
    };

    var guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();

    };

    var bindEvents = function () {

        if (!window.Cordova) {
            $(document).ready(function () {
                FastClick.attach(document.body);
                readyFunction();

            });
        }
       
        document.addEventListener("backbutton", function () {
           
            if (navigator.app) {
                navigator.app.exitApp();
            }  
        }, false);

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
            FastClick.attach(document.body);

            readyFunction();
        }
    };
    var readyFunction = function () {
        FastClick.attach(document.body);
        if (localStorage.getItem("Name") != undefined && localStorage.getItem("Name") != "") {

            if (window.Cordova && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            $("#logname").text(localStorage.getItem("Name"));
            $.ui.launch();
            $.ui.loadContent("signin", null, null, "fade");

        } else {
            if (window.Cordova && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            $.ui.launch(); 
        }

        $("#register").on("click", function () {

            localStorage.setItem("tempName", $("#name").val());

            gameHub.registerName();

        });

        $("#Submit").on("click", function () {

            if (localStorage.getItem("Name") != $("#changenameText").val()) {
                localStorage.setItem("tempName", $("#changenameText").val());

                gameHub.registerName();
            } else {
                $.ui.loadContent("signin", null, null, "fade");
               
            }
            //localStorage.setItem("Name", $("#changenameText").val());

            //$.ui.loadContent("main", null, null, "fade");

            //setTimeout(window.location = "rooms.html", 5000);
        });
        $("#GameRoom").on("click", function () {
            $('body').fadeOut(200, function () {
                document.location.href = "bhabo.html"
            });
        });



        //if (localStorage.getItem("Name") != undefined && localStorage.getItem("Name") != "") {

        //    if (window.Cordova && navigator.splashscreen) {
        //        navigator.splashscreen.hide();
        //    }
        //    $('#Register').css('display', 'none');
        //    $('#Game').css('display', 'block');



        //} else {
        //    if (window.Cordova && navigator.splashscreen) {
        //        navigator.splashscreen.hide();
        //    }
        //    $('#Register').css('display', 'block');
        //    $('#Game').css('display', 'none');
        //}

        //$('#Submit').click(function () {
        //    if ($("#name").val() != "") {
        //        localStorage.setItem("Name", $("#name").val());
        //        $("#name").val("")
        //        $('#Register').css('display', 'none');
        //        $('#Game').css('display', 'block');
        //    }

        //});
        //$('#gameBtn').click(function () {
        //    if (custom.CheckConnection()) {
        //        window.location = "bhabo.html";
        //    }
        //    else {
        //        alert("Please check your network connection");
        //    }

        //});

    }






    initialize();
});



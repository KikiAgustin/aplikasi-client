$(document).ready(function () {
    // Base URL 
    var base_url = "https://www.dfunstation.com/api4/android/";

    //Check Login
    /* if (localStorage.tour == "" || localStorage.tour == null) {
        slide("tour.html");
    } */

    var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/') + 1);

    if (localStorage.login == "true" && filename == 'login.html') {
        window.location.href = "index.html";
        var userfullname = localStorage.userfullname;
    } else if (localStorage.login == null) {
        window.location.href = "login.html";
    } else if (localStorage.login == "false" && filename != 'login.html') {
        window.location.href = "login.html";
    }


    let update = 1;
    var urls = base_url + "index.php/peer/update/" + update + "/?callback=?";

    $.ajax({
        type: "GET",
        url: urls,
        crossDomain: true,
        cache: false,
        success: function (data) {

            if (data['status'] == "OK") {
                swal("Anda masih menggunakan aplikasi lama, tolong segera update aplikasi untuk menikmati lebih banyak fitur", {
                    buttons: {
                        cancel: "Cancel",
                        catch: {
                            text: "Update",
                            value: "catch",
                        }
                    },
                })
                    .then((value) => {
                        switch (value) {
                            case "catch":
                                window.location.href = 'https://play.google.com/store/apps/details?id=com.dfunstation.news';
                                break;
                            default:
                        }
                    });
            }

        }
    });


});



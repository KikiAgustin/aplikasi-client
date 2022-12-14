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

    //Load Function
    var urls = base_url + "index.php/konsultasi/peer_chat_group/" + localStorage.userid + "?callback=?";
    $.ajax({
        type: "GET",
        url: urls,
        crossDomain: true,
        cache: false,
        success: function (data) {
            if (data['status'] == "OK") {
                var verification = "";
                var urls2 = base_url + "index.php/profile/profile/" + localStorage.userid + "/?callback=?";
                $.ajax({
                    type: "GET",
                    url: urls2,
                    crossDomain: true,
                    cache: false,
                    success: function (datas) {
                        if (datas['status'] == "OK") {
                            //alert('ok');
                            var d = new Date(),
                                month = '' + (d.getMonth() + 1),
                                day = '' + d.getDate(),
                                year = d.getFullYear();

                            if (month.length < 2)
                                month = '0' + month;
                            if (day.length < 2)
                                day = '0' + day;

                            var dt = [year, month, day].join('-');
                            if (datas['usia'] < 18) {
                                var datalist = "";
                                var dl = data['section'];
                                var jml = dl.length;
                                $("#load_data").html("");
                                for (var key in dl) {
                                    if (dl.hasOwnProperty(key)) {
                                        datalist += '<a class="product-sec waves-effect waves-ripple animated fadein" onclick="javascript:fade(\'chat-group-peer.html?action=read&chatid=' + dl[key]["id"] + '&userid=' + localStorage.userid + '\')"><strong><i class="fal fa-users"></i>  ' + dl[key]["nama"] + '</strong> <i class="fal fa-arrow-right right"></i></a>';
                                        /* var submenu = dl[key]["sub"];
                
                                        for (var subkey in submenu) {
                                            if (submenu.hasOwnProperty(subkey)) {
                
                                                datalist += '<a  class="product-sec waves-effect waves-ripple animated fadein" onclick="javascript:fade(\'konsul-kategori-konsultan.html?action=read&subid=' + submenu[subkey]["subid"] + '&secid=' + dl[key]["secid"] + '\')">' + submenu[subkey]["namasub"] + ' <i class="fal fa-arrow-right right"></i></a>';
                                            }
                                        } */
                                    }
                                }
                                $("#load_data").append(datalist);
                            } else {
                                verification += '<div class="konsultan-item waves-effect waves-ripple animated fadein">';
                                verification += '<div class="p-20">';
                                if (datas['usia'] > 18) {
                                    verification += 'Maaf fitur ini hanya bisa diakses oleh usia dibawah 18 tahun';
                                }
                                verification += '<br><br>';
                                verification += '</div>';
                                verification += '</div>';
                                $("#load_data").append(verification);
                            }
                        }
                    }
                });
            }
        }

    });
});


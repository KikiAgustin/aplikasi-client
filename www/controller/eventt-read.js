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

	if (localStorage.lat == null && localStorage.long == null) {
		var onSuccess = function (position) {
			localStorage.lat = position.coords.latitude;
			localStorage.long = position.coords.longitude;
			location.reload();
		};

		// onError Callback receives a PositionError object
		//
		function onError(error) {
		}

		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}

	var id = getvar("id");
	var urls = base_url + "index.php/world/read-eventt/" + id + "/" + localStorage.lat + "/" + localStorage.long + "/?callback=?";

	$.ajax({
		type: "GET",
		url: urls,
		crossDomain: true,
		cache: false,
		success: function (data) {

			var datalist;

			datalist = "";

			if (data['status'] == "OK") {
				datalist += '<div class="blog-fullwidth animated fadein delay-1">';
				datalist += '<div class="blog-image"><img src="' + data['detailgambar'] + '" alt="" /></div> <div class="tabs"><div class="tab tab-active" onClick="javascript:fade(\'eventt-read.html?id=' + id + '\');">Profile</div><div id="sendchat" class="tab" onClick="javascript:fade(\'eventt-buy.html?voucherid=' + id + '&userid=' + localStorage.userid + ' \')">Beli Voucher</div></div>';

				datalist += '<div class="blog-preview p-20"><h4><strong>' + data["detailnama"] + '</strong></h4></p>';
				datalist += '<p>' + data["ringkas"] + '</p>';
				datalist += '<p><strong style="color:#CC3300;" > Rp. ' + data["harga"] + '</strong></p>';
				datalist += '<p>' + data["detaillengkap"] + '</p>';


				datalist += "<br><br><a class=\"btn btn-default btn-block\" href=\"javascript:window.plugins.socialsharing.share('" + data['detailnama'] + " - " + data['ringkas'] + "',null, null, '" + data['detailurl'] + "')\"><i class=\"fal fa-share\"></i>&nbsp;&nbsp;Share</a>";
				datalist += '</div></div>';
				$("#bloglist").append(datalist);
				delete (datalist);

			}

		}
	});
});

function sendchat() {

	$("#sendchat").html(`
	<div class="preloader-wrapper small active">
    <div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
    `);
	$("#sendchat").attr("disabled", true);

	// window.location.replace();

	// Base URL 
	// var base_url = "https://www.dfunstation.com/api4/android/";

	// var urls_ = base_url + "index.php/world/pembayaran/" + localStorage.userid + "/" + id + "/?callback=?";
	// $.ajax({
	// 	type: "GET",
	// 	url: urls_,
	// 	crossDomain: true,
	// 	cache: false,
	// 	success: function (data) {
	// 		if (data['status'] == "OK") {
	// 			//alert(data['harga']);
	// 			slide("eventt-buy.html??voucherid=" + data['voucherid'] + "&userid=" + data['userid']);

	// 		}
	// 	}
	// });
}
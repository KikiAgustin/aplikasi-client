$(document).ready(function () {

	var base_url = "https://www.dfunstation.com/api4/android/";
	var url= base_url+"index.php/member/login/?callback=?";
    
    //Login Function
    $("#login").click(function(){						   
	   var email=$("#username").val();
       var password=$("#password").val();


		var dataString="username="+email+"&password="+password+"&deviceid="+localStorage.deviceid;
		
		if($.trim(email).length<3){ swal("Email masih kosong atau terlalu pendek"); }
		if($.trim(password).length<3){ swal("Password masih kosong atau terlalu pendek"); }
    	
		if($.trim(email).length>0 & $.trim(password).length>0){
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ 
                    // $("#main-login").LoadingOverlay("show");
                    $("#login").html('Menyambungkan...');
                },
				success: function(data){					
					if(data['status']=="OK"){
						var userid = data['userid'];
						var userfullname = data['userfullname'];
						var avatar = data['avatar'];
						var usertipe = data['usertipe'];
						var peer = data['peer'];
						var mitraid = data['mitraid'];
						var verification_need = data['verification'];
						var verification = data['verification'];
						var verification_until = data['verification_until'];
						var usia18 = data['usia18'];
                        
                        //Set Local Storage
						localStorage.login="true";
						localStorage.email=email;
						localStorage.userid=userid;
						localStorage.userfullname=userfullname;
						localStorage.avatar=avatar;
						localStorage.usertipe = usertipe;
						localStorage.peer = peer;
						localStorage.mitraid = mitraid;
						localStorage.verification_need = verification_need;
						localStorage.verification = verification;
						localStorage.verification_until = verification_until;
						localStorage.usia18 = usia18;
						localStorage.tour = "true";
						localStorage.cekref = 1;
                        
                        // Go!
                        //$("#main-login").LoadingOverlay("hide");
						javascript:fade('index.html');
					} else if(data['status']=="ERROR") {
                        $("#main-login").LoadingOverlay("hide");
						swal(data['message']);
						$("#login").html('Login');
					}
				}
			});
        }
        return false;
    });

	//Change Password
	$("#change_password").click(function () {
		var email = localStorage.email;
		var old_password = $("#old_password").val();
		var new_password = $("#new_password").val();
		var dataString = "old_password=" + old_password + "&new_password=" + new_password + "&email=" + email + "&change_password=";
		if ($.trim(old_password).length > 0 & $.trim(old_password).length > 0) {
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function () { $("#change_password").val('Connecting...'); },
				success: function (data) {
					swal(data);
					if (data == "incorrect") {
						swal("Your old password is incorrect");
					}
					else if (data = "success") {
						swal("Password Changed successfully");
					}
					else if (data = "failed") {
						swal("Something Went wrong");
					}
				}
			});
		} return false;

	});



	//logout function
	$("#logout").click(function () {
		localStorage.login = "";
		localStorage.email = "";
		localStorage.userid = "";
		slide("login.html");
	});


});
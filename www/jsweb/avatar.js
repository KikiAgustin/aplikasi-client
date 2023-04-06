var url = window.location.pathname;
    var filename = url.substring(url.lastIndexOf('/') + 1);
	
 
    if (localStorage.login == "true" && filename == 'login.html') {
        window.location.href="index.html";
		var userfullname = localStorage.userfullname;
    } else if (localStorage.login == null) {
        window.location.href = "login.html";
    } else if (localStorage.login == "false" && filename != 'login.html') {
        window.location.href = "login.html";
    }

// pilih gambar
const fileInput = document.getElementById('fileToUpload');
const buttonKirim = document.getElementById('button-kirim');
const isiImage = document.getElementById('isimage');
function showFormFile(){
  fileInput.click();
}

document.addEventListener('DOMContentLoaded', function() {
    const previewImg = document.getElementById('img');
  
    fileInput.addEventListener('change', function() {
      var file = this.files[0];
      var reader = new FileReader();
  
      reader.addEventListener('load', function() {
        previewImg.setAttribute('src', reader.result);
        buttonKirim.style.display = 'block';

      });
  
      reader.readAsDataURL(file);
    });

    
  });

  $(document).ready(function(){
    var urls ="https://www.dfunstation.com/api4/android/index.php/profile/profile/"+localStorage.userid+"/?callback=?";
      $.ajax({
      type: "GET",
      url: urls,
      crossDomain: true,
      cache: false,
      success: function(data){
        if(data['status']=="OK")
        {
        $("#img").attr("src",data['avatar']);
        }
     }
    });
  });

  $(document).ready(function() {
    $('#uploadBtn').click(function() {
      var formData = new FormData($('#myForm')[0]);
      $.ajax({
        url: 'https://www.dfunstation.com/api-aplikasi-web/avatar',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
          $('#response').html(response);
          alert("gambar berhasil di upload");
        },
        error: function() {
          $('#response').html('Terjadi kesalahan saat mengupload gambar.');
          alert("gambar gagal di upload");
        }
      });
    });
  });

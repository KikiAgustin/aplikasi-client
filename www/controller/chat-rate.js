$(document).ready(function () {

    $("#kirim").click(function () {

      var chatid = getvar("chatid");
      var status = $("#status").val();
      var rating = $("input[name='rating']:checked").val();
      var dataString = "status=" + status + "&rating=" + rating;

      if (empty(rating)) { swal("Anda belum memberikan rating, silahkan pilih rating 1-5 bintang"); }
      else if (empty(status)) { swal("Komentar masih kosong atau terlalu pendek"); }

      if (!empty(rating)) {

        var url = "https://www.dfunstation.com/api4/android/index.php/konsultasi/rate/" + localStorage.userid + "/" + chatid + "/?callback=?";

        $.ajax({
          type: "POST",
          url: url,
          data: dataString,
          crossDomain: true,
          cache: false,
          beforeSend: function () { $("#kirim").html('Mengirimkan...'); },
          success: function (data) {
            if (data['status'] == "OK") {
              swal({
                text: data['message'],
              })
                .then(() => {
                  slide('chat-finish.html?action=finish&chatid=' + chatid + '&userid=' + localStorage.userid);
                });


            }
            else if (data['status'] == "ERROR") {
              swal("Menulis komentar dan memberikan gagal dilakukan, silahkan coba kembali");
              $("#kirim").val('Kirimkan');
            }
          }
        });

      }

    });



  });
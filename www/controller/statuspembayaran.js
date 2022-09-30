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

    var transaksiid = getvar('transaksiid');
    var urls = base_url+"index.php/world/tiket-status/" + transaksiid + "/?callback=?";
    $.ajax({
        type: "GET",
        url: urls,
        crossDomain: true,
        cache: false,
        success: function (data) {
            if (data['status'] == "OK") {

                if(data['status_transaksi'] == "SUCCESS"){
                const datalist = `
                <p style="text-align:center;">Status Pembayaran <strong>${data['status_transaksi']}</strong> </p>
                <br>
                <p>Terimakasih telah melakukan pembelian di aplikasi dfunstation, berikut adalah detail pembelian anda:</p>
                <p>
                    <strong>${data["nama_produk"]}</strong>
                    <br>Harga : Rp. ${data["jumlah"]}
                    <br> Tanggal Pembelian : ${data["tanggal"]}
                    <br> Invoice : ${data["invoice"]}
                </p>
                <button onClick="javascript:fade('index.html    ')" class="waves-effect waves-light btn accent-color width-100 m-b-20 animated bouncein delay-4 button button-block button-positive" id="lanjutkan">Kembali ke Home</button>
                `;
                $("#clm").html(datalist);
                }else if(data['status_transaksi'] == "EXPIRE") {
                const datalist = `
                <p style="text-align:center;">Status Pembayaran <strong>${data['status_transaksi']}</strong> </p>
                <p>Pembelian Tiket Sudah dengan invoice ${data["invoice"]} sudah <strong>Expire</strong> Silahkan melakukan pembelian kembali dengan menekan tombol dibawah </p>
                <button onClick="javascript:fade('funcommunity.html')" class="waves-effect waves-light btn accent-color width-100 m-b-20 animated bouncein delay-4 button button-block button-positive" id="lanjutkan">Beli Tiket</button>
                `;
                $("#clm").html(datalist);
                }else{
                    const datalist = `
                    <p style="text-align:center;">Status Pembayaran <strong>${data['status_transaksi']} </strong> Silahkan lakukan pembayaran sesuai dengan metode pembayaran yang telah dipilih </p>
                    <button onClick="javascript:fade('index.html')" class="waves-effect waves-light btn accent-color width-100 m-b-20 animated bouncein delay-4 button button-block button-positive" id="lanjutan" >Kembali Ke home</button> 
                    `;
                    $("#clm").html(datalist);
                }
                
            }
        }
    });
});

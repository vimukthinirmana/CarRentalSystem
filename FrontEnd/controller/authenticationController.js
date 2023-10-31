// Save Customer
let baseurl = "http://localhost:8080/carRental/";


$("#btnSaveCustomer").click(function () {

    let data = new FormData($("#customerForm")[0]);

    let json = {
        nic: $("#cusNic").val(),
        name: $("#cusName").val(),
        license: $("#cusLicense").val(),
        address: $("#cusAddress").val(),
        contact: $("#cusContact").val(),
        email: $("#cusEmail").val(),
        user: {
            username: $("#cusUsername").val(),
            password: $("#cusPassword").val(),
        }
    }
    console.log(json);

    $.ajax({
        url: baseurl + "customer",
        method: "post",
        async: false,
        cache: false,
        data: JSON.stringify(json),
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            // saveAlert();
            alert("Successfully Saved..!")
        }
    });

    if ($('#cusNicImage').get(0).files.length === 0 || $('#cusLicenseImage').get(0).files.length === 0) {
        return;
    }

    $.ajax({
        url: baseurl + "customer?image",
        method: "post",
        async: false,
        data: data,
        contentType: false,
        processData: false,
        success: function (res) {
            // saveAlert();
            // window.open("authentication.html", '_self');
            alert("save customer successfully")
        },
        error: function (res) {
            alert(res.message);
        }
    });

});



///----------------------
// $("#btnSaveCustomer").click(function () {
//     let formData = $("#customerForm").serialize();
//
//     $.ajax({
//         url: baseurl + 'customer',
//         method: "POST",
//
//         data: formData,
//         success: function (res) {
//             alert(res.message);
//
//         },
//         error: function (error) {
//             alert(error.responseJSON.message);
//         }
//     });
// });
// signup Customer
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
            alert("customer signup successfully");
            clearFieldData();
            returnLoginPage();
        },
        error: function (res) {
            alert(res.message);
        }
    });

});

function clearFieldData() {
    setTextFields("", "", "", "", "", "", "","");
}

function returnLoginPage() {
    $("#signup-section").css("display", "block");
    $("#login-section").css("display", "none");
}

function setTextFields(nic, name, license, address, contact, email,username, password ) {
    $('#cusNic').val(nic);
    $('#cusName').val(name);
    $('#cusLicense').val(license);
    $('#cusAddress').val(address);
    $('#cusContact').val(contact);
    $('#cusEmail').val(email);
    $('#cusUsername').val(username);
    $('#cusPassword').val(password);

}






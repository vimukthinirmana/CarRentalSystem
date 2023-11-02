//  --- login user ----

let baseurl = "http://localhost:8080/carRental/";

$("#btnLoginCustomer").click(function () {
    let loginData = {
        userName: $("#loginUserName").val(),
        userPassword: $("#loginPassword").val(),
    }

    $.ajax({
        url: baseurl + "login",
        method: "post",
        data: loginData,
        success: function (res) {

            switch (res.data.role) {
                case "Admin":
                        window.open("admin-dashboard.html", '_self');
                    break;
                case "Customer":
                    window.open("customer-Dashboard.html", '_self');
                    break;
                case "Driver":
                    window.open("driver-Dashboard.html", '_self');
                    break;
                default:
                    alert("none");
            }

        },
        error:function (res) {
            errorAlert("Wrong User Details");
        }
    });
});


/*
$("#btnLoginCustomer").on("click", function () {

    $.ajax({
        url: baseurl + "login",
        method: "post",
        data: $("#loginForm").serialize(),
        success: function (res) {

            switch (res.data.role) {
                case "Admin":
                    window.open("admin-dashboard.html", '_self');
                    break;
                case "Customer":
                    window.open("customer-Dashboard.html", '_self');
                    break;
                case "Driver":
                    window.open("driver-Dashboard.html", '_self');
                    break;
                default:
                    alert("none");
            }

        },
        error:function (res) {
            errorAlert("Wrong User Details");
        }
    });

});
*/


/*
$("#btnLoginCustomer").on("click", function () {
    var username = $("#usernameInput").val();  // Replace 'usernameInput' with the actual input field ID
    var password = $("#passwordInput").val();  // Replace 'passwordInput' with the actual input field ID

    var requestData = {
        username: username,
        password: password
    };

    $.ajax({
        url: baseurl + "login",
        method: "post",
        data: requestData,  // Send the requestData object
        success: function (res) {
            switch (res.data.role) {
                case "Admin":
                    window.open("admin-dashboard.html", '_self');
                    break;
                case "Customer":
                    window.open("customer-Dashboard.html", '_self');
                    break;
                case "Driver":
                    window.open("driver-Dashboard.html", '_self');
                    break;
                default:
                    alert("none");
            }

        },
        error: function (res) {
            errorAlert("Wrong User Details");
        }
    });
});
*/

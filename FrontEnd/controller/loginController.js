//  --- login user ----

$("#btnLogin").click(function () {
    // let loginData = {
    //     userName: $("#loginUserName").val(),
    //     userPassword: $("#loginPassword").val(),
    // }

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


/*
$("#btnLogin").on("click", function () {

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


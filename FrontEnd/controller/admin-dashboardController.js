

$(document).ready(function () {
    manageCustomerPage();
    manageCarPage();
    manageDriverPage();
    manageRentPage();
    managePaymentsPage();
})


let regNum;
let dailyMileage;
let monthlyMileage;
let dailyPrice;
let monthlyPrice;
let rentId;
let currentUser;
let customer;

$.ajax({
    url: baseurl + "login",
    method: "get",
    async: false,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
        currentUser = res.data;
        $("#user").text(res.data.username);
    }
});



// admin home


//manage customer page
function manageCustomerPage() {

    $("#btnCustomerNav").click(function () {

        // Upload NIC Image
        loadSelectedImage("#cusNicImage");

        // Upload License Image
        loadSelectedImage("#cusLicenseImage");

        $("#btnAddNewCustomer").click(function () {

            $("#btnSaveCustomer").text("Save");

        });

        // Save Customer
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

            $.ajax({
                url: baseurl + "customer",
                method: $("#btnSaveCustomer").text() == "Save" ? "post" : "put",
                async: false,
                data: JSON.stringify(json),
                contentType: "application/json",
                dataType: "json",
                success: function (res) {

                    $("#btnSaveCustomer").text() == "Save" ? alert("save customer") : alert("update customer");

                    loadAllCustomers();
                }
            });

            if ($("#btnSaveCustomer").text() == "Save") {
                $.ajax({
                    url: baseurl + "customer?image",
                    method: "post",
                    async: false,
                    data: data,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        alert("save customer");
                        loadAllCustomers();
                    }
                });
            }

        });

        function loadAllCustomers() {

            $.ajax({
                url: baseurl + "customer",
                method: "get",
                dataType: "json",
                success: function (res) {

                    $("#tblCustomer").empty();

                    for (let customer of res.data) {

                        $("#tblCustomer").append(`
                    <tr class="text-secondary">
                        <td>${customer.nic}</td>
                        <td>${customer.name}</td>
                        <td>${customer.email}</td>
                        <td>${customer.address}</td>
                        <td>${customer.license}</td>
                        <td>${customer.user.username}</td>
                        <td>${customer.user.password}</td>
                        <td>${customer.contact}</td>
                        <td><img src="${customer.nicImage}" alt="" srcset="" width="150" height="100"></td>
                        <td><img src="${customer.licenseImage}" alt="" srcset="" width="150" height="100"></td>
                        <td><i class="fas fa-drivers-license text-success text-center btn btnUpdate" data-bs-toggle="modal" data-bs-target="#registerCustomerModal"></i><i class="fas fa-remove text-danger text-center btn btnDelete"></i></td>
                    </tr>
                    `);
                    }

                    bindUpdateEvent();
                    bindDeleteEvent();

                }
            });


        }

        loadAllCustomers();

        function bindUpdateEvent() {
            $(".btnUpdate").on("click", function () {

                $.ajax({
                    url: baseurl + `rent?username=${$(this).parent().parent().children(":eq(5)").text()}`,
                    method: "get",
                    async: false,
                    dataType: "json",
                    // contentType: "application/json",
                    success: function (res) {
                        $("#cusNicImgContext").attr(`style`, `background : url(..${res.data.nicImage}); background-position: center; background-size: cover`);
                        $("#cusLicenseImgContext").attr(`style`, `background : url(..${res.data.licenseImage}); background-position: center; background-size: cover`);
                    }
                });

                $("#cusNic").val($(this).parent().parent().children(":eq(0)").text());
                $("#cusName").val($(this).parent().parent().children(":eq(1)").text());
                $("#cusLicense").val($(this).parent().parent().children(":eq(4)").text());
                $("#cusAddress").val($(this).parent().parent().children(":eq(3)").text());
                $("#cusContact").val($(this).parent().parent().children(":eq(7)").text());
                $("#cusEmail").val($(this).parent().parent().children(":eq(2)").text());
                $("#cusUsername").val($(this).parent().parent().children(":eq(5)").text());
                $("#cusPassword").val($(this).parent().parent().children(":eq(6)").text());

                $("#btnSaveCustomer").text("Update");

            });
        }

        function bindDeleteEvent() {
            $(".btnDelete").on("click", function () {

                let nic = $(this).parent().parent().children(":eq(0)").text();

                if (!confirm("Are You Sure")) return;


                $.ajax({
                    url: baseurl + "customer?nic=" + nic,
                    method: "delete",
                    async: false,
                    data: nic,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        alert("customer delete successfully")
                        loadAllCustomers();
                    }
                });

            });
        }


    });
}


// manage car page
function manageCarPage() {
    $("#btnCarNav").click( function () {

        loadSelectedImage("#front");
        loadSelectedImage("#back");
        loadSelectedImage("#side");
        loadSelectedImage("#interior");

        $("#btnAddNewCar").on("click", function () {
            $("#btnSaveCar").text("Save");
        })

        $("#btnSaveCar").click( function () {

            let data = new FormData($("#carForm")[0]);


            if ($("#btnSaveCar").text() == "Save") {

                $.ajax({
                    url: baseurl + "car",
                    async: false,
                    data: data,
                    method: "post",
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        alert("save car successful")

                        $.ajax({
                            url: baseurl + "car",
                            method: "get",

                            success: function (res) {
                                loadAllCars(res.data);
                            }

                        });
                    },
                    error: function (res) {
                        let parse = JSON.parse(res);
                        errorAlert(parse.message);
                    }
                });

            } else {

                $.ajax({
                    url: baseurl + "car/update",
                    data: data,
                    method: "post",
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        alert("car update successfully");

                        $.ajax({
                            url: baseurl + "car",
                            method: "get",

                            success: function (res) {
                                loadAllCars(res.data);
                            }

                        });
                    }
                });

            }

        });

        function bindUpdateEvent() {
            $(".btnUpdate").on("click", function () {

                regNum = $(this).parent().parent().children(":eq(6)").children(":eq(0)").text().trim();

                $.ajax({
                    url: baseurl + "car?regNum=" + regNum,
                    async: false,
                    method: "get",
                    dataType: "json",
                    success: function (res) {

                        $("#regNum").val(res.data.regNum);
                        $("#carType").val(res.data.type);
                        $("#color").val(res.data.color);
                        $("#brand").val(res.data.brand);
                        $("#dailyRate").val(res.data.freeMileage.dailyRate);
                        $("#monthlyRate").val(res.data.freeMileage.monthlyRate);

                        if (res.data.fuelType == "petrol") {
                            $("#petrol").prop("checked", true)
                        } else {
                            $("#diesel").prop("checked", true)
                        }

                        if (res.data.availability == "YES") {
                            $("#yes").prop("checked", true);
                        } else if (res.data.availability == "NO") {
                            $("#no").prop("checked", true);
                        } else {
                            $("#maintain").prop("checked", true);
                        }

                        $("#dailyPriceRate").val(res.data.price.dailyPriceRate);
                        $("#monthlyPriceRate").val(res.data.price.monthlyPriceRate);

                        if (res.data.transmissionType == "manual") {
                            $("#manual").prop("checked", true)
                        } else {
                            $("#auto").prop("checked", true)
                        }

                        $("#extraKMPrice").val(res.data.extraKMPrice);
                        $("#passengers").val(res.data.passengers);
                        $("#lostDamageCost").val(res.data.lostDamageCost);
                        $("#meterValue").val(res.data.meterValue);
                        $("#frontImgContext").attr(`style`, `background : url(../assets${res.data.photos.front}); background-position: center; background-size: cover`)
                        $("#backImgContext").attr(`style`, `background : url(../assets${res.data.photos.back}); background-position: center; background-size: cover`)
                        $("#sideImgContext").attr(`style`, `background : url(../assets${res.data.photos.side}); background-position: center; background-size: cover`)
                        $("#interiorImgContext").attr(`style`, `background : url(../assets${res.data.photos.interior}); background-position: center; background-size: cover`)

                        $("#btnSaveCar").text("Update");

                    }
                });

            });
        }

        function bindDeleteEvent() {

            $(".btnDelete").on("click", function () {

                regNum = $(this).parent().parent().children(":eq(6)").children(":eq(0)").text().trim();

                if (confirm("Are You Sure..?")) {
                    $.ajax({
                        url: baseurl + "car?regNum=" + regNum,
                        method: "delete",
                        dataType: "json",
                        contentType: "application/json",
                        success: function (res) {
                            alert("car delete successfully");
                            $.ajax({
                                url: baseurl + "car",
                                method: "get",

                                success: function (res) {
                                    loadAllCars(res.data);
                                }

                            });
                        }
                    });
                }
            });

        }


        $.ajax({
            url: baseurl + "car",
            method: "get",

            success: function (res) {
                loadAllCars(res.data);
            }

        });

        function loadAllCars(cars) {

            $("#cars").empty();

            for (let car of cars) {
                $("#cars").append(`<div class="col col-lg-3">
            <div class="card">
                <img src="../assets/${car.photos.front}" height="230px" class="card-img-top" alt="car">

                <div class="card-body">
                    <h5 class="card-title">${car.brand}</h5>

                    <section class="mb-4">
                        <img src="../assets/${car.photos.back}" class="w-25 h-25" alt="${car.photos.back}">
                        <img src="../assets/${car.photos.side}" class="w-25 h-25" alt="car">
                        <img src="../assets/${car.photos.interior}" class="w-25 h-25" alt="car">
                    </section>

                    <section class="d-flex gap-3 justify-content-between">
                        <p class="card-text"><i class="bi bi-fuel-pump-diesel-fill me-1 text-success"></i>${car.fuelType}</p>
                        <p class="card-text"><i class="bi bi-palette-fill me-1 text-danger"></i>${car.color}</p>
                        <p class="card-text"><i class="bi bi-gear-wide-connected me-1 text-info"></i>${car.transmissionType}</p>
                        <p class="card-text"><i class="bi bi-people-fill me-1 text-primary"></i>${car.passengers}</p>
                    </section>

                    <section class="row justify-content-between align-items-center p-0 m-0 g-0">
                        <p class="card-text col col-12 p-0 m-0 g-0">Free Mileage</p>
                        <p class="card-text text-secondary col col-lg-6 mb-lg-0 mb-4">${car.freeMileage.dailyRate}km Daily</p>
                        <p class="card-text text-secondary col col-lg-6 mb-lg-0 mb-4 text-end">${car.freeMileage.monthlyRate}km Monthly</p>
                    </section>

                    <section class="row justify-content-between align-items-center p-0 m-0 g-0">
                        <p class="card-text col col-12 p-0 m-0 g-0">Price</p>
                        <p class="card-text text-secondary col col-lg-6 mb-lg-0 mb-4">${car.price.dailyPriceRate} LKR Daily</p>
                        <p class="card-text text-secondary col col-lg-6 mb-lg-0 mb-4 text-end">${car.price.monthlyPriceRate} LKR Monthly</p>
                    </section>

                    <section class="row justify-content-between">
                        <p class="card-text col col-lg-6">Lost Damage Cost</p>
                        <p class="card-text text-secondary col text-end">${car.lostDamageCost} LKR</p>
                    </section>
                    
                    <section class="row justify-content-between">
                        <p class="card-text text-secondary col col-6" id="registerNum"><i class="fas fa-car-on me-1"></i>${car.regNum}</p>
                        <p class="card-text text-secondary col col-6 text-danger text-end">${car.availability == "YES" ? "" : "Out Of Stock"}</p>
                    </section>
                        
                    <section class="d-flex justify-content-between flex-lg-row flex-column gap-1">
                        <button class="btn btn-warning btnUpdate" data-bs-toggle="modal" data-bs-target="#registerCar"><p class="card-text"><i class="bi bi-app-indicator"></i> Update </p></button>
                        <button class="btn btn-danger btnDelete"><p class="card-text"><i class="fas fa-remove"></i> Delete </p></button>
                    </section>

                </div>

            </div>
        </div>`);
                getDetail();
            }
            bindUpdateEvent();
            bindDeleteEvent();

        }

        // Filter

        $("#search").on("keyup", function () {

            let text = $("#search").val();
            let searchBy = $("#searchBy").val();
            let fuel = $("#fuelTypes").val();

            $.ajax({
                url: baseurl + `car/filterByRegNum?text=${text}&search=${searchBy}&fuel=${fuel}`,
                method: "get",
                dataType: "json",
                contentType: "application/json",
                success: function (res) {
                    loadAllCars(res.data);
                }
            });

        });

        $("#searchBy, #fuelTypes").change(function () {
            let text = $("#search").val();
            let searchBy = $("#searchBy").val();
            let fuel = $("#fuelTypes").val();

            $.ajax({
                url: baseurl + `car/filterByRegNum?text=${text}&search=${searchBy}&fuel=${fuel}`,
                method: "get",
                dataType: "json",
                contentType: "application/json",
                success: function (res) {
                    loadAllCars(res.data);
                }
            });
        });

        function getDetail() {

            $(".rent").on("click", function () {
                regNum = $(this).parent().parent().children(":eq(6)").text();
                dailyMileage = $(this).parent().parent().children(":eq(4)").children(":eq(1)").text();
                monthlyMileage = $(this).parent().parent().children(":eq(4)").children(":eq(2)").text();
                dailyPrice = $(this).parent().parent().children(":eq(4)").children(":eq(1)").text();
                monthlyPrice = $(this).parent().parent().children(":eq(4)").children(":eq(2)").text();
            });
        }

    });

}


// manage driver page
function manageDriverPage() {
    $("#btnDriverNav").click( function () {

        loadAllDrivers();

        // Upload License Image
        loadSelectedImage("#licenseImage");

        $("#btnAddNewDriver").click( function () {
            $("#btnSaveDriver").text("Save");
        })

        $("#btnSaveDriver").click( function () {

            let data = new FormData($("#driverForm")[0]);

            let json = {
                nic: $("#nic").val(),
                name: $("#name").val(),
                license: $("#license").val(),
                address: $("#address").val(),
                contact: $("#contact").val(),
                email: $("#email").val(),
                available: $("#availability").val(),
                user: {
                    username: $("#username").val(),
                    password: $("#password").val(),
                }
            }

         /*   $.ajax({
                url: baseurl + ($("#btnSaveDriver").text() == "Save" ? "driver" : "driver/update"),
                method: "post",
                data: data,
                contentType: false,
                processData: false,
                success: function (res) {

                    if ($("#btnSaveDriver").text() == "Save") {
                        alert("Driver save successfully");
                    } else {
                        alert("Driver update unsuccessfully");
                    }

                    loadAllDrivers();

                }
            });*/

            $.ajax({
                url: baseurl + "driver",
                method: $("#btnSaveDriver").text() == "Save" ? "post" : "put",
                async: false,
                data: JSON.stringify(json),
                contentType: "application/json",
                dataType: "json",
                success: function (res) {
                    $("#btnSaveDriver").text() == "Save" ? alert("save driver") : alert("update driver");
                    loadAllDrivers();
                }
            });

            if ($("#btnSaveDriver").text() == "Save") {
                $.ajax({
                    url: baseurl + "driver?image",
                    method: "post",
                    async: false,
                    data: data,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        alert("save driver successful");
                        loadAllDrivers();
                    }
                });
            }

        });

        function loadAllDrivers() {
            $.ajax({
                url: baseurl + "driver/all",
                method: "get",
                async: false,
                dataType: "json",
                success: function (res) {

                    $("#tblDriver").empty();

                    for (let driver of res.data) {

                        $("#tblDriver").append(`
                            <tr>
                              <td>${driver.nic}</td>
                              <td>${driver.name}</td>
                              <td>${driver.email}</td>
                              <td>${driver.address}</td>
                              <td>${driver.license}</td>
                              <td>${driver.contact}</td>
                              <td>${driver.user.username}</td>
                              <td>${driver.user.password}</td>
                              <td><img src="../assets${driver.licenseImage}" width="150" height="100" alt="license"></td>
                              <td>${driver.availabilityStatus}</td>
                              <td><i class="fas fa-drivers-license text-success text-center btn btndriverUpdate" data-bs-toggle="modal" data-bs-target="#registerDriver"></i><i class="fas fa-remove text-danger text-center btn btnDelete"></i></td>
                            </tr>
                        `)

                    }

                    bindUpdateEvent();
                    bindDeleteEvent();

                }
            });

        }

        function bindUpdateEvent() {
            $(".btndriverUpdate").on("click", function () {

                $("#nic").val($(this).parent().parent().children(":eq(0)").text());
                $("#name").val($(this).parent().parent().children(":eq(1)").text());
                $("#email").val($(this).parent().parent().children(":eq(2)").text());
                $("#address").val($(this).parent().parent().children(":eq(3)").text());
                $("#license").val($(this).parent().parent().children(":eq(4)").text());
                $("#availability").val($(this).parent().parent().children(":eq(9)").text());
                $("#contact").val($(this).parent().parent().children(":eq(5)").text());
                $("#username").val($(this).parent().parent().children(":eq(6)").text());
                $("#password").val($(this).parent().parent().children(":eq(8)").text());
                loadSelectedImage("#licenseImageContext");

                $("#btnSaveDriver").text("Update");

            });
        }

        function bindDeleteEvent() {
            $(".btnDelete").on("click", function () {

                let nic = $(this).parent().parent().children(":eq(0)").text();

                if (!confirm("Are You Sure")) return;


                $.ajax({
                    url: baseurl + "driver?nic=" + nic,
                    method: "delete",
                    async: false,
                    data: nic,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        alert("Driver delete successfully");
                        loadAllDrivers();
                    }
                });

            });
        }

    });
}


//rent page
function manageRentPage() {
    $("#btnRentNav").on("click", function () {

        $.ajax({
            url: baseurl + "rent/all",
            async: false,
            method: "get",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                loadCards(res);
            }
        });

        function loadCards(res) {

            $("#rent-context").empty();

            for (let rent of res.data) {

                if ($("#searchRent").val()  == rent.rentId || $("#searchRent").val() == ""){

                    $("#rent-context").append(`
            <div class="card col col-5 text-center p-2 shadow-sm" style="min-height: 570px!important;">
                <div class="card-body" id="${res.rentId}">
                    <h5 class="card-title">${rent.rentId}</h5>
                    <p class="card-text">Customer NIC : ${rent.nic.nic}</p>
                    <p class="card-text">Customer Name : ${rent.nic.name}</p>
                    <p class="card-text">Pick Up Date : ${rent.pickUpDate.toString().replaceAll(",", "/")}</p>
                    <p class="card-text">Pick Up Time: ${rent.pickUpTime.toString().replaceAll(",", ":")}</p>
                    <p class="card-text">Return Date : ${rent.returnDate.toString().replaceAll(",", "/")}</p>
                    <p class="card-text">Return Time : ${rent.returnTime.toString().replaceAll(",", ":")}</p>
                    <p class="card-text">Description : ${rent.description.split(".")[0]}</p>
                    <p class="card-text">Rent Status : ${rent.status}</p>
                    <table class="table" id=${rent.rentId}>
                        <thead>
                              <tr>
                                    <th scope="col">Register Number</th>
                                    <th scope="col">Car Cost</th>
                                    <th scope="col">Driver Cost</th>
                                    <th scope="col">Driver NIC</th>
                              </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <section class="mb-2">
                    <button class="btn btn-success me-2 btnAccept"><i class="fas fa-calendar-check"></i> Accept</button>
                    <button class="btn btn-success me-2 btn-warning pay" data-bs-toggle="modal" data-bs-target="#paymentModel"><i class="fas fa-paypal"></i> Pay</button>
                    <button class="btn btn-danger btnReject me-2"><i class="fas fa-calendar-xmark"></i> Reject</button>
                    <button class="btn btn-dark btnClose"><i class="fas fa-calendar-xmark"></i> Close</button>
                </section>
            </div>
            `);

                    $(`#${res.rentId} > tbody`).empty();

                    for (let rentDetail of rent.rentDetails) {
                        $(`#${rent.rentId} > tbody`).append(`
                    <tr>
                      <td>${rentDetail.regNum}</td>
                      <td>${rentDetail.carCost}</td>
                      <td>${rentDetail.driverCost}</td>
                      <td>${rentDetail.nic == null ? "--" : rentDetail.nic}</td>
                    </tr>  
                `);
                    }

                }

            }

            bindAcceptEvent();
            bindPayEvent();
            bindRejectEvent();
            bindCloseEvent();

        }

        $("#searchRent").on("keyup", function () {
            $.ajax({

                url: baseurl + "rent/all",
                async: false,
                method: "get",
                contentType: "application/json",
                dataType: "json",
                success: function (res) {
                    loadCards(res);
                }

            });
        });

        // bindManagePayment();

        function bindAcceptEvent() {
            $(".btnAccept").on("click", function () {

                let text = $(this).parent().parent().children(":eq(0)").children(":eq(0)").text();

                $.ajax({
                    url: baseurl + `rent?rentId=${text}&option=accepted`,
                    async: false,
                    method: "put",
                    dataType: "json",
                    contentType: "application/json",
                    success: function (res) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Accepted..!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $.ajax({

                            url: baseurl + "rent/all",
                            async: false,
                            method: "get",
                            contentType: "application/json",
                            dataType: "json",
                            success: function (res) {
                                loadCards(res);
                            }

                        });
                    }
                });

            });
        }

        function bindRejectEvent() {
            $(".btnReject").on("click", function () {

                let text = $(this).parent().parent().children(":eq(0)").children(":eq(0)").text();

                $.ajax({
                    url: baseurl + `rent?rentId=${text}&option=reject`,
                    async: false,
                    method: "put",
                    dataType: "json",
                    contentType: "application/json",
                    success: function (res) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'warning',
                            title: 'Rejected..!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $.ajax({

                            url: baseurl + "rent/all",
                            async: false,
                            method: "get",
                            contentType: "application/json",
                            dataType: "json",
                            success: function (res) {
                                loadCards(res);
                            }

                        });
                    }
                });

            });
        }

        function bindCloseEvent() {
            $(".btnClose").on("click", function () {

                let text = $(this).parent().parent().children(":eq(0)").children(":eq(0)").text();

                $.ajax({
                    url: baseurl + `rent?rentId=${text}&option=closed`,
                    async: false,
                    method: "put",
                    dataType: "json",
                    contentType: "application/json",
                    success: function (res) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Closed..!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        $.ajax({

                            url: baseurl + "rent/all",
                            async: false,
                            method: "get",
                            contentType: "application/json",
                            dataType: "json",
                            success: function (res) {
                                loadCards(res);
                            }

                        });
                    }
                });

            });
        }


        function bindPayEvent() {

            $(".pay").on("click", function () {
                rentId = $(this).parent().parent().children(":eq(0)").children(":eq(0)").text();
            });

        }
        bindManagePayment();

        function bindManagePayment() {
            $("#btnPayment").on("click", function () {

                let json = {
                    balance: $("#balance").val(),
                    cash: $("#cash").val(),
                    description: $("#description").val(),
                    total: $("#total").val(),
                    type: $("#type").val(),
                    rentId: {
                        rentId: rentId
                    }
                }

                $.ajax({
                    url: baseurl + `payment`,
                    async: false,
                    method: "post",
                    data: JSON.stringify(json),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (res) {
                        alert("payment successful")
                        managePaymentsPage();
                    }
                });

            });
        }
    });
}






//payment
function managePaymentsPage() {

    $("#btnManagePaymentNav").on("click", function () {

        loadAllPayments();

    });

    loadAllPayments();

    function loadAllPayments() {

        $.ajax({
            url: baseurl + `payment`,
            method: "get",
            dataType: "json",
            success: function (res) {

                $("#tblPayment").empty();

                for (let payment of res.data) {
                    $("#tblPayment").append(`
                    <tr>
                        <td>${payment.paymentId}</td>
                        <td>${payment.rentId.rentId}</td>
                        <td>${payment.type}</td>
                        <td>${payment.description}</td>
                        <td>${payment.total}</td>
                        <td>${payment.cash}</td>
                        <td>${payment.balance}</td>
                        <td>${payment.date.toString().replaceAll(",", "-")}</td>
                        <td>${payment.time.toString().replaceAll(",", ":")}</td>
                        <td><i class="fas fa-drivers-license text-success text-center btn btnUpdate" data-bs-toggle="modal" data-bs-target="#registerDriver"></i><i class="fas fa-remove text-danger text-center btn btnDelete"></i></td>
                    </tr>
                `);
                }
            }
        });

    }

}

//report


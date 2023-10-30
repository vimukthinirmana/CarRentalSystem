package lk.ijse.carRentalSystem.entity;

import java.time.LocalDate;
import java.time.LocalTime;

public class Rent {
    private String rentID;
    private String cost;
    private String description;
    private String driverRequest;
    private LocalDate pickUpDate;
    private LocalTime pickUpTime;
    private LocalDate returnDate;
    private LocalTime returnTime;
    private String status;
}

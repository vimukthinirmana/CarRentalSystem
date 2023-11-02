package lk.ijse.carRentalSystem.entity;

import lk.ijse.carRentalSystem.embedded.CarPhoto;
import lk.ijse.carRentalSystem.embedded.FreeMileage;
import lk.ijse.carRentalSystem.embedded.Price;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.math.BigDecimal;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Car {
    @Id
    private String regNum;
    private String type;
    private String color;
    private String brand;
    private String Availability;
    private String transmissionType;
    private String fuelType;
    private int passengers;
    @Embedded
    private Price price;
    @Embedded
    private FreeMileage freeMileage;
    private BigDecimal extraKMPrice;
    private BigDecimal lostDamageCost;
    private String meterValue;
    @Embedded
    private CarPhoto photos;
}

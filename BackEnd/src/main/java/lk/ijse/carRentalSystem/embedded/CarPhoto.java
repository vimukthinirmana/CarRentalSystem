package lk.ijse.carRentalSystem.embedded;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embeddable;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CarPhoto {
    private String front;
    private String back;
    private String side;
    private String interior;
}
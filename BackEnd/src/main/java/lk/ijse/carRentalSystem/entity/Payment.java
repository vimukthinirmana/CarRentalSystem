package lk.ijse.carRentalSystem.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer paymentId;
    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "rentId",referencedColumnName = "rentId", nullable = false)
    Rent rentId;
    String type;
    String description;
    LocalDate date;
    LocalTime time;
    BigDecimal total;
    BigDecimal cash;
    BigDecimal balance;

}

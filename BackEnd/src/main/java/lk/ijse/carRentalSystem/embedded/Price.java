package lk.ijse.carRentalSystem.embedded;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embeddable;
import java.math.BigDecimal;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Price {
    private BigDecimal dailyPriceRate;
    private BigDecimal monthlyPriceRate;
}

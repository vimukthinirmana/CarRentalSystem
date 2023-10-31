package lk.ijse.carRentalSystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CustomerImageDTO {
    String nic;
    MultipartFile nicImage;
    MultipartFile licenseImage;
}

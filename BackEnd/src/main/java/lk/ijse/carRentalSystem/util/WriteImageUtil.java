package lk.ijse.carRentalSystem.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;

public class WriteImageUtil {
    public static String projectPath = "G:\\ijse_64\\AdvanceApiDevelopment\\CarRentalSystem\\FrontEnd\\assets";

    public String writeImage(MultipartFile file, Path location) throws IOException, URISyntaxException {

        Files.write(location, file.getBytes());
        file.transferTo(location);

        return location.toString().replace("G:\\ijse_64\\AdvanceApiDevelopment\\CarRentalSystem\\FrontEnd\\assets", "");

    }
}

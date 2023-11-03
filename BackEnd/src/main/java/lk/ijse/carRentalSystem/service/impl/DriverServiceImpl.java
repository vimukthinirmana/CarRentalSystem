package lk.ijse.carRentalSystem.service.impl;

import lk.ijse.carRentalSystem.dto.DriverDTO;
import lk.ijse.carRentalSystem.dto.DriverSpDTO;
import lk.ijse.carRentalSystem.entity.Customer;
import lk.ijse.carRentalSystem.entity.Driver;
import lk.ijse.carRentalSystem.repo.DriverRepo;
import lk.ijse.carRentalSystem.service.DriverService;
import lk.ijse.carRentalSystem.util.CurrentUserUtil;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveDriver(DriverDTO driverDTO) throws RuntimeException {

        Driver driver = mapper.map(driverDTO, Driver.class);

        if (driverRepo.existsById(driverDTO.getNic())) throw new RuntimeException("Customer Already Exits..!");
        try {
            if (driverDTO.getLicenseImage().getBytes() != null) {

                byte[] licenseFileBytes = driverDTO.getLicenseImage().getBytes();

                String projectPath = "G:\\ijse_64\\AdvanceApiDevelopment\\test\\Car-Rental-System\\Frontend\\assets";
                Path licenseLocation = Paths.get(projectPath + "/image/bucket/driver/license_" + driver.getNic() + ".jpeg");

                Files.write(licenseLocation, licenseFileBytes);

                driverDTO.getLicenseImage().transferTo(licenseLocation);

                driver.setLicenseImage("/image/bucket/driver/license_" + driver.getNic() + ".jpeg");

            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        driver.setAvailabilityStatus("YES");
        driver.getUser().setRole("Driver");

//        driverRepo.save(driver);
        driverRepo.save(mapper.map(driverDTO, Driver.class));

    }

    @Override
    public void updateDriver(DriverDTO driverDTO) throws RuntimeException {
        Driver driver = mapper.map(driverDTO, Driver.class);

        if (!driverRepo.existsById(driverDTO.getNic())) throw new RuntimeException("Invalid Driver..!");

        Driver driver1 = driverRepo.findById(driverDTO.getNic()).get();

        driver.setLicenseImage(driver1.getLicenseImage());


        driver.setAvailabilityStatus("YES");
        driver.getUser().setRole("Driver");
        driverRepo.save(driver);

    }

    @Override
    public DriverDTO getDriver() throws RuntimeException {

        return mapper.map(driverRepo.getDriverByUsername(CurrentUserUtil.currentUser.getUsername()), DriverDTO.class);

    }

    @Override
    public List<DriverDTO> getAllDrivers() throws RuntimeException {

        return mapper.map(driverRepo.findAll(), new TypeToken<ArrayList<DriverSpDTO>>() {
        }.getType());

    }

    @Override
    public void deleteDriver(String nic) throws RuntimeException {

        if (!driverRepo.existsById(nic)) throw new RuntimeException("Invalid Driver..!");
        driverRepo.deleteById(nic);

    }

    @Override
    public Long countAvailableDrivers() throws RuntimeException {

        return driverRepo.countAvailableDrivers();

    }

    @Override
    public Long countReservedDrivers() throws RuntimeException {

        return driverRepo.countReservedDrivers();

    }
}

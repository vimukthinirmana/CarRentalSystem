package lk.ijse.carRentalSystem.service;

import lk.ijse.carRentalSystem.dto.CarDTO;
import lk.ijse.carRentalSystem.dto.CarPhotoDTO;
import lk.ijse.carRentalSystem.dto.CarSpDTO;

import java.util.List;

public interface CarService {
    public void saveCar(CarDTO carDTO) throws RuntimeException;

    public List<CarDTO> getAllCars() throws RuntimeException;

    public void saveCarImages(CarPhotoDTO carPhotoDTO) throws RuntimeException;

    public void addToMaintains(String regNum) throws RuntimeException;

    public CarSpDTO getCar(String regNum) throws RuntimeException;

    public Long countAvailableCars() throws RuntimeException;

    public Long countReservedCars() throws RuntimeException;

    public void updateCar(CarDTO carDTO) throws  RuntimeException;

    public void deleteCar(String regNum) throws RuntimeException;

    public List<CarSpDTO> filterCarsByRegNum(String text, String search, String fuel) throws RuntimeException;

    public List countCarsByBrand() throws RuntimeException;

    public Long countMaintainingCars() throws RuntimeException;
}

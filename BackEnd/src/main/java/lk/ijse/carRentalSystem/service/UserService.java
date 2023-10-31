package lk.ijse.carRentalSystem.service;

import lk.ijse.carRentalSystem.dto.UserDTO;

public interface UserService {
    public UserDTO getUser(String username, String password) throws RuntimeException;
}

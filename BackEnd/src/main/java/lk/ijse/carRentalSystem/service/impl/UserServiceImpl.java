package lk.ijse.carRentalSystem.service.impl;

import lk.ijse.carRentalSystem.dto.UserDTO;
import lk.ijse.carRentalSystem.entity.User;
import lk.ijse.carRentalSystem.repo.UserRepo;
import lk.ijse.carRentalSystem.service.UserService;
import lk.ijse.carRentalSystem.util.CurrentUserUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public UserDTO getUser(String username, String password) throws RuntimeException {

        User user = userRepo.findById(username).get();
        if (!user.getPassword().equals(password))
            throw new RuntimeException("Wrong Login Details. Please Try Again..!");

        UserDTO userDTO = mapper.map(user, UserDTO.class);
        CurrentUserUtil.currentUser = userDTO;
        return userDTO;

    }
}

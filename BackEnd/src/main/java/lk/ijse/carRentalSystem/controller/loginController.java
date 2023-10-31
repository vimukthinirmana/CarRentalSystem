package lk.ijse.carRentalSystem.controller;

import lk.ijse.carRentalSystem.service.UserService;
import lk.ijse.carRentalSystem.util.CurrentUserUtil;
import lk.ijse.carRentalSystem.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("login")
@CrossOrigin
public class loginController {
    @Autowired
    UserService userService;

    @PostMapping
    public ResponseUtil getUser(@RequestParam String username, @RequestParam String password) {

        return new ResponseUtil("OK", "Successfully Loaded..!", userService.getUser(username, password));

    }

    @GetMapping
    public ResponseUtil getCurrentUserDetails() {
        System.out.println(CurrentUserUtil.currentUser);

        return new ResponseUtil("OK", "Successfully Loaded..!", CurrentUserUtil.currentUser);

    }
}

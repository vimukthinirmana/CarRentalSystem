package lk.ijse.carRentalSystem.controller;

import lk.ijse.carRentalSystem.dto.CustomerDTO;
import lk.ijse.carRentalSystem.dto.CustomerImageDTO;
import lk.ijse.carRentalSystem.service.CustomerService;
import lk.ijse.carRentalSystem.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customer")
@CrossOrigin
@Transactional
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @PostMapping
    public ResponseUtil saveCustomer(@RequestBody CustomerDTO customerDTO) {

        customerService.saveCustomer(customerDTO);
        return new ResponseUtil("OK", "Successfully Saved..!", "");

    }

    @GetMapping
    public ResponseUtil getAll() {

        return new ResponseUtil("OK", "Successfully Saved..!", customerService.getAllCustomer());

    }

    @PostMapping(params = {"image"})
    public ResponseUtil saveImages(@ModelAttribute CustomerImageDTO customerImageDTO) {

        customerService.saveImages(customerImageDTO.getNic(), customerImageDTO);
        return new ResponseUtil("OK", "Successfully Saved..!", "");

    }

    @PutMapping
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO customerDTO) {

        customerService.updateCustomer(customerDTO);
        return new ResponseUtil("OK", "Successfully Updated..!", "");

    }

    @DeleteMapping
    public ResponseUtil deleteCustomer(@RequestParam String nic) {

        customerService.deleteCustomer(nic);
        return new ResponseUtil("OK", "Successfully Deleted..!", "");

    }

    @GetMapping(path = "/count")
    public ResponseUtil countCustomers(){

        return new ResponseUtil("OK", "Successfully Loaded..!", customerService.countCustomers());

    }

}

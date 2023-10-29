package lk.ijse.carRentalSystem.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"lk.ijse.carRentalSystem.controller","lk.ijse.carRentalSystem.advisor"})
//@ComponentScan(basePackageClasses = {CustomerController.class})//will scan CustomerController class package and all of its sub packages inside that package
public class WebAppConfig {
    public WebAppConfig(){
        System.out.println("WebAppConfig:Web App Instantiated");
    }
}

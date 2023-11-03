package lk.ijse.carRentalSystem.repo;

import lk.ijse.carRentalSystem.entity.RentDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentDetailRepo extends JpaRepository<RentDetail, String> {

    public List<RentDetail> getRentDetailByNic(String nic);

    public void deleteRentDetailByRegNum(String rentId);

}

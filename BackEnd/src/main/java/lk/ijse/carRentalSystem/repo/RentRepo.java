package lk.ijse.carRentalSystem.repo;

import lk.ijse.carRentalSystem.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RentRepo extends JpaRepository<Rent, String> {

    @Query(value = "SELECT rentId FROM Rent ORDER BY rentId  DESC LIMIT 1", nativeQuery = true)
    String getLastRentId();

    List<Rent> getRentsByNic_Nic(String nic) throws RuntimeException;

    @Query(value = "SELECT COUNT(rentId) FROM Rent WHERE status!='Closed'", nativeQuery = true)
    Long countBookings() throws RuntimeException;

}

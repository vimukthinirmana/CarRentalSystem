package lk.ijse.carRentalSystem.repo;

import lk.ijse.carRentalSystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, String> {
}

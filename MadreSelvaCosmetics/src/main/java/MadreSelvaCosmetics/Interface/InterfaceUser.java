package MadreSelvaCosmetics.Interface;

/**
 *
 * @author Elsy Del Águila
 */
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import MadreSelvaCosmetics.Model.User;

public interface InterfaceUser extends MongoRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndPassword(String email, String password);

    Optional<User> findTopByOrderByIdDesc();
}

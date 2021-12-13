package MadreSelvaCosmetics.Interface;

/**
 *
 * @author Elsy Del Águila
 */
import org.springframework.data.mongodb.repository.MongoRepository;
import MadreSelvaCosmetics.Model.Cosmetics;

public interface CosmeticsInterface extends MongoRepository<Cosmetics, String> {

}

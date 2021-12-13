package MadreSelvaCosmetics.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import MadreSelvaCosmetics.Model.Cosmetics;
import MadreSelvaCosmetics.Interface.CosmeticsInterface;

/**
 *
 * @author Elsy Del Águila
 */
@Repository
public class CosmeticsRepository {

    @Autowired
    private CosmeticsInterface cosmeticsRepository;

    public List<Cosmetics> getAll() {
        return cosmeticsRepository.findAll();
    }

    public Optional<Cosmetics> getProduct(String Reference) {
        return cosmeticsRepository.findById(Reference);
    }

    public Cosmetics create(Cosmetics cosmetics) {
        return cosmeticsRepository.save(cosmetics);
    }

    public void update(Cosmetics cosmetics) {
        cosmeticsRepository.save(cosmetics);
    }

    public void delete(Cosmetics cosmetics) {
        cosmeticsRepository.delete(cosmetics);
    }

}

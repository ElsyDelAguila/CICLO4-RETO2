package MadreSelvaCosmetics.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import MadreSelvaCosmetics.Model.Cosmetics;
import MadreSelvaCosmetics.Repository.CosmeticsRepository;

/**
 *
 * @author Elsy Del Águila
 */
@Service
public class CosmeticsService {

    @Autowired
    private CosmeticsRepository cosmeticsRepository;

    public List<Cosmetics> getAll() {
        return cosmeticsRepository.getAll();
    }

    public Optional<Cosmetics> getProduct(String reference) {
        return cosmeticsRepository.getProduct(reference);
    }

    public Cosmetics create(Cosmetics cosmetics) {
        if (cosmetics.getReference() == null) {
            return cosmetics;
        } else {
            return cosmeticsRepository.create(cosmetics);
        }
    }

    public Cosmetics update(Cosmetics cosmetics) {

        if (cosmetics.getReference() != null) {
            Optional<Cosmetics> accesoryDb = cosmeticsRepository.getProduct(cosmetics.getReference());
            if (!accesoryDb.isEmpty()) {

                if (cosmetics.getBrand() != null) {
                    accesoryDb.get().setBrand(cosmetics.getBrand());
                }

                if (cosmetics.getCategory() != null) {
                    accesoryDb.get().setCategory(cosmetics.getCategory());
                }
                if (cosmetics.getName() != null) {
                    accesoryDb.get().setName(cosmetics.getName());
                }
                if (cosmetics.getDescription() != null) {
                    accesoryDb.get().setDescription(cosmetics.getDescription());
                }
                if (cosmetics.getPrice() != 0.0) {
                    accesoryDb.get().setPrice(cosmetics.getPrice());
                }
                if (cosmetics.getQuantity() != 0) {
                    accesoryDb.get().setQuantity(cosmetics.getQuantity());
                }
                if (cosmetics.getPhotography() != null) {
                    accesoryDb.get().setPhotography(cosmetics.getPhotography());
                }
                accesoryDb.get().setAvailability(cosmetics.isAvailability());
                cosmeticsRepository.update(accesoryDb.get());
                return accesoryDb.get();
            } else {
                return cosmetics;
            }
        } else {
            return cosmetics;
        }
    }

    public boolean delete(String reference) {
        Boolean aBoolean = getProduct(reference).map(accesory -> {
            cosmeticsRepository.delete(accesory);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}

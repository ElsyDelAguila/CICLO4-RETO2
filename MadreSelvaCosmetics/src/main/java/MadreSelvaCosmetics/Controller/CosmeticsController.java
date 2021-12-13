package MadreSelvaCosmetics.Controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import MadreSelvaCosmetics.Model.Cosmetics;
import MadreSelvaCosmetics.Service.CosmeticsService;

/**
 *
 * @author Elsy Del Águila
 */
@RestController
@RequestMapping("api/cosmetics")
@CrossOrigin("*")
public class CosmeticsController {

    @Autowired
    private CosmeticsService cosmeticsService;

    @GetMapping("/all")
    public List<Cosmetics> getAll() {
        return cosmeticsService.getAll();
    }

    @GetMapping("/{reference}")
    public Optional<Cosmetics> getProduct(@PathVariable("reference") String reference) {
        return cosmeticsService.getProduct(reference);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Cosmetics create(@RequestBody Cosmetics gadget) {
        return cosmeticsService.create(gadget);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Cosmetics update(@RequestBody Cosmetics product) {
        return cosmeticsService.update(product);
    }

    @DeleteMapping("/{reference}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("reference") String reference) {
        return cosmeticsService.delete(reference);
    }
}

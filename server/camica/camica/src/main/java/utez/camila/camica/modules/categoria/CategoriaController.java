package utez.camila.camica.modules.categoria;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categoria")
@CrossOrigin("*")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return categoriaService.getAll();
    }

    @GetMapping("/{id}/")
    public ResponseEntity<?> getById(@PathVariable("id") Long id) {
        return categoriaService.getById(id);
    }

    @PostMapping("/")
    public ResponseEntity<?> save(@RequestBody CategoriaDto categoria) {
        return categoriaService.save(categoria.toEntity());
    }

    @PutMapping("/{id}/")
    public ResponseEntity<?> update(@RequestBody CategoriaDto categoria, @PathVariable("id") Long id) {
        return categoriaService.update(id, categoria.toEntity());
    }

    @PatchMapping("/status/{id}/")
    public ResponseEntity<?> changeStatus(@PathVariable("id") Long id) {
        return categoriaService.changeStatus(id);
    }
}

package utez.camila.camica.modules.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/servicio")
@CrossOrigin("*")
public class ServicioController {
    @Autowired
    private ServicioService servicioService;

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return servicioService.getAll();
    }

    @GetMapping("status/true")
    public ResponseEntity<?> getByStatusTrue() {
        return servicioService.getByStatusTrue();
    }
    @GetMapping("status/false")
    public ResponseEntity<?> getByStatusFalse() {
        return servicioService.getByStatusFalse();
    }

    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody ServicioDto servicioDto) {
        return servicioService.save(servicioDto.toEntity());
    }

    @PutMapping("/{id}/")
    public ResponseEntity<?> update(@RequestBody ServicioDto servicioDto, @PathVariable("id") Long id) {
        return servicioService.update(id, servicioDto.toEntity());
    }

    @PatchMapping("/status/{id}/")
    public ResponseEntity<?> changeStatus(@PathVariable("id") Long id) {
        return servicioService.changeStatus(id);
    }
}

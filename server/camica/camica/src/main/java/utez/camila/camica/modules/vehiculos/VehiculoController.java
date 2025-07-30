package utez.camila.camica.modules.vehiculos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehiculo")
@CrossOrigin("*")
public class VehiculoController {
    @Autowired
    private VehiculoService vehiculoService;

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return vehiculoService.getAll();
    }

    @GetMapping("/duenio/{duenioId}/")
    public ResponseEntity<?> getByDuenio(@PathVariable Long duenioId) {
        return vehiculoService.getByDuenio(duenioId);
    }

    @PostMapping("/")
    public ResponseEntity<?> save(@RequestBody VehiculoDto vehiculo) {
        return vehiculoService.save(vehiculo.toEntity());
    }

    @PutMapping("/{id}/")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody VehiculoDto vehiculo) {
        return vehiculoService.update(id, vehiculo.toEntity());
    }

    @PatchMapping("/status/{id}/")
    public ResponseEntity<?> updateStatus(@PathVariable Long id) {
        return vehiculoService.changeStatus(id);
    }
}

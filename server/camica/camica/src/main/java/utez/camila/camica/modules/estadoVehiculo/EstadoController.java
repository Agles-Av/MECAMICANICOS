package utez.camila.camica.modules.estadoVehiculo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/estado-vehiculo")
@CrossOrigin("*")
public class EstadoController {
    @Autowired
    private EstadoService estadoService;

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return estadoService.getAll();
    }
}

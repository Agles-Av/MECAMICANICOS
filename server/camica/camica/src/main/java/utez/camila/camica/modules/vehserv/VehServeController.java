package utez.camila.camica.modules.vehserv;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehserv")
@CrossOrigin("*")
public class VehServeController {
    @Autowired
    private VehServService vehServService;

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return vehServService.getAll();
    }

    @GetMapping("/estado/{estadoId}/")
    public ResponseEntity<?> getByEstado(Long estadoId) {
        return vehServService.getByEstado(estadoId);
    }

    @GetMapping("/mecanico/{mecanicoId}/")
    public ResponseEntity<?> getByMecanico(Long mecanicoId) {
        return vehServService.getByMecanico(mecanicoId);
    }

    @GetMapping("/servicio/{servicioId}/")
    public ResponseEntity<?> getByServicio(Long servicioId) {
        return vehServService.getByServicio(servicioId);
    }

    @GetMapping("/vehiculo/{vehiculoId}/")
    public ResponseEntity<?> getByVehiculo(Long vehiculoId) {
        return vehServService.getByVehiculo(vehiculoId);
    }

    @PostMapping("/")
    public ResponseEntity<?> create(VehServeDto vehServeDto) {
        return vehServService.save(vehServeDto.toEntity());
    }

    @PutMapping("/{id}/")
    public ResponseEntity<?> update(@RequestBody VehServeDto vehServeDto, @PathVariable("id") Long id) {
        return vehServService.update( id, vehServeDto.toEntity());
    }

    @PatchMapping("/status/{idVehServe}/{idEstado}/")
    public ResponseEntity<?> changeStatus(@PathVariable("idVehServe") Long idVehServe, @PathVariable("idEstado") Long idEstado) {
        return vehServService.changeStatus(idVehServe, idEstado);
    }
}

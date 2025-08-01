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
    public ResponseEntity<?> getByEstado(@PathVariable("estadoId") Long estadoId) {
        return vehServService.getByEstado(estadoId);
    }

    @GetMapping("/mecanico/{mecanicoId}/")
    public ResponseEntity<?> getByMecanico(@PathVariable("mecanicoId") Long mecanicoId) {
        return vehServService.getByMecanico(mecanicoId);
    }

    @GetMapping("/servicio/{servicioId}/")
    public ResponseEntity<?> getByServicio(@PathVariable("servicioId") Long servicioId) {
        return vehServService.getByServicio(servicioId);
    }

    @GetMapping("/vehiculo/{vehiculoId}/")
    public ResponseEntity<?> getByVehiculo(@PathVariable("vehiculoId") Long vehiculoId) {
        return vehServService.getByVehiculo(vehiculoId);
    }

    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody VehServeDto vehServeDto) {
        return vehServService.save(vehServeDto.toEntity());
    }

    @PutMapping("/{id}/")
    public ResponseEntity<?> update(@RequestBody VehServeDto vehServeDto, @PathVariable("id") Long id) {
        return vehServService.update( id, vehServeDto.toEntity());
    }

    @PutMapping("/cambio-mecanico/{idVehServe}/{idMecanico}/")
    public ResponseEntity<?> updateMecanico(@PathVariable("idVehServe") Long idVehServe, @PathVariable("idMecanico") Long idMecanico) {
        return vehServService.changeMecanico(idVehServe, idMecanico);
    }

    @PatchMapping("/cambio-estado/{idVehServe}/{idEstado}/")
    public ResponseEntity<?> changeStatus(@PathVariable("idVehServe") Long idVehServe, @PathVariable("idEstado") Long idEstado) {
        return vehServService.changeStatus(idVehServe, idEstado);
    }
}

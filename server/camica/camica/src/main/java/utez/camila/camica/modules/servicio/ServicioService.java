package utez.camila.camica.modules.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.camila.camica.config.CustomResponse;
import utez.camila.camica.modules.bitacora.BitacoraService;

import java.util.Optional;

@Service
public class ServicioService {

    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private CustomResponse response;

    @Autowired
    private BitacoraService bitacoraService;

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getAll() {
        return response.getJSONResponse(servicioRepository.findAll());
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> save (Servicio servicio) {
        if (servicio.getNombre() == null || servicio.getNombre().isEmpty()) {
            return response.getBadRequest("El nombre del servicio es obligatorio");
        }
        if (servicio.getDescripcion() == null || servicio.getDescripcion().isEmpty()) {
            return response.getBadRequest("La descripción del servicio es obligatoria");
        }
        Optional<Servicio> servicioFound = servicioRepository.findByNombre(servicio.getNombre());
        if(servicioFound.isPresent()) {
            return response.getBadRequest("Ya existe un servicio con el nombre: " + servicio.getNombre());
        }
        Servicio savedServicio = servicioRepository.save(servicio);
        bitacoraService.registrarBitacora("SAVE", "vehServ", null, savedServicio);
        return response.getJSONResponse(savedServicio);
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> update(Long id, Servicio servicio) {
        Optional<Servicio> foundServicio = servicioRepository.findById(id);
        if (foundServicio.isEmpty()) {
            return response.getBadRequest("Servicio no encontrado");
        }
        Servicio existingServicio = foundServicio.get();
        existingServicio.setNombre(servicio.getNombre());
        existingServicio.setDescripcion(servicio.getDescripcion());
        Servicio updatedServicio = servicioRepository.save(existingServicio);
        bitacoraService.registrarBitacora("UPDATE", "vehServ", existingServicio, updatedServicio);
        return response.getJSONResponse(updatedServicio);
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> changeStatus(Long id) {
        Optional<Servicio> foundServicio = servicioRepository.findById(id);
        if (foundServicio.isEmpty()) {
            return response.getBadRequest("Servicio no encontrado");
        }
        Servicio servicio = foundServicio.get();
        servicio.setStatus(!servicio.getStatus());
        Servicio updatedServicio = servicioRepository.save(servicio);
        bitacoraService.registrarBitacora("CHANGE_STATUS", "vehServ", foundServicio.get(), updatedServicio);
        return response.getJSONResponse(updatedServicio);
    }
}

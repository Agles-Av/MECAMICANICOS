package utez.camila.camica.modules.vehiculos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.camila.camica.config.CustomResponse;
import utez.camila.camica.modules.bitacora.BitacoraService;
import utez.camila.camica.modules.usuarios.Usuario;
import utez.camila.camica.modules.usuarios.UsuarioRepository;

import java.util.Optional;

@Service
public class VehiculoService {
    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BitacoraService bitacoraService;

    @Autowired
    private CustomResponse response;

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getAll() {
        return response.getJSONResponse(vehiculoRepository.findAll());
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getActiveVehicles() {
        return response.getJSONResponse(vehiculoRepository.findByStatusTrue());
    }
    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getInactiveVehicles() {
        return response.getJSONResponse(vehiculoRepository.findByStatusFalse());
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getByDuenio(Long duenioId) {
        Optional<Usuario> foundDuenio = usuarioRepository.findById(duenioId);
        if (foundDuenio.isEmpty()) {
            return response.getBadRequest("Dueño no encontrado");
        }
        Usuario duenio = foundDuenio.get();
        return response.getJSONResponse(vehiculoRepository.findByDuenio(duenio));
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> save(Vehiculo vehiculo) {
        if (vehiculo.getDuenio() == null || !usuarioRepository.existsById(vehiculo.getDuenio().getId())) {
            return response.getBadRequest("Dueño no encontrado");
        }
        Vehiculo savedVehiculo = vehiculoRepository.save(vehiculo);
        bitacoraService.registrarBitacora("SAVE", "vehiculos", null, vehiculo);
        return response.getJSONResponse(savedVehiculo);
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> update(Long id, Vehiculo vehiculo) {
        Optional<Vehiculo> foundVehiculo = vehiculoRepository.findById(id);
        if (foundVehiculo.isEmpty()) {
            return response.getBadRequest("Vehículo no encontrado");
        }
        Vehiculo existingVehiculo = foundVehiculo.get();
        if (vehiculo.getDuenio() == null || !usuarioRepository.existsById(vehiculo.getDuenio().getId())) {
            return response.getBadRequest("Dueño no encontrado");
        }
        existingVehiculo.setMarca(vehiculo.getMarca());
        existingVehiculo.setModelo(vehiculo.getModelo());
        existingVehiculo.setColor(vehiculo.getColor());
        existingVehiculo.setDuenio(vehiculo.getDuenio());
        Vehiculo updatedVehiculo = vehiculoRepository.save(existingVehiculo);
        bitacoraService.registrarBitacora("UPDATE", "vehiculos", existingVehiculo, updatedVehiculo);
        return response.getJSONResponse(updatedVehiculo);
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> changeStatus(Long id){
        Optional<Vehiculo> foundVehiculo = vehiculoRepository.findById(id);
        if (foundVehiculo.isEmpty()) {
            return response.getBadRequest("Vehículo no encontrado");
        }
        Vehiculo vehiculo = foundVehiculo.get();
        vehiculo.setStatus(!vehiculo.getStatus());
        Vehiculo updatedVehiculo = vehiculoRepository.save(vehiculo);
        bitacoraService.registrarBitacora("CHANGE_STATUS", "vehiculos", foundVehiculo.get(), updatedVehiculo);
        return response.getJSONResponse(updatedVehiculo);
    }
}

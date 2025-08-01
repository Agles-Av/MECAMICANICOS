package utez.camila.camica.modules.vehserv;


import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utez.camila.camica.config.CustomResponse;
import utez.camila.camica.modules.bitacora.BitacoraService;
import utez.camila.camica.modules.estadoVehiculo.EstadoRepository;
import utez.camila.camica.modules.estadoVehiculo.EstadoVehiculo;
import utez.camila.camica.modules.servicio.Servicio;
import utez.camila.camica.modules.servicio.ServicioRepository;
import utez.camila.camica.modules.usuarios.Usuario;
import utez.camila.camica.modules.usuarios.UsuarioRepository;
import utez.camila.camica.modules.vehiculos.Vehiculo;
import utez.camila.camica.modules.vehiculos.VehiculoRepository;

import java.util.Optional;

@Service
public class VehServService {

    @Autowired
    private VehServeRepository vehServeRepository;

    @Autowired
    private CustomResponse response;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EstadoRepository estadoRepository;

    @Autowired
    private ServicioRepository servicioRepository;

    @Autowired
    private BitacoraService bitacoraService;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getAll() {
        return response .getJSONResponse(vehServeRepository.findAll());
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getByEstado(Long estadoId) {
        Optional<EstadoVehiculo> foundEstado = estadoRepository.findById(estadoId);
        if (foundEstado.isEmpty()) {
            return response.getBadRequest("Estado no encontrado");
        }
        EstadoVehiculo estado = foundEstado.get();
        return response.getJSONResponse(vehServeRepository.findVehServesByEstado(estado));
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getByMecanico(Long mecanicoId) {
        Optional<Usuario> foundMecanico = usuarioRepository.findById(mecanicoId);
        if (foundMecanico.isEmpty()) {
            return response.getBadRequest("Mecanico no encontrado");
        }
        Usuario mecanico = foundMecanico.get();
        return response.getJSONResponse(vehServeRepository.findVehServesByMecanico(mecanico));
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getByServicio(Long servicioId) {
        Optional<Servicio> foundServicio = servicioRepository.findById(servicioId);
        if (foundServicio.isEmpty()) {
            return response.getBadRequest("Servicio no encontrado");
        }
        Servicio servicio = foundServicio.get();
        return response.getJSONResponse(vehServeRepository.findVehServesByServicio(servicio));
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> save(VehServe vehServe) {
       // System.out.println(vehServe);
        Optional<Servicio> foundServicio = servicioRepository.findById(vehServe.getServicio().getId());
        if (foundServicio.isEmpty()) {
            return response.getBadRequest("Servicio no encontrado");
        }

        if(vehServe.getMecanico() != null) {
            Optional<Usuario> foundMecanico = usuarioRepository.findById(vehServe.getMecanico().getId());
            if (foundMecanico.isEmpty()) {
                return response.getBadRequest("Mecanico no encontrado");
            }
            if(!foundMecanico.get().getRole().getNombre().equals("MECHANIC")) {
                return response.getBadRequest("El usuario no es un mecanico");
            }
        }
        Optional<EstadoVehiculo> foundEstado = estadoRepository.findById(vehServe.getEstado().getId());
        if (foundEstado.isEmpty()) {
            return response.getBadRequest("Estado no encontrado");
        }
        Optional<Vehiculo> foundVehiculo = vehiculoRepository.findById(vehServe.getVehiculo().getId());
        if (foundVehiculo.isEmpty()) {
            return response.getBadRequest("Vehiculo no encontrado");
        }
        bitacoraService.registrarBitacora("SAVE", "vehServ", null, vehServe);
        return response.getJSONResponse(vehServeRepository.save(vehServe));
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getByVehiculo(Long vehiculoId) {
        Optional<Vehiculo> foundVehiculo = vehiculoRepository.findById(vehiculoId);
        if (foundVehiculo.isEmpty()) {
            return response.getBadRequest("Vehiculo no encontrado");
        }
        return response.getJSONResponse(vehServeRepository.findVehServesByVehiculo(foundVehiculo.get()));
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> update(Long id, VehServe vehServe) {
        Optional<VehServe> foundVehServe = vehServeRepository.findById(id);
        if (foundVehServe.isEmpty()) {
            return response.getBadRequest("Vehiculo no encontrado");
        }
        VehServe existingVehServe = foundVehServe.get();

        Optional<Servicio> foundServicio = servicioRepository.findById(vehServe.getServicio().getId());
        if (foundServicio.isEmpty()) {
            return response.getBadRequest("Servicio no encontrado");
        }

        Optional<Usuario> foundMecanico = usuarioRepository.findById(vehServe.getMecanico().getId());
        if (foundMecanico.isEmpty()) {
            return response.getBadRequest("Mecanico no encontrado");
        }
        if(!foundMecanico.get().getRole().getNombre().equals("MECHANIC")) {
            return response.getBadRequest("El usuario no es un mecanico");
        }

        Optional<EstadoVehiculo> foundEstado = estadoRepository.findById(vehServe.getEstado().getId());
        if (foundEstado.isEmpty()) {
            return response.getBadRequest("Estado no encontrado");
        }


        Optional<Vehiculo> foundVehiculo = vehiculoRepository.findById(vehServe.getVehiculo().getId());
        if (foundVehiculo.isEmpty()) {
            return response.getBadRequest("Vehiculo no encontrado");
        }

        existingVehServe.setVehiculo(vehServe.getVehiculo());
        existingVehServe.setMecanico(foundMecanico.get());
        existingVehServe.setEstado(foundEstado.get());
        existingVehServe.setServicio(foundServicio.get());

        bitacoraService.registrarBitacora("UPDATE", "vehServ", null, existingVehServe);
        return response.getJSONResponse(vehServeRepository.save(existingVehServe));
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> changeMecanico(Long idVehServ, Long idMecanico){
        Optional<VehServe> foundVehServ = vehServeRepository.findById(idVehServ);
        if (foundVehServ.isEmpty()) {
            return response.getBadRequest("Vehiculo no encontrado");
        }
        VehServe vehServ = foundVehServ.get();

        Optional<Usuario> foundMecanico = usuarioRepository.findById(idMecanico);
        if (foundMecanico.isEmpty()) {
            return response.getBadRequest("Mecanico no encontrado");
        }

        vehServ.setMecanico(foundMecanico.get());
        vehServeRepository.saveAndFlush(vehServ);
        bitacoraService.registrarBitacora("CHANGE_MECHANIC", "vehServ", null, vehServ);
        return response.getJSONResponse(vehServeRepository.save(vehServ));
    }



    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> changeStatus(Long idVehServ, Long idEstado){
        Optional<VehServe> foundVehServ = vehServeRepository.findById(idVehServ);
        if (foundVehServ.isEmpty()) {
            return response.getBadRequest("Vehiculo no encontrado");
        }
        VehServe vehServ = foundVehServ.get();

        Optional<EstadoVehiculo> foundEstado = estadoRepository.findById(idEstado);
        if (foundEstado.isEmpty()) {
            return response.getBadRequest("Estado no encontrado");
        }

        vehServ.setEstado(foundEstado.get());
        vehServeRepository.saveAndFlush(vehServ);
        bitacoraService.registrarBitacora("CHANGE_STATUS", "vehServ", null, vehServ);
        return response.getJSONResponse(vehServeRepository.save(vehServ));
    }
}

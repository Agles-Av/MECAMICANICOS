package utez.camila.camica.modules.vehserv;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utez.camila.camica.modules.estadoVehiculo.EstadoVehiculo;
import utez.camila.camica.modules.servicio.Servicio;
import utez.camila.camica.modules.usuarios.Usuario;
import utez.camila.camica.modules.vehiculos.Vehiculo;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehServeRepository extends JpaRepository<VehServe, Long> {
    List<VehServe> findVehServesByEstado(EstadoVehiculo estado);

    List<VehServe> findVehServesByMecanico(Usuario mecanico);

    List<VehServe> findVehServesByServicio(Servicio servicio);

    List<VehServe> findVehServesByVehiculo(Vehiculo vehiculo);


    Optional<VehServe> findByVehiculoAndEstadoAndServicio(Vehiculo vehiculo, EstadoVehiculo estado, Servicio servicio);

    List<VehServe> findAllByMecanicoIsNull();
}

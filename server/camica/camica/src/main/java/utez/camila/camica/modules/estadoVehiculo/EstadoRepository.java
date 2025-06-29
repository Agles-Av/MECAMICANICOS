package utez.camila.camica.modules.estadoVehiculo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EstadoRepository extends JpaRepository<EstadoVehiculo , Long> {
    Optional<EstadoVehiculo> findByNombre(String nombre);
}

package utez.camila.camica.modules.vehiculos;

import org.springframework.data.jpa.repository.JpaRepository;
import utez.camila.camica.modules.usuarios.Usuario;

import java.util.List;
import java.util.Optional;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {
    List<Vehiculo> findByDuenio(Usuario duenio);
    Optional<Vehiculo> findByModelo(String modelo);
    List<Vehiculo> findByActivoTrue();
    List<Vehiculo> findByActivoFalse();
}

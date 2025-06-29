package utez.camila.camica.modules.servicio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    // Aquí puedes agregar métodos personalizados si es necesario
}

package utez.camila.camica.modules.bitacora;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BitacoraRepository extends JpaRepository<Bitacora, Long> {
    List<Bitacora> findAllByOrderByFechaDesc();

}

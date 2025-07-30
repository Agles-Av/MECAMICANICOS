package utez.camila.camica.modules.roles;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RolesRepository extends JpaRepository<Roles, Long> {
    Optional<Roles> findByNombre(String nombre);
}

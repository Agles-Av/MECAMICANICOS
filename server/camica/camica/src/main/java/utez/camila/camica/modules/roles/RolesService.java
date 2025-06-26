package utez.camila.camica.modules.roles;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.camila.camica.config.CustomResponse;

@Service
public class RolesService {

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private CustomResponse response;

    @Transactional
    public ResponseEntity<?> getAll(Roles role) {
        return response.getJSONResponse(rolesRepository.findAll());
    }
}

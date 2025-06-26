package utez.camila.camica.modules.roles;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin
public class RolesController {
    @Autowired
    private RolesRepository rolesRepository;

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(rolesRepository.findAll());
    }
}

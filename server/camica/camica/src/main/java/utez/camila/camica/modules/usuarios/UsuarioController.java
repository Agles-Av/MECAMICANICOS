package utez.camila.camica.modules.usuarios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.camila.camica.modules.auth.AuthService;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin("*")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AuthService authService;

    @GetMapping("/")
    public ResponseEntity<?> getAll(){
        return usuarioService.getAll();
    }

    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody UsuarioDto usuario) {
        return authService.save(usuario.toEntity());
    }

    @PutMapping("/{id}/")
    public ResponseEntity<?> update(@RequestBody UsuarioDto usuario, @PathVariable("id") Long id) {
        return usuarioService.update(usuario.toEntity(), id);
    }

    @PatchMapping("/status/{id}/")
    public ResponseEntity<?> changeStatus(@PathVariable("id") Long id) {
        return usuarioService.changeStatus(id);
    }
}

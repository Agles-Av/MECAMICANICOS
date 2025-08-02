package utez.camila.camica.modules.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.camila.camica.modules.usuarios.UsuarioDto;
import utez.camila.camica.modules.usuarios.UsuarioService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto dto){
       return authService.login(dto);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UsuarioDto usuario){
        return authService.register(usuario.toEntity());
    }

    @PutMapping("/updatePassword/{id}")
    public ResponseEntity<?> updatePassword(@PathVariable("id") Long id, @RequestBody LoginDto coso){
        return authService.updatePassword(id, coso);
    }

    @PutMapping("/updateProfile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable("id") Long id, @RequestBody UsuarioDto usuario){
        return usuarioService.update(usuario.toEntity(), id);
    }
}

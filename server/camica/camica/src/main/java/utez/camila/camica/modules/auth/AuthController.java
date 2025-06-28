package utez.camila.camica.modules.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.camila.camica.modules.usuarios.UsuarioDto;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private AuthService authService;

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
}

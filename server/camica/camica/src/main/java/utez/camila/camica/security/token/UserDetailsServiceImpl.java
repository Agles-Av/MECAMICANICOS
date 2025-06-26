package utez.camila.camica.security.token;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.camila.camica.modules.usuarios.Usuario;
import utez.camila.camica.modules.usuarios.UsuarioService;

import java.util.Optional;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UsuarioService userService;

    public UserDetailsServiceImpl(UsuarioService userService) {
        this.userService = userService;
    }


    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario foundUser = userService.findByEmail(username);
        if (foundUser != null)
            return UserDetailsImpl.build(foundUser);
        throw new UsernameNotFoundException("Usuario no encontrado");
    }
}

package utez.camila.camica.modules.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.camila.camica.config.CustomResponse;
import utez.camila.camica.modules.usuarios.Usuario;
import utez.camila.camica.modules.usuarios.UsuarioRepository;
import utez.camila.camica.security.token.JwtProvider;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UsuarioRepository useRepository;

    @Autowired
    private CustomResponse customResponse;



    private final AuthenticationManager manager;
    private final JwtProvider provider;
    private final PasswordEncoder encoder;

    public AuthService(AuthenticationManager manager, JwtProvider provider, PasswordEncoder encoder) {
        this.manager = manager;
        this.provider = provider;
        this.encoder = encoder;
    }


    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> login(LoginDto dto) {
        System.out.println("banana1");
        System.out.println(dto);
        try{
            Usuario foundUser = useRepository.findByEmail(dto.getEmail());
            if (foundUser == null)
                return customResponse.get400Response(404);
            if(!foundUser.getStatus())
                return customResponse.getBadRequest("Usuario inactivo");
            Authentication auth = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = provider.generateToken(auth);
            SignedDto signedDto = new SignedDto(token, "Bearer", foundUser, foundUser.getRole());
    //        bitacoraService.registrarBitacora("LOGIN", "user", null, foundUser);
            if(dto.getEmail().equals(dto.getPassword()) ){
                return customResponse.getLoginJSONResponse(signedDto, true, true);
            }

            return customResponse.getLoginJSONResponse(signedDto, false, true);
        }catch (Exception e){
            e.printStackTrace();
            return customResponse.get400Response(400);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> updatePassword(Long id, LoginDto coso){
        Optional<Usuario> foundUser = useRepository.findById(id);
        if (!foundUser.isPresent())
            return customResponse.get400Response(404);
        Usuario user = foundUser.get();
        user.setContrasena(encoder.encode(coso.getPassword()));
        return customResponse.getJSONResponse(useRepository.save(user));
    }


    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> save(Usuario user){
        if (useRepository.findByEmail(user.getEmail()) != null)
            return customResponse.getBadRequest("Correo ya registrado");
        user.setContrasena(encoder.encode(user.getContrasena()));
        user.setStatus(true);
        return customResponse.getJSONResponse(useRepository.save(user));
    }
}

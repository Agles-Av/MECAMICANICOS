package utez.camila.camica.modules.usuarios;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.camila.camica.config.CustomResponse;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private CustomResponse response;

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getAll() {
        return response.getJSONResponse(repository.findAll());
    }

    @Transactional(rollbackFor = Exception.class)
    public Usuario findByEmail(String email){
        Usuario usuarioFound = repository.findByEmail(email);
        if (usuarioFound == null)
            return null;
        return usuarioFound;
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> update(Usuario usuario, Long id) {
        Optional<Usuario> foundUsuario = repository.findById(id);
        if (foundUsuario.isEmpty()) {
            return response.getBadRequest("Usuario no encontrado");
        }
        Usuario existingUsuario = foundUsuario.get();
        existingUsuario.setEmail(usuario.getEmail());
        existingUsuario.setNombre(usuario.getNombre());
        existingUsuario.setApellidos(usuario.getApellidos());
        existingUsuario.setTelefono(usuario.getTelefono());
        existingUsuario.setRole(usuario.getRole());
        Usuario updatedUsuario = repository.save(existingUsuario);
        return response.getJSONResponse(updatedUsuario);
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> changeStatus(Long id) {
        Optional<Usuario> foundUsuario = repository.findById(id);
        if (foundUsuario.isEmpty()) {
            return response.getBadRequest("Usuario no encontrado");
        }
        Usuario usuario = foundUsuario.get();
        usuario.setStatus(!usuario.getStatus());
        Usuario updatedUsuario = repository.save(usuario);
        return response.getJSONResponse(updatedUsuario);
    }
}

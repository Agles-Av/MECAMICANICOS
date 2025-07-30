package utez.camila.camica.modules.categoria;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.camila.camica.config.CustomResponse;
import utez.camila.camica.modules.bitacora.BitacoraService;

import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private BitacoraService bitacoraService;

    @Autowired
    private CustomResponse response;

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getAll() {
        return response.getJSONResponse(categoriaRepository.findAll());
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> getById(Long id){
        Optional<Categoria> categoriaFound = categoriaRepository.findById(id);
        if (categoriaFound.isEmpty()) {
            return response.getBadRequest("Categoria no encontrada");
        }
        return response.getJSONResponse(categoriaFound);
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> save(Categoria categoria) {
        Optional<Categoria> existingCategoria = categoriaRepository.findByNombre(categoria.getNombre());
        if (existingCategoria.isPresent()) {
            return response.getBadRequest("Ya existe una categoria con ese nombre");
        }
        Categoria savedCategoria = categoriaRepository.save(categoria);
        bitacoraService.registrarBitacora("SAVE", "vehServ", null, savedCategoria);
        return response.getJSONResponse(savedCategoria);
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> update(Long id, Categoria categoria) {
        Optional<Categoria> existingCategoria = categoriaRepository.findById(id);
        if (existingCategoria.isEmpty()) {
            return response.getBadRequest("Categoria no encontrada");
        }
        Categoria updatedCategoria = existingCategoria.get();
        updatedCategoria.setNombre(categoria.getNombre());
        updatedCategoria.setDescripcion(categoria.getDescripcion());
        Categoria savedCategoria = categoriaRepository.save(updatedCategoria);
        bitacoraService.registrarBitacora("UPDATE", "vehServ", existingCategoria.get(), savedCategoria);
        return response.getJSONResponse(savedCategoria);
    }

    @Transactional(rollbackFor = Exception.class)
    public ResponseEntity<?> changeStatus(Long id) {
        Optional<Categoria> existingCategoria = categoriaRepository.findById(id);
        if (existingCategoria.isEmpty()) {
            return response.getBadRequest("Categoria no encontrada");
        }
        Categoria categoria = existingCategoria.get();
        categoria.setStatus(!categoria.getStatus());
        Categoria updatedCategoria = categoriaRepository.save(categoria);
        bitacoraService.registrarBitacora("CHANGE_STATUS", "vehServ", existingCategoria.get(), updatedCategoria);
        return response.getJSONResponse(updatedCategoria);
    }
}

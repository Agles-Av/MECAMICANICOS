package utez.camila.camica.modules.estadoVehiculo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.camila.camica.config.CustomResponse;

@Service
public class EstadoService {
    @Autowired
    private EstadoRepository estadoRepository;

    @Autowired
    private CustomResponse response;

    @Transactional
    public ResponseEntity<?> getAll() {
        return response.getJSONResponse(estadoRepository.findAll());
    }
}

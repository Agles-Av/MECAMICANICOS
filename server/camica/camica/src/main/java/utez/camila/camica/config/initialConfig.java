package utez.camila.camica.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import utez.camila.camica.modules.categoria.Categoria;
import utez.camila.camica.modules.categoria.CategoriaRepository;
import utez.camila.camica.modules.estadoVehiculo.EstadoRepository;
import utez.camila.camica.modules.estadoVehiculo.EstadoVehiculo;
import utez.camila.camica.modules.roles.Roles;
import utez.camila.camica.modules.roles.RolesRepository;
import utez.camila.camica.modules.servicio.Servicio;
import utez.camila.camica.modules.servicio.ServicioRepository;
import utez.camila.camica.modules.usuarios.Usuario;
import utez.camila.camica.modules.usuarios.UsuarioRepository;
import utez.camila.camica.modules.vehiculos.Vehiculo;
import utez.camila.camica.modules.vehiculos.VehiculoRepository;
import utez.camila.camica.modules.vehserv.VehServe;
import utez.camila.camica.modules.vehserv.VehServeRepository;

import java.util.Optional;

@Configuration
public class initialConfig implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final CategoriaRepository categoriaRepository;
    private final EstadoRepository estadoRepository;
    private final RolesRepository rolesRepository;
    private final ServicioRepository servicioRepository;
    private final VehiculoRepository vehiculoRepository;
    private final PasswordEncoder encoder;
    private final VehServeRepository vehServeRepository;

    public initialConfig(UsuarioRepository usuarioRepository, CategoriaRepository categoriaRepository, EstadoRepository estadoRepository, RolesRepository rolesRepository, ServicioRepository servicioRepository, VehiculoRepository vehiculoRepository, PasswordEncoder encoder, VehServeRepository vehServeRepository) {
        this.usuarioRepository = usuarioRepository;
        this.categoriaRepository = categoriaRepository;
        this.estadoRepository = estadoRepository;
        this.rolesRepository = rolesRepository;
        this.servicioRepository = servicioRepository;
        this.vehiculoRepository = vehiculoRepository;
        this.encoder = encoder;
        this.vehServeRepository = vehServeRepository;
    }

    @Transactional(rollbackFor = Exception.class)
    public Usuario getOrSaveUsuario(Usuario usuario) {
        Usuario foundUsuario = usuarioRepository.findByEmail(usuario.getEmail());
        if (foundUsuario != null) {
            return foundUsuario;
        } else {
            return usuarioRepository.save(usuario);
        }
    }

@Transactional(rollbackFor = Exception.class)
public Categoria getOrSaveCategoria(Categoria categoria) {
    Optional<Categoria> foundCategoria = categoriaRepository.findByNombre(categoria.getNombre());
    if (foundCategoria.isPresent()) {
        return foundCategoria.get();
    } else {
        return categoriaRepository.save(categoria);
    }
}

@Transactional(rollbackFor = Exception.class)
public EstadoVehiculo getOrSaveEstado(EstadoVehiculo estado) {
    Optional<EstadoVehiculo> foundEstado = estadoRepository.findByNombre(estado.getNombre());
    if (foundEstado.isPresent()) {
        return foundEstado.get();
    } else {
        return estadoRepository.save(estado);
    }
}

@Transactional(rollbackFor = Exception.class)
public Roles getOrSaveRol(Roles rol){
    Optional<Roles> foundRol = rolesRepository.findByNombre(rol.getNombre());
    if (foundRol.isPresent()) {
        return foundRol.get();
    } else {
        return rolesRepository.save(rol);
    }
}

@Transactional(rollbackFor = Exception.class)
public Servicio getOrSaveServicio(Servicio servicio) {
    Optional<Servicio> foundServicio = servicioRepository.findByNombre(servicio.getNombre());
    if (foundServicio.isPresent()) {
        return foundServicio.get();
    } else {
        return servicioRepository.save(servicio);
    }
}

@Transactional(rollbackFor = Exception.class)
public Vehiculo getOrSaveVehiculo(Vehiculo vehiculo) {
    Optional<Vehiculo> foundVehiculo = vehiculoRepository.findByModelo(vehiculo.getModelo());
    if (foundVehiculo.isPresent()) {
        return foundVehiculo.get();
    } else {
        return vehiculoRepository.save(vehiculo);
    }
}
    @Transactional(rollbackFor = Exception.class)
    public VehServe getOrSaveVehServe(VehServe vehServe) {
        Optional<VehServe> found = vehServeRepository.findByVehiculoAndEstadoAndServicio(
                vehServe.getVehiculo(), vehServe.getEstado(), vehServe.getServicio());
        return found.orElseGet(() -> vehServeRepository.save(vehServe));
    }



    @Override
    public void run(String... args) throws Exception {
        Roles adminRole = getOrSaveRol(new Roles("ADMIN"));
        Roles userRole = getOrSaveRol(new Roles("USER"));
        Roles mechanicRole = getOrSaveRol(new Roles("MECHANIC"));

        Usuario usuarioAdmin = getOrSaveUsuario(new Usuario("Víctor","Barrera","20223tn008@utez.edu.mx", encoder.encode("123456"), "7773308599", true, adminRole));
        Usuario usuario1 = getOrSaveUsuario(new Usuario("Valentin","Roque", "20223tn029@utez.edu.mx", encoder.encode("123456"), "777963299", true, userRole));
        Usuario usuario2 = getOrSaveUsuario(new Usuario("Cristian","Saldaña", "20223tn030@utez.edu.mx", encoder.encode("123456"), "7773742539", true, userRole));
        Usuario usuarioMech = getOrSaveUsuario(new Usuario("Alex", "Martinez","correo@gail.com", encoder.encode("123456"), "7773742539", true, mechanicRole));
        Usuario usuarioMech2 = getOrSaveUsuario(new Usuario("Eddie", "Bahena","correo2@gail.com", encoder.encode("123456"), "7771236939", true, mechanicRole));

        Categoria categoria1 = getOrSaveCategoria(new Categoria("Mantenimiento","mantenimiento así bien chido", true));
        Categoria categoria2 = getOrSaveCategoria(new Categoria("Reparación","Reparación así bien chida", true));
        Categoria categoria3 = getOrSaveCategoria(new Categoria("Limpieza","Limpieza así bien chida", true));

        EstadoVehiculo estado1 = getOrSaveEstado(new EstadoVehiculo("En espera"));
        EstadoVehiculo estado2 = getOrSaveEstado(new EstadoVehiculo("En proceso"));
        EstadoVehiculo estado3 = getOrSaveEstado(new EstadoVehiculo("Finalizado"));
        EstadoVehiculo estado4 = getOrSaveEstado(new EstadoVehiculo("Cancelado"));

        Servicio servicio1 = getOrSaveServicio(new Servicio("Cambio de aceite", "Cambio de aceite del motor", categoria1, true));
        Servicio servicio2 = getOrSaveServicio(new Servicio("Cambio de frenos", "Cambio de frenos del vehiculo", categoria2, true));
        Servicio servicio3 = getOrSaveServicio(new Servicio("Lavado exterior", "Lavado exterior del vehiculo", categoria3, true));

        Vehiculo vehiculo1 = getOrSaveVehiculo(new Vehiculo("Toyota", "InitialCorolla", "Rojo", true, usuario1));
        Vehiculo vehiculo2 = getOrSaveVehiculo(new Vehiculo("Honda", "InitialCivic", "Azul", true, usuario2));
        Vehiculo vehiculo3 = getOrSaveVehiculo(new Vehiculo("Honda", "InitialCivic", "Negro", true, usuario2));

        //Este es un vehiculo sin mecanico asignado
        VehServe vehServe1 = getOrSaveVehServe(new VehServe(vehiculo1, estado1, servicio1));
        VehServe vehServe2 = getOrSaveVehServe(new VehServe(vehiculo2, usuarioMech, estado2, servicio2));
        VehServe vehServe3 = getOrSaveVehServe(new VehServe(vehiculo3, usuarioMech, estado3, servicio3));



    }
}

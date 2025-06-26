package utez.camila.camica.modules.vehserv;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import utez.camila.camica.modules.estadoVehiculo.EstadoVehiculo;
import utez.camila.camica.modules.roles.Roles;
import utez.camila.camica.modules.servicio.Servicio;
import utez.camila.camica.modules.usuarios.Usuario;
import utez.camila.camica.modules.vehiculos.Vehiculo;

@Entity
@Table(name = "vehserv")
public class VehServe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_vehiculo")
    @JsonIgnoreProperties(value = {"duenio", "servicios"})
    private Vehiculo vehiculo;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    @JsonIgnoreProperties(value = {"vehiculo", "servicios"})
    private Usuario mecanico;

    @ManyToOne
    @JoinColumn(name = "id_estado_vehiculo")
    @JsonIgnoreProperties(value = {"servicios"})
    private EstadoVehiculo estado;

    @ManyToOne
    @JoinColumn(name = "id_servicio")
    @JsonIgnoreProperties(value = {"servicioVehiculo"})
    private Servicio servicio;

    public VehServe() {
    }

    public VehServe(Vehiculo vehiculo, Usuario mecanico, EstadoVehiculo estado, Servicio servicio) {
        this.vehiculo = vehiculo;
        this.mecanico = mecanico;
        this.estado = estado;
        this.servicio = servicio;
    }

    public VehServe(Long id, Vehiculo vehiculo, Usuario mecanico, EstadoVehiculo estado, Servicio servicio) {
        this.id = id;
        this.vehiculo = vehiculo;
        this.mecanico = mecanico;
        this.estado = estado;
        this.servicio = servicio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }

    public Usuario getMecanico() {
        return mecanico;
    }

    public void setMecanico(Usuario mecanico) {
        this.mecanico = mecanico;
    }

    public EstadoVehiculo getEstado() {
        return estado;
    }

    public void setEstado(EstadoVehiculo estado) {
        this.estado = estado;
    }

    public Servicio getServicio() {
        return servicio;
    }

    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }
}

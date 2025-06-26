package utez.camila.camica.modules.servicio;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import utez.camila.camica.modules.categoria.Categoria;
import utez.camila.camica.modules.roles.Roles;
import utez.camila.camica.modules.vehiculos.Vehiculo;
import utez.camila.camica.modules.vehserv.VehServe;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "servicio")
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    @JsonIgnoreProperties(value = {"servicio"})
    private Categoria categoria;


    @Column(name = "status", nullable = false)
    private Boolean status;

    @OneToMany(mappedBy = "servicio", cascade = CascadeType.PERSIST)
    @JsonIgnoreProperties(value = {"servicio"})
    private List<VehServe> servicioVehiculo;

    public Servicio(String nombre, String descripcion, Categoria categoria, Boolean status) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.status = status;
    }

    public Servicio(Long id, String nombre, String descripcion, Categoria categoria, Boolean status, List<VehServe> servicioVehiculo) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.status = status;
        this.servicioVehiculo = servicioVehiculo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public List<VehServe> getServicioVehiculo() {
        return servicioVehiculo;
    }

    public void setServicioVehiculo(List<VehServe> servicioVehiculo) {
        this.servicioVehiculo = servicioVehiculo;
    }

    public Servicio() {
    }
}

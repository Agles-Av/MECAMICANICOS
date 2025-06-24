package utez.camila.camica.modules.servicio;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import utez.camila.camica.modules.categoria.Categoria;
import utez.camila.camica.modules.roles.Roles;
import utez.camila.camica.modules.vehiculos.Vehiculo;

import java.util.HashSet;
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

    @ManyToMany
    @JoinTable(
            name = "servicio_vehiculos",
            joinColumns = @JoinColumn(name = "servicio_id"),
            inverseJoinColumns = @JoinColumn(name = "vehiculo_id")
    )
    @JsonIgnoreProperties(value = {"servicios"})
    private Set<Vehiculo> vehiculos = new HashSet<>();

    @Column(name = "status", nullable = false)
    private Boolean status;

    public Servicio(String nombre, String descripcion, Categoria categoria, Set<Vehiculo> vehiculos, Boolean status) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.vehiculos = vehiculos;
        this.status = status;
    }

    public Servicio(Long id, String nombre, String descripcion, Categoria categoria, Set<Vehiculo> vehiculos, Boolean status) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.vehiculos = vehiculos;
        this.status = status;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
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

    public Set<Vehiculo> getVehiculos() {
        return vehiculos;
    }

    public void setVehiculos(Set<Vehiculo> vehiculos) {
        this.vehiculos = vehiculos;
    }

    public Servicio(String nombre, String descripcion, Categoria categoria) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
    }

    public Servicio(String nombre, String descripcion, Categoria categoria, Set<Vehiculo> vehiculos) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.vehiculos = vehiculos;
    }

    public Servicio() {
    }

    public Servicio(Long id, String nombre, String descripcion, Categoria categoria, Set<Vehiculo> vehiculos) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.vehiculos = vehiculos;
    }
}

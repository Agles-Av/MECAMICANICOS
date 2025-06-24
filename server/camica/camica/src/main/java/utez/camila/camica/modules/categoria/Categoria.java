package utez.camila.camica.modules.categoria;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import utez.camila.camica.modules.servicio.Servicio;
import utez.camila.camica.modules.usuarios.Usuario;

import java.util.List;

@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "status", nullable = false)
    private Boolean status;

    @JsonIgnore
    @OneToMany(mappedBy = "categoria",cascade = CascadeType.PERSIST)
    private List<Servicio> servicio;

    public Categoria(String nombre, String descripcion, Boolean status) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.status = status;
    }

    public Categoria(String nombre, String descripcion, Boolean status, List<Servicio> servicio) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.status = status;
        this.servicio = servicio;
    }

    public Categoria(Long id, String nombre, String descripcion, Boolean status, List<Servicio> servicio) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.status = status;
        this.servicio = servicio;
    }

    public Categoria() {
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

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public List<Servicio> getServicio() {
        return servicio;
    }

    public void setServicio(List<Servicio> servicio) {
        this.servicio = servicio;
    }
}

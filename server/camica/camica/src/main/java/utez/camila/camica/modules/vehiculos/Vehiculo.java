package utez.camila.camica.modules.vehiculos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import utez.camila.camica.modules.categoria.Categoria;
import utez.camila.camica.modules.estadoVehiculo.EstadoVehiculo;
import utez.camila.camica.modules.roles.Roles;
import utez.camila.camica.modules.servicio.Servicio;
import utez.camila.camica.modules.usuarios.Usuario;
import utez.camila.camica.modules.vehserv.VehServe;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "vehiculo")
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "marca", nullable = false)
    private String marca;

    @Column(name = "modelo", nullable = false)
    private String modelo;

    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "status", nullable = false)
    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    @JsonIgnoreProperties(value = {"usuario"})
    private Usuario duenio;

    @OneToMany(mappedBy = "vehiculo", cascade = CascadeType.PERSIST)
    @JsonIgnoreProperties(value = {"vehiculo"})
    private List<VehServe> servicios;

    public Vehiculo() {
    }

    public Vehiculo(String marca, String modelo, String color, Boolean status, Usuario duenio) {
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.status = status;
        this.duenio = duenio;
    }

    public Vehiculo(Long id, String marca, String modelo, String color, Boolean status, Usuario duenio, List<VehServe> servicios) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.status = status;
        this.duenio = duenio;
        this.servicios = servicios;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Usuario getDuenio() {
        return duenio;
    }

    public void setDuenio(Usuario duenio) {
        this.duenio = duenio;
    }

    public List<VehServe> getServicios() {
        return servicios;
    }

    public void setServicios(List<VehServe> servicios) {
        this.servicios = servicios;
    }
}

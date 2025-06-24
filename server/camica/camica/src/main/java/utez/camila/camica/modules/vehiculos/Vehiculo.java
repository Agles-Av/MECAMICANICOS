package utez.camila.camica.modules.vehiculos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import utez.camila.camica.modules.categoria.Categoria;
import utez.camila.camica.modules.estadoVehiculo.EstadoVehiculo;
import utez.camila.camica.modules.servicio.Servicio;
import utez.camila.camica.modules.usuarios.Usuario;

import java.util.List;

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

    @ManyToMany(mappedBy = "vehiculos")
    @JsonIgnoreProperties(value = {"vehiculos"})
    private List<Servicio> servicios;


    @ManyToMany(mappedBy = "vehiculos")
    @JsonIgnoreProperties(value = {"vehiculos"})
    private List<Usuario> usuarios;

    @ManyToOne
    @JoinColumn(name = "id_estado_vehiculo", nullable = false)
    @JsonIgnoreProperties(value = {"vehiculos"})
    private EstadoVehiculo estado;

    public EstadoVehiculo getEstado() {
        return estado;
    }

    public void setEstado(EstadoVehiculo estado) {
        this.estado = estado;
    }

    public Vehiculo(String marca, String modelo, String color, Boolean status) {
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.status = status;
    }

    public Vehiculo(String marca, String modelo, String color, Boolean status, List<Servicio> servicios, List<Usuario> usuarios, EstadoVehiculo estado) {
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.status = status;
        this.servicios = servicios;
        this.usuarios = usuarios;
        this.estado = estado;
    }

    public Vehiculo(Long id, String marca, String modelo, String color, Boolean status, List<Servicio> servicios, List<Usuario> usuarios, EstadoVehiculo estado) {
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.status = status;
        this.servicios = servicios;
        this.usuarios = usuarios;
        this.estado = estado;
    }

    public Vehiculo() {
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

    public boolean isStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public List<Servicio> getServicios() {
        return servicios;
    }

    public void setServicios(List<Servicio> servicios) {
        this.servicios = servicios;
    }

    public List<Usuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<Usuario> usuarios) {
        this.usuarios = usuarios;
    }
}

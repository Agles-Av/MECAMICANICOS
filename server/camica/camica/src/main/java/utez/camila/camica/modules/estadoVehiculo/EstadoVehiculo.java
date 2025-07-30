package utez.camila.camica.modules.estadoVehiculo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import utez.camila.camica.modules.usuarios.Usuario;
import utez.camila.camica.modules.vehiculos.Vehiculo;
import utez.camila.camica.modules.vehserv.VehServe;

import java.util.List;

@Entity
@Table(name = "estado_vehiculo")
public class EstadoVehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;


    @OneToMany(mappedBy = "estado", cascade = CascadeType.PERSIST)
    @JsonIgnoreProperties(value = {"vehiculo","estado","servicio"})
    private List<VehServe> servicios;

    public EstadoVehiculo() {
    }

    public EstadoVehiculo(String nombre) {
        this.nombre = nombre;
    }

    public EstadoVehiculo(Long id, String nombre, List<VehServe> servicios) {
        this.id = id;
        this.nombre = nombre;
        this.servicios = servicios;
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

    public List<VehServe> getServicios() {
        return servicios;
    }

    public void setServicios(List<VehServe> servicios) {
        this.servicios = servicios;
    }
}

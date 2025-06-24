package utez.camila.camica.modules.estadoVehiculo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import utez.camila.camica.modules.usuarios.Usuario;
import utez.camila.camica.modules.vehiculos.Vehiculo;

import java.util.List;

@Entity
@Table(name = "estado_vehiculo")
public class EstadoVehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @JsonIgnore
    @OneToMany(mappedBy = "estado",cascade = CascadeType.PERSIST)
    private List<Vehiculo> vehiculos;

    public EstadoVehiculo(String nombre) {
        this.nombre = nombre;
    }

    public EstadoVehiculo(Long id, String nombre, List<Vehiculo> vehiculos) {
        this.id = id;
        this.nombre = nombre;
        this.vehiculos = vehiculos;
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

    public List<Vehiculo> getVehiculos() {
        return vehiculos;
    }

    public void setVehiculos(List<Vehiculo> vehiculos) {
        this.vehiculos = vehiculos;
    }

    public EstadoVehiculo() {
    }
}

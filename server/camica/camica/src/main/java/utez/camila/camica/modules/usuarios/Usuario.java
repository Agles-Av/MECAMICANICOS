package utez.camila.camica.modules.usuarios;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import utez.camila.camica.modules.roles.Roles;
import utez.camila.camica.modules.vehiculos.Vehiculo;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "apellidos", nullable = false)
    private String apellidos;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "contrasena", nullable = false)
    private String contrasena;

    @Column(name = "telefono", nullable = false)
    private String telefono;

    @Column(name = "status", nullable = false)
    private Boolean status;


    @ManyToOne
    @JoinColumn(name = "id_roles")
    @JsonIgnoreProperties(value = {"usuario"})
    private Roles role;

    @ManyToMany
    @JoinTable(
            name = "usuario_vehiculos",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "vehiculo_id")
    )
    @JsonIgnoreProperties(value = {"usuarios"})
    private Set<Vehiculo> vehiculos = new HashSet<>();

    public Usuario() {
    }

    public Usuario(String nombre, String apellidos, String email, String contrasena, String telefono, Boolean status, Roles role) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.contrasena = contrasena;
        this.telefono = telefono;
        this.status = status;
        this.role = role;
    }

    public Usuario(String nombre, String apellidos, String email, String contrasena, String telefono, Boolean status, Roles role, Set<Vehiculo> vehiculos) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.contrasena = contrasena;
        this.telefono = telefono;
        this.status = status;
        this.role = role;
        this.vehiculos = vehiculos;
    }

    public Usuario(Long id, String nombre, String apellidos, String email, String contrasena, String telefono, Boolean status, Roles role, Set<Vehiculo> vehiculos) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.contrasena = contrasena;
        this.telefono = telefono;
        this.status = status;
        this.role = role;
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

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    public Set<Vehiculo> getVehiculos() {
        return vehiculos;
    }

    public void setVehiculos(Set<Vehiculo> vehiculos) {
        this.vehiculos = vehiculos;
    }
}

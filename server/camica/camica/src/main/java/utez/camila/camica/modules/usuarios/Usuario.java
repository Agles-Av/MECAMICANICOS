package utez.camila.camica.modules.usuarios;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import utez.camila.camica.modules.roles.Roles;
import utez.camila.camica.modules.vehiculos.Vehiculo;
import utez.camila.camica.modules.vehserv.VehServe;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
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

    @JsonIgnore
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

    @OneToMany(mappedBy = "duenio",cascade = CascadeType.PERSIST)
    @JsonIgnoreProperties(value = {"duenio"})
    private List<Vehiculo> vehiculo;

    @OneToMany(mappedBy = "mecanico", cascade = CascadeType.PERSIST)
    @JsonIgnoreProperties(value = {"mecanico"})
    private List<VehServe> servicios;

    @Column(name = "intentos_fallidos")
    private Integer intentosFallidos = 0;

    @Column(name = "bloqueado_hasta")
    private LocalDateTime bloqueadoHasta;

    public Integer getIntentosFallidos() {
        return intentosFallidos;
    }

    public void setIntentosFallidos(Integer intentosFallidos) {
        this.intentosFallidos = intentosFallidos;
    }

    public LocalDateTime getBloqueadoHasta() {
        return bloqueadoHasta;
    }

    public void setBloqueadoHasta(LocalDateTime bloqueadoHasta) {
        this.bloqueadoHasta = bloqueadoHasta;
    }

    public Usuario(Long id, String nombre, String apellidos, String email, String contrasena, String telefono, Boolean status, Roles role) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.contrasena = contrasena;
        this.telefono = telefono;
        this.status = status;
        this.role = role;
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

    public Usuario() {
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

    public Boolean getStatus() {
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

    public List<Vehiculo> getVehiculo() {
        return vehiculo;
    }

    public void setVehiculo(List<Vehiculo> vehiculo) {
        this.vehiculo = vehiculo;
    }

    public List<VehServe> getServicios() {
        return servicios;
    }

    public void setServicios(List<VehServe> servicios) {
        this.servicios = servicios;
    }

    public Usuario(Long id, String nombre, String apellidos, String email, String contrasena, String telefono, Boolean status, Roles role, List<Vehiculo> vehiculo, List<VehServe> servicios) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.contrasena = contrasena;
        this.telefono = telefono;
        this.status = status;
        this.role = role;
        this.vehiculo = vehiculo;
        this.servicios = servicios;
    }
}

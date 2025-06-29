package utez.camila.camica.modules.vehserv;

import utez.camila.camica.modules.estadoVehiculo.EstadoVehiculo;
import utez.camila.camica.modules.servicio.Servicio;
import utez.camila.camica.modules.usuarios.Usuario;
import utez.camila.camica.modules.vehiculos.Vehiculo;

public class VehServeDto {
    private Long id;
    private Vehiculo vehiculo;
    private Usuario mecanico;
    private EstadoVehiculo estado;
    private Servicio servicio;

    public VehServe toEntity() {
        return new VehServe(id, vehiculo, mecanico, estado, servicio);
    }

    public VehServeDto() {
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

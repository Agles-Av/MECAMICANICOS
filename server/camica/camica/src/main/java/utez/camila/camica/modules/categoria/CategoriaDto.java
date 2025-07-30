package utez.camila.camica.modules.categoria;

import jakarta.persistence.Column;

public class CategoriaDto {
    private Long id;
    private String nombre;
    private String descripcion;
    private Boolean status;

    public Categoria toEntity() {
        return new Categoria(nombre, descripcion, status);
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
}

export const ServiceAdapter = {
  toDTO: (service) => ({
    nombre: service.nombre,
    descripcion: service.descripcion,
    categoria: {id: service.categoriaId? service.categoriaId : null}, // Objeto completo de categoría
    status: service.status,
  }),

  toModel: (data) => ({
    id: data.id,
    nombre: data.nombre,
    descripcion: data.descripcion,
    categoria: data.categoria, // Objeto completo con { id, nombre, descripcion, status }
    status: data.status,
  }),
}

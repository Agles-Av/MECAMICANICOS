export const CategoryAdapter = {
  toDTO: (category) => ({
    nombre: category.nombre,
    descripcion: category.descripcion,
    status: category.status,
  }),

  toModel: (data) => ({
    id: data.id,
    nombre: data.nombre,
    descripcion: data.descripcion,
    status: data.status,
  }),
}

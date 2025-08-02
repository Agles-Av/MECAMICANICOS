export const VehicleStateAdapter = {
  toDTO: (state) => ({
    nombre: state.nombre,
  }),

  toModel: (data) => ({
    id: data.id,
    nombre: data.nombre,
    servicios: data.servicios || [], // Array donde cada uno tiene: id, mecanico
  }),
}

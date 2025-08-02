export const MovementAdapter = {
  toDTO: (movement) => ({
    inventario: movement.inventario, // Objeto o ID según endpoint
    tipo: movement.tipo, // ENTRADA, SALIDA, AJUSTE
    cantidad: movement.cantidad,
    motivo: movement.motivo,
    usuario: movement.usuario, // Objeto o ID según endpoint
    referencia: movement.referencia,
  }),

  toModel: (data) => ({
    id: data.id,
    inventario: data.inventario, // Objeto inventario completo
    tipo: data.tipo,
    cantidad: data.cantidad,
    motivo: data.motivo,
    usuario: data.usuario, // Objeto usuario completo
    referencia: data.referencia,
    fecha: data.fecha,
    stockAnterior: data.stockAnterior,
    stockNuevo: data.stockNuevo,
  }),
}

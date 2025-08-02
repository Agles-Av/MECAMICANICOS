export const VehicleServiceAdapter = {
  toDTO: (vehicleService) => {
    const dto = {
      vehiculo: { id: vehicleService.vehiculoId },
      estado: { id: vehicleService.estadoId },
      servicio: { id: vehicleService.servicioId },
    }
    if (vehicleService.mecanicoId) {
      dto.mecanico = { id: vehicleService.mecanicoId }
    }
    return dto
  },

  toModel: (data) => ({
    id: data.id,
    vehiculo: data.vehiculo, // Objeto vehículo completo
    mecanico: data.mecanico, // Objeto usuario mecánico completo
    estado: data.estado, // Objeto estado completo
    servicio: data.servicio, // Objeto servicio completo
  }),

  toModels: (data) => {
    if (!Array.isArray(data)) return []

    return data.map(item => ({
      id: item.id,
      vehiculo: item.vehiculo || {},
      mecanico: item.mecanico || {},
      estado: item.estado || {},
      servicio: item.servicio || {},
    }))
  }
}

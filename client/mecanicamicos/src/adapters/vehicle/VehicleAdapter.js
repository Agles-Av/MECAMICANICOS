export const VehicleAdapter = {
  toDTO: (vehicle) => ({
    marca: vehicle.marca, 
    modelo: vehicle.modelo,
    color: vehicle.color,
    status: vehicle.status,
    duenio:  vehicle.duenioId ? { id: Number(vehicle.duenioId) } : undefined, // Puede ser objeto completo o solo ID según el endpoint
  }),

  toModel: (data) => ({
    id: data.id,
    marca: data.marca,
    modelo: data.modelo,
    color: data.color,
    status: data.status,
    duenio: data.duenio, // Objeto usuario completo
    servicios: data.servicios || [], // Array de objetos con: id, mecanico, estado, servicio
  }),
}

export const UserAdapter = {
  toDTO: (user) => {

    const dto = {
    nombre: user.nombre,
    apellidos: user.apellidos,
    email: user.correo,
    telefono: user.telefono,
    status: user.status,
    role:{id: user.role? user.role : 2},
    }
    if(user.password){
      dto.contrasena = user.password
    }

    return dto
  },
  
  toModel: (data) => ({
    id: data.id,
    nombre: data.nombre,
    apellidos: data.apellidos,
    email: data.email,
    telefono: data.telefono,
    status: data.status,
    role: data.role, // Objeto completo con { id, nombre }
    vehiculo: data.vehiculo || [], // Array de vehículos
    servicios: data.servicios || [], // Array de servicios
    intentosFallidos: data.intentosFallidos || 0,
    bloqueadoHasta: data.bloqueadoHasta || null,
  }),

  // Para login específicamente
  toLoginDTO: (credentials) => ({
    email: credentials.email,
    password: credentials.password,
  }),

  // Para mapear respuesta de login
  toLoginModel: (data) => ({
    token: data.token,
    tokenType: data.tokenType,
    user: {
      id: data.user.id,
      nombre: data.user.nombre,
      apellidos: data.user.apellidos,
      email: data.user.email,
      telefono: data.user.telefono,
      status: data.user.status,
      role: data.user.role, // Objeto completo
      vehiculo: data.user.vehiculo || [],
      servicios: data.user.servicios || [],
      intentosFallidos: data.user.intentosFallidos || 0,
      bloqueadoHasta: data.user.bloqueadoHasta || null,
    },
    role: data.role, // Objeto completo con { id, nombre }
  }),
}

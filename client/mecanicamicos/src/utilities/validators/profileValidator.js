// utilities/validators/profileValidator.js
export const profileValidator = (data) => {
  const errors = {}

  if (!data.nombre || !data.nombre.trim()) {
    errors.nombre = 'El nombre es requerido.'
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(data.nombre)) {
    errors.nombre = 'El nombre solo puede contener letras y espacios.'
  }

  if (!data.apellidos || !data.apellidos.trim()) {
    errors.apellidos = 'Los apellidos son requeridos.'
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(data.apellidos)) {
    errors.apellidos = 'Los apellidos solo pueden contener letras y espacios.'
  }

  if (!data.correo || !data.correo.trim()) {
    errors.correo = 'El correo electrónico es requerido.'
  } else if (
    !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.correo)
  ) {
    errors.correo = 'Ingresa un correo electrónico válido.'
  }

  if (!data.telefono || !data.telefono.trim()) {
    errors.telefono = 'El teléfono es requerido.'
  } else if (!/^\d{10}$/.test(data.telefono)) {
    errors.telefono = 'El teléfono debe tener 10 dígitos numéricos.'
  }

  return errors
}

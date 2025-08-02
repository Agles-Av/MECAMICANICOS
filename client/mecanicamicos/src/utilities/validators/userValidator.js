// utilities/validators/userValidator.js
export const userValidator = (data) => {
  const errors = {};
  // Nombre
  if (!data.nombre || !data.nombre.trim()) {
    errors.nombre = 'El nombre es requerido.';
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(data.nombre)) {
    errors.nombre = 'El nombre solo puede contener letras y espacios.';
  }

  // Apellidos
  if (!data.apellidos || !data.apellidos.trim()) {
    errors.apellidos = 'Los apellidos son requeridos.';
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(data.apellidos)) {
    errors.apellidos = 'Los apellidos solo pueden contener letras y espacios.';
  }

  // Correo
  if (!data.correo || !data.correo.trim()) {
    errors.correo = 'El correo es requerido.';
  } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.correo)) {
    errors.correo = 'Formato de correo inválido.';
  }

  // Teléfono
  if (!data.telefono || !data.telefono.trim()) {
    errors.telefono = 'El teléfono es requerido.';
  } else if (!/^\d{10}$/.test(data.telefono)) {
    errors.telefono = 'El teléfono debe tener 10 dígitos numéricos.';
  }

  // Password (si es creación o edición opcional)
  if ('password' in data && data.password && data.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres.';
  }

  // Rol (select)
if (!data.role || !["USER", "MECHANIC"].includes(data.role)) {
  errors.role = "Selecciona un rol válido.";
}


  return errors;
};

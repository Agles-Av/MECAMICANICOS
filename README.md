# 🚗 Sistema Web de Gestión de Servicios y Vehículos

**Proyecto Fullstack - React + Vite (Frontend) / Spring Boot (Backend)**  
Este sistema web permite la gestión integral de usuarios, categorías, servicios y vehículos. Está diseñado para administradores, encargados operativos y clientes, facilitando el control y operación eficiente de los servicios ofrecidos.

---

## 📜 Historias de Usuario

### 👥 Gestión de Usuarios
- Como **visitante**, quiero **registrarme** para acceder a la plataforma.
- Como **administrador**, quiero **consultar y gestionar usuarios registrados**.
- Como **administrador**, quiero **habilitar o deshabilitar usuarios**.
- Como **usuario**, quiero **iniciar y cerrar sesión** de forma segura.
- Como **usuario común**, quiero **consultar y editar mi perfil**, y **cambiar mi contraseña**.
- Como **usuario**, quiero **recuperar mi contraseña** por correo en caso de olvido.

### 🗂 Gestión de Categorías de Servicios
- Como **administrador**, quiero **registrar una nueva categoría** con nombre, descripción y estado.
- Como **administrador**, quiero **consultar el listado completo** de categorías (activas e inactivas).
- Como **administrador**, quiero **filtrar solo las categorías habilitadas**.
- Como **administrador**, quiero **actualizar información** de las categorías.
- Como **administrador**, quiero **habilitar o deshabilitar** una categoría, sin eliminarla.

### 🛠 Gestión de Servicios
- Como **administrador**, quiero **registrar un nuevo servicio** (nombre, descripción, categoría, estado).
- Como **administrador**, quiero **ver todos los servicios** registrados.
- Como **administrador**, quiero **consultar servicios activos** únicamente.
- Como **administrador**, quiero **actualizar cualquier dato del servicio**.
- Como **administrador**, quiero **habilitar o deshabilitar servicios** con efecto inmediato.

### 🚙 Gestión de Vehículos
- Como **administrador**, quiero **registrar nuevos vehículos** con información clave.
- Como **administrador**, quiero **consultar el inventario completo** de vehículos.
- Como **administrador**, quiero **ver solo los vehículos habilitados**.
- Como **administrador**, quiero **actualizar datos como modelo, marca o color**.
- Como **administrador**, quiero **habilitar o deshabilitar vehículos** según su estado.
- Como **mecánico**, quiero **remover servicios de vehículos** para ajustar operaciones.

---

## 🧠 Consideraciones Técnicas

### Validaciones y Reglas
- ❌ **Nombre duplicado** no permitido para categorías ni placas de vehículos.
- ✔️ **Estado por defecto**: al registrar una categoría o servicio, se habilita automáticamente.
- ✉️ **Correo único** en el registro de usuarios, validado en backend.
- ✔️ **Recuperación de contraseña** vía correo electrónico con token y expiración.
- ⚠️ **Confirmación previa** en acciones sensibles como deshabilitar usuarios, categorías o servicios.
- 🔒 Los elementos **deshabilitados no son visibles ni utilizables** para usuarios comunes.

### Seguridad y Accesos
- 👮‍♂️ Tres roles principales:
  - `ADMIN`: Control total del sistema.
  - `ENCARGADO`: Opera y actualiza estado de servicios asignados.
  - `CLIENTE`: Acceso limitado a funcionalidades específicas.
- 🔐 Mecanismos de autenticación segura (correo + contraseña).
- ❌ No se implementa registro de auditoría por el momento.

### UX/UI
- 🔄 Se aplicará **paginación y filtros** para listados extensos (categorías, servicios, vehículos).
- 💬 Cambios de estado visibles en **tiempo real**.
- 🧾 Servicios asignados solo serán visibles para el encargado correspondiente.

---

## 🧰 Tecnologías Utilizadas

| Parte | Tecnología |
|------|-------------|
| Frontend | React + Vite, JavaScript |
| UI | TailwindCSS / Flowbite (opcional) |
| Backend | Spring Boot |
| Seguridad | JWT / Spring Security (opcional) |
| Email | SMTP para recuperación de contraseña |

---

## 🚧 Estructura de Carpetas (Sugerida)

### Frontend (React)

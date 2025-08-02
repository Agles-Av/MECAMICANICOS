"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Eye, EyeOff, Search, Filter } from "lucide-react"
import {
  GetUsersService,
  CreateUserService,
  UpdateUserService,
  ToggleUserStatusService,
} from "../../services/user/UserService"
import { RegisterUserService } from "../../services/auth/AuthService"
import { userValidator } from "../../utilities/validators/userValidator"

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("ALL")
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    role: "",
    password: "",
  })

  useEffect(() => {
    loadUsers()
  }, [])
  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));

  // Validación en tiempo real
  const newErrors = { ...errors }
  const singleFieldError = userValidator({ ...formData, [name]: value })
  newErrors[name] = singleFieldError[name]
  setErrors(newErrors)
}


  const loadUsers = async () => {
    setLoading(true)
    try {
      const data = await GetUsersService()
      setUsers(data)
    } catch (error) {
      console.error("Error loading users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const idRoles = {
      ADMIN: 1,
      MECHANIC: 3,
      USER: 2,
    }

    const formDataWithIdRole ={
      ...formData,
      role: idRoles[formData.role] || idRoles.USER, // Default to USER if no role is selected
    }
      const validationErrors = userValidator(formData)
  setErrors(validationErrors)
  if (Object.keys(validationErrors).length > 0) {
    setLoading(false)
    return
  }

    try {
      if (editingUser) {
        await UpdateUserService(editingUser.id, formDataWithIdRole)
      } else {       
        console.log("Creating user with data:", formDataWithIdRole);
        await RegisterUserService(formDataWithIdRole)
        //await CreateUserService(formDataWithIdRole)
      }

      await loadUsers()
      resetForm()
    } catch (error) {
      console.error("Error saving user:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    console.log("Editing user:", user);
    
    setFormData({
      nombre: user.nombre,
      apellidos: user.apellidos,
      correo: user.email,
      telefono: user.telefono,
      role: user.role,
      password: "",
    })
    setShowModal(true)
  }

  const handleToggleStatus = async (userId) => {
    try {
      await ToggleUserStatusService(userId)
      await loadUsers()
    } catch (error) {
      console.error("Error toggling user status:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      nombre: "",
      apellidos: "",
      correo: "",
      telefono: "",
      role: "",
      password: "",
    })
    setEditingUser(null)
    setShowModal(false)
  }

  const filteredUsers = users.filter((user) => {
    
  // Excluir usuarios con rol ADMIN
  if (user.role && user.role.nombre === "ADMIN") {
    return false
  }
  const matchesSearch =
    user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.apellidos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.correo?.toLowerCase().includes(searchTerm.toLowerCase()) || ""
  const matchesRole = filterRole === "ALL" || user.role?.nombre === filterRole
  return matchesSearch && matchesRole
  })

  const getRoleBadge = (rol) => {
    const styles = {
      MECHANIC: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      USER: "bg-green-500/20 text-green-400 border-green-500/30",
    }
    return styles[rol] || styles.USER
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mafia-title text-3xl font-bold">Gestión de la Famiglia</h1>
          <p className="text-gray-400 mt-2">Administra todos los miembros de la organización</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="mafia-button px-6 py-3 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Miembro</span>
        </button>
      </div>

      {/* Filters */}
      <div className="mafia-card rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar miembros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mafia-input w-full pl-10 pr-4 py-3 rounded-lg"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="mafia-input pl-10 pr-8 py-3 rounded-lg appearance-none"
            >
              <option value="ALL">Todos los Roles</option>
              <option value="MECHANIC">Mecánicos</option>
              <option value="USER">Usuarios</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="mafia-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-yellow-500/20">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Miembro</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Contacto</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Rol</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Estado</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  Cargando miembros...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  No se encontraron miembros
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                  {/* ...existing code... */}
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-gray-900 font-bold text-sm">
                          {user.nombre.charAt(0)}
                          {user.apellidos.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {user.nombre} {user.apellidos}
                        </p>
                        <p className="text-gray-400 text-sm">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-white">{user.correo}</p>
                      <p className="text-gray-400 text-sm">{user.telefono}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadge(user.rol)}`}>
                      {user.role.nombre}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${user.status ? "bg-green-400" : "bg-red-400"}`}></span>
                      <span className={`text-sm ${user.status ? "text-green-400" : "text-red-400"}`}>
                        {user.status ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          user.estado ? "text-red-400 hover:bg-red-500/20" : "text-green-400 hover:bg-green-500/20"
                        }`}
                        title={user.estado ? "Desactivar" : "Activar"}
                      >
                        {user.estado ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                  {/* ...existing code... */}
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="mafia-card rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">{editingUser ? "Editar Miembro" : "Nuevo Miembro"}</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                <input
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                  maxLength={50}
                />
                {errors.nombre && <small className="text-red-500 mt-1 block">{errors.nombre}</small>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Apellidos</label>
                <input
                  name="apellidos"
                  type="text"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                  maxLength={50}
                />
                {errors.apellidos && <small className="text-red-500 mt-1 block">{errors.apellidos}</small>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Correo</label>
                <input
                  name="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleChange}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                  maxLength={100}
                />
                {errors.correo && <small className="text-red-500 mt-1 block">{errors.correo}</small>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                <input
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                  maxLength={10}
                />
                {errors.telefono && <small className="text-red-500 mt-1 block">{errors.telefono}</small>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rol</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                >
                  <option value="USER">Usuario</option>
                  <option value="MECHANIC">Mecánico</option>
                </select>
                {errors.role && <small className="text-red-500 mt-1 block">{errors.role}</small>}
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mafia-input w-full px-4 py-3 rounded-lg"
                    required={!editingUser}
                    maxLength={30}
                  />
                  {errors.password && <small className="text-red-500 mt-1 block">{errors.password}</small>}
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button type="submit" disabled={loading} className="mafia-button flex-1 py-3 rounded-lg font-semibold">
                  {loading ? "Guardando..." : editingUser ? "Actualizar" : "Crear"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement

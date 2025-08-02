"use client"

import { useState, useContext } from "react"
import { User, Mail, Phone, Lock, Save, Edit } from "lucide-react"
import AuthContext from "../../context/AuthContext"
import { UpdatePasswordService } from "../../services/auth/PasswordRecoveryService"
import { AlertHelper } from "../../utilities/AlertHelper"
import { profileValidator } from "../../utilities/validators/profileValidator"

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    apellidos: user?.apellidos || "",
    correo: user?.email || "",
    telefono: user?.telefono || "",
    role: user?.role?.nombre || "",
  })
    const idRoles = {
      ADMIN: 1,
      MECHANIC: 3,
      USER: 2,
    }
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));

  // Validación en tiempo real
  const newErrors = { ...errors }
  const singleFieldError = profileValidator({ ...formData, [name]: value })
  newErrors[name] = singleFieldError[name]
  setErrors(newErrors)
}


  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    const validationErrors = profileValidator(formData)
  setErrors(validationErrors)
  if (Object.keys(validationErrors).length > 0) {
    setLoading(false)
    return
  }
    try {
      const module = await import("../../services/user/UserService")
      const updatedUser = await module.UpdateUserService(user.id, {
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        correo: formData.correo,
        telefono: formData.telefono,
        role: idRoles[formData.role] || idRoles.USER,
        password: "12345678",
        status: user.status,
      })
      dispatch({
        type: "LOGIN",
        payload: {
          user: updatedUser,
          token: localStorage.getItem("token"),
        },
      })
      setIsEditing(false)
      AlertHelper.showAlert("Perfil actualizado correctamente", "success")
    } catch (error) {
      console.log("Error updating profile:", error);
      
      AlertHelper.showAlert("Error al actualizar el perfil", "error")
      console.error("Error updating profile:", error)
    } finally {
      AlertHelper.showAlert("Tendrás que volver a inciar sesión por tu seguridad", "info")
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      AlertHelper.showAlert("Las contraseñas no coinciden", "error")
      return
    }

    if (passwordData.newPassword.length < 6) {
      AlertHelper.showAlert("La contraseña debe tener al menos 6 caracteres", "error")
      return
    }

    setLoading(true)

    try {
      await UpdatePasswordService(user?.id, passwordData.newPassword)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error("Error changing password:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRoleBadge = (rol) => {
    const styles = {
      ADMIN: "bg-red-500/20 text-red-400 border-red-500/30",
      MECHANIC: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      USER: "bg-green-500/20 text-green-400 border-green-500/30",
    }
    return styles[rol] || styles.USER
  }

  const getRoleTitle = (rol) => {
    const titles = {
      ADMIN: "Don de la Famiglia",
      MECHANIC: "Maestro Mecánico",
      USER: "Miembro de la Famiglia",
    }
    return titles[rol] || "Miembro"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-yellow-500/20">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
            <span className="text-gray-900 font-bold text-2xl">
              {user?.nombre?.charAt(0)}
              {user?.apellidos?.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="mafia-title text-3xl font-bold">
              {user?.nombre} {user?.apellidos}
            </h1>
            <p className="text-yellow-400 text-lg font-semibold">{getRoleTitle(user?.role?.nombre)}</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mt-2 ${getRoleBadge(user?.role.nombre)}`}
            >
              {user?.role?.nombre}
            </span>
          </div>
        </div>
      </div>

      <div className="">
        {/* Profile Information */}
        <div className="mafia-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Información Personal</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="mafia-input w-full pl-10 pr-4 py-3 rounded-lg"
                  disabled={!isEditing}
                  required
                />
              </div>
              {errors.nombre && <small className="text-red-500 mt-1 block">{errors.nombre}</small>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Apellidos</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="mafia-input w-full pl-10 pr-4 py-3 rounded-lg"
                  disabled={!isEditing}
                  required
                />
              </div>
              {errors.apellidos && <small className="text-red-500 mt-1 block">{errors.apellidos}</small>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  className="mafia-input w-full pl-10 pr-4 py-3 rounded-lg"
                  disabled={!isEditing}
                  required
                />
              </div>
              {errors.correo && <small className="text-red-500 mt-1 block">{errors.correo}</small>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="mafia-input w-full pl-10 pr-4 py-3 rounded-lg"
                  disabled={!isEditing}
                  required
                />
              </div>
              {errors.telefono && <small className="text-red-500 mt-1 block">{errors.telefono}</small>}
            </div>

            {isEditing && (
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="mafia-button flex-1 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? "Guardando..." : "Guardar Cambios"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                    setFormData({
                      nombre: user?.nombre || "",
                      apellidos: user?.apellidos || "",
                      correo: user?.correo || "",
                      telefono: user?.telefono || "",
                    })
                  }}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            )}
          </form>
        </div>

 {/* Change Password */}
        <div className="mafia-card rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Cambiar Contraseña</h2>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Contraseña Actual</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="mafia-input w-full pl-10 pr-10 py-3 rounded-lg"
                  placeholder="••••••••"
                  required
                />
                {showPassword.current ? (
                  <svg
                    onClick={() => setShowPassword({ ...showPassword, current: false })}
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.94 17.94A10.06 10.06 0 0112 19c-5 0-9-4-9-7a9.97 9.97 0 012.06-5.94M9.88 9.88A3 3 0 0012 15a3 3 0 002.12-5.12M15 12a3 3 0 00-3-3m0 0a3 3 0 00-3 3m0 0a3 3 0 003 3m0 0a3 3 0 003-3m0 0a3 3 0 00-3-3" />
                  </svg>
                ) : (
                  <svg
                    onClick={() => setShowPassword({ ...showPassword, current: true })}
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 3-4 7-9 7S3 15 3 12s4-7 9-7 9 4 9 7z" />
                  </svg>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nueva Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="mafia-input w-full pl-10 pr-10 py-3 rounded-lg"
                  placeholder="••••••••"
                  required
                />
                {showPassword.new ? (
                  <svg
                    onClick={() => setShowPassword({ ...showPassword, new: false })}
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.94 17.94A10.06 10.06 0 0112 19c-5 0-9-4-9-7a9.97 9.97 0 012.06-5.94M9.88 9.88A3 3 0 0012 15a3 3 0 002.12-5.12M15 12a3 3 0 00-3-3m0 0a3 3 0 00-3 3m0 0a3 3 0 003 3m0 0a3 3 0 003-3m0 0a3 3 0 00-3-3" />
                  </svg>
                ) : (
                  <svg
                    onClick={() => setShowPassword({ ...showPassword, new: true })}
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 3-4 7-9 7S3 15 3 12s4-7 9-7 9 4 9 7z" />
                  </svg>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirmar Nueva Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="mafia-input w-full pl-10 pr-10 py-3 rounded-lg"
                  placeholder="••••••••"
                  required
                />
                {showPassword.confirm ? (
                  <svg
                    onClick={() => setShowPassword({ ...showPassword, confirm: false })}
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.94 17.94A10.06 10.06 0 0112 19c-5 0-9-4-9-7a9.97 9.97 0 012.06-5.94M9.88 9.88A3 3 0 0012 15a3 3 0 002.12-5.12M15 12a3 3 0 00-3-3m0 0a3 3 0 00-3 3m0 0a3 3 0 003 3m0 0a3 3 0 003-3m0 0a3 3 0 00-3-3" />
                  </svg>
                ) : (
                  <svg
                    onClick={() => setShowPassword({ ...showPassword, confirm: true })}
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 3-4 7-9 7S3 15 3 12s4-7 9-7 9 4 9 7z" />
                  </svg>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mafia-button w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? "Cambiando..." : "Cambiar Contraseña"}</span>
            </button>
          </form>
        </div>
   
      </div>


    </div>
  )
}

export default Profile

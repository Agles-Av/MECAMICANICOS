"use client"

import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Lock, Eye, EyeOff, Settings, CheckCircle } from "lucide-react"
import { ResetPasswordService } from "../../services/auth/PasswordRecoveryService"

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }

    if (formData.newPassword.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setLoading(true)

    try {
      await ResetPasswordService(token, formData.newPassword)
      setSuccess(true)
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    } catch (error) {
      console.error("Error resetting password:", error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-gray-900" />
            </div>
            <h1 className="mafia-title text-3xl font-bold mb-2">¡Contraseña Restablecida!</h1>
            <p className="text-gray-400">Tu contraseña ha sido actualizada exitosamente</p>
          </div>

          <div className="mafia-card rounded-2xl p-8 text-center">
            <div className="mb-6">
              <p className="text-white text-lg mb-4">Ya puedes iniciar sesión con tu nueva contraseña</p>
              <p className="text-gray-400 text-sm">Serás redirigido al login en unos segundos...</p>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="mafia-button w-full py-3 rounded-lg font-semibold text-lg"
            >
              Ir al Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-10 h-10 text-gray-900" />
          </div>
          <h1 className="mafia-title text-3xl font-bold mb-2">Nueva Contraseña</h1>
          <p className="text-gray-400">Ingresa tu nueva contraseña</p>
        </div>

        {/* Formulario */}
        <div className="mafia-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nueva Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nueva Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="mafia-input w-full pl-10 pr-12 py-3 rounded-lg focus:outline-none"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirmar Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mafia-input w-full pl-10 pr-12 py-3 rounded-lg focus:outline-none"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Requisitos de contraseña */}
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-gray-300 text-sm font-medium mb-2">Requisitos de la contraseña:</p>
              <ul className="text-gray-400 text-xs space-y-1">
                <li className="flex items-center space-x-2">
                  <span
                    className={`w-2 h-2 rounded-full ${formData.newPassword.length >= 6 ? "bg-green-400" : "bg-gray-600"}`}
                  ></span>
                  <span>Mínimo 6 caracteres</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span
                    className={`w-2 h-2 rounded-full ${formData.newPassword === formData.confirmPassword && formData.newPassword.length > 0 ? "bg-green-400" : "bg-gray-600"}`}
                  ></span>
                  <span>Las contraseñas coinciden</span>
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mafia-button w-full py-3 rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Actualizando..." : "Restablecer Contraseña"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword

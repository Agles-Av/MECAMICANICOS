"use client"

import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Lock, Mail, Settings } from "lucide-react"
import AuthContext from "../../context/AuthContext"
import { LoginService } from "../../services/auth/AuthService"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { dispatch } = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await LoginService(formData)
      console.log("Login Response: ", response);
      console.log("Login User: ", response.user);
      console.log("Login Token: ", response.token);
      
      dispatch({
        type: "LOGIN",
        payload: {
          user: response.user,
          token: response.token,
        },
      })
    } catch (error) {
      console.error("Error en login:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-10 h-10 text-gray-900" />
          </div>
          <h1 className="mafia-title text-4xl font-bold mb-2">CAMICANICOS</h1>
          <p className="text-gray-400">Acceso a la Famiglia</p>
        </div>

        {/* Formulario */}
        <div className="mafia-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mafia-input w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none"
                  placeholder="tu@email.com"
                  required
                />
                
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mafia-input w-full pl-10 pr-12 py-3 rounded-lg focus:outline-none"
                  placeholder="••••••••"
                  required
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mafia-button w-full py-3 rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Verificando..." : "Entrar a la Famiglia"}
            </button>

            {/* Links */}
            <div className="mt-6 text-center space-y-2">
              <Link
                to="/forgot-password"
                className="block text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
              >
                ¿Olvidaste tu contraseña?
              </Link>
              <Link to="/register" className="block text-yellow-400 hover:text-yellow-300 transition-colors">
                ¿No eres parte de la familia? Únete aquí
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; 2024 CAMICANICOS - La Famiglia del Taller</p>
        </div>
      </div>
    </div>
  )
}

export default Login

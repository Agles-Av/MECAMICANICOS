"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, ArrowLeft, Settings } from "lucide-react"
import { RequestPasswordResetService } from "../../services/auth/PasswordRecoveryService"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await RequestPasswordResetService(email)
      setEmailSent(true)
    } catch (error) {
      console.error("Error requesting password reset:", error)
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-10 h-10 text-gray-900" />
            </div>
            <h1 className="mafia-title text-3xl font-bold mb-2">Revisa tu Email</h1>
            <p className="text-gray-400">
              Si el correo existe en nuestros registros, recibirás un enlace para restablecer tu contraseña
            </p>
          </div>

          <div className="mafia-card rounded-2xl p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email Enviado</h3>
              <p className="text-gray-400 text-sm">
                Hemos enviado las instrucciones de recuperación a <strong className="text-yellow-400">{email}</strong>
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                No olvides revisar tu carpeta de spam. El enlace expirará en 15 minutos.
              </p>

              <Link
                to="/login"
                className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver al Login</span>
              </Link>
            </div>
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
          <h1 className="mafia-title text-3xl font-bold mb-2">Recuperar Contraseña</h1>
          <p className="text-gray-400">Ingresa tu email para recibir instrucciones</p>
        </div>

        {/* Formulario */}
        <div className="mafia-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mafia-input w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mafia-button w-full py-3 rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : "Enviar Instrucciones"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

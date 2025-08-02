"use client"

import { Link } from "react-router-dom"
import { Shield, Home, AlertTriangle } from "lucide-react"

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <AlertTriangle className="w-24 h-24 text-red-500 mx-auto mb-4" />
          <h1 className="mafia-title text-6xl font-bold mb-4 text-red-500">403</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">Acceso Denegado</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            No tienes los permisos necesarios para acceder a esta área. Esta zona está reservada para otros rangos de la
            famiglia.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-red-400 mb-6">
            <Shield className="w-6 h-6" />
            <span className="font-semibold">ÁREA RESTRINGIDA</span>
          </div>

          <Link
            to="/"
            className="inline-flex items-center space-x-2 mafia-button px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 hover:transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            <span>Volver a mi Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized

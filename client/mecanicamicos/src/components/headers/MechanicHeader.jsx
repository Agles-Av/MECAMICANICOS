"use client"

import { useContext } from "react"
import { Bell, Search, PenToolIcon as Tool, Clock } from "lucide-react"
import AuthContext from "../../context/AuthContext"

const MechanicHeader = () => {
  const { user } = useContext(AuthContext)

  return (
    <header className="bg-gray-900 border-b border-blue-500/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Tool className="w-8 h-8 text-blue-500" />
          <div>
            <h2 className="text-2xl font-bold text-white">Taller del Maestro {user?.nombre}</h2>
            <p className="text-blue-400 text-sm">Tus herramientas y servicios asignados</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Current Time */}
          <div className="flex items-center space-x-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{new Date().toLocaleTimeString()}</span>
          </div>

         

          {/* User Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">
              {user?.nombre?.charAt(0)}
              {user?.apellidos?.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default MechanicHeader

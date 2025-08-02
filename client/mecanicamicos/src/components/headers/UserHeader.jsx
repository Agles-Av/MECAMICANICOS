"use client"

import { useContext } from "react"
import { Bell, Search, Star } from "lucide-react"
import AuthContext from "../../context/AuthContext"

const UserHeader = () => {
  const { user } = useContext(AuthContext)

  return (
    <header className="bg-gray-900 border-b border-green-500/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Star className="w-8 h-8 text-green-500" />
          <div>
            <h2 className="text-2xl font-bold text-white">Bienvenido, {user?.nombre}</h2>
            <p className="text-green-400 text-sm">Tu taller de confianza, siempre a tu servicio</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          
          

          {/* User Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
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

export default UserHeader

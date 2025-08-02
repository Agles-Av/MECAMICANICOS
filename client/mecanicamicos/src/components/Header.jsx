"use client"

import { useContext } from "react"
import { Bell, Search } from "lucide-react"
import AuthContext from "../context/AuthContext"

const Header = () => {
  const { user } = useContext(AuthContext)

  return (
    <header className="bg-gray-900 border-b border-yellow-500/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-white">
            Bienvenido, <span className="text-yellow-400">{user?.nombre}</span>
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar..."
              className="mafia-input pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-yellow-400 transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
            <span className="text-gray-900 font-bold">
              {user?.nombre?.charAt(0)}
              {user?.apellidos?.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

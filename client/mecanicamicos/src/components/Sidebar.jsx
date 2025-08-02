"use client"

import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Users, Car, Wrench, FolderOpen, User, LogOut, Settings, Package, BarChart3 } from "lucide-react"
import AuthContext from "../context/AuthContext"

const Sidebar = () => {
  const { user, dispatch } = useContext(AuthContext)
  const location = useLocation()

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }

  const menuItems = [
    { path: "/", icon: Home, label: "Dashboard", roles: ["ADMIN", "USER", "MECHANIC"] },
    { path: "/users", icon: Users, label: "Usuarios", roles: ["ADMIN"] },
    { path: "/vehicles", icon: Car, label: "Vehículos", roles: ["ADMIN", "USER", "MECHANIC"] },
    { path: "/services", icon: Wrench, label: "Servicios", roles: ["ADMIN", "USER", "MECHANIC"] },
    { path: "/assignments", icon: Settings, label: "Asignaciones", roles: ["ADMIN", "USER", "MECHANIC"] },
    { path: "/inventory", icon: Package, label: "Inventario", roles: ["ADMIN", "MECHANIC"] },
    { path: "/inventory-dashboard", icon: BarChart3, label: "Dashboard Inventario", roles: ["ADMIN", "MECHANIC"] },
    { path: "/movements", icon: BarChart3, label: "Movimientos", roles: ["ADMIN", "MECHANIC"] },
    { path: "/categories", icon: FolderOpen, label: "Categorías", roles: ["ADMIN"] },
    { path: "/profile", icon: User, label: "Perfil", roles: ["ADMIN", "USER", "MECHANIC"] },
  ]

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(user?.rol))

  return (
    <div className="sidebar-gradient w-64 shadow-2xl border-r border-yellow-500/20">
      {/* Logo */}
      <div className="p-6 border-b border-yellow-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
            <Settings className="w-6 h-6 text-gray-900" />
          </div>
          <div>
            <h1 className="mafia-title text-xl font-bold">CAMICANICOS</h1>
            <p className="text-gray-400 text-xs">La Famiglia</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-yellow-500/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-gray-900 font-bold text-sm">
              {user?.nombre?.charAt(0)}
              {user?.apellidos?.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">
              {user?.nombre} {user?.apellidos}
            </p>
            <p className="text-yellow-400 text-xs font-semibold">{user?.rol}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 max-h-[calc(100vh-300px)] overflow-y-auto">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-yellow-500 text-gray-900 shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-yellow-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-yellow-500/20">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Salir</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar

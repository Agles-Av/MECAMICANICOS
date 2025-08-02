"use client"

import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Home,
  Car,
  Wrench,
  User,
  LogOut,
  Package,
  BarChart3,
  TrendingUp,
  Settings,
  ClipboardList,
  PenToolIcon as Tool,
} from "lucide-react"
import AuthContext from "../../context/AuthContext"

const MechanicSidebar = () => {
  const { user, dispatch } = useContext(AuthContext)
  const location = useLocation()

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }

  const mechanicMenuItems = [
    { path: "/", icon: Home, label: "Mi Dashboard" },
    { path: "/my-assignments", icon: ClipboardList, label: "Mis Asignaciones" },
    //{ path: "/vehicles", icon: Car, label: "Vehículos" },
    { path: "/services", icon: Wrench, label: "Servicios" },
    { path: "/assignments", icon: Settings, label: "Asignaciones" },
    //{ path: "/inventory", icon: Package, label: "Inventario" },
    //{ path: "/inventory-dashboard", icon: BarChart3, label: "Dashboard Inventario" },
    //{ path: "/movements", icon: TrendingUp, label: "Movimientos" },
    //{ path: "/tools", icon: Tool, label: "Mis Herramientas" },
    { path: "/profile", icon: User, label: "Mi Perfil" },
  ]

  return (
    <div className="sidebar-gradient w-64 shadow-2xl border-r border-yellow-500/20">
      {/* Logo */}
      <div className="p-6 border-b border-yellow-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
            <Tool className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="mafia-title text-xl font-bold">CAMICANICOS</h1>
            <p className="text-blue-400 text-xs font-semibold">MAESTRO MECÁNICO</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-yellow-500/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {user?.nombre?.charAt(0)}
              {user?.apellidos?.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">
              Maestro {user?.nombre} {user?.apellidos}
            </p>
            <p className="text-blue-400 text-xs font-semibold">MECÁNICO</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 max-h-[calc(100vh-300px)] overflow-y-auto">
        <ul className="space-y-2">
          {mechanicMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
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
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-300 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Terminar Turno</span>
        </button>
      </div>
    </div>
  )
}

export default MechanicSidebar

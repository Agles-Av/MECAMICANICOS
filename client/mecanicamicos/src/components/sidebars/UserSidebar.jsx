"use client"

import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Car, Wrench, User, LogOut, ClipboardList, MessageCircle, CreditCard, History } from "lucide-react"
import AuthContext from "../../context/AuthContext"

const UserSidebar = () => {
  const { user, dispatch } = useContext(AuthContext)
  const location = useLocation()

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }

  const userMenuItems = [
    { path: "/", icon: Home, label: "Mi Dashboard" },
    { path: "/my-vehicles", icon: Car, label: "Mis Vehículos" },
    { path: "/services", icon: Wrench, label: "Servicios Disponibles" },
    { path: "/my-requests", icon: ClipboardList, label: "Mis Solicitudes" },
    //{ path: "/history", icon: History, label: "Historial" },
    //{ path: "/payments", icon: CreditCard, label: "Pagos" },
    //{ path: "/support", icon: MessageCircle, label: "Soporte" },
    { path: "/profile", icon: User, label: "Mi Perfil" },
  ]

  return (
    <div className="sidebar-gradient w-64 shadow-2xl border-r border-yellow-500/20">
      {/* Logo */}
      <div className="p-6 border-b border-yellow-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="mafia-title text-xl font-bold">CAMICANICOS</h1>
            <p className="text-green-400 text-xs font-semibold">CLIENTE VIP</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-yellow-500/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {user?.nombre?.charAt(0)}
              {user?.apellidos?.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">
              {user?.nombre} {user?.apellidos}
            </p>
            <p className="text-green-400 text-xs font-semibold">CLIENTE</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 max-h-[calc(100vh-300px)] overflow-y-auto">
        <ul className="space-y-2">
          {userMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-green-500 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-green-400"
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
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-300 hover:bg-green-600 hover:text-white rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  )
}

export default UserSidebar

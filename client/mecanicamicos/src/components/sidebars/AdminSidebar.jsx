"use client"

import { useContext } from "react"
import { Link, useLocation,useNavigate } from "react-router-dom"
import {
  Home,
  Users,
  Car,
  Wrench,
  FolderOpen,
  User,
  LogOut,
  Settings,
  Package,
  BarChart3,
  Shield,
  Database,
  FileText,
  TrendingUp,
} from "lucide-react"
import AuthContext from "../../context/AuthContext"

const AdminSidebar = () => {
  const { user, dispatch } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }
  const goToProfile = () => {
    navigate("/")
  }

  const adminMenuItems = [
    { path: "/", icon: Home, label: "Dashboard Ejecutivo" },
    { path: "/users", icon: Users, label: "Gestión de Usuarios" },
    { path: "/vehicles", icon: Car, label: "Flota de Vehículos" },
    { path: "/services", icon: Wrench, label: "Catálogo de Servicios" },
    { path: "/assignments", icon: Settings, label: "Asignaciones" },
    //{ path: "/inventory", icon: Package, label: "Control de Inventario" },
    //{ path: "/inventory-dashboard", icon: BarChart3, label: "Dashboard Inventario" },
    //{ path: "/movements", icon: TrendingUp, label: "Movimientos" },
    { path: "/categories", icon: FolderOpen, label: "Categorías" },
    //{ path: "/reports", icon: FileText, label: "Reportes" },
    //{ path: "/system", icon: Database, label: "Sistema" },
    { path: "/profile", icon: User, label: "Mi Perfil" },
  ]

  return (
    <div className="sidebar-gradient w-64 shadow-2xl border-r border-yellow-500/20">
      {/* Logo */}
      <div className="p-6 border-b border-yellow-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
            <Shield onClick={()=>goToProfile()} className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="mafia-title text-xl font-bold">CAMICANICOS</h1>
            <p className="text-red-400 text-xs font-semibold">DON ADMIN</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-yellow-500/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {user?.nombre?.charAt(0)}
              {user?.apellidos?.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">
              Don {user?.nombre} {user?.apellidos}
            </p>
            <p className="text-red-400 text-xs font-semibold">ADMINISTRADOR</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 max-h-[calc(100vh-300px)] overflow-y-auto">
        <ul className="space-y-2">
          {adminMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive ? "bg-red-500 text-white shadow-lg" : "text-gray-300 hover:bg-gray-700 hover:text-red-400"
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
          className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Salir del Sistema</span>
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar

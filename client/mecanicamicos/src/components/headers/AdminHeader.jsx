"use client"

import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Bell, Search, Shield, Settings } from "lucide-react"
import AuthContext from "../../context/AuthContext"

const AdminHeader = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const navigateToProfile = () => {
   navigate("/profile")
  }

  return (
    <header className="bg-gray-900 border-b border-red-500/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Shield className="w-8 h-8 text-red-500" />
          <div>
            <h2 className="text-2xl font-bold text-white">Panel de Control Ejecutivo</h2>
            <p className="text-red-400 text-sm">Don {user?.nombre}, controla todo el imperio desde aquí</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">

          {/* User Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center">
            <span onClick={()=> navigateToProfile()}  className="text-white font-bold">
              {user?.nombre?.charAt(0)}
              {user?.apellidos?.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader

"use client"

import { useContext, useState, useEffect } from "react"
import { Users, Car, Wrench, FolderOpen, TrendingUp, AlertCircle } from "lucide-react"
import AuthContext from "../../context/AuthContext"
import { GetUsersService } from "../../services/user/UserService"
import { GetVehiclesService } from "../../services/vehicle/VehicleService"
import { GetActiveServicesService } from "../../services/service/ServiceService"
import { GetVehicleServicesService } from "../../services/vehicleService/VehicleServiceService"
import { GetCategoriesService } from "../../services/category/CategoryService"

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVehicles: 0,
    totalServices: 0,
    totalCategories: 0,
    pendingServices: 0,
    completedServices: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, vehicles, services, vehicleServices, categories] = await Promise.all([
          GetUsersService(),
          GetVehiclesService(),
          GetActiveServicesService(),
          GetVehicleServicesService(),
          GetCategoriesService ? GetCategoriesService() : Promise.resolve([]),
        ])

        // Contar servicios por estado
        let enEspera = 0
        let enProceso = 0
        let finalizado = 0
        let cancelado = 0
        console.log("Vehicle Services:", vehicleServices);
        
        vehicleServices.forEach((vs) => {
          if (vs.estado?.nombre === "En espera") enEspera++
          else if (vs.estado?.nombre === "En proceso") enProceso++
          else if (vs.estado?.nombre === "Finalizado") finalizado++
          else if (vs.estado?.nombre === "Cancelado") cancelado++
        })


        setStats({
          totalUsers: users.length,
          totalVehicles: vehicles.length,
          totalServices: services.length,
          totalCategories: categories.length,
          enEspera,
          enProceso,
          finalizado,
          cancelado,
        })
      } catch (error) {
        console.error("Error cargando estadísticas:", error)
      }
    }
    fetchStats()
  }, [])

  const StatCard = ({ icon: Icon, title, value, color, trend }) => (
    <div className="mafia-card rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm">+{trend}%</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-gray-900" />
        </div>
      </div>
    </div>
  )

  const getWelcomeMessage = () => {
    switch (user?.rol) {
      case "ADMIN":
        return "Controla todo el imperio desde aquí, Don."
      case "MECHANIC":
        return "Tus herramientas te esperan, maestro."
      case "USER":
        return "Bienvenido a nuestro taller de confianza."
      default:
        return "Bienvenido a la familia."
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-yellow-500/20">
        <h1 className="mafia-title text-3xl font-bold mb-2">Dashboard - Cuartel General</h1>
        <p className="text-gray-300 text-lg">{getWelcomeMessage()}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {user?.rol === "ADMIN" && (
          <StatCard icon={Users} title="Total Usuarios" value={stats.totalUsers} color="bg-blue-500" trend={12} />
        )}
        <StatCard icon={Car} title="Vehículos" value={stats.totalVehicles} color="bg-green-500" trend={8} />
        <StatCard icon={Wrench} title="Servicios" value={stats.totalServices} color="bg-yellow-500" trend={15} />
        {user?.rol === "ADMIN" && (
          <StatCard icon={FolderOpen} title="Categorías" value={stats.totalCategories} color="bg-purple-500" />
        )}
      </div>

      {/* Estadísticas Generales */}
      <div className="mafia-card rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
          Estadísticas Generales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <p className="text-blue-400 font-medium">Usuarios</p>
            <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-green-400 font-medium">Vehículos</p>
            <p className="text-2xl font-bold text-white">{stats.totalVehicles}</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-yellow-400 font-medium">Servicios</p>
            <p className="text-2xl font-bold text-white">{stats.totalServices}</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <p className="text-purple-400 font-medium">Categorías</p>
            <p className="text-2xl font-bold text-white">{stats.totalCategories}</p>
          </div>
        </div>
      </div>

      {/* Estado de Servicios */}
      <div className="mafia-card rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Estado de Servicios</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 font-medium">En Espera</p>
                <p className="text-2xl font-bold text-white">{stats.enEspera || 0}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 font-medium">En Proceso</p>
                <p className="text-2xl font-bold text-white">{stats.enProceso || 0}</p>
              </div>
              <Wrench className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 font-medium">Finalizado</p>
                <p className="text-2xl font-bold text-white">{stats.finalizado || 0}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-400 font-medium">Cancelado</p>
                <p className="text-2xl font-bold text-white">{stats.cancelado || 0}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

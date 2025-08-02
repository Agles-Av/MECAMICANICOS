"use client"

import { useState, useContext, useEffect } from "react"
import { Car, Clock, CheckCircle, CreditCard, MessageCircle, Star } from "lucide-react"
import AuthContext from "../../context/AuthContext"

const UserDashboard = () => {
  const { user } = useContext(AuthContext)
  const [stats, setStats] = useState({
    myVehicles: 0,
    activeServices: 0,
    completedServices: 0,
    pendingPayments: 0,
    loyaltyPoints: 0,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.id && user?.role?.nombre === "USER") {
      fetchUserStats()
    }
  }, [user])

  const fetchUserStats = async () => {
    setLoading(true)
    try {
      // Vehículos del usuario
      const moduleVehicle = await import("../../services/vehicle/VehicleService")
      const vehicles = await moduleVehicle.GetVehiclesByOwnerService(user.id)
      
      // Servicios relacionados a sus vehículos
      let activeServices = 0
      let completedServices = 0
      for (const v of vehicles) {
        if (Array.isArray(v.servicios)) {
          activeServices += v.servicios.filter(s => s.estado?.nombre === "En proceso" || s.estado?.nombre === "En Espera").length
          completedServices += v.servicios.filter(s => s.estado?.nombre === "Finalizado").length
        }
      }
      setStats({
        myVehicles: vehicles.length,
        activeServices,
        completedServices,
        pendingPayments: 0, // Si tienes endpoint, cámbialo aquí
        loyaltyPoints: 0, // Si tienes endpoint, cámbialo aquí
      })
    } catch {
      setStats({
        myVehicles: 0,
        activeServices: 0,
        completedServices: 0,
        pendingPayments: 0,
        loyaltyPoints: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-green-500/20">
        <h1 className="mafia-title text-3xl font-bold mb-2">Bienvenido, {user?.nombre}</h1>
        <p className="text-gray-300 text-lg">Tu taller de confianza, siempre a tu servicio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="mafia-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Mis Vehículos</p>
              <p className="text-3xl font-bold text-green-400 mt-2">{stats.myVehicles}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="mafia-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Servicios Activos</p>
              <p className="text-3xl font-bold text-yellow-400 mt-2">{stats.activeServices}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mafia-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Servicios Completados</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">{stats.completedServices}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UserDashboard

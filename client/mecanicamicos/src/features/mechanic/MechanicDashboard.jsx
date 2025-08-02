"use client"

import { useState, useContext, useEffect } from "react"
import { Wrench, Clock, CheckCircle, Car, Package } from "lucide-react"
import AuthContext from "../../context/AuthContext"

const MechanicDashboard = () => {
  const { user } = useContext(AuthContext)
  const [stats, setStats] = useState({
    assignedServices: 0,
    enEspera: 0,
    enProceso: 0,
    finalizados: 0,
    cancelados: 0,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.id && user?.role?.nombre === "MECHANIC") {
      fetchMechanicStats()
    }
  }, [user])

  // Obtiene los servicios asignados al mecánico y los clasifica por estado
  const fetchMechanicStats = async () => {
    setLoading(true)
    try {
      const module = await import("../../services/vehicleService/VehicleServiceService")
      const assignments = await module.GetServicesByMechanic(user.id)

      const assignedServices = assignments.length
      const enEspera = assignments.filter(a => a.estado?.nombre === "En espera").length
      const enProceso = assignments.filter(a => a.estado?.nombre === "En proceso").length
      const finalizados = assignments.filter(a => a.estado?.nombre === "Finalizado").length
      const cancelados = assignments.filter(a => a.estado?.nombre === "Cancelado").length

      setStats({
        assignedServices,
        enEspera,
        enProceso,
        finalizados,
        cancelados,
      })
    } catch (error) {
      setStats({
        assignedServices: 0,
        enEspera: 0,
        enProceso: 0,
        finalizados: 0,
        cancelados: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-blue-500/20">
        <h1 className="mafia-title text-3xl font-bold mb-2">Taller del Maestro {user?.nombre}</h1>
        <p className="text-gray-300 text-lg">Tus servicios asignados y herramientas de trabajo</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="mafia-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Servicios Asignados</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">{stats.assignedServices}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="mafia-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">En Espera</p>
              <p className="text-3xl font-bold text-yellow-400 mt-2">{stats.enEspera}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mafia-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">En Proceso</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">{stats.enProceso}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="mafia-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Finalizados</p>
              <p className="text-3xl font-bold text-green-400 mt-2">{stats.finalizados}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="mafia-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Cancelados</p>
              <p className="text-3xl font-bold text-red-400 mt-2">{stats.cancelados}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Trabajo de Hoy eliminado por requerimiento */}
    </div>
  )
}

export default MechanicDashboard

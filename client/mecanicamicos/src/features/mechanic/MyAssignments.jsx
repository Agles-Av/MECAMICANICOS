"use client"

import { useState, useContext, useEffect } from "react"
import { Clock, Car, Wrench } from "lucide-react"
import AuthContext from "../../context/AuthContext"
import { GetServicesByMechanic } from "../../services/vehicleService/VehicleServiceService"
import { AlertHelper } from "../../utilities/AlertHelper"

const MyAssignments = () => {
  const { user } = useContext(AuthContext)
  const [assignments, setAssignments] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.id && user?.role?.nombre === "MECHANIC") {
      fetchAssignments()
    }
  }, [user])

  const fetchAssignments = async () => {
    setLoading(true)
    try {
      const response = await GetServicesByMechanic(user.id)
      console.log("Assignments fetched:", response);
      
      setAssignments(response) // response ya debe ser array
    } catch (error) {
      AlertHelper.showAlert("Error al obtener asignaciones", "error")
      setAssignments([])
    } finally {
      setLoading(false)
    }
  }

  // Solo colores de estado y prioridad (puedes personalizarlos)
  const getStatusColor = (estado) => {
    switch (estado?.nombre) {
      case "En espera":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "En proceso":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Finalizado":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Cancelado":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mafia-title text-3xl font-bold">Mis Asignaciones</h1>
        <p className="text-gray-400 mt-2">Servicios asignados al mecánico {user?.nombre}</p>
      </div>
      {loading ? (
        <div className="col-span-full text-center py-8 text-gray-400">Cargando asignaciones...</div>
      ) : assignments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="mafia-card rounded-xl p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.estado)}`}
                >
                  {assignment.estado?.nombre}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Car className="w-4 h-4 text-gray-400" />
                  <span className="text-white text-sm">
                    {assignment.vehiculo?.marca} {assignment.vehiculo?.modelo}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wrench className="w-4 h-4 text-gray-400" />
                  <span className="text-white text-sm">{assignment.servicio?.nombre}</span>
                </div>
                {/* Si hay más campos puedes agregarlos */}
              </div>

              {/* Puedes poner botones para actualizar estado si lo necesitas */}
              <div className="flex flex-col gap-2">
                {/* Select para cambiar estado, igual que en ServiceAssignment.jsx */}
                <select
                  className="mafia-input px-2 py-1 rounded-lg text-sm mb-2"
                  value={assignment.estado?.id || ""}
                  onChange={async (e) => {
                    const newEstadoId = e.target.value
                    try {
                      const module = await import("../../services/vehicleService/VehicleServiceService")
                      await module.UpdateVehicleServiceStatusService(assignment.id, newEstadoId)
                      await fetchAssignments()
                      AlertHelper.showAlert("Estado actualizado correctamente", "success")
                    } catch (error) {
                      AlertHelper.showAlert("Error al actualizar estado", "error")
                    }
                  }}
                >
                  <option value="">Cambiar estado</option>
                  <option value={1}>En Espera</option>
                  <option value={2}>En Proceso</option>
                  <option value={3}>Finalizado</option>
                  <option value={4}>Cancelado</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="col-span-full text-center py-8 text-gray-400">No tienes asignaciones</div>
      )}
    </div>
  )
}

export default MyAssignments

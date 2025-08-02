"use client"

import { useState, useEffect, useContext } from "react"
import { Plus, User, Car, Wrench, Calendar, Clock } from "lucide-react"
import AuthContext from "../../context/AuthContext"
import { GetVehiclesService } from "../../services/vehicle/VehicleService"
import { GetActiveServicesService } from "../../services/service/ServiceService"
import { GetUsersService } from "../../services/user/UserService"
import {
  CreateVehicleServiceService,
  GetServicesNotAssignedToMechanic,
  GetVehicleServicesService,
} from "../../services/vehicleService/VehicleServiceService"
import { GetVehicleStatesService } from "../../services/vehicleState/VehicleStateService"

const ServiceAssignment = () => {
  const { user } = useContext(AuthContext)
  const [assignments, setAssignments] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [services, setServices] = useState([])
  const [mechanics, setMechanics] = useState([])
  const [states, setStates] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    vehiculoId: "",
    servicioId: "",
    mecanicoId: "",
    estadoId: "",
  })
  const [editModal, setEditModal] = useState({ open: false, assignment: null })
  const VehiclesStates = [
    { id: 1, nombre: "En Espera" },
    { id: 2, nombre: "En Proceso" },
    { id: 3, nombre: "Finalizado" },
    { id: 4, nombre: "Cancelado" },
  ]

  // Carga condicional según rol
  useEffect(() => {
    if (user?.role?.nombre === "ADMIN") {
      loadData()
    } else if (user?.role?.nombre === "MECHANIC") {
      loadUnassignedServices()
    }
    // Si hay otros roles, puedes agregar lógica aquí
  }, [user])

  // Solo para mecánicos: servicios sin asignar
  const loadUnassignedServices = async () => {
    setLoading(true)
    try {
      const response = await GetServicesNotAssignedToMechanic()
      setAssignments(response)
    } catch (error) {
      console.error("Error cargando servicios sin asignar:", error)
      setAssignments([])
    } finally {
      setLoading(false)
    }
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const [assignmentsData, vehiclesData, servicesData, usersData, statesData] = await Promise.all([
        GetVehicleServicesService(),
        GetVehiclesService(),
        GetActiveServicesService(),
        GetUsersService(),
        GetVehicleStatesService(),
      ])

      setAssignments(assignmentsData)
      setVehicles(vehiclesData)
      setServices(servicesData)
      setMechanics(usersData.filter((u) => u.role.nombre === "MECHANIC"))
      setStates(statesData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await CreateVehicleServiceService(formData)
      await loadData()
      resetForm()
    } catch (error) {
      console.error("Error creating assignment:", error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      vehiculoId: "",
      servicioId: "",
      mecanicoId: "",
      estadoId: "",
    })
    setShowModal(false)
    setEditModal({ open: false, assignment: null })
  }

  const getStatusColor = (estado) => {
    const colors = {
      Pendiente: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      "En Proceso": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Completado: "bg-green-500/20 text-green-400 border-green-500/30",
      Cancelado: "bg-red-500/20 text-red-400 border-red-500/30",
    }
    return colors[estado] || colors.Pendiente
  }

  // Solo ADMIN puede crear nuevas asignaciones
  const canCreateAssignments = user?.role?.nombre === "ADMIN"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mafia-title text-3xl font-bold">Asignación de Servicios</h1>
          <p className="text-gray-400 mt-2">
            {user?.role?.nombre === "ADMIN"
              ? "Gestiona todas las asignaciones de servicios"
              : user?.role?.nombre === "MECHANIC"
                ? "Tus servicios asignados"
                : "Estado de tus servicios solicitados"}
          </p>
        </div>
        {canCreateAssignments && (
          <button
            onClick={() => setShowModal(true)}
            className="mafia-button px-6 py-3 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Asignación</span>
          </button>
        )}
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-400">Cargando asignaciones...</div>
        ) : assignments.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-400">No hay asignaciones disponibles</div>
        ) : (
          assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="mafia-card rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-gray-900" />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.estado?.nombre || "Pendiente")}`}
                >
                  {assignment.estado?.nombre || "Pendiente"}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Car className="w-4 h-4 text-gray-400" />
                  <span className="text-white text-sm">
                    {assignment.vehiculo?.marca} {assignment.vehiculo?.modelo} - {assignment.vehiculo?.placa}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Wrench className="w-4 h-4 text-gray-400" />
                  <span className="text-white text-sm">{assignment.servicio?.nombre}</span>
                </div>

                {assignment.mecanico && assignment.mecanico.nombre && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-white text-sm">
                      {assignment.mecanico.nombre} {assignment.mecanico.apellidos}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions: Cambiar estado, reasignar mecánico y tomar servicio */}
              <div className="flex flex-col gap-2">
                {/* ADMIN: cambiar estado y reasignar mecánico */}
                {user?.role?.nombre === "ADMIN" && (
                  <>
                    <select
                      className="mafia-input px-2 py-1 rounded-lg text-sm mb-2"
                      value={assignment.estado?.id || ""}
                      onChange={async (e) => {
                        const newEstadoId = e.target.value
                        try {
                          await import("../../services/vehicleService/VehicleServiceService").then(({ UpdateVehicleServiceStatusService }) =>
                            UpdateVehicleServiceStatusService(assignment.id, newEstadoId)
                          )
                          await loadData()
                        } catch (error) {
                          console.error("Error actualizando estado:", error)
                        }
                      }}
                    >
                      <option value="">Cambiar estado</option>
                      {VehiclesStates.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.nombre}
                        </option>
                      ))}
                    </select>
                    <button
                      className="py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, mecanicoId: assignment.mecanico?.id || "", servicioId: assignment.servicio?.id || "" }))
                        setEditModal({ open: true, assignment })
                      }}
                    >
                      Editar/Reasignar Mecánico
                    </button>
                  </>
                )}

                {/* MECHANIC: solo ver servicios sin asignar y tomar servicio */}
                {user?.role?.nombre === "MECHANIC" && (!assignment.mecanico || !assignment.mecanico.nombre) && (
                  <button
                    className="py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm"
                    onClick={async () => {
                      try {
                        const module = await import("../../services/vehicleService/VehicleServiceService")
                        await module.AssignMechanicToServiceService(assignment.id, user.id)
                        await loadUnassignedServices()
                      } catch (error) {
                        console.error("Error al tomar servicio:", error)
                      }
                    }}
                  >
                    Tomar Servicio
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para nueva asignación */}
      {showModal && canCreateAssignments && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="mafia-card rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Nueva Asignación de Servicio</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Vehículo</label>
                <select
                  value={formData.vehiculoId}
                  onChange={(e) => setFormData({ ...formData, vehiculoId: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                >
                  <option value="">Seleccionar vehículo</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.marca} {vehicle.modelo} - {vehicle.placa}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Servicio</label>
                <select
                  value={formData.servicioId}
                  onChange={(e) => setFormData({ ...formData, servicioId: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                >
                  <option value="">Seleccionar servicio</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.nombre} - ${service.precio}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Mecánico</label>
                <select
                  value={formData.mecanicoId}
                  onChange={(e) => setFormData({ ...formData, mecanicoId: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  
                >
                  <option value="">Seleccionar mecánico</option>
                  {mechanics.map((mechanic) => (
                    <option key={mechanic.id} value={mechanic.id}>
                      {mechanic.nombre} {mechanic.apellidos}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
                <select
                  value={formData.estadoId}
                  onChange={(e) => setFormData({ ...formData, estadoId: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                >
                  <option value="">Seleccionar estado</option>
                  {VehiclesStates.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button type="submit" disabled={loading} className="mafia-button flex-1 py-3 rounded-lg font-semibold">
                  {loading ? "Creando..." : "Crear Asignación"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar/reasignar mecánico y servicio */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="mafia-card rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Editar Asignación</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                try {
                  const module = await import("../../services/vehicleService/VehicleServiceService")
                  // Enviar todos los datos requeridos por toDTO
                  await module.UpdateVehicleServiceService(editModal.assignment.id, {
                    vehiculoId: editModal.assignment.vehiculo?.id,
                    mecanicoId: formData.mecanicoId,
                    estadoId: editModal.assignment.estado?.id,
                    servicioId: formData.servicioId,
                  })
                  await loadData()
                  resetForm()
                } catch (error) {
                  console.error("Error editando asignación:", error)
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Mecánico</label>
                <select
                  value={formData.mecanicoId}
                  onChange={(e) => setFormData({ ...formData, mecanicoId: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                >
                  <option value="">Seleccionar mecánico</option>
                  {mechanics.map((mechanic) => (
                    <option key={mechanic.id} value={mechanic.id}>
                      {mechanic.nombre} {mechanic.apellidos}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Servicio</label>
                <select
                  value={formData.servicioId}
                  onChange={(e) => setFormData({ ...formData, servicioId: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                >
                  <option value="">Seleccionar servicio</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.nombre} - ${service.precio}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="submit" disabled={loading} className="mafia-button flex-1 py-3 rounded-lg font-semibold">
                  {loading ? "Guardando..." : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceAssignment

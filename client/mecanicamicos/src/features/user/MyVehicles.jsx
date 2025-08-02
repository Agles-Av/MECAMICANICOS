"use client"

import { useState, useContext, useEffect } from "react"
import { Car, Plus, Calendar, Wrench } from "lucide-react"
import AuthContext from "../../context/AuthContext"
import { GetVehiclesByOwnerService } from "../../services/vehicle/VehicleService"
import { AlertHelper } from "../../utilities/AlertHelper"


const MyVehicles = () => {
  const { user } = useContext(AuthContext)

  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState({ open: false, vehicle: null })

  useEffect(() => {
    if (user?.id) {
      loadVehicles()
    }
  }, [user])

  const loadVehicles = async () => {
    setLoading(true)
    try {
      const response = await GetVehiclesByOwnerService(user.id)
      setVehicles(response)
    } catch (error) {
      AlertHelper.showAlert("Error al obtener vehículos", "error")
      setVehicles([])
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mafia-title text-3xl font-bold">Mis Vehículos</h1>
          <p className="text-gray-400 mt-2">Gestiona tu flota personal</p>
        </div>
        <button className="mafia-button px-6 py-3 rounded-lg flex items-center space-x-2" onClick={() => setShowAddModal(true)}>
          <Plus className="w-5 h-5" />
          <span>Agregar Vehículo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-400">Cargando vehículos...</div>
        ) : vehicles.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-400">No tienes vehículos registrados</div>
        ) : (
          vehicles.map((vehicle) => (
            <div key={vehicle.id} className="mafia-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 font-mono text-lg">{vehicle.placa}</span>
              </div>

              <div className="space-y-2 mb-4">
                <h3 className="text-xl font-bold text-white">
                  {vehicle.marca} {vehicle.modelo}
                </h3>
                <p className="text-gray-400">Color: {vehicle.color}</p>
                <p className="text-gray-400">Dueño: {vehicle.duenio?.nombre} {vehicle.duenio?.apellidos}</p>
                <p className="text-gray-400">Estado: {vehicle.status ? "Activo" : "Inactivo"}</p>

              </div>

              <div className="flex space-x-2">
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm" onClick={() => setShowEditModal({ open: true, vehicle })}>
                  Editar
                </button>
                <button className="flex-1 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-colors text-sm" onClick={async () => {
                  try {
                    const module = await import("../../services/vehicle/VehicleService")
                    await module.ToggleVehicleStatusService(vehicle.id)
                    await loadVehicles()
                  } catch (error) {
                    AlertHelper.showAlert("Error al cambiar estado del vehículo", "error")
                  }
                }}>
                  Cambiar Estado
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para agregar vehículo */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="mafia-card rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Agregar Vehículo</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                const form = e.target
                const newVehicle = {
                  marca: form.marca.value,
                  modelo: form.modelo.value,
                  color: form.color.value,
                  status: form.status.value,
                  duenioId: user.id,
                }
                try {
                  const module = await import("../../services/vehicle/VehicleService")
                  await module.CreateVehicleService(newVehicle)
                  await loadVehicles()
                  setShowAddModal(false)
                } catch (error) {}
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Marca</label>
                <input name="marca" type="text" className="mafia-input w-full px-4 py-3 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Modelo</label>
                <input name="modelo" type="text" className="mafia-input w-full px-4 py-3 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
                <input name="color" type="text" className="mafia-input w-full px-4 py-3 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
                <select name="status" className="mafia-input w-full px-4 py-3 rounded-lg" required>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="mafia-button flex-1 py-3 rounded-lg font-semibold">Registrar</button>
                <button type="button" className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors" onClick={() => setShowAddModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para editar vehículo */}
      {showEditModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="mafia-card rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Editar Vehículo</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                const form = e.target
                const updatedVehicle = {
                  marca: form.marca.value,
                  modelo: form.modelo.value,
                  color: form.color.value,
                  status: form.status.value,
                  duenioId: user.id,
                }
                try {
                  const module = await import("../../services/vehicle/VehicleService")
                  await module.UpdateVehicleService(showEditModal.vehicle.id, updatedVehicle)
                  await loadVehicles()
                  setShowEditModal({ open: false, vehicle: null })
                } catch (error) {}
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Marca</label>
                <input name="marca" type="text" defaultValue={showEditModal.vehicle.marca} className="mafia-input w-full px-4 py-3 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Modelo</label>
                <input name="modelo" type="text" defaultValue={showEditModal.vehicle.modelo} className="mafia-input w-full px-4 py-3 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
                <input name="color" type="text" defaultValue={showEditModal.vehicle.color} className="mafia-input w-full px-4 py-3 rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
                <select name="status" className="mafia-input w-full px-4 py-3 rounded-lg" required defaultValue={showEditModal.vehicle.status}>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="mafia-button flex-1 py-3 rounded-lg font-semibold">Guardar</button>
                <button type="button" className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors" onClick={() => setShowEditModal({ open: false, vehicle: null })}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyVehicles

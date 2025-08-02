"use client"

import { useState, useEffect, useContext } from "react"
import { CreateVehicleService, GetVehiclesService, ToggleVehicleStatusService, UpdateVehicleService } from "../../services/vehicle/VehicleService"
import { Plus, Edit, Search, Car, Eye } from "lucide-react"
import AuthContext from "../../context/AuthContext"
import { AlertHelper } from "../../utilities/AlertHelper"
import { GetUsersService } from "../../services/user/UserService"

const VehicleManagement = () => {
  const { user } = useContext(AuthContext)
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(false)

const [formData, setFormData] = useState({
  marca: "",
  modelo: "",
  color: "",
  duenioId: user?.rol === "USER" ? user.id : "",
})


  // Simulación de datos - en producción vendría de la API
  useEffect(() => {
    loadVehicles()
  }, [])

  const loadVehicles = async () => {
    setLoading(true)
    try {
      const vehiclesData = await GetVehiclesService()
      console.log("Vehicles loaded:", vehiclesData);
      
      // Filtrar por usuario si no es admin
      if (user?.rol === "USER") {
        setVehicles(vehiclesData.filter((v) => v.duenio && v.duenio.id === user.id))
      } else {
        setVehicles(vehiclesData)
      }
    } catch (error) {
      console.error("Error loading vehicles:", error)
    } finally {
      setLoading(false)
    }
  }

const loadUsers = async () => {
  setLoadingUsers(true)
  try {
    const response = await GetUsersService();
    setUsers(response.filter(user => user.role.nombre !== "MECHANIC" && user.role.nombre !== "ADMIN"));
  } catch (error) {
    AlertHelper.showAlert("Error al cargar los usuarios", "error")
  } finally {
    setLoadingUsers(false)
  }
}


const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  const formDataWithStatus = {
    ...formData,
    status: editingVehicle ? editingVehicle.status : true, // Mantener el estado si se está editando
  }
  console.log("Form data to submit:", formDataWithStatus);
  
  try {
    if (editingVehicle) {
      await UpdateVehicleService(editingVehicle.id, formDataWithStatus)
      AlertHelper.showAlert("Vehículo actualizado correctamente", "success")
    } else {
      await CreateVehicleService(formDataWithStatus)
      AlertHelper.showAlert("Vehículo creado correctamente", "success")
    }
    await loadVehicles()
    resetForm()
  } catch (error) {
    AlertHelper.showAlert("Error al guardar el vehículo", "error")
  } finally {
    setLoading(false)
    await loadVehicles()
    resetForm()

  }
}
  const changeStatus = async (vehicle) => {
    setLoading(true)
    try {
      await ToggleVehicleStatusService(vehicle.id);
    } catch (error) {
      AlertHelper.showAlert("Error al cambiar el estado del vehículo", "error")
    }finally{
      setLoading(false)
      await loadVehicles()
    }
  }
  

const handleEdit = (vehicle) => {
  setEditingVehicle(vehicle)
  setFormData({
    marca: vehicle.marca,
    modelo: vehicle.modelo,
    color: vehicle.color,
    duenioId: vehicle.duenio.id,
  })
  setShowModal(true)
  loadUsers()
}


  const resetForm = () => {
    setFormData({
      marca: "",
      modelo: "",
      color: "",
      duenioId: user?.rol === "USER" ? user.id : "",
    })
    setEditingVehicle(null)
    setShowModal(false)
  }
  const openModalAndLoadUsers = () => {
    loadUsers()
    setEditingVehicle(null)
    setShowModal(true)
  }

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      
      vehicle.modelo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.marca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.color?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehicle.duenio && vehicle.duenio.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (vehicle.duenio && vehicle.duenio.apellidos.toLowerCase().includes(searchTerm.toLowerCase())) || ""
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mafia-title text-3xl font-bold">Flota de Vehículos</h1>
          <p className="text-gray-400 mt-2">
            {user?.rol === "USER" ? "Gestiona tus vehículos" : "Administra toda la flota"}
          </p>
        </div>
        <button
          onClick={() => openModalAndLoadUsers()}
          className="mafia-button px-6 py-3 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Vehículo</span>
        </button>
      </div>

      {/* Search */}
      <div className="mafia-card rounded-xl p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar vehículos... (Marca, Modelo, Color, Dueño)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mafia-input w-full pl-10 pr-4 py-3 rounded-lg"
          />
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-400">Cargando vehículos...</div>
        ) : filteredVehicles.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-400">No se encontraron vehículos</div>
        ) : (
          filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="mafia-card rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-gray-900" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${vehicle.status ? "bg-green-400" : "bg-red-400"}`}></span>
                  <span className={`text-sm ${vehicle.status ? "text-green-400" : "text-red-400"}`}>
                    {vehicle.status ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h3 className="text-xl font-bold text-white">
                  {vehicle.marca} {vehicle.modelo}
                </h3>
                <p className="text-gray-400">
                  servicios realizados: <span className="text-yellow-400 font-mono">{vehicle.servicios.length}</span>
                </p>
                <p className="text-gray-400">Color: {vehicle.color}</p>
                {user?.role !== "USER" && vehicle.duenio && (
                  <p className="text-gray-400">
                    Dueño: {vehicle.duenio.nombre} {vehicle.duenio.apellidos}
                  </p>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(vehicle)}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                {/**cambiar estado */}
                <button
                  onClick={() => changeStatus(vehicle)}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>estado</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="mafia-card rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingVehicle ? "Editar Vehículo" : "Nuevo Vehículo"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Marca</label>
                <input
                  type="text"
                  value={formData.marca}
                  onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Modelo</label>
                <input
                  type="text"
                  value={formData.modelo}
                  onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                />
              </div>

             
             {editingVehicle ? (
              <>
                <label className="block text-sm font-medium text-gray-300 mb-2">Dueño</label>
                {/**mostrar select con los usuarios disponibles y mostrar el usaurio que pertence al vehiculo sleccionado */}
                <select
                  value={formData.duenioId}
                  onChange={(e) => setFormData({ ...formData, duenioId: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                >
                  <option value="">Seleccionar dueño</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nombre} {user.apellidos}
                    </option>
                  ))}
                </select>
             </>
             ) : (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Dueño</label>
                <select
                  value={formData.duenioId}
                  onChange={(e) => setFormData({ ...formData, duenioId: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                >
                  <option value="">Seleccionar dueño</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.nombre} {user.apellidos}
                    </option>
                  ))}
                </select>
              </div>
             )}
              

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Color</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button type="submit" disabled={loading} className="mafia-button flex-1 py-3 rounded-lg font-semibold">
                  {loading ? "Guardando..." : editingVehicle ? "Actualizar" : "Crear"}
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

export default VehicleManagement
